import http from './http'


// 获取当前用户信息
export const getCurrentUser = (args, loading = true) => http.post("/user/getCurrentUser.do", args, loading)


// 登录
export const syncLogin = (args, loading = true) => http.post("/user/loginfzg.do", args, loading)


// 退出
export const syncLogout = (args, loading = true) => http.post("/user/loginoutfzg.do", args, loading)


// 获取验证码
export const syncCheckcode = (args, loading = false) => http.post("/user/getCheckcodeImg.do", args, loading)


// 查询今日主推
export const syncGetTodayPush = (args, loading = true) => http.post("/mainPush/queryMainPushProductList.do", args, loading)

