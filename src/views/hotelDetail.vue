<template>
  <div class="hotelDetail">
    <Breadcrumb :cityTypeText="cityTypeText" :hotelName="hotelInfo && hotelInfo.infoName" />
    <HotelDetailInfo1 />
    <HotelDetailInfo2 />
  </div>
</template>

<script>
import Breadcrumb from '../components/common/Breadcrumb'
import HotelDetailInfo1 from '../components/__HotelDetail/HotelDetailInfo1'
import HotelDetailInfo2 from '../components/__HotelDetail/HotelDetailInfo2'
import { queryString, addDays } from "../util.js";

export default {
  name: 'hotelDetail',

  data: function() {
    return {
    }
  },

  components: {
    Breadcrumb,
    HotelDetailInfo1,
    HotelDetailInfo2,
  },

  computed: {
    cityTypeText: function(){
      let cityType = this.$store.state.hotelDetail.cityType
      return cityType == '2' ? '港澳台' :
             cityType == '3' ? '国外'   : '国内'
    },

    hotelInfo: function(){
      return this.$store.getters["hotelDetail/getHotelInfo"];
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

<style lang="scss">
// icons
@import "../assets/jl_sprites.scss";
.hli-icon{
    @include jl_sprites;
    display: inline-block;
    position: relative;
    
    @at-root .icon-star{
        position: relative;
        top: -2px;
        display: inline-block;
        font-size: 12px;
        font-style: normal;
        background: #7eb6ec;
        color: white;
        width: 50px;
        height: 18px;
        line-height: 18px;
        text-align: center;
        border-radius: 3px;
    }
    
    &.icon-jinpai{
        @include jinpai;
        top: 3px;
    }
    
    &.icon-tuiguang{
        @include tuiguang;
        top: 3px;
    }
    
    &.icon-location2{
        @include location2;
        top: 3px;
    }
    
    &.icon-gz-on{
        @include gz3;
    }
    
    &.icon-gz-off{
        @include gz4;
    }
    
    &.icon-jiudianjianjie{
        @include jiudianjianjie;
    }
    
    &.icon-lianxifangshi{
        @include lianxifangshi;
    }

    &.icon-jiudiansheshi{
        @include jiudiansheshi;
    }
    
    &.icon-tebietixing{
        @include tebietixing;
    }
    
    &.icon-down{
        @include triangle_blue_down;
        top: -1px;

        &:before{
            content: none;
        }
    }
    
    &.icon-up{
        @include triangle_blue_up;
        top: -1px;

        &:before{
            content: none;
        }
    }
}
</style>
