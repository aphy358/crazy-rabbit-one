import { addDays } from "../../util.js"
import _queryHotelPriceList from "../util.js"
import API from '../../api'
import Velocity from 'velocity-animate'

export default {
  namespaced: true,

  state: {
    cityType: '2',
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

        if(!o.minPriceText){
          o.minPriceText = (o.minPrice && o.minPrice != '0')
            ? `￥<span class="hli-lowest-price" style="font-size: 26px;margin: 0 2px;">${parseInt(o.minPrice)}</span>起`
            : '正在查询最优价...'
        }
      })

      return state.hotelList
    }
  },

  mutations: {
    // 页面跳转初始化 state
    copyState(state, newState){
      for (const key in newState) {
        if (newState.hasOwnProperty(key)) {
          state[key] = newState[key]
        }
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
        payload.hotel.priceList = payload.data.data
        if(payload.data.returnCode === 1){
          payload.hotel.minPriceText = payload.data.data.priceMin
            ? `￥<span class="hli-lowest-price" style="font-size: 26px;margin: 0 2px;">${parseInt(payload.data.data.priceMin)}</span>起`
            : `满房`
        }else if(payload.data.returnCode === -400001){
        }else{
          payload.hotel.minPriceText = payload.data.errinfo
        }
      }else{
        payload.hotel.percentage = payload.percentage
        payload.hotel.color = payload.color
      }

      // 对于对象的修改，要用 Object.assign 进行覆盖赋值
      state.hotelList = Object.assign([], state.hotelList)
    },

  },

  actions: {
    // 一般是先改变查询条件，然后再触发查询酒店列表
    actionHotelList({ commit, state, dispatch }, payload){
      commit('setHotelListState', payload)

      if(payload.api){
        // 查酒店列表
        dispatch('queryHotelList', payload)
      }
    },

    // 查酒店列表
    queryHotelList({ commit, state, dispatch }, payload){
      let params = {
        cityId:           state.cityId,
        type:             state.cityType,
        keyWords:         state.cityId ? state.keywords : [state.keyword, state.keywords].join('&nbsp;').replace(/^&nbsp;|&nbsp;$/g, ''),
        startDate:        state.checkin,
        endDate:          state.checkout,
        selRoomNum:       state.roomNum,
        adultNum:         state.adultNum,
        childrenNum:      state.childrenNum,
        childrenAgesStr:  state.childrenStr,
        pageNow:          state.pageNow,
        star:             state.checkedStar.map(n => n.split('_')[0]).join(','),
        priceRange:       state.checkedPriceRange.split('_')[0],
        bizCircleId:      state.checkedBizzone.map(n => n.split('_')[0]).join(','),
        zoneId:           state.checkedZone.map(n => n.split('_')[0]).join(','),
        hotelFacility:    state.checkedFacilities.map(n => n.split('_')[0]).join(','),
        hotelGroup:       state.checkedHotelGroup1.concat(state.checkedHotelGroup2).map(n => n.split('_')[0]).join(','),
      }

      API.hotelList.syncGetHotelList(params).then(res => {
        if(res.returnCode === 1){
          commit('setHotelListState', {t: 'hotelList', v: res.dataList})
          commit('setHotelListState', {t: 'pageRecordCount', v: res.data ? 0 : res.pageRecordCount})
          commit('setHotelListState', {t: 'pageTotal', v: res.pageTotal})
        }
  
        // 查价格列表
        dispatch('queryHotelPriceList', params)
      })

      // 重新查询酒店列表后，触发页面滚动到顶部
      dispatch('scrollTop')
    },

    // 滚动到页面顶部
    scrollTop(){
      let elem = document.querySelector('.index-top-nav')
      let container = document.querySelector('.el-scrollbar__wrap')
      if(elem && container){
        let fixTop = document.querySelector('.search-line-outer.fix-top')
        fixTop
          ? Velocity(elem, 'scroll', {container: container, offset: '205px'})
          : Velocity(elem, 'scroll', {container: container})
        
        Velocity(elem, 'finish')
      }
    },

    // 查价格列表
    queryHotelPriceList({ commit, state, dispatch }, payload){
      state.hotelList.forEach(hotel => {
        _queryHotelPriceList({ commit, state, dispatch }, payload, hotel)
      })
    },

    // 切换城市类型，改变城市类型后需要重置前端过滤条件，然后是重新查询酒店列表
    setCityType({ commit, state, dispatch }, payload){
      commit('setCityType', payload.cityType)
      commit('resetFilters')
      dispatch('actionHotelList', { api: API })
    },
  },
  
}