import { addDays } from "../../util.js"
import { _queryHotelPriceList, _setCommonState } from "../util.js"
import API from "../../api"

export default {
  namespaced: true,

  state: {
    hotelId: '',

    hotel: null,

    priceRange1: '',
    priceRange2: '',

    onlyCanBook: false,
    checkedCancelType: false,
    checkedConfirmType: [],
    checkedExtraService: [],

    // 经过前端筛选之后的价格条数
    combinedRows: [],
  },

  getters: {
    // 将酒店数据进行初步加工
    getHotelInfo(state){
      let o = state.hotel

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
    },

    getHotelPriceList(state){
      return state.hotel && state.hotel.priceList
    }
  },

  mutations: {
    // 设置状态的公共函数
    setCommonState(state, payload){
      _setCommonState(state, payload)
    },

    // 清空 hotel 下的 priceList 属性
    removeAttrPriceList(state){
      if(state.hotel){
        state.hotel.priceList = null
      }
    },

    // 给酒店添加额外属性，以便渲染页面，如 '价格列表'、'百分比'、'颜色字符串'
    setHotelExtraAttr(state, payload){
      if(payload.data){
        payload.hotel.priceList = payload.data.data
        // if(payload.data.returnCode === 1){
        // }else if(payload.data.returnCode === -400001){
        // }
      }else{
        payload.hotel.percentage = payload.percentage
        payload.hotel.color = payload.color
      }

      // 对于对象的修改，要用 Object.assign 进行覆盖赋值
      state.hotel = Object.assign({}, payload.hotel)
    }
  },

  actions: {
    // 查酒店信息
    queryHotelInfo({ commit, state, dispatch, rootState }){
      let	params = {
				'infoIds':          state.hotelId,
				"type":             rootState.cityType,
        "startDate":        rootState.checkin,
        "endDate":          rootState.checkout,
        "selRoomNum":       rootState.roomNum,
        "adultNum":         rootState.adultNum,
        "childrenNum":      rootState.childrenNum,
        "childrenAgesStr":  rootState.childrenStr,
        "pageNow":          1
      }
      
      API.hotelDetail.syncGetHotelsInfo(params).then(res => {
        if(res.returnCode === 1){
          commit('setCommonState', {t: 'hotel', v: res.dataList[0]})
          dispatch('queryHotelPriceList')
        }else if(res.returnCode === -400001){
        }
      })

    },

    // 查询酒店价格
    queryHotelPriceList({ commit, state, dispatch, rootState }){
      // 先清空 priceList 属性，这样才能触发视图重新渲染
      commit('removeAttrPriceList')

      let params = {
        startDate:          rootState.checkin,
        endDate:            rootState.checkout,
        selRoomNum:         rootState.roomNum,
        adultNum:           rootState.adultNum,
        childrenNum:        rootState.childrenNum,
        childrenAgesStr:    rootState.childrenStr,
        isSearchSurcharge:  state.checkedExtraService.length ? 1 : 0
      }
      
      _queryHotelPriceList({ commit, state, dispatch }, params, state.hotel)
    }
  },
}