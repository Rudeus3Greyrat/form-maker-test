<template>
  <div class="config-panel-container">
    <div>
      <span>节点一级类型： </span>
      <el-select
        v-model="config.level1Type"
        placeholder="请选择"
        :style="{ width: '8vw' }"
      >
        <el-option key="image" value="image" label="图片" />
        <el-option key="form" value="form" label="非图片" />
      </el-select>
    </div>
    <div
      class="config-panel-image-container"
      v-if="config.level1Type === 'image'"
    >
      <el-upload
        ref="upload"
        class="upload-demo"
        action="https://jsonplaceholder.typicode.com/posts/"
        multiple
        :on-change="handleUploadChange"
        :limit="3"
      >
        <el-button size="small" type="primary">点击上传图片</el-button>
      </el-upload>
      <div :style="{ marginLeft: '1.5vw' }">
        <span>选择标注框类型(支持多选)： </span>
        <el-select v-model="config.shapes" multiple placeholder="请选择">
          <el-option key="rect" value="矩形" label="矩形" />
          <el-option key="poly" value="多边形" label="多边形" />
        </el-select>
      </div>
    </div>
    <div
      class="config-panel-form-container"
      v-if="config.level1Type === 'form'"
    >
      <span>节点二级类型： </span>
      <el-select
        v-model="config.level2Type"
        placeholder="请选择"
        :style="{ width: '8vw' }"
      >
        <el-option key="radio" value="radio" label="单选框" />
        <el-option key="checkbox" value="checkbox" label="复选框" />
        <el-option key="text" value="text" label="文本框" />
      </el-select>
      <div v-if="config.level2Type !== ''" :style="{ marginLeft: '1.5vw' }">
        <span>标签： </span>
        <el-input
          ref="label"
          type="text"
          v-model="config.label"
          placeholder="请输入标签"
          @change="() => $refs.label.blur()"
          :style="{ width: '8vw' }"
        />
      </div>
      <div v-if="config.level2Type === 'text'" :style="{ marginLeft: '1.5vw' }">
        <span>文本内容： </span>
        <el-input
          type="text"
          v-model="config.text"
          placeholder="请输入"
          :style="{ width: '30vw' }"
        />
      </div>
      <div
        v-if="config.level2Type === 'radio' || config.level2Type === 'checkbox'"
        class="tags-container"
      >
        <span>添加选项： </span>
        <tags :dynamicTags.sync="config.tags" :style="{ width: '30vw' }" />
      </div>
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
  created() {
    this._mergeUploadConfig();
  },
  methods: {
    handleUploadChange() {
    },
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
    // merge user upload config when el-upload is mounted
    _mergeUploadConfig() {
      const userConfig = this.$parent.uploadConfig;
      this.handleUploadChange =
        userConfig.handleUploadChange || this.handleUploadChange;
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
.config-panel-image-container {
  display: flex;
  flex-flow: row nowrap !important;
  justify-content: flex-start;
  align-items: center;
  margin-left: 1.5vw;
}
.config-panel-form-container {
  display: flex;
  flex-flow: row nowrap !important;
  justify-content: flex-start;
  align-items: center;
  margin-left: 1.5vw;
}
.tags-container {
  display: flex;
  flex-flow: row nowrap !important;
  justify-content: flex-start;
  align-items: center;
  margin-left: 1.5vw;
}
</style>
