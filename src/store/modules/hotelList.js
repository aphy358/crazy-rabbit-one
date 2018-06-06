import { addDays } from "../../util.js"

export default {
  namespaced: true,
  state: {
    cityType: '0',
    keyword: '',
    roomNum: '1',
    cityId: '',
    adultNum: '2',
    childrenNum: '0',
    childrenStr: '',
    checkin: addDays(new Date),
    checkout: addDays(new Date, 1),
  },
  mutations: {
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
    
  },
  actions: {

  },
}