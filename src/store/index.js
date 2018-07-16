import Vue from 'vue'
import Vuex from 'vuex'
import { addDays } from "../util.js"
import { _queryHotelPriceList, _scrollTop, _setCommonState } from "./util.js"

// 引入各个子模块
import home from './modules/home'
import hotelList from './modules/hotelList'
import hotelDetail from './modules/hotelDetail'
import personalCenter from './modules/personalCenter'
import orderWrite from './modules/orderWrite'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    cityType: '0',
    roomNum: '1',
    adultNum: '2',
    childrenNum: '0',
    childrenStr: '',
    checkin: addDays(new Date),
    checkout: addDays(new Date, 1),

    showLoginDialog: false,     // 是否显示登录框
  },

  mutations: {
    // 重置所有查询条件
    resetQueryParams(state){
      let cityType = state.cityType

      // state.roomNum = '1'
      state.adultNum = '2'
      state.childrenNum = '0'
      state.childrenStr = ''
      state.checkin = cityType == '3' ? addDays(new Date, 1) : addDays(new Date)
      state.checkout = cityType == '3' ? addDays(new Date, 2) : addDays(new Date, 1)
    },

    // 设置城市类型，如：'国内'、'港澳台'、'国外'
    setCityType(state, cityType){
      state.cityType = cityType

      state.roomNum = '1'
      state.adultNum = '2'
      state.childrenNum = '0'
      state.childrenStr = ''

      state.checkin = cityType == 3 
        ? addDays(new Date, 1) 
        : addDays(new Date, 0)

      state.checkout = cityType == 3 
        ? addDays(new Date, 2) 
        : addDays(new Date, 1)
    },

    // 设置入离日期
    setDate(state, dateRange){
      state.checkin = addDays(dateRange[0])
      state.checkout = addDays(dateRange[1])
    },

    // 设置状态的公共函数
    setCommonState(state, payload){
      _setCommonState(state, payload)
    },
  },

  actions: {

  },

  modules: {
    home,
    hotelList,
    hotelDetail,
	  personalCenter,
    orderWrite
  },
})
