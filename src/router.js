import Vue from 'vue'
import Router from 'vue-router'

import Header from './layout/header.vue'
import Footer from './layout/footer.vue'

import hotelDetail from './views/hotelDetail.vue'
import hotelList from './views/hotelList.vue'
import personalCenter from './views/personalCenter.vue'
import registry from './views/registry.vue'
import home from './views/home.vue'


Vue.use(Router)

export default new Router({
  routes: [
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
    {
      path: '/personalCenter',
      name: 'personalCenter',
      components: {
        default : personalCenter,
        header : Header,
        footer : Footer
      }
    },
    {
      path: '/home',
      name: 'home',
      components: {
        default : home,
        header : Header,
        footer : Footer
      }
    },
    {
      path: '/registry',
      name: 'registry',
      components: {
        default : registry,
        header : Header,
        footer : Footer
      }
    }
    
  ]
})
