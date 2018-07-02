import http from './http'


// 获取当前用户信息
export const getCurrentUser = (args, loading = true) => http.post("/user/getCurrentUser.do", args, loading)



