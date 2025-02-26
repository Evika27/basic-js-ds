const { NotImplementedError } = require('../extensions/index.js');

const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class BinarySearchTree {
  constructor() {
    this.rootNode = null;
  }

  root() {
    return this.rootNode;
  }

  add(data) {
    this.rootNode = this._addWithin(this.rootNode, data);
  }

  _addWithin(node, data) {
    if (!node) {
      return new Node(data);
    }
    
    if (data < node.data) {
      node.left = this._addWithin(node.left, data);
    } else if (data > node.data) {
      node.right = this._addWithin(node.right, data);
    }
    
    return node;
  }

  has(data) {
    return this._search(this.rootNode, data) !== null;
  }

  find(data) {
    return this._search(this.rootNode, data);
  }

  _search(node, data) {
    if (!node) {
      return null;
    }
    
    if (data < node.data) {
      return this._search(node.left, data);
    } else if (data > node.data) {
      return this._search(node.right, data);
    } else {
      return node;
    }
  }

  remove(data) {
    this.rootNode = this._removeNode(this.rootNode, data);
  }

  _removeNode(node, data) {
    if (!node) {
      return null;
    }
    
    if (data < node.data) {
      node.left = this._removeNode(node.left, data);
      return node;
    } else if (data > node.data) {
      node.right = this._removeNode(node.right, data);
      return node;
    } else {
      if (!node.left && !node.right) {
        return null;
      }
      
      if (!node.left) {
        return node.right;
      }
      
      if (!node.right) {
        return node.left;
      }
      
      let minRight = this._findMin(node.right);
      node.data = minRight.data;
      node.right = this._removeNode(node.right, minRight.data);
      return node;
    }
  }

  min() {
    if (!this.rootNode) {
      return null;
    }
    return this._findMin(this.rootNode).data;
  }

  _findMin(node) {
    while (node.left) {
      node = node.left;
    }
    return node;
  }

  max() {
    if (!this.rootNode) {
      return null;
    }
    let node = this.rootNode;
    while (node.right) {
      node = node.right;
    }
    return node.data;
  }
}

module.exports = {
  BinarySearchTree
};