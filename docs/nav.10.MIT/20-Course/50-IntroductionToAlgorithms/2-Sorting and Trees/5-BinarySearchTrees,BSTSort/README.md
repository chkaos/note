## Binary Search Trees (BST)

课程里，老师举了一个经典的问题：“跑道预留系统” 给定具体时间间隔m， 在一定时间内往时间轴上插入位置.

几种所学的数据结构 排序链表/数组, 未排序链表/数组，最小堆，字典等都有各种缺陷， 总结起来就是需要“Need fast insertion into sorted list”, 引出了二分查找树这个数据结构。

二叉查找树，也称为二叉搜索树、有序二叉树或排序二叉树，是指一棵空树或者具有下列性质的二叉树： 若任意节点的左子树不空，则左子树上所有节点的值均小于它的根节点的值； 若任意节点的右子树不空，则右子树上所有节点的值均大于或等于它的根节点的值； 任意节点的左、右子树也分别为二叉查找树.

![bst]("~@assets/50/bst.png")

先来定义节点和二分查找树的结构体
~~~go
type Node struct {
  key   int
  parent *Node
	left  *Node //left
	right *Node //right
}

// BinarySearchTree the binary search tree of Items
type BinarySearchTree struct {
    root *Node
    lock sync.RWMutex
}
~~~

方法:插入节点 - 从根节点从上而下搜索, 若key大于节点值大且无右子节点则插入其右子节点，反之相同
~~~go
// Insert inserts the Int t in the tree
func (bst *BinarySearchTree) Insert(key int) {
	bst.lock.Lock()
	defer bst.lock.Unlock()
	n := &Node{key, nil, nil, nil}
	if bst.root == nil {
		bst.root = n
	} else {
		insertNode(bst.root, n)
	}
}

// internal function to find the correct place for a node in a tree
func insertNode(node, newNode *Node) {
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

方法:查找节点 - 从根节点从上而下搜索, 若key大于节点值大则往右，反之往左
~~~go
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
~~~

方法: 查找最小值 - 从根节点开始一直往左
~~~go
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
~~~

方法: 查找下一个较大值
~~~go
// FindLarger returns the Int with a next larger value stored in the tree
func (bst *BinarySearchTree) FindLarger(x *Node) *Node {
	bst.lock.RLock()
  defer bst.lock.RUnlock()
  // 如果节点右子节点不为nil, 直接以右子节为起点查找最小值直接返回
	if x.right != nil {
		return minimum(x.right)
  }

  y := x.parent

	for {
    // 如果父节点不为空且 目标节点为 右节点则一直循环 目标节点的父节点无右子节点的情况 为止
    // 目标节点的父节点没有右节点则证明下一个较大值就是其父节点本身
		if y != nil && y.right == x{
      x = y
      y = y.parent
		}
  }
  
  return y
}
~~~

All operations are O(h) where h is height of the BST
以上操作的时间复杂度为O(h), h 为 BST树的高度, 树越平衡复杂度越接近O(logN), 越极端 复杂度越接近O(N) 比如按照一个排好序的数组来构建一颗树。

对节点结构体做对应调整, 可以用于统计该节点下(包括本身)有几个节点
~~~go
type Node struct {
  key   int
  parent *Node
	left  *Node
  right *Node
  count int // 新增计数
}

由于默认值为需要为 1, Go 里的原生结构体没有默认值的说法需要新增一个辅助方法
func NewNode(key int, parent, left, right *Node) Node {
  return Node{
    key: key,
    parent: parent,
    left: left,
    right: right,
    count: 1,
  }
}

func (bst *BinarySearchTree) Insert(key int) {
	bst.lock.Lock()
	defer bst.lock.Unlock()
  // n := &Node{key, nil, nil, nil}
  n := NewNode(key, nil, nil, nil)
	if bst.root == nil {
		bst.root = &n
	} else {
		insertNode(bst.root, &n)
	}
}

// 节点插入成功后一直查询父节点更新 值
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

func updateCount(node *Node) {
  parent := node.parent
  for parent != nil {
      parent.count += 1
      parent = parent.parent
  }
}
~~~

#### 遍历
二叉树的遍历主要分为两类 深度优先和广度优先，这个后面学习到了再补充。
深度优先遍历按照遍历方式不同又分为:
-	前序遍历(Pre-Order Traversal)
-	中序遍历(In-Order Traversal)
-	后序遍历(Post-Order Traversal)

只要知道中序遍历和另外任意一种遍历的结果就可以还原这颗二叉树。

今天先以递归/非递归的方式来实现中序遍历，指先访问左（右）子树，然后访问根，最后访问右（左）子树的遍历方式。代码如下：


94. Binary Tree Inorder Traversal
~~~go
// 递归方式
func inOrderTraversal(root *TreeNode) (res []int) {

    var inOrderTraversalHelper func(*TreeNode) 
    
    inOrderTraversalHelper = func(node *TreeNode) {
        if node == nil {return}
        
        inOrderTraversalHelper(node.Left)
        res = append(res, node.Val)
        inOrderTraversalHelper(node.Right)
        
    }
    
    inOrderTraversalHelper(root)
    return
}

 while(p!=NULL||!s.empty())
    {
        while(p!=NULL)
        {
            s.push(p);
            p=p->lchild;
        }
        if(!s.empty())
        {
            p=s.top();
            cout<<p->data<<"";
            s.pop();
            p=p->rchild;
        }
    }   

func inOrderTraversalIterate(root *TreeNode) (res []int) {

	stack := []*TreeNode{}

	for len(stack) > 0 || root != nil {
		if(root != nil) {
			stack = append(stack, root)
			root = root.Left
		} else {
			root = stack[len(stack) - 1]
			stack = stack[0:len(stack) - 1]
			res = append(res, root.Val)
			root = root.Right
		}
	}

	return
}
~~~

