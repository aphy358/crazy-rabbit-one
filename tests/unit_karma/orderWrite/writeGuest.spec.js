import { expect } from 'chai'
import Router from 'vue-router'
import { mount, createLocalVue } from '@vue/test-utils'
import ElementUI from 'element-ui'
// import store from '@/store'
import Vuex from 'vuex'

import WriteGuest from '@/views/orderWrite/writeGuest.vue'


const localVue = createLocalVue();
localVue.use(ElementUI);
localVue.use(Router);
localVue.use(Vuex);

const router = new Router();

describe('订单填写页>入住信息', () => {
  let wrapper = null;
  
  before(() => {
    let store = new Vuex.Store({
      state: {
        orderWrite : {
          roomNum : 2,
          hotelPrice : {
            maxPersonNum : 2
          }
        }
      }
    });
  
    wrapper = mount(WriteGuest, {
      store,
      localVue,
      router,
    });
    
  })
  
  // it('同一入住人填入一项，其他项也必填', () => {
  //   wrapper.vm.modelArr['surname0'] = 'e';
  //   wrapper.find('.guest-info-box input').trigger('input');
  //   expect(wrapper.vm.error['surname0Msg']).to.equal('不能为空');
  // })
  
})