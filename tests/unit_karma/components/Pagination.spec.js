import { expect } from 'chai'
import { createTest, destroyVM } from '../../util';
import Pagination from '@/components/Pagination.vue'


describe('components 目录下的 Pagination.vue', () => {
  let vm;
  afterEach(() => {
    destroyVM(vm);
  });

  it('checkedStar page === "hotelList"', () => {
    vm = createTest(Pagination, {
      pageNow: 1,
      pageTotal: 5
    }, true);

    expect(vm.$el.querySelector('.number.active').textContent).to.equal('1')
  })

  it('checkedStar page === "hotelList"', () => {
    vm = createTest(Pagination, {
      pageNow: 2,
      pageTotal: 5
    }, true);

    expect(vm.$el.querySelector('.number.active').textContent).to.equal('2')
  })
})
