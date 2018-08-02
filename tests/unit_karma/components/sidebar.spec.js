import { expect } from 'chai'
import Vue from 'vue'
import ElementUI from 'element-ui'
import { mount, createLocalVue  } from '@vue/test-utils'
import Sidebar from '@/components/Sidebar.vue'
import api from '@/api'
import Router from 'vue-router'
import Vuex from 'vuex'

const localVue = createLocalVue();
Vue.use(api)
Vue.use(ElementUI)

localVue.use(Router)
localVue.use(Vuex)

describe('公共组件-侧边栏', () => {
  
  before(() => {
    api.common.syncCheckcode().then(res => {
      
      let params = {
        accountCode: 'cz135178',
        username: 'huangqian',
        password: '1',
        checkcode: '8998',
        rememberMe: false
      };
      
      api.common.syncLogin(params).then(res => {
      
      }).catch(error => {
      
      })
    }).catch(error => {
    
    });
    
  });
  
  
  it('加载关注版面', (done) => {
    const wrapper = mount(Sidebar,{
      sync : true,
      localVue
    });
    expect(wrapper.vm.isShowConcern).to.equal(false);
    wrapper.find('.gz').trigger('click');
    
    wrapper.vm.$nextTick(() => {
      expect(wrapper.vm.isShowConcern).to.equal(true);
      done()
      // console.log(wrapper.vm.isShowConcern);
      //关注与取消关注事件
      // wrapper.find('.sidebar-gz-icon').trigger('click', {
      //   1 : 1
      // });
      //
      // wrapper.vm.$nextTick(() => {
      //
      //   expect(wrapper.vm.heartList['1']).to.equal(0)
      // });
      
      
    })
  });
  it('收起关注版面', (done) => {
    const wrapper = mount(Sidebar,{
      sync : true,
      localVue
    });
    wrapper.find('.gz').trigger('click');
    
    wrapper.vm.$nextTick(() => {
      expect(wrapper.vm.isShowConcern).to.equal(true);
      //收起关注版面
      wrapper.find('.sidebar-gz-icon-hide').trigger('click');
      // expect(wrapper.vm.isShowConcern).to.equal('fsgasghg');
      
      wrapper.vm.$nextTick(() => {
        expect(wrapper.vm.isShowConcern).to.equal(false)
  
        // expect(wrapper.vm.isShowConcern).to.equal('fjaskhs')
        done()
      })
      
      done()
    })
  })
});