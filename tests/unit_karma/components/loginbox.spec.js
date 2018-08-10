import { expect } from 'chai'
import { mount, createLocalVue } from '@vue/test-utils'

import LoginBox from '@/components/LoginBox.vue'
import ElementUI from 'element-ui'
import Router from 'vue-router'


const localVue = createLocalVue();
localVue.use(ElementUI);
localVue.use(Router);

const router = new Router();

describe('登录框组件', () => {
  const wrapper = mount(LoginBox, {
    localVue,
    router
  });
  
  it('企业编号必填验证', () => {
    wrapper.find('#loginIn').trigger('click');
    expect(wrapper.vm.errinfo).to.equal('* 企业编号不能为空')
  });
  
  it('用户名必填验证', () => {
    wrapper.vm.accountCode = 'dzxz53';
    wrapper.find('#loginIn').trigger('click');
    expect(wrapper.vm.errinfo).to.equal('* 用户名不能为空')
  });
  
  it('密码必填验证', () => {
    wrapper.vm.accountCode = 'hdsh456';
    wrapper.vm.username = 'hshuj';
    wrapper.find('#loginIn').trigger('click');
    expect(wrapper.vm.errinfo).to.equal('* 密码不能为空')
  });
  
  it('验证码必填验证', () => {
    wrapper.vm.accountCode = 'gs3465';
    wrapper.vm.username = 'gshuse';
    wrapper.vm.password = 'yu';
    wrapper.find('#loginIn').trigger('click');
    expect(wrapper.vm.errinfo).to.equal('* 验证码不能为空')
  });
});