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


// 查询酒店价格，(缓存价格)
export const syncGetHotelPriceListInStock = (args, loading = true) => http.post("/hotel/getHotelPriceListInStock.do", args, loading)


// 查询酒店价格，(实查)
export const syncGetHotelPriceList = (args, loading = true) => http.post("/hotel/getHotelPriceList.do", args, loading)


// 查询房型信息
export const syncGetRoomInfo = (args, loading = false) => http.post("/hotel/roomInfo.do", args, loading)


// 登录
export const syncLogin = (args, loading = true) => http.post("/user/loginfzg.do", args, loading)


// 获取当前用户信息
export const getCurrentUser = (args, loading = true) => http.post("/user/getCurrentUser.do", args, loading)


// 退出
export const syncLogout = (args, loading = true) => http.post("/user/loginoutfzg.do", args, loading)


// 获取验证码
export const syncCheckcode = (args, loading = true) => http.post("/user/getCheckcodeImg.do", args, loading)
