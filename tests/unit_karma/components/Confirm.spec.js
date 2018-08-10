import { expect } from 'chai'
import { mount, createLocalVue } from '@vue/test-utils'

import Confirm from '@/components/Confirm.vue'

import store from '@/store'
import api from "@/api"
import ElementUI from 'element-ui'
const localVue = createLocalVue()
localVue.use(api)
localVue.use(ElementUI)


describe('components 目录下的 Confirm.vue', () => {

  let wrapper
  let vm

  before(() => {
    wrapper = mount(Confirm , 
      { 
        store, 
        localVue,
        slots: {
          default: 'Confirm 测试',
        }
      })
    vm = wrapper.vm
  });

  it('Confirm 的一些测试', () => {
    setTimeout(() => {
      expect(wrapper.find('.el-dialog__body').element.textContent).to.include('Confirm 测试')
      expect(vm.visible).to.be.true
    }, 500)
  })

  it('点击 "取消" 按钮，触发 "close" 事件', () => {
    setTimeout(() => {
      let btns = wrapper.findAll('button').wrappers
      btns[2].trigger('click')

      expect(wrapper.emitted()).to.have.own.property('close')
    }, 500)
  })

  it('点击 "确定" 按钮，触发 "confirm" 事件', () => {
    setTimeout(() => {
      let btns = wrapper.findAll('button').wrappers
      btns[1].trigger('click')

      expect(vm.visible).to.be.false
      expect(wrapper.emitted()).to.have.own.property('confirm')
    }, 500)
  })

})
