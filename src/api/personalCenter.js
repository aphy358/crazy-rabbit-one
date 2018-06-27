import http from './http'


/**
 * 根据关键字查城市
 * @param  {Object} 请求参数
 * @param  {Boolean} loading 是否显示loading 默认显示
 * @return {Promise}
 */
//获取酒店订单列表
export const syncGetHotelOrder = (args, loading = true) => http.post("/myinfo/searchOrderList.do", args, loading);
