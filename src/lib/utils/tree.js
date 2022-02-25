import { isObject } from '.';

const dfs = (current, parent, id, level = 0) => {
  if (current.id === id) {
    return {
      parent,
      current,
      level,
    };
  }

  let children = current.children;
  if (current.type === 'radio') {
    children = children[current.value];
  }

  for (const child of children) {
    const res = dfs(child, current, id, level + 1);
    if (res) return res;
  }
};

const findNode = (tree, id) => {
  let current = tree;
  let parent = null;
  return dfs(current, parent, id);
};

const addNode = ({ tree, parentId, node }) => {
  const { current } = findNode(tree, parentId);
  const children = current.children;
  if (current.type === 'radio') {
    if (!current.value || !isObject(children)) return;
    children[current.value].push(node);
  } else {
    children.push(node);
  }
};

const removeNode = ({ tree, id }) => {
  const { parent } = findNode(tree, id);
  let children = parent.children;
  let index;
  if (parent.type === 'radio') {
    for (const key of Object.keys(children)) {
      index = children[key].findIndex((node) => node.id === id);
      if (index !== -1) {
        children[key].splice(index, 1);
        break;
      }
    }
  } else {
    index = children.findIndex((node) => node.id === id);
    if (index !== -1) children.splice(index, 1);
  }
};

export { findNode, addNode, removeNode };
