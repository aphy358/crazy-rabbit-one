<template>
  <div class="hotelDetail">
    <Breadcrumb :cityTypeText="cityTypeText" :hotelName="hotelInfo && hotelInfo.infoName" />
  </div>
</template>

<script>
import Breadcrumb from '../components/Breadcrumb'
import { queryString } from "../util.js";

export default {
  name: 'hotelDetail',

  data: function() {
    return {
    }
  },

  props: {
    
  },

  components: {
    Breadcrumb,
  },

  computed: {
    cityTypeText: function(){
      let cityType = this.$store.state.hotelDetail.cityType
      return cityType == '2' ? '港澳台' :
             cityType == '3' ? '国外'   : '国内'
    },

    hotelInfo: function(){
      return this.$store.state.hotelDetail.hotelInfo
    }
  },

  created(){
    // 获取 url 参数
    this.getQueryParams()
    
  },

  methods: {
    // 获取 url 参数，并将之设置到 store 里去
    getQueryParams(){
      let hotelId = queryString('hotelId')
      let checkin = queryString('checkin')
      let checkout = queryString('checkout')
      let citytype = queryString('ch')

      // 修复 url 参数中的日期过期的 bug
      if(citytype == 3){	// 境外
        if( (+new Date() + 24 * 60 * 60 * 1000) > +new Date(checkin.replace(/-/g, '/') + ' 23:59:59') ){
          checkin = addDays( new Date(), 1 );
          checkout = addDays( new Date(), 2 );
        }
      }else{
        if( +new Date() > +new Date(checkin.replace(/-/g, '/') + ' 23:59:59') ){
          checkin = addDays( new Date(), 0 );
          checkout = addDays( new Date(), 1 );
        }
      }

      this.$store.commit('hotelDetail/setHotelDetailState', {t: 'hotelId', v: hotelId})
      this.$store.commit('hotelDetail/setHotelDetailState', {t: 'checkin', v: checkin})
      this.$store.commit('hotelDetail/setHotelDetailState', {t: 'checkout', v: checkout})
      this.$store.commit('hotelDetail/setHotelDetailState', {t: 'cityType', v: citytype})

      // 查询酒店信息
      this.$store.dispatch("hotelDetail/getHotelInfo", {hotelId, checkin, checkout, citytype})
    }
  }

}
</script>

<style scoped lang="scss">
</style>
