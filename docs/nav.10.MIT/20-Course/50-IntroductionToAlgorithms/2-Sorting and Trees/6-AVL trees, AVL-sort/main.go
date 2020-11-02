package main

import "sync"

type Node struct {
	key    int
	parent *Node
	height int
	left   *Node //left
	right  *Node //right
}

// 新增统计AVL树统计高度
func NewNode(key int, parent, left, right *Node) Node {
	// 默认高度为-1

	height := getHeight(left, right)

	return Node{
		key:    key,
		parent: parent,
		left:   left,
		right:  right,
		height: height,
	}
}

func getHeight(left, right *Node) int {

	var leftHeight, rightHeight int
	if left != nil {
		leftHeight = left.height
	}

	if right != nil {
		rightHeight = right.height
	}

	height := max(leftHeight, rightHeight) + 1

	return height
}

func max(a, b int) int {
	if a > b {
		return a
	}
	return b
}

type AvlTree struct {
	root *Node
	lock sync.RWMutex
}

func llRotation(node *Node) *Node {
	newNode := node.right
	node.right = newNode.left
	newNode.left = node
	newNode.parent = node.parent
	node.parent = newNode
	//更新节点 node 的高度
	node.height = getHeight(node.left, node.right)
	//更新新父节点高度
	newNode.height = getHeight(newNode.left, newNode.right)

	return newNode
}

func rrRotation(node *Node) *Node {
	newNode := node.left
	node.left = newNode.right
	newNode.right = node
	newNode.parent = node.parent
	node.parent = newNode
	node.height = getHeight(node.left, node.right)
	newNode.height = getHeight(newNode.left, newNode.right)

	return newNode
}

func lrRotation(node *Node) *Node {
	leftChild := llRotation(node.left) //左旋转
	node.left = leftChild
	return rrRotation(node) // 右旋转
}

func rlRotation(node *Node) *Node {
	rightChild := rrRotation(node.right) //右旋转
	node.right = rightChild
	return llRotation(node) // 左旋转
}

func handleBF(node *Node) *Node {
	leftNode := node.left
	rightNode := node.right
	if leftNode.height-rightNode.height == 2 {
		if leftNode.left.height-leftNode.right.height > 0 { //RR
			node = rrRotation(node)
		} else {
			node = lrRotation(node)
		}
	} else if leftNode.height-rightNode.height == -2 {
		if rightNode.left.height-rightNode.right.height < 0 { //LL
			node = llRotation(node)
		} else {
			node = rlRotation(node)
		}
	}
	return node
}

// 节点插入成功后一直查询父节点更新 值
func insertNode(node, newNode *Node) *Node {
	if node == nil {
		return newNode
	}
	if newNode.key < node.key {
		node.right = insertNode(node.right, newNode)
		node = handleBF(node)
	} else if newNode.key > node.key {
		node.left = insertNode(node.left, newNode)
		node = handleBF(node)
	} else {
		return nil
	}

	node.height = getHeight(node.left, node.right)
	return node
}

func delete(node *Node, index int) *Node {
	if node == nil {
		return nil
	}

	if node.key == index {
		if node.left == nil && node.right == nil {
			return nil
		} else if node.left == nil || node.right == nil { //若只存在左子树或者右子树
			if node.left != nil {
				return node.left
			} else {
				return node.right
			}
		} else { //左右子树都存在
			//查找前驱，替换当前节点,然后再进行依次删除  ---> 节点删除后，前驱替换当前节点 ---> 需遍历到最后，调整平衡度
			var n *Node
			//前驱
			n = node.left
			for {
				if n.right == nil {
					break
				}
				n = n.right
			}
			//
			n.key, node.key = node.key, n.key
			node.left = delete(node.left, n.key)
		}
	} else if node.key > index {
		node.left = delete(node.left, index)
	} else { //node.key < index
		node.right = delete(node.right, index)
	}

	node.height = getHeight(node.left, node.right)
	//调整树的平衡度
	node = handleBF(node)
	return node
}

func main() {

}
