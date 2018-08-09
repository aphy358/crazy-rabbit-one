import { expect } from 'chai'
import {
  twoSum,
  bigNumSum,
  sort1
} from '@/utils/algorigthm'


describe('测试 algorigthm.js', () => {

  it('给定一个数组，一个目标值，从数组中找出两个元素相加正好等于该目标值，并 return 这俩个元素的下表', () => {
    let nums = [2, 7, 11, 15]

    expect( twoSum(nums, 9) ).to.deep.equal([0, 1])
    expect( twoSum(nums, 18) ).to.deep.equal([1, 2])
    expect( twoSum(nums, 17) ).to.deep.equal([0, 3])
    expect( twoSum(nums, 27) ).to.deep.equal([])
  })


  it('实现两个大数相加', () => {
    expect( bigNumSum('811111111111111111111111111111', '211111111111111111111111111111') ).to.equal('1022222222222222222222222222222')
    expect( bigNumSum('111111111111111111111111111111', '111111111111111111111111111111') ).to.equal('222222222222222222222222222222')
  })
  
  it('冒泡排序', () => {
    expect( sort1([5, 4, 9, 0, 11, 234, 100, 99, 112]) ).to.deep.equal([0, 4, 5, 9, 11, 99, 100, 112, 234])
  })

})
