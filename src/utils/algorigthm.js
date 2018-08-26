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

    flag = Math.floor(tmpSum / 10)
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
      if (nums[j] > nums[j + 1]) {
        let tmp = nums[j]
        nums[j] = nums[j + 1]
        nums[j + 1] = tmp
      }
    }
  }

  return nums
}


// 快速排序
export const quickSort = function (nums) {
  let sort = function(low, high) {
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
      sort(0, i - 1)  // 注意这里第一个参数是 0，而不是 low
      sort(i + 1, high)
    }
  }

  sort(0, nums.length - 1)

  return nums
}


// 快速排序
export const quickSort2 = function (nums) {
  if(nums.length <= 1)  {return nums}
  
  let midIndex = Math.floor(nums.length / 2)
  let mid = nums.splice(midIndex, 1)[0]
  let leftArr = [], rightArr = []
  
  for (let i = 0; i < nums.length; i++) {
    const n = nums[i];
    n < mid ? leftArr.push(n) : rightArr.push(n)
  }

  return quickSort2(leftArr)
          .concat(mid)
          .concat(quickSort2(rightArr))
}


// 归并排序
export const mergeSort = function(nums){
  let merge = function(left, right){
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

  let middle = Math.floor(nums.length / 2)
  let left = nums.slice(0, middle)
  let right = nums.slice(middle)

  return merge(mergeSort(left), mergeSort(right))
}


/**
 * 给定一个字符串，找出不含有重复字符的最长子串的长度。
 * 给定 "abcabcbb" ，没有重复字符的最长子串是 "abc" ，那么长度就是3。
 * 给定 "bbbbb" ，最长的子串就是 "b" ，长度是1。
 * 给定 "pwwkew" ，最长子串是 "wke" ，长度是3。请注意答案必须是一个子串，"pwke" 是 子序列  而不是子串。
 */
export const lengthOfLongestSubstring = function(str){
  let lengthArr = []      // 用于存储各个子串的长度
  let subStrArr = []      // 用于存储各个字串

  for (let i = 0; i < str.length; i++) {
    let subStr = ''

    for (let j = i; j < str.length; j++) {
      if(subStr.indexOf(str[j]) === -1){
        subStr += str[j]

        if(j == str.length - 1){
          subStrArr.push(subStr)
          lengthArr.push(subStr.length)
          break;
        }
      }else{
        subStrArr.push(subStr)
        lengthArr.push(subStr.length)
        break;
      }
    }
  }

  return Math.max.apply(this, lengthArr)
}


function maxTime(str){
  var _json = {}
  var num = 0
  var _char = ''

  for (let i = 0; i < str.length; i++) {
    const o = str[i];
    if(!_json[o]){
      _json[o] = 1
    }else{
      _json[o] = _json[o]++
    }
  }

  for (const key in _json) {
    const element = object[key];
    if(element > num){
      num = element
      _char = key
    }
  }
}
