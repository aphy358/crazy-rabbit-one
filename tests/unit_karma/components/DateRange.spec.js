import { expect } from 'chai'
import { mount, createLocalVue } from '@vue/test-utils'
import { addDays } from '@/utils/util'


import DateRange from '@/components/DateRange.vue'

import store from '@/store'
import Vuex from 'vuex'
import api from "@/api"
import ElementUI from 'element-ui'
const localVue = createLocalVue()
localVue.use(api)
localVue.use(ElementUI)
localVue.use(Vuex)


describe('components 目录下的 DateRange.vue', () => {

  let wrapper
  let vm

  before(() => {
    wrapper = mount(DateRange , 
      { 
        store, 
        localVue,
        
      })
    vm = wrapper.vm
  });


  it('DateRange 日历初始化', () => {
    let today = new Date()
    expect(store.state.checkin).to.equal(addDays(today, 0))
    expect(store.state.checkout).to.equal(addDays(today, 1))
  })


  it('DateRange 日历初始日期', () => {
    
    let _input = wrapper.find('.el-range-input')
    _input.trigger('click')

    setTimeout(() => {
      let startDate = document.querySelector('.start-date')
      let endDate = document.querySelector('.end-date')
      let textContent1 = parseInt(startDate.textContent)
      let textContent2 = parseInt(endDate.textContent)
      let today = new Date()
      let nextDay = new Date(addDays(today, 1))
      let day1 = today.getDate()
      let day2 = nextDay.getDate()

      expect( textContent1 ).to.equal(day1)
      expect( textContent2 ).to.equal(day2)
    }, 500)
    
    
  })
  

})
