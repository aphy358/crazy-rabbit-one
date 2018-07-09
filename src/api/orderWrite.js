import http from './http'


/**
 * 根据关键字查城市
 * @param  {Object} 请求参数
 * @param  {Boolean} loading 是否显示loading 默认显示
 * @return {Promise}
 */
//验价
export const checkOrder = (args, loading = true) => http.post("/order/validate.do", args, loading);

//查价
export const getOrderInfo = (args, loading = true) => http.post("/order/write.do", args, loading);

//杂费
export const getExtraInfo = (args, loading = true) => http.post("/order/surchargeRoom.do", args, loading);

//国籍联想
export const getCountrySuggest = (args, loading = true) => http.post("/order/countrySuggest.do", args, loading);

//国籍
export const checkMarket = (args, loading = true) => http.get("/order/properMarket.do", args, loading);