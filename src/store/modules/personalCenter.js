import { _setCommonState } from "../util.js"

export default {
	namespaced: true,
	
	state : {
		tabindex : 1
	},
	
	
	mutations : {
		
		// 设置状态的公共函数
		setCommonState(state, payload){
			_setCommonState(state, payload)
		},
	},
	
	
	actions : {
	
	},
	
	getters : {
	
	}
}