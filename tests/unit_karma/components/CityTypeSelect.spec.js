import { expect } from 'chai'
import { createTest, destroyVM } from '../../util';
import CityTypeSelect from '@/components/CityTypeSelect.vue'


describe('components 目录下的 CityTypeSelect.vue', () => {
  let vm;
  afterEach(() => {
    destroyVM(vm);
  });

  it('getCityType', () => {
    vm = createTest(CityTypeSelect, {}, true);

    expect(vm.getCityType).to.equal('0')
    vm.$el.querySelectorAll('.el-select-dropdown__item')[1].click()
    expect(vm.getCityType).to.equal('2')

    vm.$el.querySelectorAll('.el-select-dropdown__item')[2].click()
    expect(vm.getCityType).to.equal('3')

    vm.$el.querySelectorAll('.el-select-dropdown__item')[0].click()
    expect(vm.getCityType).to.equal('0')
  })
})
