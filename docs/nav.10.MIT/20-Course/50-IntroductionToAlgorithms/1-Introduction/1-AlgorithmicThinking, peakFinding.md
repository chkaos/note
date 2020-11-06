# 1 Algorithmic thinking, peak Finding

## Peak Finding

#### One dimensional peak finder
可参考 leetcode 162. Find Peak Element, 输入时数字数组， 输出是“峰值”

~~~
Input: nums = [1,2,1,3,5,6,4]
Output: 1 or 5 
Explanation: Your function can return either index number 1 where the peak element is 2, or index number 5 where the peak element is 6.
~~~

1. 最直接的暴力循环方法
~~~go
func findPeakElement(nums []int) int {
    n:=len(nums)
    // 只有一个元素不满足条件 返回0
    if n==1{
        return 0
    }
    // 数组大于1时，最后一个元素大于倒数第二个元素直接返回
    if n>1&&nums[n-2]<nums[n-1]{
        return n-1
    }
    // 暴力循环部分 复杂度为 O(n)
    for i:=0;i<len(nums)-2;i++{
        if i==0{
            if nums[i+1]<nums[i]{
                return i
            }
        }
        if nums[i]<nums[i+1]&&nums[i+1]>nums[i+2]{
            return i+1
        }
    }
    return 0
}
~~~

2. 二分法

~~~go
func binaryFindPeakElement(nums []int) int {
	n := len(nums)
	// 只有一个元素不满足条件 返回0
	if n <= 1 {
		return 0
	}
	// 数组大于1时，最后一个元素大于倒数第二个元素直接返回
	if n > 1 && nums[0] > nums[1] {
		return nums[0]
	}
	// 数组大于1时，最后一个元素大于倒数第二个元素直接返回
	if n > 1 && nums[n-2] < nums[n-1] {
		return nums[n-1]
	}
	// 递归二分查找 复杂度 O(lg n)
	return findPeakUtil(nums, 0, n-1)
}

// A binary search based function
// that returns index of a peak element
func findPeakUtil(arr []int, low, high int) int {

	// Find index of middle element (low + high)/2
	mid := int(math.Floor(float64((low + high) / 2)))

	// Compare middle element with its neighbours (if neighbours exist)
	if arr[mid-1] <= arr[mid] && arr[mid+1] <= arr[mid] {
		return arr[mid]
		// If middle element is not peak and its left neighbour is greater  than it, then left half must have a peak element
	} else if arr[mid-1] > arr[mid] {
		return findPeakUtil(arr, low, mid-1)
		// If middle element is not peak and its right neighbour is greater than it, then right half must have a peak element
	} else {
		return findPeakUtil(arr, mid+1, high)
	}
}
~~~

#### 2D peak finder
2D版本是1D的升级, 输入由单一数组变为矩阵(二维数组), "peak"定义的比较对象也从左右邻值拓展为上下左右.

Examples:
~~~
Input : 10 20 15
        21 30 14
        7  16 32 
Output : 30
30 is a peak element because all its neighbors are smaller or equal to it. 32 can also be picked as a peak.

Input : 10 7
        11 17
Output : 17
~~~

1. Greedy Ascent Algorithm 暴力破解(略, 复杂度为O(nm))

2. 
~~~go
func twoDimensionPeakFinder(matrix [][]int) int {
	rows := len(matrix)
	if rows == 0 {
		return 0
	}
	columns := len(matrix[0])

	if columns == 0 {
		return 0
	}

	mid := int(math.Floor(float64(columns / 2)))

	return twoDimensionPeakHelper(matrix, rows, columns, mid)
}

func findMax(matrix [][]int, row, mid int) (max, maxIndex int) {
	for i := 0; i < row; i++ {
		if matrix[i][mid] > max {
			max = matrix[i][mid]
			maxIndex = i
		}
	}
	return
}

func twoDimensionPeakHelper(matrix [][]int, rows, columns, mid int) int {
	max, maxIndex := findMax(matrix, rows, mid)

	// If we are on the first or last column,  max is a peak
	if mid == 0 || mid == columns-1 {
		return max
	}
	// If mid column maximum is also peak
	if max >= matrix[maxIndex][mid-1] && max >= matrix[maxIndex][mid+1] {
		return max
	}
	// If max is less than its left
	if max < matrix[maxIndex-1][mid] {
		return twoDimensionPeakHelper(matrix, rows, columns, int(float64(mid)-math.Ceil(float64(mid)/2)))
	}
	// If max is less than its right
	return twoDimensionPeakHelper(matrix, rows, columns, int(float64(mid)+math.Ceil(float64(mid)/2)))
}
~~~
时间复杂度为O(nlogm)

更多相关解法可参考[ProblemSet1]()

#### 渐进复杂度
渐进时间复杂度（asymptotic time complexity）就是当n趋于无穷大的时候，f(n) 得到的极限值。 可以理解为：我们通过计算得出一个算法的运行时间T(n), 与T(n)同数量级的即幂次最高的O(F(n))即为这个算法的时间复杂度。

可以参考 https://goa.lenggirl.com/basic/dregee.html, 解释了几种渐进符号的含义.
