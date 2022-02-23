<template>
  <div class="container">
    <el-select v-model="config.level1Type" placeholder="请选择">
      <el-option key="image" value="image" label="图片" />
      <el-option key="form" value="form" label="非图片" />
    </el-select>
    <div class="container" v-if="config.level1Type === 'image'">
      <el-upload
        class="upload-demo"
        action="https://jsonplaceholder.typicode.com/posts/"
        multiple
        :limit="3"
      >
        <el-button size="small" type="primary">点击上传</el-button>
      </el-upload>
      <el-select v-model="config.shapes" multiple placeholder="请选择">
        <el-option key="rect" value="矩形" label="矩形" />
        <el-option key="poly" value="多边形" label="多边形" />
      </el-select>
    </div>
    <div class="container" v-if="config.level1Type === 'form'">
      <el-select v-model="config.level2Type" placeholder="请选择">
        <el-option key="radio" value="radio" label="单选框" />
        <el-option key="checkbox" value="checkbox" label="复选框" />
        <el-option key="text" value="text" label="文本框" />
      </el-select>
      <el-input
        v-if="config.level2Type !== ''"
        type="text"
        v-model="config.label"
        placeholder="请输入标签"
      />
      <el-input
        v-if="config.level2Type === 'text'"
        type="text"
        v-model="config.text"
        placeholder="请输入"
      />
      <tags
        v-if="config.level2Type === 'radio' || config.level2Type === 'checkbox'"
        :dynamicTags.sync="config.tags"
      />
    </div>
  </div>
</template>

<script>
const NodeTypes = ['root', 'image', 'radio', 'checkbox', 'text'];
import tags from './components/tags.vue';
export default {
  name: 'ConfigPanel',
  components: { tags },
  data() {
    return {
      config: {
        level1Type: '',
        level2Type: '',
        text: '',
        label: '',
        tags: [],
        shapes: [],
        url: '',
      },
    };
  },
  methods: {
    _transFormConfigToNode(config) {
      const { level1Type, level2Type, text, tags, shapes, url, label } = config;
      const node = {
        children: [],
      };
      if (level1Type === 'image') {
        node.type = 'image';
        // node.url = url;
        console.log(url);
        node.url =
          'https://dss0.bdstatic.com/5aV1bjqh_Q23odCf/static/superman/img/topnav/newfanyi-da0cea8f7e.png';
        node.shapes = shapes;
      } else if (level1Type === 'form') {
        node.type = level2Type;
        node.label = label;
        if (level2Type === 'text') {
          node.value = text;
        } else if (level2Type === 'radio') {
          node.options = tags;
          node.value = node.options[0] || '';
          node.children = {};
          node.options.forEach((option) => (node.children[option] = []));
        } else if (level2Type === 'checkbox') {
          node.options = tags;
          node.value = [];
        }
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
  },
};
</script>

<style scoped>
.container {
  display: flex;
  flex-flow: row nowrap !important;
  justify-content: flex-start;
  align-items: center;
}
</style>
