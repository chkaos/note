package main

import (
	"fmt"
	"math"
)

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
func selectionSort(L []int) {
	var n = len(L)
	for i := 0; i < n; i++ {
		var minIdx = i
		for j := i + 1; j < n; j++ {
			if L[j] < L[minIdx] {
				minIdx = j
			}
		}
		L[i], L[minIdx] = L[minIdx], L[i]
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

// 快速排序
// 快速排序使用分治法（Divide and conquer）策略来把一个序列（list）分为较小和较大的2个子序列，然后递归地排序两个子序列。

// 步骤为：

// 挑选基准值：从数列中挑出一个元素，称为“基准”（pivot），
// 分割：重新排序数列，所有比基准值小的元素摆放在基准前面，所有比基准值大的元素摆在基准后面（与基准值相等的数可以到任何一边）。在这个分割结束之后，对基准值的排序就已经完成，
// 递归排序子序列：递归地将小于基准值元素的子序列和大于基准值元素的子序列排序。
// 递归到最底部的判断条件是数列的大小是零或一，此时该数列显然已经有序。

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

func quickSort2(L []int, low, high int) {
	var n = len(L)

	if n <= 1 {
		return
	}

	if low >= high {
		return
	}

	pivot := getPivot(L, low, high)

	left, right := partition(L, pivot, low, high)

	quickSort2(L, low, left-1)
	quickSort2(L, right+1, high)

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
	return L[high]
}

func partition(L []int, pivot, low, high int) (left, right int) {
	left = low
	right = high

	for i := low; i < high; i++ {
		for left >= right {
			if L[i] < pivot {
				swap()
				left++
			} else if L[i] >= pivot {
				swap()
				right--
			}
		}
	}

	return
}

func main() {
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
	arr2 := []int{1, 2, 3, 4, 5, 7}
	quickSort2(arr2, 0, len(arr2)-1)
}
