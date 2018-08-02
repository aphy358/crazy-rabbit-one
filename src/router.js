import Vue from 'vue'
import Router from 'vue-router'

import Header from './layout/header.vue'
import Footer from './layout/footer.vue'

const hotelDetail = resolve => require(['./views/hotelDetail/index.vue'], resolve)
const hotelList = resolve => require(['./views/hotelList/index.vue'], resolve)
const personalCenter = resolve => require(['./views/personalCenter/index.vue'], resolve)
const registry = resolve => require(['./views/registry/index.vue'], resolve)
const home = resolve => require(['./views/home/index.vue'], resolve)
const orderWrite = resolve => require(['./views/orderWrite/index.vue'], resolve)
const orderPay = resolve => require(['./views/orderPay/index.vue'], resolve)
const paySuccess = resolve => require(['./views/paySuccess/index.vue'], resolve)

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      components: {
        default: home,
        // header: Header,
        footer: Footer
      }
    },
    {
      path: '/hotelList',
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
        default: personalCenter,
        header: Header,
        footer: Footer
      }
    },
    {
      path: '/orderWrite',
      name: 'orderWrite',
      components: {
        default: orderWrite,
        header: Header,
        footer: Footer
      }
    },
    {
      path: '/orderPay',
      name: '/orderPay',
      components: {
        default: orderPay,
        header: Header,
        footer: Footer
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
    },
    {
      path: '/paySuccess',
      name: 'paySuccess',
      components: {
        default : paySuccess,
        header : Header,
      }
    }
  ]
})
