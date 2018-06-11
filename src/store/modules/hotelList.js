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

    // 设置城市类型，如：'国内'、'港澳台'、'国外'
    setCityType(state, cityType){
      state.cityType = cityType

      state.keyword = ''
      state.cityId = ''
      state.roomNum = '1'
      state.adultNum = '2'
      state.childrenNum = '0'
      state.childrenStr = ''

      state.checkedPriceRange = ''
      state.checkedStar = []
      state.checkedConfirmType = []
      state.checkedCancelType = []
      state.checkedZone = []
      state.checkedBizzone = []
      state.checkedHotelGroup1 = []
      state.checkedHotelGroup2 = []
			state.checkedFacilities = []

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
    setKeyword(state, keyword){
      state.keyword = keyword
    },
    
    // 设置城市 id
    setCityId(state, cityId){
      state.cityId = cityId
    },

    // 设置入离日期
    setDate(state, dateRange){
      state.checkin = addDays(dateRange[0])
      state.checkout = addDays(dateRange[1])
    },

    setZone(state, checkedZone){
      state.checkedZone = checkedZone
    },

    setBizzone(state, checkedBizzone){
      state.checkedBizzone = checkedBizzone
    },

    setPriceRange(state, checkedPriceRange){
      state.checkedPriceRange = checkedPriceRange
    },

    setStar(state, checkedStar){
      state.checkedStar = checkedStar
    },

    setHotelGroup1(state, checkedHotelGroup1){
      state.checkedHotelGroup1 = checkedHotelGroup1
    },

    setHotelGroup2(state, checkedHotelGroup2){
      state.checkedHotelGroup2 = checkedHotelGroup2
    },

    setFacilities(state, checkedFacilities){
      state.checkedFacilities = checkedFacilities
    },

    setConfirmType(state, checkedConfirmType){
      state.checkedConfirmType = checkedConfirmType
    },

    setCancelType(state, checkedCancelType){
      state.checkedCancelType = checkedCancelType
    },

  },

  actions: {
    setZone({ commit, state }, checkedZone){
      commit('setZone', checkedZone)
    },

    setBizzone({ commit, state }, checkedBizzone){
      commit('setBizzone', checkedBizzone)
    },

    setPriceRange({ commit, state }, checkedPriceRange){
      commit('setPriceRange', checkedPriceRange)
    },

    setStar({ commit, state }, checkedStar){
      commit('setStar', checkedStar)
    },

    setHotelGroup1({ commit, state }, checkedHotelGroup1){
      commit('setHotelGroup1', checkedHotelGroup1)
    },

    setHotelGroup2({ commit, state }, checkedHotelGroup2){
      commit('setHotelGroup2', checkedHotelGroup2)
    },

    setFacilities({ commit, state }, checkedFacilities){
      commit('setFacilities', checkedFacilities)
    },

    setConfirmType({ commit, state }, checkedConfirmType){
      commit('setConfirmType', checkedConfirmType)
    },

    setCancelType({ commit, state }, checkedCancelType){
      commit('setCancelType', checkedCancelType)
    },
    
  },
}