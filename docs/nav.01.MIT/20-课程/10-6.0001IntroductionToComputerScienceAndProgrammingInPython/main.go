package main

import (
	"fmt"
	"math"
)

func linearSearchOnSortedList(target int, sortedList []int) bool {
	for _, item := range sortedList {
		if item == target {
			return true
		}
		if item > target {
			return false
		}
	}
	return false
}

// 二分查找
func binarySearch(e int, L []int) bool {

	if len(L) == 0 {
		return false
	} else {
		return binaryHelper(e, L, 0, len(L)-1)
	}
}

func binaryHelper(e int, L []int, low, high int) bool {
	if high == low {
		return L[high] == e
	}
	mid := int(math.Floor(float64((low + high) / 2)))
	if L[mid] == e {
		return true
	} else if L[mid] > e {
		if mid == low {
			return false
		}
		return binaryHelper(e, L, low, mid-1)

	} else {
		return binaryHelper(e, L, mid+1, high)
	}
}

// 选择排序
func selSearch(L []int) (res []int) {
	while len(L) > 0 {

	}

	return res
}

func main() {
	bool := binarySearch(3, []int{1, 2, 3, 4, 5, 7})
	fmt.Println(bool)
}
