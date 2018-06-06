export default {
  namespaced: true,
  state: {
    cityType: '0',
    roomNum: '1',
    adultNum: '2',
    childrenNum: '0',
    childrenStr: ''
  },
  mutations: {
    // 设置城市类型，如：'国内'、'港澳台'、'国外'
    setCityType(state, cityType){
      state.cityType = cityType
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
  },
  actions: {

  },
}