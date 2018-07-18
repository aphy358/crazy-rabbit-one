import { _setCommonState } from "../util.js"
// import API from "../../api"

export default {
  namespaced: true,

  state: {
    keyword: '',
    cityId: '',

    hotelId: '',

    priceRange: [0, 3000],

    checkedStar: [],

    checkedConfirmType: false
  },

  getters: {
  },

  mutations: {
    // 重置所有查询条件
    resetQueryParams(state){
      state.keyword = ''
      state.cityId = ''
    },


    // 设置状态的公共函数
    setCommonState(state, payload){
      _setCommonState(state, payload)
    },

  },

  actions: {
    
  },
}