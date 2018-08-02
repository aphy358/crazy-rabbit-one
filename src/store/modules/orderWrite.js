import { _setCommonState } from "../util_store.js"
import { queryString } from '../../utils/util.js'
import API from '../../api'

export default {
  namespaced: true,
  
  state : {
    checkin : '',
    checkout : '',
    supplierId : '',
    roomNum : 1,
    dateNum : 1,
    stock : 7,
    roomCost : '',
    taxesAndFeesRMB : 0,
    payTotalMoney : 0,
    balance : 0,
    willUsedBalance: 0,
    
    breakfastData : {},
    breakfastDates : [],
    bedData : {},
    bedDates : [],
    netData : {},
    netDates : [],
  
    surchargeBref : [],
    surchargeBed : [],
    surchargeInternet : [],
    
    bedTotalPrice : 0,
    brefTotalPrice : 0,
    netTotalPrice : 0,
  
  
    content : {},
    distributor : {},
    hotelPrice : {},
    staticInfo : {},
    isHasMarketing : 0,
    marketing : {},
  
    specialConditions : [],
    specialReq : [],
    paymentType : 1,
  
    dialogTableVisible : false,
  
    orderInfo : {},
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
      state.checkin = queryString("startDate");
      state.checkout = queryString("endDate");
      state.roomNum = queryString("roomNum");
      state.supplierId = queryString("supplierId");
  
      let hotelPriceStrsKey = queryString("hotelPriceStrsKey");
      let hotelPriceStrs    = decodeURIComponent(sessionStorage.getItem(hotelPriceStrsKey));
  
      let params = {
        staticInfoId   : queryString("staticInfoId"),
        adultNum       : queryString("adultNum"),
        hotelId        : queryString("staticInfoId"),
        supplierId     : state.supplierId,
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
  
      if(isHasMarketing === '1'){
        params['marketing.marketingPrice'] = queryString('marketingPrice') || 0;
        params['marketing.startTime']      = queryString('startTime').replace(/\s+/g, ' ');
        params['marketing.endTime']        = queryString('endTime').replace(/\s+/g, ' ');
      }
  
      if (queryString("breakFastId")) params['breakFastId'] = queryString("breakFastId");
  
      if (queryString("rateType")) params['rateType'] = queryString("rateType");
      
      API.orderWrite.checkOrder(params).then(function (data) {
        if (typeof data === 'string') {
          data = window.JSON.parse(data);
        }
  
        if (data.success) {
          //如果有错误信息，则提示用户
          if (data.content.result !== 'success') {
            payload.$alert(data.content.errinfo, '系统提示', {
              confirmButtonText: '确定',
              callback: action => {
                payload.$router.push('hotelList')
              }
            });
          }else{
            dispatch('getOrderInfo');
          }
    
        } else {
          //用户登录状态已丢失时，提示用户
          if (data.errcode === 'notLogin') {
            payload.$alert('请先登录', '系统提示', {
              confirmButtonText: '确定',
              callback: action => {
                payload.$router.push('/')
              }
            });
          } else {
            //提示用户错误信息，然后跳转到酒店详情页面
            payload.$alert(data.errinfo, '系统提示', {
              confirmButtonText: '确定',
              callback: action => {
                payload.$router.push('hotelList')
              }
            });
          }
        }
      })
    },
    
    //查价
    getOrderInfo({ commit, state, dispatch }, payload){
      let isRoomNumChange = 0;
  
      if (payload && payload.k === 'roomNum'){
        commit('setCommonState', payload);
    
        isRoomNumChange = 1;
      }
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
        isRoomNumChange: isRoomNumChange
      };
      
      if (params.isHasMarketing === '1'){
        params['marketing.marketingPrice'] = queryString('marketingPrice');
        params['marketing.startTime'] = queryString('startTime').replace(/\s+/g, ' ');
        params['marketing.endTime'] = queryString('endTime').replace(/\s+/g, ' ');
      }
      
      API.orderWrite.getOrderInfo(params).then(function (data) {
        if (data.success === true) {
          //如果请求成功，先判断content有没有报错信息
          if (data.content.errorMsg) {
            payload.$alert(data.errinfo, '系统提示', {
              confirmButtonText: '确定',
              callback: action => {
                payload.$router.push('hotelList')
              }
            });
          }else if (data.content.hasOwnProperty('isAveragePriceRMBChange') && data.content.isAveragePriceRMBChange === 1){
            //价格有变动时提醒客户（特殊情况（查价接口没有错误信息返回，但属于提示的一种，且不是弹出框，而是确认框））
            payload.$alert('最新价格为：￥' + data.content.payTotalMoney + '，是否需要继续预订？', '系统提示', {
              confirmButtonText: '确定',
            });
          }
    
          //再判断酒店是否为客人前台现付方式，如果是，不让客户进入页面
          if (data.content.paymentType === 1) {
            payload.$alert('该产品已下线，请选择其他产品', '系统提示', {
              confirmButtonText: '确定',
              callback: action => {
                payload.$router.push('hotelList')
              }
            });
          }
  
  
          let content = data.content;
          state.content = content;
          state.hotelPrice = content.hotelPrice;
          state.distributor = content.distributor;
          state.staticInfo = content.staticInfo;
  
          state.dateNum = content.dateNum;
          state.stock = content.stock;
          state.specialConditions = content.specialReq;
          state.paymentType = content.paymentType;
          state.taxesAndFeesRMB = content.taxesAndFeesRMB;
          state.payTotalMoney = content.payTotalMoney;
          state.balance = content.balance;
  
          state.roomCost = Math.round((content.payTotalMoney - content.taxesAndFeesRMB)*100)/100;
          
          if (content.hasOwnProperty('isHasMarketing') && content.isHasMarketing === '1'){
            state.isHasMarketing = 1;
            state.marketing = content.marketing;
          }
          
        } else {
          payload.$alert(data.errinfo, '系统提示', {
            confirmButtonText: '确定',
            callback: action => {
              payload.$router.push('hotelList')
            }
          });
        }
        
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
        if (data.result === 'success'){
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
        }
        
      })
    },
    
    setExtraData({ commit, state, dispatch }, payload) {
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
    },
    
    //确认订单信息
    confirmOrderInfo({ commit, state, dispatch }, payload){
      if (payload){
        commit('setCommonState', payload);
  
        commit('setCommonState', {
          k : 'dialogTableVisible',
          v : true
        });
      }
    },
    
    //成单
    saveOrder({ commit, state, dispatch }, payload){
      API.orderWrite.saveOrder(state.orderInfo).then(function (data) {
        console.log(data);
      })
    }
    
  },
  
  getters : {
  
  }
}