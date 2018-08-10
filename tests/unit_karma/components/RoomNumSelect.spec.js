import { expect } from 'chai'
import { createTest, destroyVM } from '../../util';
import RoomNumSelect from '@/components/RoomNumSelect.vue'


describe('components 目录下的 RoomNumSelect.vue', () => {
  let vm;
  afterEach(() => {
    destroyVM(vm);
  });

  it('getRoomNum page === "hotelList"', () => {
    vm = createTest(RoomNumSelect, {
      page: 'hotelList',
    }, true);

    expect(vm.getRoomNum).to.equal('1')
    vm.$el.querySelectorAll('.el-select-dropdown__item')[1].click()
    expect(vm.getRoomNum).to.equal('2')
  })
})
