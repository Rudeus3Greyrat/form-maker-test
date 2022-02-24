<template>
  <div class="container">
    <config-panel ref="configPanel" v-if="mode === 'edit'" />
    <form-panel :tree="tree" @add-node="_addChild" @remove-node="_removeNode" />
  </div>
</template>
<script>
import ConfigPanel from './config-panel.vue';
import FormPanel from './form-panel.vue';
import { isPlainObject, guidGenerator } from './utils.js';
import { addNode, removeNode } from './tree.js';

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
    },
    _removeNode(nodeId) {
      removeNode({ tree: this.tree, id: nodeId });
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
