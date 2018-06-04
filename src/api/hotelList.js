import http from './http'


/**
 * 根据关键字查城市
 * @param  {Object} 请求参数
 * @param  {Boolean} loading 是否显示loading 默认显示
 * @return {Promise}
 */
export const syncGetCity = (args, loading = false) => http.post("/city/searchCity.do", args, loading)


/**
 * 根据关键字查酒店列表
 * @param  {Object} 请求参数
 * @param  {Boolean} loading 是否显示loading 默认显示
 * @return {Promise}
 */
export const syncGetHotels = (args, loading = false) => http.post("/suggest/searchHotel.do", args, loading)

