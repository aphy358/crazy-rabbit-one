import http from './http'


/**
 * 根据关键字查城市
 * @param  {Object} 请求参数
 * @param  {Boolean} loading 是否显示loading 默认显示
 * @return {Promise}
 */
//获取酒店订单列表
export const syncGetHotelOrder = (args, loading = true) => http.post("/myinfo/searchOrderList.do", args, loading);

//获取门票订单列表
export const syncGetTicketOrder = (args, loading = true) => http.post("/ticketController/searchTicketOrderList.do", args, loading);

//企业信息>基本信息>收单方式
export const syncGetReceiveWay = (args, loading = true) => http.post("/myinfo/queryReceipt.do", args, loading);
