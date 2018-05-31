import Vue from 'vue'
import Router from 'vue-router'

import Header from './layout/header.vue'
import Footer from './layout/footer.vue'

import Login from './views/Login.vue'
import hotelDetail from './views/hotelDetail.vue'
import hotelList from './views/hotelList.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/',
      name: 'hotelList',
      components: {
        default: hotelList,
        header: Header,
        footer: Footer,
      }
    },
    {
      path: '/hotelDetail',
      name: 'hotelDetail',
      components: {
        default: hotelDetail,
        header: Header,
        footer: Footer,
      }
    },
    
  ]
})
