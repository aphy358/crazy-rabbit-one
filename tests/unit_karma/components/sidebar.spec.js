import { expect } from 'chai'
import ElementUI from 'element-ui'
import { mount, createLocalVue  } from '@vue/test-utils'
import Sidebar from '@/components/Sidebar.vue'
import api from '@/api'

const localVue = createLocalVue();

localVue.use(ElementUI)
localVue.use(api)

describe('公共组件-侧边栏', () => {
  const wrapper = mount(Sidebar,{
    // sync : true,
    localVue
  });
  
  before(() => {
    api.common.syncCheckcode().then(res => {
      let params = {
        accountCode: 'sz2747',
        username: 'fenghan',
        password: '1',
        checkcode: '8998',
        rememberMe: false
      };
      
      api.common.syncLogin(params).then(res => { })
    });
  });
  
  
  it('加载关注版面', () => {
    expect(wrapper.vm.isShowConcern).to.equal(false);
    
    setTimeout(() => {
      wrapper.find('.gz').trigger('click');
      wrapper.vm.$nextTick(() => {
        expect(wrapper.vm.isShowConcern).to.equal(true);
      })
      // done()
    }, 1500)
    
  });
  
  it('收起关注版面', () => {
    
    setTimeout(() => {
      wrapper.find('.gz').trigger('click');

      expect(wrapper.vm.isShowConcern).to.equal(true);
      //收起关注版面
      wrapper.find('.sidebar-gz-icon-hide').trigger('click');
      
      wrapper.vm.$nextTick(() => {
        expect(wrapper.vm.isShowConcern).to.equal(false);
      })

      // done()
    }, 1500)
    
  });
  
  it('点击遮罩层收起关注版面', () => {
    
    setTimeout(() => {
      wrapper.find('.gz').trigger('click');

      expect(wrapper.vm.isShowConcern).to.equal(true);
      //收起关注版面
      wrapper.find('.sidebar-gz-mask').trigger('click');
      
      wrapper.vm.$nextTick(() => {
        expect(wrapper.vm.isShowConcern).to.equal(false);
      })

      // done()

    }, 1500)
  });
  
  // it('回到顶部', () => {
  //   console.log(wrapper.find('.el-scrollbar__thumb'));
  //   wrapper.find('.to-top').trigger('click');
  //
  //   const top = wrapper.find('.el-scrollbar__thumb').attributes().style;
  //   console.log(top);
  //
  //   expect(top).to.have.string('transform: translateY(0%)')
  // });
  
});