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

  beforeEach(() => {
    
  })

  // it('header vue组件', (done) => {
  //   const wrapper = shallowMount(Header, { store, localVue })
    
  //   wrapper.find('.i-t-n-user-wrap').trigger('click')
  //   expect(store.state.showLoginDialog).to.be.true

  //   done()
  // })


  it('header vue组件', () => {
    const wrapper = shallowMount(Header, { store, localVue })
    
    wrapper.find('.i-t-n-user-wrap').trigger('click')
    expect(store.state.showLoginDialog).to.be(true)

  })

})
