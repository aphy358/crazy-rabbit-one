import Vue from 'vue'
import Vuex from 'vuex'

// 引入各个子模块
import hotelList from './modules/hotelList'
import hotelDetail from './modules/hotelDetail'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {

  },
  actions: {

  },
  modules: {
    hotelList,
    hotelDetail
  },
})
