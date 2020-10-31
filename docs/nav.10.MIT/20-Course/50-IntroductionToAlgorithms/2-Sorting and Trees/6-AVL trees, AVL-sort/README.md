## AVL TREE
AVL树是最早被发明的自平衡二叉查找树. 任一节点对应的两棵子树的最大高度差为1，因此它也被称为高度平衡树。

简单理解平衡树的定义是树的高度h为logN, 而极度不平衡的树可以看为路径(length of longest path going down to leaf)

以二分查找树的结构体为基础,
~~~go
type Node struct {
  key   int
  parent *Node
  height int
	left  *Node //left
	right *Node //right
}

// 新增统计AVL树统计高度
func NewNode(key int, parent, left, right *Node) Node {
  // 默认高度为-1
  height := -1
  var leftHeight, rightHeight
  if(left != nil) {
    leftHeight = left.height
  }
  if(right != nil) {
    rightHeight = right.height
  }
  height := getHeight(leftHeight, rightHeight)

  return Node{
    key: key,
    parent: parent,
    left: left,
    right: right,
    height: height,
  }
}

func getHeight(a, b) int{
  return max(a, b) + 1
}

func max(a, b int)int{
  if a > b {
		return a
  }
  return b
}

type AvlTree struct {
    root *Node
    lock sync.RWMutex
}
~~~

查找方法和普通二分树无异;

旋转有4种情况, 左旋, 右旋, 先左后右, 先右再左(后面2种需要2次旋转)

![avl]("~@assets/50/avl.png")

~~~go
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
~~~

方法: 根据情况判断旋转
~~~go
func BFhandler(node *Node) *Node {
    leftNode := node.left
    rightNode := node.right
    if leftNode.height - rightNode.height == 2 {
        if leftNode.left.height - leftNode.right.height > 0 { //RR
            node = rrRotation(node)
        } else {
            node = lrRotation(node)
        }
    } else if leftNode.height - rightNode.height == -2 {
        if rightNode.left.height - rightNode.right.height < 0 { //LL
            node = llRotation(node)
        } else {
            node = rlRotation(node)
        }
    }
    return node
}
~~~

方法: 插入, 由于插入操作可能会破坏AVL树的平衡特性，故在插入完成之前通过依次向上递归，调整树平衡
~~~go
// 节点插入成功后一直查询父节点更新 值
func insertNode(node, newNode *Node) *Node{
  if node == nil {
    return NewNode(key, nil, nil, nil)
  }
	if newNode.key < node.key {
		if node.left == nil {
      node.left = newNode
      newNode.parent = node
		} else {
			insertNode(node.left, newNode)
		}
	} else {
		if node.right == nil {
      node.right = newNode
      newNode.parent = node
		} else {
			insertNode(node.right, newNode)
		}
	}
}
~~~

## AVL SORT

~~~go
func singleRotation(){

}

func doubleRotation(){
  
}
~~~

## 其他

一种抽象数据结构可以分别以多种基础数据结果构成, 以优先队列为例

 **Priority Queue ADT**     | **Heap**  | **AVL Tree**       
----------------------------|-----------|--------------------
 Q = new\-empty\-queue\(\)  | O\(1\)    | O\(1\)             
 Q\.insert\(x\)             | O\(lg n\) | O\(lg n\)          
 x = Q\.deletemin\(\)       | O\(lg n\) | O\(lg n\)          
 x = Q\.findmin\(\)         | O\(1\)    | O\(lg n\)\->O\(1\) 

 寻找次大/小值的抽象结构

  **Predecessor/Successor ADT**          | **Heap**  | **AVL Tree** 
-----------------------------------------|-----------|--------------
 S = new\-empty\(\)                      | O\(1\)    | O\(1\)       
 S\.insert\(x\)                          | O\(lg n\) | O\(lg n\)    
 S\.delete\(x\)                          | O\(lg n\) | O\(lg n\)    
 y = S\.predecessor\(x\) → next\-smaller | O\(n\)    | O\(lg n\)    
 y = S\.successor\(x\) → next\-larger    | O\(n\)    | O\(lg n\)    

 当然, 这不代表`堆`完全比不过AVL tree, Heap不需要额外空间是它的一个重大优点.

