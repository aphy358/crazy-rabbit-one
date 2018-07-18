import http from './http'


// 获取当前用户信息
export const getCurrentUser = (args, loading = true) => http.post("/user/getCurrentUser.do", args, loading)


// 获取轮播图
export const syncGetCarouselList = (args, loading = true) => http.post("/user/getAdInfoData.do", args, loading)


// 查询订单列表
export const syncGetOrderList = (args, loading = true) => http.post("/myinfo/queryOrderList.do", args, loading)


// 查询今日主推
export const syncGetTodayPush = (args, loading = true) => http.post("/mainPush/queryMainPushProductList.do", args, loading)


// 查询今日热推
export const syncGetHotPush = (args, loading = true) => http.post("/user/getAdInfoData.do", args, loading)


