import { expect } from 'chai'
import { createTest, destroyVM } from '../../util';
import Pagination from '@/components/Pagination.vue'


describe('components 目录下的 Pagination.vue', () => {
  let vm;
  afterEach(() => {
    destroyVM(vm);
  });

  it('Pagination page === "hotelList"', (done) => {
    vm = createTest(Pagination, {
      pageNow: 1,
      pageTotal: 5
    }, true);

    expect(vm.$el.querySelector('.number.active').textContent).to.equal('1')

    vm.$el.querySelectorAll('.number')[4].click()

    setTimeout(() => {
      expect(vm.$el.querySelector('.number.active').textContent).to.equal('5')
      done()
    }, 1500)
  })

  it('Pagination page === "hotelList"', () => {
    vm = createTest(Pagination, {
      pageNow: 2,
      pageTotal: 5
    }, true);

    expect(vm.$el.querySelector('.number.active').textContent).to.equal('2')
  })
})
