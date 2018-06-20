import { addDays } from "../../util.js"

export default {
  namespaced: true,

  state: {
    cityType: '0',
    cityId: '',
    roomNum: '1',
    adultNum: '2',
    childrenNum: '0',
    childrenStr: '',
    checkin: addDays(new Date),
    checkout: addDays(new Date, 1),

    confirmType: [],
    cancelType: [],
  },

  mutations: {
    // 页面跳转初始化 state
    initState(state, newState){
      for (const key in newState) {
        if (state.hasOwnProperty(key)) {
          state[key] = newState[key]
        }
      }
    },
  },

  actions: {

  },
}