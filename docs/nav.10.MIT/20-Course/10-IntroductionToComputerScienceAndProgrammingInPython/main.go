package main

import (
	"fmt"
	"math"
)

func swap(a []int, i, j int) {
	a[i], a[j] = a[j], a[i]
}

func linearSearch(target int, array []int) bool {
	for _, item := range array {
		if item == target {
			return true
		}
	}
	return false
}

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

// 二分查找返回最接近的元素index
func binarySearch(e int, L []int) (found bool) {
	n := len(L)
	if n == 0 {
		return false
	}

	if L[n-1] < e {
		return false
	}

	return binaryHelper(e, L, 0, len(L)-1)

}

func binaryHelper(e int, L []int, low, high int) (found bool) {
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

func searchInsert(nums []int, target int) int {
	l, r := 0, len(nums)-1
	for l <= r {
		mid := l + (r-l)/2
		if nums[mid] < target {
			l = mid + 1
		} else if nums[mid] > target {
			r = mid - 1
		} else {
			return mid
		}
	}
	return l
}

// 冒泡排序
func bubbleSort(L []int) {
	var n = len(L)
	for i := 0; i < n; i++ {
		for j := 0; j < n-1-i; j++ {
			if L[j] > L[j+1] {
				swap(L, j, j+1)
			}
		}
	}
}

func bubbleSort2(L []int) []int {
	start := 0
	end := len(L) - 1
	for start < end {
		var startPos, endPos int
		for i := start; i < end; i++ {
			if L[i] > L[i+1] {
				endPos := i
				swap(L, i, i+1)
			}
		}

		for j := end; j < end; j-- {
			if L[j] > L[j-1] {
				startPos := j
				swap(L, j, j-1)
			}
		}

		start := startPos
	}
	return L
}

// 选择排序
func selectionSort(L []int) {
	var n = len(L)
	for i := 0; i < n; i++ {
		var minIdx = i
		for j := i + 1; j < n; j++ {
			if L[j] < L[minIdx] {
				minIdx = j
			}
		}
		swap(L, i, minIdx)
	}
}

// 插入排序
func insertionSort(L []int) {
	var n = len(L)
	for i := 1; i < n; i++ {
		j := i
		for j > 0 {
			if L[j-1] > L[j] {
				swap(L, j-1, j)
			}
			j = j - 1
		}
	}
}

// 插入排序2
func insertionSort2(L []int) {
	var n = len(L)
	for i := 1; i < n; i++ {
		j := i
		insertIndex := searchInsert(L[:j], L[i])
		for j > insertIndex {
			swap(L, j-1, j)
			j = j - 1
		}
	}
}

// 合并排序
func mergeSort(L []int) []int {
	if len(L) <= 1 {
		return L
	}
	//递[归]
	middle := len(L) / 2
	//不断地进行左右对半划分
	left := mergeSort(L[:middle])
	right := mergeSort(L[middle:])
	//合[并]
	return merge(left, right)
}

func merge(left, right []int) (result []int) {
	l, r := 0, 0
	// 注意：[左右]对比，是指左的第一个元素，与右边的第一个元素进行对比，哪个小，就先放到结果的第一位，然后左或右取出了元素的那边的索引进行++
	for l < len(left) && r < len(right) {
		//从小到大排序.
		if left[l] > right[r] {
			result = append(result, right[r])
			//因为处理了右边的第r个元素，所以r的指针要向前移动一个单位
			r++
		} else {
			result = append(result, left[l])
			//因为处理了左边的第r个元素，所以r的指针要向前移动一个单位
			l++
		}
	}
	// 比较完后，还要分别将左，右的剩余的元素，追加到结果列的后面(不然就漏咯）。
	result = append(result, left[l:]...)
	result = append(result, right[r:]...)
	return
}

type MergeConf struct {
	L       []int
	Compare func(int, int) bool
}

func mergeSort2(conf MergeConf) []int {
	if len(conf.L) <= 1 {
		return conf.L
	}

	if conf.Compare == nil {
		conf.Compare = func(a, b int) bool {
			return a > b
		}
	}
	//递[归]
	middle := len(conf.L) / 2
	//不断地进行左右对半划分
	leftConf := MergeConf{L: conf.L[:middle], Compare: conf.Compare}
	rightConf := MergeConf{L: conf.L[middle:], Compare: conf.Compare}
	left := mergeSort2(leftConf)
	right := mergeSort2(rightConf)
	//合[并]
	return merge2(left, right, conf.Compare)
}

func merge2(left, right []int, compare func(int, int) bool) []int {
	newArr := make([]int, len(left)+len(right))
	i, j, index := 0, 0, 0
	for {
		if compare(left[i], right[j]) {
			newArr[index] = right[j]
			index++
			j++
			if j == len(right) {
				copy(newArr[index:], left[i:])
				break
			}

		} else {
			newArr[index] = left[i]
			index++
			i++
			if i == len(left) {
				copy(newArr[index:], right[j:])
				break
			}
		}
	}
	return newArr
}

func main() {
	input := []int{1, 2, 5, 7, 8, 2, 3}
	bool := binarySearch(3, []int{1, 2, 3, 4, 5, 7})
	fmt.Println(bool)

	conf := MergeConf{
		L:       []int{1, 2, 5, 7, 8, 2, 3},
		Compare: nil,
	}
	// conf := MergeConf{
	// 	L: []int{1, 2, 5, 7, 8, 2, 3},
	// 	Compare: func(a, b int) bool {
	// 		return a < b
	// 	},
	// }
	arr := mergeSort2(conf)
	fmt.Println(arr)

	insertionSort2(input)
	fmt.Println(input)
}
