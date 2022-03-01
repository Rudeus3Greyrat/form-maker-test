<template>
  <div class="container">
    <div :style="{ marginLeft: '10px' }">
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
    <div :style="{ marginLeft: '10px' }">
      <span>文本内容： </span>
      <el-input
        type="text"
        v-model="config.text"
        placeholder="请输入"
        :style="{ width: '250px' }"
      />
    </div>
  </div>
</template>
<script>
export default {
  name: 'TextInput',
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
</style>
