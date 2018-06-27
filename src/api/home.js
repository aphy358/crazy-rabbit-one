import http from './http'


// 查询今日主推
export const syncGetTodayPush = (args, loading = true) => http.post("/mainPush/queryMainPushProductList.do", args, loading)

