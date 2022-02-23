<script>
export default {
  name: 'FormPanel',
  props: {
    tree: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {};
  },
  methods: {
    _addNode(id) {
      this.$emit('add-node', id);
    },
    _renderTree(rootNode) {
      const renderedNode = this._renderNode(rootNode);
      const children = this._normalizeChildren(
        rootNode.children,
        rootNode.value,
        rootNode.type
      );
      if (children.length === 0) return renderedNode;
      const renderedChildren = children.map((child) => this._renderTree(child));
      renderedNode.children = [...renderedNode.children, ...renderedChildren];
      return renderedNode;
    },
    _renderNode(node) {
      if (node.type === 'root') {
        return this._renderRootNode(node);
      } else if (node.type === 'image') {
        return this._renderImageNode(node);
      } else if (node.type === 'radio') {
        return this._renderRadioNode(node);
      } else if (node.type === 'checkbox') {
        return this._renderCheckboxNode(node);
      } else if (node.type === 'text') {
        return this._renderTextNode(node);
      }
    },
    _renderRootNode(node) {
      return (
        <div className={'container'}>
          <el-button
            type="primary"
            icon="el-icon-plus"
            circle
            vOn:click={() => this.$emit('add-node', node.id)}
          ></el-button>
        </div>
      );
    },
    _renderImageNode(node) {
      return (
        <div className={'container'}>
          <img src={node.url} alt={JSON.stringify({ shapes: node.shapes })} />
          <el-button
            type="primary"
            icon="el-icon-plus"
            circle
            vOn:click={() => this.$emit('add-node', node.id)}
          ></el-button>
          <el-button
            type="danger"
            icon="el-icon-delete"
            circle
            vOn:click={() => this.$emit('remove-node', node.id)}
          ></el-button>
        </div>
      );
    },
    _renderRadioNode(node) {
      return (
        <div className={'container'}>
          <span style={{ marginRight: '20px' }}>{node.label}:</span>
          <el-radio-group vModel={node.value}>
            {node.options.map((option) => (
              <el-radio label={option}>{option}</el-radio>
            ))}
          </el-radio-group>
          <el-button
            type="primary"
            icon="el-icon-plus"
            circle
            vOn:click={() => this.$emit('add-node', node.id)}
          ></el-button>
          <el-button
            type="danger"
            icon="el-icon-delete"
            circle
            vOn:click={() => this.$emit('remove-node', node.id)}
          ></el-button>
        </div>
      );
    },
    _renderCheckboxNode(node) {
      return (
        <div className={'container'}>
          <span style={{ marginRight: '20px' }}>{node.label}:</span>
          <el-checkbox-group vModel={node.value}>
            {node.options.map((option) => (
              <el-checkbox label={option}>{option}</el-checkbox>
            ))}
          </el-checkbox-group>
          <el-button
            type="primary"
            icon="el-icon-plus"
            circle
            vOn:click={() => this.$emit('add-node', node.id)}
          ></el-button>
          <el-button
            type="danger"
            icon="el-icon-delete"
            circle
            vOn:click={() => this.$emit('remove-node', node.id)}
          ></el-button>
        </div>
      );
    },
    _renderTextNode(node) {
      return (
        <div className={'container'}>
          <span style={{ marginRight: '20px' }}>{node.label}:</span>
          <el-input
            placeholder="请输入内容"
            vModel={node.value}
            clearable
          ></el-input>
          <el-button
            type="primary"
            icon="el-icon-plus"
            circle
            vOn:click={() => this.$emit('add-node', node.id)}
          ></el-button>
          <el-button
            type="danger"
            icon="el-icon-delete"
            circle
            vOn:click={() => this.$emit('remove-node', node.id)}
          ></el-button>
        </div>
      );
    },
    _renderPlainNode(node) {
      return (
        <div className={'container'}>
          {node.label}
          <el-button
            type="primary"
            icon="el-icon-plus"
            circle
            vOn:click={() => this.$emit('add-node', node.id)}
          ></el-button>
          <el-button
            type="danger"
            icon="el-icon-delete"
            circle
            vOn:click={() => this.$emit('remove-node', node.id)}
          ></el-button>
        </div>
      );
    },
    _normalizeChildren(children, nodeValue, nodeType) {
      if (Array.isArray(children)) {
        return children;
      } else if (nodeType === 'radio') {
        return this._normalizeChildren(children[nodeValue], 'normal');
      } else {
        return [];
      }
    },
  },
  render() {
    const rendered = this._renderTree(this.tree);
    return rendered;
  },
};
</script>

<style scoped>
.container {
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: center;
}
</style>
