import { expect } from 'chai'
import { addDays, queryString, formatOne, deepCopy, throttle } from '@/util'

Date.prototype.Format=function(fmt){var o={"M+":this.getMonth()+1,"d+":this.getDate(),"h+":this.getHours(),"m+":this.getMinutes(),"s+":this.getSeconds(),"q+":Math.floor((this.getMonth()+3)/3),"S":this.getMilliseconds()};if(/(y+)/.test(fmt)){fmt=fmt.replace(RegExp.$1,(this.getFullYear()+"").substr(4-RegExp.$1.length))}for(var k in o){if(new RegExp("("+k+")").test(fmt)){fmt=fmt.replace(RegExp.$1,(RegExp.$1.length==1)?(o[k]):(("00"+o[k]).substr((""+o[k]).length)))}}return fmt};

describe('根目录下的 util.js', () => {
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


  it('throttle 方法', () => {
  })
})


