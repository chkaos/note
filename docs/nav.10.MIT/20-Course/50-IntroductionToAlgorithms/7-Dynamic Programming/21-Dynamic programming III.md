# 21.Dynamic programming III: parenthesization, edit distance, knapsack

动态规划 字符串类问题(useful problems for strings/sequences)
- suffixes 后缀       O(n)
- prefixes 前缀       O(n)
- substrings 子字符串  O(n^2)

### parenthesization 
示例: 矩阵相乘如何分配乘法

### [edit distance](https://leetcode.com/problems/edit-distance/) 72. Edit Distance hard
Given two strings x & y, what is the cheapest possible sequence of character edits (insert c, delete c, replace c → c’) to transform x into y?
示例: spelling correction, DNA片段比较

~~~go
// 速度稍慢, 空间少
func min(a, b int) int {
	if a > b {
		return b
	} else {
		return a
	}
}

func minDistance(word1 string, word2 string) int {
	if len(word2) < len(word1) {
		word1, word2 = word2, word1
	}

	dp := make([]int, len(word2)+1)
	for i := 0; i <= len(word2); i++ {
		dp[i] = i
	}
	for i := 1; i <= len(word1); i++ {
		ndp := make([]int, len(word2)+1)
		ndp[0] = i
		for j := 1; j <= len(word2); j++ {
			c := 1
			if word1[i-1] == word2[j-1] {
				c = 0
			}
			ndp[j] = min(
				dp[j-1]+c,
				min(dp[j], ndp[j-1])+1,
			)
		}
		dp = ndp
	}
	return dp[len(word2)]
}
~~~

~~~go
// 速度稍快, 空间多, 解释性强
func minDistance(word1 string, word2 string) int {
    l1 := len(word1)
    l2 := len(word2)
    memo := make([][]int, l1)
    for i := range memo {
        memo[i] = make([]int, l2)
    }
    return subMinDist(word1, 0, word2, 0, memo)
}

func subMinDist(word1 string, idx1 int, word2 string, idx2 int, memo [][]int) int {
    if idx1 >= len(word1) {
        return len(word2) - idx2
    }
    
    if idx2 >= len(word2) {
        return len(word1) - idx1
    }

    if memo[idx1][idx2] > 0 {
        return memo[idx1][idx2]
    }

    if word1[idx1] == word2[idx2] {
        r := subMinDist(word1, idx1+1, word2, idx2+1, memo)
        memo[idx1][idx2] = r
        return r
    }

    replace := subMinDist(word1, idx1+1, word2, idx2+1, memo) + 1
    add := subMinDist(word1, idx1, word2, idx2+1, memo) + 1
    del := subMinDist(word1, idx1+1, word2, idx2, memo) + 1
    r := min(replace, min(add, del))
    memo[idx1][idx2] = r
    return r
}

func min(a, b int) int {
    if a < b {
        return a
    }
    return b
}
~~~

### longest common subsequence 最长相同子片段
~~~go
func longestCommonSubsequence(text1 string, text2 string) int {
    l1 := len(text1)
    l2 := len(text2)

    memo := make([][]int, l1 + 1)
    for i := range memo {
        memo[i] = make([]int, l2 + 1)
    }

    // for i := 0; i <= l1; i++ {
    //   for j := 0; j <= l2; j++ {
    //     if i == 0 || j == 0 {
    //       memo[i][j] = 0
    //     } else if text1[i-1] == text2[j-1]{
    //       memo[i][j] = memo[i-1][j-1]+1
    //     } else {
    //       memo[i][j] = max(memo[i-1][j] , memo[i][j-1]) 
    //     }
    //   }
    // }

    for i := 1; i <= l1; i++ {
      
      for j := 1; j <= l2; j++ {
        if text1[i-1] == text2[j-1]{
          memo[i][j] = memo[i-1][j-1]+1
        } else {
          memo[i][j] = max(memo[i-1][j] , memo[i][j-1]) 
        }
      }
    }

    return memo[l1][l2] 
}

func max(a, b int) int {
    if a < b {
        return b
    }
    return a
}
~~~

### knapsack
是一种组合优化的NP完全问题。问题可以描述为：给定一组物品，每种物品都有自己的重量和价格，在限定的总重量内，我们如何选择，才能使得物品的总价格最高。问题的名称来源于如何选择最合适的物品放置于给定背包中。

相似问题经常出现在商业、组合数学，计算复杂性理论、密码学和应用数学等领域中。

也可以将背包问题描述为决定性问题，即在总重量不超过W的前提下，总价值是否能达到V。