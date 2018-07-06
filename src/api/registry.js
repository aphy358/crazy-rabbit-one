import http from './http'


// 检查当前企业名称名是否已被占用
export const registRemoteCheck = (args, loading = false) => http.post("/regist/check.do", args, loading)


// 提交注册
export const submitRegist = (args, loading = false) => http.post("/regist/save.do", args, loading)

