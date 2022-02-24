<script>
import { findNode } from './tree';
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
      // obtain node level for nesting render
      const { level } = findNode(this.tree, node.id);
      if (node.type === 'root') {
        return this._renderRootNode(node, level);
      } else if (node.type === 'image') {
        return this._renderImageNode(node, level);
      } else if (node.type === 'radio') {
        return this._renderRadioNode(node, level);
      } else if (node.type === 'checkbox') {
        return this._renderCheckboxNode(node, level);
      } else if (node.type === 'text') {
        return this._renderTextNode(node, level);
      }
    },
    _renderNodeContainer(node, content = null, level = 0) {
      return (
        <div
          class={'render-node-container'}
          style={{
            paddingLeft: `${2 * level}vw`,
          }}
        >
          <div class={'render-children-wrapper'}>
            {content}
            {this.$parent.mode === 'edit' ? (
              <el-button
                class="node-button-add"
                type="primary"
                icon="el-icon-plus"
                circle
                vOn:click={() => this.$emit('add-node', node.id)}
              ></el-button>
            ) : null}
            {this.$parent.mode === 'edit' && node.type !== 'root' ? (
              <el-button
                class="node-button-delete"
                type="danger"
                icon="el-icon-delete"
                circle
                vOn:click={() => this.$emit('remove-node', node.id)}
              ></el-button>
            ) : null}
          </div>
        </div>
      );
    },
    _renderRootNode(node, level) {
      return this._renderNodeContainer(
        node,
        <div class={'render-node-content'}></div>,
        level
      );
    },
    _renderImageNode(node, level) {
      return this._renderNodeContainer(
        node,
        <img src={node.url} alt={JSON.stringify({ shapes: node.shapes })} />,
        level
      );
    },
    _renderRadioNode(node, level) {
      return this._renderNodeContainer(
        node,
        <div class={'render-node-content'}>
          {' '}
          <span style={{ width: '100px', marginRight: '20px' }}>
            {node.label}:
          </span>
          <el-radio-group vModel={node.value}>
            {node.options.map((option) => (
              <el-radio label={option}>{option}</el-radio>
            ))}
          </el-radio-group>
        </div>,
        level
      );
    },
    _renderCheckboxNode(node, level) {
      return this._renderNodeContainer(
        node,
        <div class={'render-node-content'}>
          {' '}
          <span style={{ width: '100px', marginRight: '20px' }}>
            {node.label}:
          </span>
          <el-checkbox-group vModel={node.value}>
            {node.options.map((option) => (
              <el-checkbox label={option}>{option}</el-checkbox>
            ))}
          </el-checkbox-group>
        </div>,
        level
      );
    },
    _renderTextNode(node, level) {
      return this._renderNodeContainer(
        node,
        <div class={'render-node-content'}>
          {' '}
          <span style={{ width: '100px', marginRight: '20px' }}>
            {node.label}:
          </span>
          <el-input
            placeholder="请输入内容"
            vModel={node.value}
            clearable
          ></el-input>
        </div>,
        level
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
    return <div class="form-panel-container">{rendered}</div>;
  },
};
</script>

<style scoped>
.form-panel-container {
  width: 100%;
  display: flex;
  flex-flow: row nowrap !important;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 0 1vw;
  margin: 1vh 0;
  box-shadow: 0 0.1vw 0.6vw 0 rgb(0 0 0 / 10%);
}
.render-node-container {
  width: 100%;
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: flex-start;
}
.render-children-wrapper {
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: center;
}

.render-node-content {
  width: 100%;
  height: 9vh;
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: center;
  margin-right: 30px;
}
</style>
