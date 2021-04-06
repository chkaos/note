# 20.Dynamic programming II: text justification, blackjack

5 easy steps to Dynamic programming
- 定义 subproblem
- guess -> choices of guess
- relate subproblem solutions
- (递归 & Memoization) or Bottom-Up
- solve original problem

### text justification 文字对齐

leecode hard [68. Text Justification](https://leetcode.com/problems/text-justification/)

~~~go
func fullJustify(words []string, maxWidth int) (ans []string) {

	if len(words) == 1 {
		str := words[0]
		for i := 0; i < maxWidth-len(str); i++ {
			str += " "
		}
		ans = append(ans, str)
		return ans
	}

	strlen := 0
	end := 0
	for i := 0; i < len(words); i++ {
		if strlen+len(words[i]) > maxWidth {
			if end == i {
				ms := justify(words[end:i+1], maxWidth)
				ans = append(ans, ms)
				end = i + 1
				if i+1 < len(words) {
					strlen = len(words[i+1]) + 1
				}
			} else {
				ms := justify(words[end:i], maxWidth)
				ans = append(ans, ms)
				end = i
				strlen = len(words[i]) + 1
			}

			continue
		}
		strlen += len(words[i]) + 1

	}

	if end == len(words) {
		return ans
	}

	// 最后一行处理
	ms := justify(words[end:], strlen-1)
	splen := maxWidth - len(ms)
	for i := 0; i < splen; i++ {
		ms += " "
	}
	ans = append(ans, ms)
	return ans
}

func justify(words []string, maxWidth int) (str string) {
	if len(words) == 0 {
		return ""
	}

	if len(words) == 1 {
		str := words[0]
		for i := 0; i < maxWidth-len(words[0]); i++ {
			str += " "
		}
		return str
	}

	length := 0

	for i := 0; i < len(words); i++ {
		length += len(words[i])
	}

	spacelen := maxWidth - length
	var spacenumber = make([]int, len(words)-1)

	for i := 0; i < len(words)-1; i++ {
		spacenumber[i] = spacelen / (len(words) - 1)
	}
	for i := 0; i < spacelen%(len(words)-1); i++ {
		spacenumber[i]++
	}

	for i := 0; i < len(words)-1; i++ {
		str += words[i]
		for j := 0; j < spacenumber[i]; j++ {
			str += " "
		}
	}
	str += words[len(words)-1]
	return str
}
~~~
时间复杂度O(n^2)
#### parent pointers

### Perfect-Information Blackjack(二十一点)