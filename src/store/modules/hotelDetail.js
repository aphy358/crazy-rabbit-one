import { addDays } from "../../util.js"
import API from "../../api"

export default {
  namespaced: true,

  state: {
    cityType: '0',
    hotelId: '',
    roomNum: '1',
    adultNum: '2',
    childrenNum: '0',
    childrenStr: '',
    checkin: addDays(new Date),
    checkout: addDays(new Date, 1),

    hotelInfo: null,

    confirmType: [],
    cancelType: [],
  },

  mutations: {
    // 设置状态的公共函数
    setHotelDetailState(state, payload){
      if(payload.t){
        state[payload.t] = payload.v
      }
    },
  },

  actions: {
    // 查酒店信息
    async getHotelInfo({ commit, state, dispatch }, payload){
      // hotelId, checkin, checkout, citytype
      let	params = {
				'infoIds': payload.hotelId,
				"type": payload.citytype,
        "startDate": payload.checkin,
        "endDate": payload.checkout,
        "selRoomNum": payload.selRoomNum || 1,
        "adultNum": payload.adultNum || 2,
        "childrenNum": payload.childrenNum || 0,
        "childrenAgesStr": payload.childrenAgesStr || '',
        "pageNow": 1
      }
      
      let res = await API.hotelDetail.syncGetHotelsInfo(params)

      if(res.returnCode === 1){
        commit('setHotelDetailState', {t: 'hotelInfo', v: res.dataList[0]})
      }else if(res.returnCode === -400001){
      }


    },
  },
}