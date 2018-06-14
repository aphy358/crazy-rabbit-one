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

    // 设置状态的公共函数
    setHotelListState(state, payload){
      if(payload.t){
        state[payload.t] = payload.v
      }
    },

    // 给酒店添加额外属性，以便渲染页面，如 '价格列表'、'百分比'、'颜色字符串'
    setHotelExtraAttr(state, payload){
      if(payload.data){
        payload.hotel.priceList = payload.data
      }else{
        payload.hotel.percentage = payload.percentage
        payload.hotel.color = payload.color
      }

      // 对于对象的修改，要用 Object.assign 进行覆盖赋值
      state.hotelList = Object.assign([], state.hotelList)
    },

  },

  actions: {
    actionHotelList({ commit, state, dispatch }, payload){
      commit('setHotelListState', payload)

      if(payload.api){
        // 查酒店列表
        dispatch('queryHotelList', payload)
      }
    },

    // 查酒店列表
    async queryHotelList({ commit, state, dispatch }, payload){
      let params = {
        cityId: state.cityId,
        type: state.cityType,
        keyWords: state.cityId ? state.keywords : [state.keyword, state.keywords].join('&nbsp;').replace(/^&nbsp;|&nbsp;$/g, ''),
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

      let res_HotelList = await payload.api.hotelList.syncGetHotelList(params)

      if(res_HotelList.returnCode === 1){
        commit('setHotelListState', {t: 'hotelList', v: res_HotelList.dataList})
        commit('setHotelListState', {t: 'pageRecordCount', v: res_HotelList.data ? 0 : res_HotelList.pageRecordCount})
        commit('setHotelListState', {t: 'pageTotal', v: res_HotelList.pageTotal})
      }

      params.api = payload.api

      // 查价格列表
      dispatch('queryHotelPriceList', params)
    },

    // 查价格列表
    queryHotelPriceList({ commit, state, dispatch }, payload){
      state.hotelList.forEach(hotel => {
        let params = {
          hotelId: hotel.infoId,
          checkInDate: payload.startDate,
          checkOutDate: payload.endDate,
          roomNum: payload.selRoomNum,
          adultNum: payload.adultNum,
          childrenNum: payload.childrenNum,
          childrenAgesStr: payload.childrenAgesStr,
          isSearchSurcharge: 0
        }

        dispatch('queryPriceListInStock', {params: params, hotel: hotel, api: payload.api})
        dispatch('queryPriceList', {params: params, hotel: hotel, api: payload.api})
      })
    },

    // 查缓存内的价格
    async queryPriceListInStock({ commit, state, dispatch }, payload){
      let res = await payload.api.hotelList.syncGetHotelPriceListInStock(payload.params)

      // 如果实查的价格比缓存的价格更早返回前端，则不再将缓存的价格赋值给相关变量
      if(res.returnCode === 1 && !payload.hotel.priceList){
        commit('setHotelExtraAttr', {hotel: payload.hotel, data: res.data})
      }
    },

    // 查价，实查
    async queryPriceList({ commit, state, dispatch }, payload){
      let hotel = payload.hotel
      let timer1, timer2, timer3
      let percentage = 1
      let c1 = 255, c2 = 45, c3 = 0

      commit('setHotelExtraAttr', {hotel: hotel, percentage: percentage, color: `rgba(${c1}, ${c2}, ${c3}, 0.7)`})

      // 前面 80% 的部分，每一个百分比耗时 35 毫秒
      timer1 = setInterval(() => {
        percentage = hotel.percentage + 1
        c1 = parseInt(255 - percentage * 2.2)
        c2 = parseInt(45 + percentage * 1.38)
        c3 = parseInt(percentage * 0.35)

        commit('setHotelExtraAttr', {hotel: hotel, percentage: percentage, color: `rgba(${c1}, ${c2}, ${c3}, 0.7)`})

        if(percentage >= 80){
          clearInterval(timer1)

          // 80% ~ 95% 的部分，每一个百分比耗时 333 毫秒
          timer2 = setInterval(() => {
            percentage = hotel.percentage + 1
            c1 = parseInt(255 - percentage * 2.2)
            c2 = parseInt(45 + percentage * 1.38)
            c3 = parseInt(percentage * 0.35)

            commit('setHotelExtraAttr', {hotel: hotel, percentage: percentage, color: `rgba(${c1}, ${c2}, ${c3}, 0.7)`})
            
            if(percentage >= 95){
              clearInterval(timer2)

              // 95% ~ 99% 的部分，每一个百分比耗时 1250 毫秒
              timer3 = setInterval(() => {
                percentage = hotel.percentage + 1
                c1 = parseInt(255 - percentage * 2.2)
                c2 = parseInt(45 + percentage * 1.38)
                c3 = parseInt(percentage * 0.35)

                commit('setHotelExtraAttr', {hotel: hotel, percentage: percentage, color: `rgba(${c1}, ${c2}, ${c3}, 0.7)`})

                if(percentage >= 99){
                  clearInterval(timer3)
                }
              }, 1250)
            }
          }, 333)
        }
      }, 35)
    
      let res = await payload.api.hotelList.syncGetHotelPriceList(payload.params)
      commit('setHotelExtraAttr', {hotel: hotel, data: res.data})

      clearInterval(timer1)
      clearInterval(timer2)
      clearInterval(timer3)

      commit('setHotelExtraAttr', {hotel: hotel, percentage: 100, color: `rgba(35, 183, 35, 0.7)`})

      setTimeout(() => {
        commit('setHotelExtraAttr', {hotel: hotel, percentage: 0, color: `rgba(35, 183, 35, 0.7)`})
      }, 300)
    },

    setCityType({ commit, state, dispatch }, payload){
      commit('setCityType', payload.cityType)
      commit('resetFilters')
      dispatch('actionHotelList', { api: payload.api })
    },
  },
  
}