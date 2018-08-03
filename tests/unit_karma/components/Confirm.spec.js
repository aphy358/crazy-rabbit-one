import { expect } from 'chai'
import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import store from '@/store'
import ElementUI from 'element-ui'


import Vue from 'vue'
import api from "@/api"
Vue.use(api)
Vue.use(ElementUI)

import Confirm from '@/components/Confirm.vue'

const localVue = createLocalVue()
localVue.use(Vuex)


describe('components 目录下的 Confirm.vue', () => {

  let wrapper
  let vm

  before(() => {
    wrapper = shallowMount(Confirm , { store, localVue })
    vm = wrapper.vm
  });

  it('Confirm 的一些测试', () => {
    // , { store, localVue }
    console.log(wrapper)

  })
  
})
