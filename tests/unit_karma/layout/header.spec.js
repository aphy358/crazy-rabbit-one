import { expect } from 'chai'
import { mount, createLocalVue } from '@vue/test-utils'

import Header from '@/layout/header.vue'

import store from '@/store'
import Vuex from 'vuex'
import api from "@/api"
import ElementUI from 'element-ui'
const localVue = createLocalVue()
localVue.use(api)
localVue.use(ElementUI)
localVue.use(Vuex)

describe('layout 目录下的 header.vue', () => {
  
  before(() => {
  });
  
  it("点击了 '您好，请登录'", () => {
    let wrapper = mount(Header, { localVue, store })
    expect(wrapper.vm.$data.showConfirmLogoutDialog).to.be.false
    
    // 点击了 '您好，请登录'，1、弹出登录框；2、index-top-nav 含有 high-zindex 类
    wrapper.find('.i-t-n-user-wrap').trigger('click')
    expect( store.state.showLoginDialog ).to.be.true
    expect( wrapper.find('.index-top-nav.high-zindex') ).not.to.be.null
  })
  
  
  it("关闭登录框", () => {
    let wrapper = mount(Header, { localVue, store })
    let loginBox = wrapper.vm.$children[0]
    
    loginBox.$emit('close')
    expect( store.state.showLoginDialog ).to.be.false
  })
  
  
  it('登录', (done) => {
    api.common.syncCheckcode().then(res => {
      let params = {
        accountCode: 'sz2747',
        username: 'fenghan',
        password: '1',
        checkcode: '8998',
        rememberMe: false
      };
      
      api.common.syncLogin(params).then(res => {
      })

    })
    done()

  })
  
  
  it('登录后的状态', () => {
    let wrapper = mount(Header, { localVue, store })
    
    setTimeout(() => {
      if(wrapper.vm.user){
        expect( wrapper.vm.user.loginName ).to.equal('fenghan')
        
        wrapper.find('.log-out-btn').trigger('click')
        let confirm = wrapper.vm.$children[0]
        
        confirm.$emit('close')
        expect( wrapper.vm.showConfirmLogoutDialog ).to.be.false
      }
    }, 1900)
  })
  
})