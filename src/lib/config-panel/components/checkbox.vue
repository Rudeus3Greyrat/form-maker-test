<template>
  <div class="container">
    <div :style="{ marginLeft: '1.5vw' }">
      <span>标签： </span>
      <el-input
        ref="label"
        type="text"
        v-model="config.label"
        placeholder="请输入标签"
        @change="() => $refs.label.blur()"
        :style="{ width: '120px' }"
      />
    </div>
    <div class="tags-container">
      <span :style="{ width: '100%' }">添加选项： </span>
      <tags :dynamicTags.sync="config.tags" :style="{ width: '90%' }" />
    </div>
  </div>
</template>
<script>
import Tags from './tags.vue';
export default {
  name: 'Checkbox',
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
