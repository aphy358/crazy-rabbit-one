import { expect } from 'chai'
import { mount, createLocalVue } from '@vue/test-utils'

import LoginBox from '@/components/LoginBox.vue'
import ElementUI from 'element-ui'
import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)


const localVue = createLocalVue();
localVue.use(ElementUI);
localVue.use(Router);

describe('登录框组件', () => {
  const wrapper = mount(LoginBox,{
    sync : true,
    localVue
  });
  
  // it('必填验证', () => {
  //   wrapper.vm.accountCode = '';
  //   wrapper.find('#loginIn').trigger('click');
  //   expect(wrapper.vm.errinfo).to.equal('* 企业编号不能为空')
  // })
})