<template>
  <div class="container">
    <config-panel
      ref="configPanel"
      :outerConfig="outerPanelConfig"
      v-if="mode === 'edit'"
    />
    <form-panel
      :tree="tree"
      @add-node="_addChild"
      @edit-node="_editNode"
      @finish-edit-node="_finishEditNode"
      @remove-node="_removeNode"
    />
  </div>
</template>
<script>
import ConfigPanel from './config-panel/config-panel.vue';
import FormPanel from './form-panel/form-panel.vue';
import { isPlainObject, guidGenerator } from './utils/index.js';
import { addNode, findNode, removeNode } from './utils/tree.js';

export default {
  name: 'FormMaker',
  components: { ConfigPanel, FormPanel },
  props: {
    json: {
      type: String,
      default: '{}',
    },
    mode: {
      type: String,
      validator: function (value) {
        return ['edit', 'view'].indexOf(value) !== -1;
      },
      default: 'edit',
    },
    uploadConfig: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      tree: {},
      outerPanelConfig: {},
    };
  },
  created() {
    this._initTree();
  },
  methods: {
    _initTree() {
      let obj;
      try {
        obj = JSON.parse(this.json);
      } catch (error) {
        this.$message.error('传入的不是有效的JSON！');
        obj = {};
      } finally {
        this.tree = obj;
      }
      if (isPlainObject(obj)) {
        this.tree = {
          id: guidGenerator(),
          type: 'root',
          children: [],
        };
      }
    },
    getJson() {
      return JSON.stringify(this.tree);
    },
    _addChild(nodeId) {
      const nodeInfo = this.$refs.configPanel.getNodeInfo();
      if (!nodeInfo) return;
      const node = { ...nodeInfo, id: guidGenerator() };
      addNode({ tree: this.tree, parentId: nodeId, node });
      // #4
      this.$refs.configPanel.resetConfig();
    },
    _editNode(nodeId) {
      const { current: node } = findNode(this.tree, nodeId);
      this.outerPanelConfig = this._transFormNodeToConfig(node);
    },
    _finishEditNode(nodeId) {
      const { parent, current: node } = findNode(this.tree, nodeId);
      let children = parent.children;
      if (parent.type === 'radio') {
        children = children[parent.value];
      }
      const index = children.findIndex((child) => child.id === node.id);
      if (index === -1) return;
      const nodeInfo = this.$refs.configPanel.getNodeInfo();
      if (!nodeInfo) return;
      const nodeToInsert = { ...nodeInfo, id: nodeId };
      children.splice(index, 1, nodeToInsert);
      this.$refs.configPanel.resetConfig();
    },
    _removeNode(nodeId) {
      removeNode({ tree: this.tree, id: nodeId });
    },
    _transFormNodeToConfig(node) {
      const config = {};
      config.children = node.children;
      config.type = node.type || '';
      config.label = node.label || '';
      config.value = node.value || '';
      config.text = node.value || '';
      config.tags = node.options || [];
      config.shapes = node.shapes || [];
      config.urls = node.urls || [];
      return config;
    },
  },
};
</script>

<style scoped>
.container {
  width: 100%;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: flex-start;
}
</style>
