import { _setCommonState } from "../util.js"
import { queryString } from '../../util.js'
import API from '../../api'

export default {
  namespaced: true,
  
  state : {
    checkin : '',
    checkout : '',
    roomNum : '',
    dateNum : 1,
    stock : 7,
    maxPersonNum : 1,
    
    breakfastData : {},
    breakfastDates : [],
    bedData : {},
    bedDates : [],
    netData : {},
    netDates : []
  },
  
  
  mutations : {
    
    // 设置状态的公共函数
    setCommonState(state, payload){
      _setCommonState(state, payload)
    },
  },
  
  
  actions : {
    //验价
    checkOrder({ commit, state, dispatch }, payload){
      // commit('setCommonState', payload)
      state.checkin = queryString("startDate");
      state.checkout = queryString("endDate");
      state.roomNum = queryString("roomNum");
  
      let hotelPriceStrsKey = queryString("hotelPriceStrsKey");
      let hotelPriceStrs    = decodeURIComponent(sessionStorage.getItem(hotelPriceStrsKey));
  
      let params = {
        staticInfoId   : queryString("staticInfoId"),
        adultNum       : queryString("adultNum"),
        hotelId        : queryString("staticInfoId"),
        supplierId     : queryString("supplierId"),
        roomId         : queryString("roomId"),
        startDate      : state.checkin,
        endDate        : state.checkout,
        paymentType    : queryString("paymentType"),
        roomNum        : state.roomNum,
        childrenNum    : queryString("childrenNum"),
        childrenAgeStr : queryString("childrenAgeStr"),
        hotelPriceStrs : hotelPriceStrs,
        isHasMarketing : queryString('isHasMarketing') || 0
      };
  
      let isHasMarketing = queryString("isHasMarketing") || 0;
  
      if(isHasMarketing === 1){
        params['marketing.marketingPrice'] = queryString('marketingPrice') || 0;
        params['marketing.startTime']      = queryString('startTime').replace(/\s+/g, ' ');
        params['marketing.endTime']        = queryString('endTime').replace(/\s+/g, ' ');
      }
  
      if (queryString("breakFastId")) params['breakFastId'] = queryString("breakFastId");
  
      if (queryString("rateType")) params['rateType'] = queryString("rateType");
      
      API.orderWrite.checkOrder(params).then(function (data) {
      })
    },
    
    //查价
    getOrderInfo({ commit, state, dispatch }, payload){
      //请求页面中用于显示信息的数据
      let hotelPriceStrsKey = queryString("hotelPriceStrsKey");
      let hotelPriceStrs    = decodeURIComponent(sessionStorage.getItem(hotelPriceStrsKey));
      let params = {
        hotelPriceStrs : hotelPriceStrs,
        childrenAgeStr : queryString('childrenAgeStr'),
        childrenNum    : queryString('childrenNum'),
        adultNum       : queryString('adultNum'),
        citytype       : queryString('citytype'),
        isQueryPrice   : queryString('isQueryPrice'),
        rateType       : queryString('rateType'),
        breakFastId    : queryString('breakFastId'),
        roomNum        : state.roomNum,
        paymentType    : queryString('paymentType'),
        hotelId        : queryString('hotelId'),
        supplierId     : queryString('supplierId'),
        startDate      : state.checkin,
        endDate        : state.checkout,
        roomId         : queryString('roomId'),
        staticInfoId   : queryString('staticInfoId'),
        isHasMarketing : queryString('isHasMarketing') || 0,
        isRoomNumChange: 0
      };
      
      if (payload && payload.k === 'changeRoomNum'){
        commit('setCommonState', payload);
  
        params.isRoomNumChange = 1;
      }
      API.orderWrite.getOrderInfo(params).then(function (data) {
        state.dateNum = data.content.dateNum;
        state.stock = data.content.stock;
        state.maxPersonNum = data.content.hotelPrice.maxPersonNum;
      })
    },
    
    /*
    * typeId 1：加早；2：加床；3：加宽带
    * */
    getExtraInfo({ commit, state, dispatch }, payload){
      let params = {
        startDate  : state.checkin,
        endDate    : state.checkout,
        infoId     : queryString('staticInfoId'),
        suppId     : queryString('supplierId'),
        roomtypeId : queryString('roomId'),
        roomNum    : state.roomNum,
        typeId     : payload['typeId']
      };
  
      API.orderWrite.getExtraInfo(params).then(function (data) {
        if (payload['typeId'] === 1){
          dispatch('setExtraData', {
            data : data.data,
            dataIndex : 'breakfastData',
            datesIndex : 'breakfastDates'
          });
        }else if (payload['typeId'] === 2){
          dispatch('setExtraData', {
            data : data.data,
            dataIndex : 'bedData',
            datesIndex : 'bedDates'
          });
        }else if (payload['typeId'] === 3){
          dispatch('setExtraData', {
            data : data.data,
            dataIndex : 'netData',
            datesIndex : 'netDates'
          });
        }
      })
    },
    
    setExtraData : function ({ commit, state, dispatch }, payload) {
      payload.data.forEach(function (v, i) {
        let key = v[0].date.split(' ')[0];
        state[payload.dataIndex][key] = v
      });
  
      for (let k in state[payload.dataIndex]) {
        state[payload.datesIndex].push({
          value: k,
          label: k
        });
      }
    }
  },
  
  getters : {
  
  }
}