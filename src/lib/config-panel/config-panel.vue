<template>
  <div class="config-panel-container">
    <div>
      <span>节点类型： </span>
      <el-select :style="{ width: '110px' }" v-model="config.type" placeholder="请选择">
        <el-option key="image" value="upload" label="上传文件" />
        <el-option key="radio" value="radio" label="单选框" />
        <el-option key="checkbox" value="checkbox" label="复选框" />
        <el-option key="text" value="text" label="文本框" />
      </el-select>
    </div>
    <Upload
      v-if="config.type === 'upload'"
      :config="config"
      :uploadUserConfig="uploadConfig"
    />
    <Radio v-if="config.type === 'radio'" :config="config" />
    <Checkbox v-if="config.type === 'checkbox'" :config="config" />
    <TextInput v-if="config.type === 'text'" :config="config" />
  </div>
</template>

<script>
const NodeTypes = ['root', 'upload', 'radio', 'checkbox', 'text'];
import Upload from './components/upload.vue';
import Radio from './components/radio.vue';
import Checkbox from './components/checkbox.vue';
import TextInput from './components/text.vue';
export default {
  name: 'ConfigPanel',
  components: { Upload, Radio, Checkbox, TextInput },
  props: {
    outerConfig: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      config: {
        type: '',
        text: '',
        label: '',
        tags: [],
        shapes: [],
        urls: [],
      },
      uploadConfig: {},
    };
  },
  created() {
    this._mergeConfig();
  },
  watch: {
    outerConfig: {
      handler() {
        this._mergeConfig();
      },
    },
    immediate: true,
  },
  methods: {
    _mergeConfig() {
      this.config = { ...this.config, ...this.outerConfig };
    },
    _transFormConfigToNode(config) {
      // #2 deepCopy config so form panel rendering and config are separated after add node
      config = JSON.parse(JSON.stringify(config));
      const { type, text, tags, shapes, urls, label } = config;
      const node = {};
      node.children = config.children || [];
      if (type === 'upload') {
        node.value = config.value || '';
        node.type = 'upload';
        // node.urls = urls;
        console.log(urls);
        node.label = label;
        node.urls = [
          'https://dss0.bdstatic.com/5aV1bjqh_Q23odCf/static/superman/img/topnav/newfanyi-da0cea8f7e.png',
          'https://dss0.bdstatic.com/5aV1bjqh_Q23odCf/static/superman/img/topnav/newfanyi-da0cea8f7e.png',
        ];
        node.shapes = shapes;
      } else if (type === 'text') {
        node.type = type;
        node.label = label;
        node.value = text || '';
      } else if (type === 'radio') {
        node.type = type;
        node.label = label;
        node.options = tags;
        node.value =
          config.value && node.options.includes(config.value)
            ? config.value
            : node.options[0]
            ? node.options[0]
            : '';
        node.children = {};
        node.options.forEach((option) => (node.children[option] = []));
        if (config.children) {
          node.children = { ...node.children, ...config.children };
        }
      } else if (type === 'checkbox') {
        node.type = type;
        node.label = label;
        node.options = tags;
        node.value = config.value || [];
      }
      return node;
    },
    getNodeInfo() {
      const nodeInfo = this._transFormConfigToNode(this.config);
      if (!NodeTypes.includes(nodeInfo.type)) {
        this.$message.error('无效的节点类型！');
        return;
      }
      return nodeInfo;
    },
    resetConfig() {
      this.config = {
        type: '',
        text: '',
        label: '',
        tags: [],
        shapes: [],
        urls: [],
      };
    },
  },
};
</script>

<style scoped>
.config-panel-container {
  width: 100%;
  display: flex;
  flex-flow: row nowrap !important;
  justify-content: flex-start;
  align-items: center;
  padding: 1vh 1vw;
  box-shadow: 0 0.1vw 0.6vw 0 rgb(0 0 0 / 10%);
}
</style>
