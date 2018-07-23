import { expect } from 'chai'
import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import home from '@/store/modules/home'
import Header from '@/layout/header.vue'

import { addDays } from "@/util.js"
import { _setCommonState } from "@/store/util.js"

import Vue from 'vue'
import api from "@/api"
Vue.use(api)

const localVue = createLocalVue()

localVue.use(Vuex)

describe('layout 目录下的 header.vue', () => {

  let state
  let store

  beforeEach(() => {
    state = {
      user: null,   // 当前用户

      cityType: '0',
      roomNum: '1',
      adultNum: '2',
      childrenNum: '0',
      childrenStr: '',
      checkin: addDays(new Date),
      checkout: addDays(new Date, 1),

      showLoginDialog: false,     // 是否显示登录框
    }

    store = new Vuex.Store({
      state: state,
      modules: {
        home
      }
    })

  })

  it('方法', () => {
    const wrapper = shallowMount(Header, { store, localVue })
    // wrapper.find('.i-t-n-user-wrap').trigger('click')
    
  })
})
