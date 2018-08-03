import { expect } from 'chai'
import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import store from '@/store'

import Header from '@/layout/header.vue'

import Vue from 'vue'
import api from "@/api"
Vue.use(api)

const localVue = createLocalVue()
localVue.use(Vuex)


describe('layout 目录下的 header.vue', () => {

  let wrapper
  let vm

  before(() => {
    wrapper = shallowMount(Header, { store, localVue })
    vm = wrapper.vm
  });

  it("点击了 '您好，请登录'", () => {
    expect(wrapper.vm.$data.showConfirmLogoutDialog).to.be.false
    
    // 点击了 '您好，请登录'，1、弹出登录框；2、index-top-nav 含有 high-zindex 类
    wrapper.find('.i-t-n-user-wrap').trigger('click')
    expect( store.state.showLoginDialog ).to.be.true
    expect( wrapper.find('.index-top-nav.high-zindex') ).not.to.be.null
  })


  it('登录', () => {
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
  })


  it('登录后的状态', () => {
    setTimeout(() => {
      expect( vm.user.loginName ).to.equal('fenghan')
  
      wrapper.find('.i-t-n-drop .log-out-btn').trigger('click')
      expect( vm.showConfirmLogoutDialog ).to.be.true

    }, 10000)
  })

})
