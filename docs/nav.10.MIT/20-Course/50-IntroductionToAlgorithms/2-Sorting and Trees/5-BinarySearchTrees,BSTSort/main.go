package main

import "sync"

type Node struct {
	key    int
	parent *Node
	left   *Node
	right  *Node
	count  int // 新增计数
}

func NewNode(key int, parent, left, right *Node) Node {
	return Node{
		key:    key,
		parent: parent,
		left:   left,
		right:  right,
		count:  1,
	}
}

// BinarySearchTree the binary search tree of Items
type BinarySearchTree struct {
	root *Node
	lock sync.RWMutex
}

// Insert inserts the Int t in the tree
func (bst *BinarySearchTree) Insert(key int) {
	bst.lock.Lock()
	defer bst.lock.Unlock()
	n := NewNode(key, nil, nil, nil)
	if bst.root == nil {
		bst.root = &n
	} else {
		insertNode(bst.root, &n)
	}
}

// internal function to find the correct place for a node in a tree
func insertNode(node, newNode *Node) {
	if newNode.key < node.key {
		if node.left == nil {
			node.left = newNode
			newNode.parent = node
			updateCount(newNode)
		} else {
			insertNode(node.left, newNode)
		}
	} else {
		if node.right == nil {
			node.right = newNode
			newNode.parent = node
			updateCount(newNode)
		} else {
			insertNode(node.right, newNode)
		}
	}
}

// Search returns true if the Int t exists in the tree
func (bst *BinarySearchTree) Find(key int) bool {
	bst.lock.RLock()
	defer bst.lock.RUnlock()
	return find(bst.root, key)
}

// internal recursive function to search an Int in the tree
func find(n *Node, key int) bool {
	if n == nil {
		return false
	}
	if key < n.key {
		return find(n.left, key)
	}
	if key > n.key {
		return find(n.right, key)
	}
	return true
}

// FindMin returns the Int with min value stored in the tree
func (bst *BinarySearchTree) FindMin() (value int) {
	bst.lock.RLock()
	defer bst.lock.RUnlock()
	n := bst.root
	node := minimum(n)
	return node.key
}

func minimum(n *Node) *Node {
	if n == nil {
		return nil
	}
	for {
		if n.left == nil {
			return n
		}
		n = n.left
	}
}

func (bst *BinarySearchTree) FindLarger(x *Node) *Node {
	bst.lock.RLock()
	defer bst.lock.RUnlock()
	// 如果节点右子节点不为nil, 直接以右子节为起点查找最小值直接返回
	if x.right != nil {
		return minimum(x.right)
	}

	y := x.parent

	for {
		if y != nil && y.right == x {
			x = y
			y = y.parent
		}
	}

	return y
}

func updateCount(node *Node) {
	parent := node.parent
	for parent != nil {
		parent.count += 1
		parent = parent.parent
	}
}

// 中序遍历
func inOrderTraversalIterate(root *Node) (res []int) {

	stack := []*Node{}

	for len(stack) > 0 || root != nil {
		if root != nil {
			stack = append(stack, root)
			root = root.left
		} else {
			root = stack[len(stack)-1]
			stack = stack[0 : len(stack)-1]
			res = append(res, root.key)
			root = root.right
		}
	}

	return
}

func main() {}
