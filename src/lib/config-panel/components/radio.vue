<template>
  <div class="container">
    <div :style="{ marginLeft: '1.5vw' }">
      <span>标签： </span>
      <el-input
        ref="label"
        type="text"
        v-model="config.label"
        placeholder="请输入标签"
        :style="{ width: '120px' }"
        @change="() => $refs.label.blur()"
      />
    </div>
    <div class="tags-container">
      <span>添加选项： </span>
      <tags :dynamicTags.sync="config.tags" :style="{ width: '30vw' }" />
    </div>
  </div>
</template>
<script>
import Tags from './tags.vue';
export default {
  name: 'Radio',
  components: { Tags },
  props: {
    config: {
      type: Object,
      default: () => ({}),
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
.tags-container {
  display: flex;
  flex-flow: row nowrap !important;
  justify-content: flex-start;
  align-items: center;
  margin-left: 1.5vw;
}
</style>
