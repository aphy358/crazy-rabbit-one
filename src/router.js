import Vue from 'vue'
import Router from 'vue-router'

import Header from './layout/header.vue'
import Footer from './layout/footer.vue'

const hotelDetail = resolve => require(['./views/hotelDetail'], resolve)
const hotelList = resolve => require(['./views/hotelList'], resolve)
const personalCenter = resolve => require(['./views/personalCenter'], resolve)
const registry = resolve => require(['./views/registry'], resolve)
const home = resolve => require(['./views/home'], resolve)
const orderWrite = resolve => require(['./views/orderWrite'], resolve)
const orderPay = resolve => require(['./views/orderPay'], resolve)
const paySuccess = resolve => require(['./views/paySuccess'], resolve)

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
