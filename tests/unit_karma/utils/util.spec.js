import { expect } from 'chai'
import { isIE, addDays, queryString, formatOne, deepCopy, throttle, debounce } from '@/utils/util'


describe('测试 util.js', () => {

  it('isIE 方法', () => {
    expect(isIE()).to.be.false
  })

  it('addDays 方法', () => {
    let d1 = '2018-01-01'

    expect(addDays(d1)).to.be.a('string')

    expect(addDays(d1)).to.include('-')
    expect(addDays(d1, 0, '/')).to.include('/')

    expect(addDays('2018/01/99')).to.equal('NaN-aN-aN')
    expect(addDays('20189199')).to.equal('NaN-aN-aN')

    expect(addDays(d1, 1)).to.equal('2018-01-02')
    expect(addDays(d1, -1)).to.equal('2017-12-31')
    expect(addDays(d1, -1, '/')).to.equal('2017/12/31')
  })


  it('queryString 方法', () => {
    
    expect(queryString('checkin', "checkin=2018-07-23")).to.equal('2018-07-23')
    expect(queryString('checkin', "?checkin=2018-07-23")).to.be.null

    expect(queryString('pageId')).to.be.null
  })


  it('formatOne 方法', () => {
    expect(formatOne('2017/12/31')).to.equal('2017-12-31')
  })


  it('deepCopy 方法', () => {
    expect(deepCopy('2017/12/31')).to.equal('2017/12/31')

    expect(deepCopy([1, [3, 4]])).to.deep.equal([1, [3, 4]])
    expect(deepCopy([1, {name: 'ho'}])).to.deep.equal([1, {name: 'ho'}])

    let p = [
      {name: 'joker'},
      {age: 12, list: [{age: 87}]},
      'string'
    ]
    let c = deepCopy(p)
    expect(c).to.deep.equal(p)

    p[2] = 'dddf'
    expect(c).not.to.deep.equal(p)

  })


  it('throttle 方法', (done) => {
    let counter = 1
    let func = function(added){
      added = added || 0
      counter += added
    }
    
    throttle(func, 1)
    throttle(func, 9)
    throttle(func, 2)

    setTimeout(() => {
      expect(counter).to.equal(3)
      throttle(func, 5)

      setTimeout(() => {
        expect(counter).to.equal(8)
        done()
      }, 300)
    }, 300)
  })


  it('debounce 方法', (done) => {
    let counter = 1
    let func = function(added){
      added = added || 0
      counter += added
    }
    
    debounce(func)(1)
    debounce(func)(9)
    debounce(func)(2)

    setTimeout(() => {
      expect(counter).to.equal(3)
      debounce(func)(5)

      setTimeout(() => {
        expect(counter).to.equal(8)
        done()
      }, 300)
    }, 300)
  })
})


