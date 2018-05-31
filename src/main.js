import Vue from 'vue'
import Layout from './layout'
import router from './router'
import store from './store'

import './assets/reset.css'

// 引入 element-ui 和其样式
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUI)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(Layout)
}).$mount('#app')
