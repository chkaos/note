package main

import (
	"math"
)

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
	// 递归二分查找 复杂度 O(Logn)
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

func findMax(matrix [][]int, row, mid int) (max, maxIndex int) {
	for i := 0; i < row; i++ {
		if matrix[i][mid] > max {
			max = matrix[i][mid]
			maxIndex = i
		}
	}
	return
}

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

func main() {

}
