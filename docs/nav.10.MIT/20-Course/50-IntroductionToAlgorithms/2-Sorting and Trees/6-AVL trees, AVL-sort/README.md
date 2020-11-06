# 6-AVL trees, AVL-sort

## AVL TREE

AVL树是最早被发明的自平衡二叉查找树. 任一节点对应的两棵子树的最大高度差为1，因此它也被称为高度平衡树。由于树特征定义，我们可以计算出其高度 h 的上界 h<=1.44log(n)，也就是最坏情况下，树的高度约等于 1.44log(n).

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
	// 默认高度无节点为-1

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
  leftHeight, rightHeight := -1, -1
  
	if left != nil {
		leftHeight = left.height
	}

	if right != nil {
		rightHeight = right.height
	}

	height := max(leftHeight, rightHeight) + 1

	return height
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

查找方法和普通二分树无异; AVL树在插入节点和删除节点时要不断调整树，使其处在一个平衡状态。和二叉搜索树相比主要增加树旋转、调整。

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
func handleBF(node *Node) *Node {
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
~~~

方法: 删除节点
~~~go
func delete(node *Node, index int) *Node {
  if node == nil {
    return nil
  }

  if(node.key == index) {
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

 参考:
 - https://zhuanlan.zhihu.com/p/120352875
 - https://blog.csdn.net/Jinhua_Wei/article/details/79595507

 理解上还有疑问
