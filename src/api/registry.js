import http from './http'


// 获取当前用户信息
export const getCurrentUser = (args, loading = true) => http.post("/user/getCurrentUser.do", args, loading)


// 检查当前企业名称名是否已被占用
export const registRemoteCheck = (args, loading = false) => http.post("/regist/check.do", args, loading)


// 提交注册
export const submitRegist = (args, loading = false) => http.post("/regist/save.do", args, loading)

