import * as hotelList from './hotelList'
import * as hotelDetail from './hotelDetail'
<<<<<<< HEAD
import * as personalCenter from './personalCenter'
=======
import * as home from './home'
>>>>>>> b763d93d27cf62e0cc4cf7c4f7bf17dfd5e7dd7b

const api = {
  hotelList,
  hotelDetail,
	personalCenter
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
