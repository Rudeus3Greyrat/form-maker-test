<template>
  <div class="tags">
    <el-tag
      :style="{ margin: '0 0.3vw' }"
      :key="tag"
      v-for="tag in dynamicTags"
      closable
      :disable-transitions="false"
      @close="handleClose(tag)"
    >
      {{ tag }}
    </el-tag>
    <el-input
      class="input-new-tag"
      v-if="inputVisible"
      v-model="inputValue"
      ref="saveTagInput"
      size="small"
      @keyup.enter.native="handleInputConfirm"
      @blur="handleInputConfirm"
    >
    </el-input>
    <el-button v-else class="button-new-tag" size="small" @click="showInput"
      >+ New Tag</el-button
    >
  </div>
</template>

<style>
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 160px !important;
  margin-left: 10px;
  vertical-align: bottom;
}
.tags {
  display: flex;
  flex-flow: row nowrap !important;
  justify-content: flex-start;
  align-items: center;
}
</style>

<script>
export default {
  props: {
    dynamicTags: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      inputVisible: false,
      inputValue: '',
    };
  },
  methods: {
    handleClose(tag) {
      let tagsCopy = this.dynamicTags;
      tagsCopy.splice(tagsCopy.indexOf(tag), 1);
      this.$emit('update:dynamicTags', tagsCopy);
    },

    showInput() {
      this.inputVisible = true;
      this.$nextTick(() => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },

    handleInputConfirm() {
      let inputValue = this.inputValue;
      if (inputValue) {
        let tagsCopy = this.dynamicTags;
        tagsCopy.push(inputValue);
        this.$emit('update:dynamicTags', tagsCopy);
      }
      this.inputVisible = false;
      this.inputValue = '';
    },
  },
};
</script>
