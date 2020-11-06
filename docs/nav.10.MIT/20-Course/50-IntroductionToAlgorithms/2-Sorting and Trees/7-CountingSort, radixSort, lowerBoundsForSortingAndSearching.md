# 7 CountingSort, radixSort, lowerBounds for SortingAndSearching

## Linear-Time Sorting 偏论证的理论

### Lower bounds for sorting

A lower bound for a problem is the worst-case running time of the best possible algorithm for that problem. To prove a lower bound of Ω(n lg n) for sorting, we would have to prove that no algorithm, however smart, could possibly be faster, in the worst-case, then n lg n.

基于比较输入元素大小的排序算法称为比较排序 (Comparison sort)

课本用了决策树模型证明 The lower bound for Comparison based sorting algorithm (Merge Sort, Heap Sort, Quick-Sort .. etc) is Ω(nLogn), i.e., they cannot do better than nLogn. 
证明过程略

### 计数排序 Counting Sort

计数排序是一个非基于比较的排序算法，该算法于1954年由 Harold H. Seward 提出。它的优势在于在对一定范围内的整数排序时，它的复杂度为Ο(n+k)（其中k是整数的范围），快于任何比较排序算法。 [1]  当然这是一种牺牲空间换取时间的做法，而且当O(k)>O(n*log(n))的时候其效率反而不如基于比较的排序（基于比较的排序的时间复杂度在理论上的下限是O(n*log(n)), 如归并排序，堆排序）

~~~javascript
// js 实现
Array.prototype.countSort = function() {
  const C = []
  for(let i = 0; i < this.length; i++) {
    const j = this[i]
    C[j] >= 1 ? C[j] ++ : (C[j] = 1)
  }
  const D = []
  for(let j = 0; j < C.length; j++) {
    if(C[j]) {
      while(C[j] > 0) {
        D.push(j)
        C[j]--
      }
    }
  }
  return D
}
const arr = [11, 9, 6, 8, 1, 3, 5, 1, 1, 0, 100]
console.log(arr.countSort())
~~~

### 基数排序 Radix Sort(bucket sort)

基数排序是一种非比较型整数排序算法，其原理是将整数按位数切割成不同的数字，然后按每个位数分别比较。由于整数也可以表达字符串和特定格式的浮点数，所以基数排序也不是只能使用于整数。

基数排序的时间复杂度是 O(k*n)，其中 n是排序元素个数，k是数字位数。注意这不是说这个时间复杂度一定优于 O(nlogn)，k的大小取决于数字位的选择（比如比特位数），和待排序数据所属数据类型的全集的大小； k 决定了进行多少轮处理，而 n是每轮处理的操作数目。

![radix]("~@assets/50/radix.sort")

~~~go
//获取数组的最大值
func maxValue(arr []int) (ret int) {
    ret = 1 
    var key int = 10
    for i := 0; i < len(arr); i++ {
        for arr[i] >= key {
            key = key * 10
            ret++
        }
    }
    return
}

func radixSort(arr []int) {
    key := maxValue(arr)
    tmp := make([]int, len(arr), len(arr))
    count := new([10]int)
    radix := 1
    var i, j, k int
    for i = 0; i < key; i++ { //进行key次排序
        for j = 0; j < 10; j++ {
            count[j] = 0
        }
        for j = 0; j < len(arr); j++ {
            k = (arr[j] / radix) % 10
            count[k]++
        }
        for j = 1; j < 10; j++ { //将tmp中的为准依次分配给每个桶
            count[j] = count[j-1] + count[j]
        }
        for j = len(arr) - 1; j >= 0; j-- {
            k = (arr[j] / radix) % 10
            tmp[count[k]-1] = arr[j]
            count[k]--
        }
        for j = 0; j <len(arr); j++ {
            arr[j] = tmp[j]
        }
        radix = radix * 10
    }
}
~~~

### 附加:桶排序
~~~go
func sortInBucket(bucket []int) {//此处实现插入排序方式，其实可以用任意其他排序方式
    length := len(bucket)
    if length == 1 {return}
    for i := 1; i < length; i++ {
        backup := bucket[i]
        j := i -1;
        //将选出的被排数比较后插入左边有序区
        for  j >= 0 && backup < bucket[j] {//注意j >= 0必须在前边，否则会数组越界
            bucket[j+1] = bucket[j]//移动有序数组
            j -- //反向移动下标
        }
        bucket[j + 1] = backup //插队插入移动后的空位
    }
}
//获取数组最大值
func getMaxInArr(arr []int) int{
    max := arr[0]
    for i := 1; i < len(arr); i++ {
        if arr[i] > max{ max = arr[i]}
    }
    return max
}
//桶排序
func BucketSort(arr []int) []int {
    //桶数
    num := len(arr)
    //k（数组最大值）
    max := getMaxInArr(arr)
    //二维切片
    buckets := make([][]int, num)
    //分配入桶
    index := 0
    for i := 0; i < num; i++ {
        index = arr[i] * (num-1) /max//分配桶index = value * (n-1) /k
        buckets[index] = append(buckets[index], arr[i])
    }
    //桶内排序
    tmpPos := 0
    for i := 0; i < num; i++ {
        bucketLen := len(buckets[i])
        if bucketLen > 0{
            sortInBucket(buckets[i])
            copy(arr[tmpPos:], buckets[i])
            tmpPos += bucketLen
        }
    }
    return arr
}
~~~

怎么称一个排序算法是"稳定?
相同输入值的顺序, 输出的时候他们之间顺位不会改变.
