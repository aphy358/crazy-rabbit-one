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

Date.prototype.Format=function(fmt){var o={"M+":this.getMonth()+1,"d+":this.getDate(),"h+":this.getHours(),"m+":this.getMinutes(),"s+":this.getSeconds(),"q+":Math.floor((this.getMonth()+3)/3),"S":this.getMilliseconds()};if(/(y+)/.test(fmt)){fmt=fmt.replace(RegExp.$1,(this.getFullYear()+"").substr(4-RegExp.$1.length))}for(var k in o){if(new RegExp("("+k+")").test(fmt)){fmt=fmt.replace(RegExp.$1,(RegExp.$1.length==1)?(o[k]):(("00"+o[k]).substr((""+o[k]).length)))}}return fmt};


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
      },
      mutations: {
        // 设置状态的公共函数
        setCommonState(state, payload){
          _setCommonState(state, payload)
        },
      }
    })

  })

  it('方法', (done) => {
    const wrapper = shallowMount(Header, { store, localVue })

    wrapper.find('.i-t-n-user-wrap').trigger('click')

    // wrapper.vm.$nextTick(() => {
    //   done()
    // })

    done()
  })

})
