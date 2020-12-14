# 19.Dynamic programming I: Memoization, Fibonacci, Shortest Paths, Guessing

- Powerful algorithmic design technique
- Large class of seemingly exponential problems have a polynomial solution (“only”)
via DP
- Particularly for optimization problems (min / max) (e.g., shortest paths)

DP 相当于 "careful brute force" 
DP = recursion + "re-use"
找出 subproblem缓存并重复利用

### Fibonacci 详解
普通做法是递归, 时间复杂度是指数级 <T(n) = T(n-1) + T(n-2) + O(1)>

~~~go
func fibNaive(n int) int {

	if n == 1 || n == 0 {
		return n
	}

	return fibNaive[n-1] + fibNaive[n-2]
}
~~~

Memoization 优化, 缓存计算过的结果, 时间复杂度可以接近O(n)
~~~go
var memo = map[int]int{0: 1, 1: 1}

func fibMemo(n int) int {
  val, ok := memo[n]
	if ok{
    return val
  } else {
    return fibMemo(n-1) + fibMemo(n-2)
  }
}
~~~

Bottom-up DP Algorithm + memo
~~~go
func fibDP(n int) int {
	
	if n == 1 || n == 2 {
		return 1
  }
  
  var fib = map[int]int{1: 1, 2: 1}

	for i := 3; i <= n; i++ {
		fib[i] = fib[i-1] + fib[i-2]
	}

	return fib[n]
}
~~~

其他: 可以用矩阵方法或者二叉细分的方式，将时间复杂度降低到O(logn)

### Shortest Paths(Guessing)

#### Memoization做法, 略

#### bellman ford 优化(guessing on indegree edges)

DAGS: O(VE) 

infinite time on 循环图, 只能作用在有向无环图, 想作用在有环图可以通过增加layer的方法, 路径前进一步, 就得多增加一层



