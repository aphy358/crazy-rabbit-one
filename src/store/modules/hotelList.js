export default {
  namespaced: true,
  state: {
    cityType: '0',
    roomNum: '1',
  },
  mutations: {
    changeCityType(state, newCityType){
      state.cityType = newCityType
    },
    changeRoomNum(state, newRoomNum){
      state.roomNum = newRoomNum
    },
  },
  actions: {

  },
}