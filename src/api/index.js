import * as hotelList from './hotelList'
import * as hotelDetail from './hotelDetail'
import * as home from './home'

const api = {
  hotelList,
  hotelDetail,
  home
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
