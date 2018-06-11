import { addDays } from "../../util.js"

export default {
  namespaced: true,

  state: {
    cityType: '0',
    keyword: '',
    cityId: '',
    roomNum: '1',
    adultNum: '2',
    childrenNum: '0',
    childrenStr: '',
    checkin: addDays(new Date),
    checkout: addDays(new Date, 1),
    pageNow: '1',

    checkedPriceRange: '',
    checkedStar: [],
    checkedConfirmType: [],
    checkedCancelType: [],
    checkedZone: [],
    checkedBizzone: [],
    checkedHotelGroup1: [],
    checkedHotelGroup2: [],
    checkedFacilities: [],
  },

  getters: {
    // 判断是否当前一个过滤条件都没有
    isNoFilter(state){
			return state.checkedPriceRange === '' &&
        state.checkedStar.length < 1 &&
        state.checkedConfirmType.length < 1 &&
        state.checkedCancelType.length < 1 &&
        state.checkedZone.length < 1 &&
        state.checkedBizzone.length < 1 &&
        state.checkedHotelGroup1.length < 1 &&
        state.checkedHotelGroup2.length < 1 &&
        state.checkedFacilities.length < 1
		}
  },

  mutations: {
    // 页面跳转初始化 state
    initState(state, newState){
      for (const key in newState.hotelList) {
        state[key] = newState.hotelList[key]
      }
    },

    // 重置所有高级搜索的过滤条件
    resetFilters(state){
      state.checkedPriceRange = ''
      state.checkedStar = []
      state.checkedConfirmType = []
      state.checkedCancelType = []
      state.checkedZone = []
      state.checkedBizzone = []
      state.checkedHotelGroup1 = []
      state.checkedHotelGroup2 = []
			state.checkedFacilities = []
    },

    // 设置城市类型，如：'国内'、'港澳台'、'国外'
    setCityType(state, cityType){
      state.cityType = cityType

      state.keyword = ''
      state.cityId = ''
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

    // 设置预订间数
    setRoomNum(state, roomNum){
      state.roomNum = roomNum
    },

    // 设置成人数
    setAdultNum(state, adultNum){
      state.adultNum = adultNum
    },

    // 设置小孩数
    setChildrenNum(state, childrenNum){
      state.childrenNum = childrenNum
    },

    // 设置小孩年龄字符串，如：'1,0,1'
    setChildrenStr(state, childrenStr){
      state.childrenStr = childrenStr
    },

    // 设置关键字
    // setKeyword(state, keyword){
    //   state.keyword = keyword
    // },

    // 设置入离日期
    setDate(state, dateRange){
      state.checkin = addDays(dateRange[0])
      state.checkout = addDays(dateRange[1])
    },

    setHotelListState(state, payload){
      state[payload.t] = payload.v
    }

  },

  actions: {
    actionHotelList({ commit, state }, payload){
      commit('setHotelListState', payload)
    },

    setCityType({ commit, state }, cityType){
      commit('setCityType', cityType)
      commit('resetFilters')
    },
  },
  
}