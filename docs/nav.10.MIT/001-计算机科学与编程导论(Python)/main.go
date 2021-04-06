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
				endPos = i
				swap(L, i, i+1)
			}
		}

		end = endPos

		for j := end; j < end; j-- {
			if L[j] > L[j-1] {
				startPos = j
				swap(L, j, j-1)
			}
		}

		start = startPos
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
	Compare func(x, y int) bool
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
	//递归
	middle := len(conf.L) / 2
	//不断地进行左右对半划分
	leftConf := MergeConf{L: conf.L[:middle], Compare: conf.Compare}
	rightConf := MergeConf{L: conf.L[middle:], Compare: conf.Compare}

	//合并
	return merge2(mergeSort2(leftConf), mergeSort2(rightConf), conf.Compare)
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

// 快速排序

// 选取基准值有数种具体方法，此选取方法对排序的时间性能有决定性影响。

// Worst-case performance	O(n2)
// Best-case performance	O(n log n) (simple partition)
// or O(n) (three-way partition and equal keys)
// Average performance	O(n log n)
// Worst-case space complexity	O(n) auxiliary (naive)
// O(log n) auxiliary (Hoare 1962)
func quickSort(L []int) (result []int) {
	var n = len(L)

	if n <= 1 {
		return L
	}

	var less, greater []int

	pivot := L[0]

	for i := 1; i < n; i++ {
		if L[i] < pivot {
			less = append(less, L[i])
		} else if L[i] >= pivot {
			greater = append(greater, L[i])
		}
	}

	return append(append(quickSort(less), pivot), quickSort(greater)...)

}

// 上面简单版本的缺点是，它需要{\displaystyle \Omega (n)}{\displaystyle \Omega (n)}的额外存储空间，也就跟归并排序一样不好。额外需要的存储器空间配置，在实际上的实现，也会极度影响速度和缓存的性能。有一个比较复杂使用原地（in-place）分割算法的版本，且在好的基准选择上，平均可以达到{\displaystyle O(\log n)}{\displaystyle O(\log n)}空间的使用复杂度。

// 且选择最左边的元素作为基准值会使已排过序的数组产生worst-case behavior this causes worst-case behavior on already sorted arrays
// Choosing a random pivot minimizes the chance that you will encounter worst-case O(n2) performance (always choosing first or last would cause worst-case performance for nearly-sorted or nearly-reverse-sorted data). Choosing the middle element would also be acceptable in the majority of cases.
// in-place version

func quickSort2(L []int, left, right int) {

	if left >= right {
		return
	}

	pivotIndex := partition(L, left, right)

	quickSort2(L, left, pivotIndex-1)
	quickSort2(L, pivotIndex+1, right)

}

func getPivot(L []int, low, high int) int {
	mid := low + (high-low)/2
	// 用low + (high - low) / 2 不用 (low + high) / 2是为了减少整数溢出的情况
	// return mid // 中数版本
	// median-of-3 method for Lomuto partition
	// The ninther, which is the "median of three medians of three" is even better for very large n.
	if L[mid] < L[low] {
		swap(L, mid, low)
	}
	if L[high] < L[low] {
		swap(L, high, low)
	}
	if L[high] < L[mid] {
		swap(L, mid, high)
	}
	return high
}

// 分段(todo 双指针版本)
func partition(L []int, left, right int) (storeIndex int) {
	pivotIndex := getPivot(L, left, right)
	pivot := L[pivotIndex]

	swap(L, pivotIndex, right) // 把pivot移到結尾

	storeIndex = left
	for i := left; i < right; i++ {

		if L[i] <= pivot {
			swap(L, storeIndex, i)
			storeIndex++
		}
	}

	swap(L, right, storeIndex) // 把pivot移到它最後的地方

	return
}

func reverseFn(a, b int) bool {
	return a < b
}

func heapSort(L []int) []int {
	size := len(L)

	// 初始化 heap，i 从最后一个父节点开始调整，直到节点均调整完毕
	for i := (size / 2) - 1; i >= 0; i-- {
		heapify(L, i, size)
	}
	// 堆排序：先将第一个元素和已拍好元素前一位作交换，再重新调整，直到排序完毕
	for i := size - 1; i > 0; i-- {
		swap(L, 0, i)
		heapify(L, 0, i)
	}

	return L
}

func heapify(L []int, start, end int) {
	// 建立父节点下标和子节点下标
	dad := start
	son := dad*2 + 1

	// 超过数组长度 不存在子节点
	if son >= end {
		return
	}

	// 优先查看右节点
	if son+1 < end && L[son] < L[son+1] {
		son++
	}

	// 交换位置后 对交换的子节点进行相同 heapify 操作
	if L[dad] <= L[son] {
		swap(L, dad, son)
		heapify(L, son, end)
	}

	return
}

// 希尔排序
func shellSort(L []int) []int {
	n := len(L)
	if n < 2 {
		return L
	}
	gap, step := findGap(n / 2)
	for gap > 0 {
		for i := gap; i < n; i++ {
			j := i
			for j >= gap && L[j] < L[j-gap] {
				swap(L, j, j-gap)
				j = j - gap
			}
		}
		step--
		gap = createGap(step)
	}

	return L
}

// 已数组长度查询最接近的增量序列 index
func findGap(num int) (gap, step int) {
	gap = 1

	for gap < num {
		step++
		gap = createGap(step)
	}

	return

}

// 根据增量序列 index 返回 gap
func createGap(n int) (gap int) {
	if n < 0 {
		return 0
	}

	if n == 1 {
		return 1
	}

	return int(math.Pow(2, float64(n+2))*(math.Pow(2, float64(n+2))-3) + 1)
}

func main() {
	input := []int{8, 1, 2, 5, 7, 8, 2, 3}
	bool := binarySearch(3, []int{1, 2, 3, 4, 5, 7})
	fmt.Println(bool)

	// conf := MergeConf{
	// 	L:       []int{1, 2, 5, 7, 8, 2, 3},
	// 	Compare: nil,
	// }

	conf := MergeConf{
		L:       []int{1, 2, 5, 7, 8, 2, 3},
		Compare: reverseFn,
	}

	arr := mergeSort2(conf)
	fmt.Println(arr)
	arr2 := []int{1, 2, 8, 4, 5, 7, 2334, 56, 1, 34, 78, 3, 4}
	// fmt.Println("quickSort1", quickSort(arr2))
	quickSort2(arr2, 0, len(arr2)-1)
	fmt.Println("quickSort2", arr2)

	insertionSort(input)
	fmt.Println("insertionSort", input)

	arr3 := []int{1, 2, 8, 4, 5, 7, 2334, 56, 1, 34, 78, 3, 4, 8, 34, 67}
	shellSort(arr3)
	fmt.Println("shellSort", arr3)
}
