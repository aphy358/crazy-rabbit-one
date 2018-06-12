import { addDays } from "../../util.js"

export default {
  namespaced: true,

  state: {
    cityType: '0',
    keyword: '',
    keywords: '',
    cityId: '',
    roomNum: '1',
    adultNum: '2',
    childrenNum: '0',
    childrenStr: '',
    checkin: addDays(new Date),
    checkout: addDays(new Date, 1),

    pageNow: '1',
    pageTotal: '1',
    pageRecordCount: '0',
    hotelList: [],

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
    },
    
    // 将酒店数据进行初步加工
    getHotelList(state){
      state.hotelList.forEach((o, i) => {
        if(o.picSrc.indexOf('nopic.png') != -1){
          o.picSrc = o.picSrc.replace(/\/common\/images\/nopic.png/, 'https://qnb.oss-cn-shenzhen.aliyuncs.com/real_1514016068416.png')
          o.extraStyle = 'height: 100%;width: auto;margin-left: 60px;'
        }
      })

      return state.hotelList
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

    // 设置入离日期
    setDate(state, dateRange){
      state.checkin = addDays(dateRange[0])
      state.checkout = addDays(dateRange[1])
    },

    setHotelListState(state, payload){
      if(payload.t){
        state[payload.t] = payload.v
      }
    }

  },

  actions: {
    async actionHotelList({ commit, state }, payload){
      commit('setHotelListState', payload)

      if(payload.api){
        let params = {
          cityId: state.cityId,
          type: state.cityType,
          keyWords: state.cityType ? state.keywords : [state.keyword, state.keywords].join('&nbsp;').replace(/^&nbsp;|&nbsp;$/g, ''),
          startDate: state.checkin,
          endDate: state.checkout,
          selRoomNum: state.roomNum,
          adultNum: state.adultNum,
          childrenNum: state.childrenNum,
          childrenAgesStr: state.childrenStr,
          pageNow: state.pageNow,
          star: state.checkedStar.map(n => n.split('_')[0]).join(','),
          priceRange: state.checkedPriceRange.split('_')[0],
          bizCircleId: state.checkedBizzone.map(n => n.split('_')[0]).join(','),
          zoneId: state.checkedZone.map(n => n.split('_')[0]).join(','),
          hotelFacility: state.checkedFacilities.map(n => n.split('_')[0]).join(','),
          hotelGroup: state.checkedHotelGroup1.concat(state.checkedHotelGroup2).map(n => n.split('_')[0]).join(','),
        }
        console.log(params);
        

        let res_HotelList = await payload.api.hotelList.syncGetHotelList(params);

        if(res_HotelList.returnCode === 1){
          commit('setHotelListState', {t: 'hotelList', v: res_HotelList.dataList})
          commit('setHotelListState', {t: 'pageRecordCount', v: res_HotelList.data ? 0 : res_HotelList.pageRecordCount})
          commit('setHotelListState', {t: 'pageTotal', v: res_HotelList.pageTotal})
        }

      }
    },

    setCityType({ commit, state, dispatch }, payload){
      commit('setCityType', payload.cityType)
      commit('resetFilters')
      dispatch('actionHotelList', { api: payload.api })
    },
  },
  
}