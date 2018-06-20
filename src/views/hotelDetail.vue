<template>
  <div class="hotelDetail">
    <Breadcrumb :hotelName="hotelName" />
  </div>
</template>

<script>
import Breadcrumb from '../components/Breadcrumb'
import { queryString } from "../util.js";

export default {
  name: 'hotelDetail',

  data: function() {
    return {
      cityType: '3',
      hotelName: '阳光酒店'
    }
  },

  props: {
    
  },

  components: {
    Breadcrumb,
  },

  created(){
    // 获取 url 参数
    this.getQueryParams()
    
  },

  methods: {
    // 获取 url 参数
    getQueryParams(){
      let hotelId = queryString('hotelId')
      let checkin = queryString('checkin')
      let checkout = queryString('checkout')
      let ch = queryString('ch')

      console.log(hotelId, checkin, checkout, ch);
      
    }
  }

}
</script>

<style scoped lang="scss">
</style>
