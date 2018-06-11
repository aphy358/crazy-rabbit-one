import http from './http'


/**
 * 根据关键字查城市
 * @param  {Object} 请求参数
 * @param  {Boolean} loading 是否显示loading 默认显示
 * @return {Promise}
 */
export const syncGetCity = (args, loading = false) => http.post("/city/searchCity.do", args, loading)


// 根据关键字查酒店列表
export const syncGetHotels = (args, loading = false) => http.post("/suggest/searchHotel.do", args, loading)


// 根据城市 id 查对应的 '行政区' 、'商业圈'
export const syncGetZone = (args, loading = false) => http.post("/hotel/getZone.do", args, loading)


// 查询酒店列表
export const syncGetHotelList = (args, loading = true) => http.post("/hotel/queryHotelListNew.do", args, loading)


// 登录
export const syncLogin = (args, loading = false) => http.post("/user/loginfzg.do", args, loading)

