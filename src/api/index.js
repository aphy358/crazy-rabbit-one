import * as hotelList from './hotelList'
import * as hotelDetail from './hotelDetail'

const api = {
  hotelList,
  hotelDetail,
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
