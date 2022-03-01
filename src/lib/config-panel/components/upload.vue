<template>
  <div class="container">
    <div :style="{ margin: '0' }">
      <span>标签： </span>
      <el-input
        ref="label"
        type="text"
        v-model="config.label"
        placeholder="请输入标签"
        @change="() => $refs.label.blur()"
        :style="{ width: '100px' }"
      />
    </div>
    <div :style="{ margin: '10px' }">
      <span>图片描述： </span>
      <el-input
        ref="label"
        type="text"
        v-model="currentDesc"
        placeholder="请输入描述"
        @change="() => $refs.label.blur()"
        :style="{ width: '110px' }"
      />
    </div>
    <el-upload
      ref="upload"
      class="upload-demo"
      action="https://jsonplaceholder.typicode.com/posts/"
      multiple
      :on-change="uploadConfig.handleUploadChange"
      :limit="3"
    >
      <el-button size="small" type="primary">点击上传</el-button>
    </el-upload>
    <div :style="{ marginLeft: '10px' }">
      <span>标注框类型： </span>
      <el-select v-model="config.shapes" :style="{ width: '100px' }" multiple placeholder="请选择">
        <el-option key="rect" value="矩形" label="矩形" />
        <el-option key="poly" value="多边形" label="多边形" />
        <el-option key="dot" value="点" label="点" />
        <el-option key="line" value="线" label="线" />
      </el-select>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Upload',
  props: {
    config: {
      type: Object,
      default: () => ({}),
    },
    uploadUserConfig: {
      type: Object,
      default: () => ({}),
    },
  },
  created() {
    this._mergeUploadConfig();
  },
  data() {
    return {
      uploadConfig: {
        handleUploadChange: () => console.log('upload changed'),
      },
      currentDesc: '',
    };
  },
  methods: {
    // merge user upload config when el-upload is mounted
    _mergeUploadConfig() {
      this.uploadConfig = { ...this.uploadConfig, ...this.uploadUserConfig };
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
  margin-left: 1.5vw;
}
</style>
