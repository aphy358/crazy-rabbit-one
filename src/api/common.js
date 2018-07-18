import http from './http'


/**
 * 根据关键字查城市
 * @param  {Object} 请求参数
 * @param  {Boolean} loading 是否显示loading 默认显示
 * @return {Promise}
 */
// 登录
export const syncLogin = (args, loading = true) => http.post("/user/loginfzg.do", args, loading)


// 退出
export const syncLogout = (args, loading = true) => http.post("/user/loginoutfzg.do", args, loading)


// 获取验证码
export const syncCheckcode = (args, loading = false) => http.post("/user/getCheckcodeImg.do", args, loading)


// 查询关注列表
export const syncGetFavoriteList = (args, loading = true) => http.post("/fzgCustomerFavorite/getMyFavoriteList.do", args, loading)


// 标记喜欢
export const syncSaveFavorite = (args, loading = true) => http.post("/fzgCustomerFavorite/saveFavorite.do", args, loading)


// 取消喜欢
export const syncRemoveFavorite = (args, loading = true) => http.post("/fzgCustomerFavorite/removeFavorite.do", args, loading)
