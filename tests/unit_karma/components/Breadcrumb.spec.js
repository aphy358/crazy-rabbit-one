import { expect } from 'chai'
import { createTest, destroyVM } from '../../util';
import Breadcrumb from '@/components/Breadcrumb.vue'


describe('components 目录下的 Breadcrumb.vue', () => {
  let vm;
  afterEach(() => {
    destroyVM(vm);
  });

  it('getCityType', () => {
    vm = createTest(Breadcrumb, {
      hotelName: '阳光酒店',
      cityTypeText: '国内'
    }, true);

    expect(vm.$el.querySelector('.top-nav-inner').textContent).to.include('国内酒店')
    expect(vm.$el.querySelector('.hotel-name').textContent).to.equal('阳光酒店')
  })
})
