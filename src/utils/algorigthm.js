// 给定一个数组，一个目标值，从数组中找出两个元素相加正好等于该目标值，并 return 这俩个元素的下表
export const twoSum = function (nums, target) {
  for (let i = 0; i < nums.length - 1; i++) {
    let first = nums[i]
    let second = target - first
    let restNums = nums.slice(i + 1) // splice 函数会改变原来的数组
    let index = restNums.indexOf(second)

    if (index != -1) {
      return [i, i + index + 1]
    }
  }

  return []
};


// 实现两个大数字符串相加
export const bigNumSum = function (num1, num2) {
  // console.log(num2)
  num1 = (num1 + '').split('').reverse()
  num2 = (num2 + '').split('').reverse()

  let len = Math.max(num1.length, num2.length)
  let finalArr = []
  let flag = 0 // 用于存储下一位的进位值

  for (let i = 0; i < len; i++) {
    let tmpSum = (+num1[i] || 0) + (+num2[i] || 0)
    finalArr.push(tmpSum % 10 + flag)

    flag = parseInt(tmpSum / 10)
  }

  // 如果最后一位相加大于10，则需要在最后一位补上1
  if (flag !== 0) {
    finalArr.push(flag)
  }

  return finalArr.reverse().join('')
}


// 冒泡排序
export const bubbleSort = function (nums) {
  for (let i = 0; i < nums.length - 1; i++) {
    for (let j = 0; j < nums.length - 1 - i; j++) {
      let num1 = nums[j]
      let num2 = nums[j + 1]
      let tmp

      if (num1 > num2) {
        tmp = num1
        nums[j] = nums[j + 1]
        nums[j + 1] = tmp
      }
    }
  }

  return nums
}


// 快速排序
export const quickSort = function (nums) {
  function sort(low, high) {
    let i = low,
      j = high,
      elem = nums[low]

    if (j > i) {
      for (; j > i; j--) {
        if (nums[j] < elem) {
          nums[i++] = nums[j]
          break;
        }
      }

      for (; i < j; i++) {
        if (nums[i] > elem) {
          nums[j] = nums[i]
          break;
        }
      }

      nums[i] = elem
      sort(0, i - 1)
      sort(i + 1, high)
    }
  }

  sort(0, nums.length - 1)

  return nums
}


// 归并排序
export const mergeSort = function(nums){
  function merge(left, right){
    var result = []
  
    while(left.length > 0 && right.length > 0){
      left[0] > right[0]
        ? result.push(right.shift())
        : result.push(left.shift())
    }
  
    return result.concat(left).concat(right)
  }

  if(nums.length < 2){
    return nums
  }

  let middle = parseInt(nums.length / 2)
  let left = nums.slice(0, middle)
  let right = nums.slice(middle)

  return merge(mergeSort(left), mergeSort(right))
}
