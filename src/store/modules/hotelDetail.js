import { addDays } from "../../util.js"
import API from "../../api"
import { log } from "util";

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

  getters: {
    // 将酒店数据进行初步加工
    getHotelInfo(state){
      let o = state.hotelInfo

      if(o){
        // 设置酒店图片
        o.picList = o.picList || [];
        let picArr = o.picSrc.split('|');
        if(!o.picList.length)	o.picList = picArr;
        o.picSrc = picArr[0];
        
        if(o.picSrc.indexOf('nopic.png') != -1){
          o.picSrc = o.picSrc.replace(/\/common\/images\/nopic.png/, 'https://qnb.oss-cn-shenzhen.aliyuncs.com/real_1514016068416.png')
          o.extraStyle = 'height: 100%;width: auto;margin-left: 60px;'
          o.extraStyle2 = 'height: 100%;width: auto;margin-left: 26px;'
        }

        for (let i = 0; i < o.picList.length; i++) {
          let pic = o.picList[i];
          if(pic.indexOf('nopic.png') != -1){
            pic.replace(/\/common\/images\/nopic.png/, 'https://qnb.oss-cn-shenzhen.aliyuncs.com/real_1514016068416.png')
          }
        }
      }

      return o
    }
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
    queryHotelInfo({ commit, state, dispatch }, payload){
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
      
      API.hotelDetail.syncGetHotelsInfo(params).then(res => {
        if(res.returnCode === 1){
          commit('setHotelDetailState', {t: 'hotelInfo', v: res.dataList[0]})
        }else if(res.returnCode === -400001){
        }
      })

    },

    // 查询酒店价格
    queryHotelPriceList({ commit, state, dispatch }, payload){

    }
  },
}