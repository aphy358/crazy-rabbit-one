import { expect } from 'chai'
import { createTest, destroyVM } from '../../util';
import StarSelect from '@/components/StarSelect.vue'


describe('components 目录下的 StarSelect.vue', () => {
  let vm;
  afterEach(() => {
    destroyVM(vm);
  });

  it('checkedStar page === "hotelList"', () => {
    vm = createTest(StarSelect, {
      page: 'hotelList',
    }, true);

    expect(vm.$store.state.hotelList.checkedStar).to.deep.equal([])

    vm.$el.querySelectorAll('.el-select-dropdown__list li')[0].click()
    expect(vm.$store.state.hotelList.checkedStar).to.deep.equal(['10,15,20,25_二星级及以下/经济'])

    vm.$el.querySelectorAll('.el-select-dropdown__list li')[1].click()
    expect(vm.$store.state.hotelList.checkedStar).to.deep.equal(['30,35_三星级/舒适'])

    vm.$el.querySelectorAll('.el-select-dropdown__list li')[2].click()
    expect(vm.$store.state.hotelList.checkedStar).to.deep.equal(['40,45_四星级/高档'])

    vm.$el.querySelectorAll('.el-select-dropdown__list li')[3].click()
    expect(vm.$store.state.hotelList.checkedStar).to.deep.equal(['50,55_五星级/豪华'])
  })
})
