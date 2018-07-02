import * as hotelList from './hotelList'
import * as hotelDetail from './hotelDetail'
import * as personalCenter from './personalCenter'
import * as home from './home'
import * as orderWrite from './orderWrite'

const api = {
  hotelList,
  hotelDetail,
	personalCenter,
  home,
  orderWrite
}

// define install for vue.use()
Object.defineProperty(api, "install", {
  configurable: false,
  enumberable: false,
  writable: false,
  value: function (Vue, options) {
    Vue.$api = api
    Vue.prototype.$api = api
  }
})

export default api
