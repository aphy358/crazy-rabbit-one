
<!-- 我的关注 -->
<template>
  <div class="i-concern-outer">
    <div class="i-c-o-title">
      <i class="i-c-o-icon concern"></i>
      <h1>我的关注</h1>
      <a href="javascript:void(0)" class="get-all-concern">查看全部</a>
    </div>
    <div id="i-concern-wrap">
      <div v-if="favoriteList.length < 1" class="no-content"></div>

      <!-- 我的关注 -->
      <table v-if="favoriteList.length >= 1">
          <thead><tr><th></th><th></th></tr></thead>
          <tbody>
            <tr v-for="o in favoriteList" :key="o.infoId" v-if="o.infoName">
                <td>
                    <a :href="'#/hotelDetail?' + o.detailLink.split('?')[1]"
                      target="_blank"
                      class="i-c-o-link-item index-concern-link"
                      :class="{'hotel-no-link': o.hasOwnProperty('detailLink')}" >
                        {{o.cityName ? o.cityName + ' | ' : ''}}{{o.infoName}}
                    </a>
                </td>
                <td lastChild>
                  <span v-if="o.minPrice"><span class="i-concern-price">￥{{o.minPrice}}</span>起</span>
                  <span v-else-if="o.minPriceText" v-html="o.minPriceText"></span>
                  <span v-else>加载中<img src="https://qnb.oss-cn-shenzhen.aliyuncs.com/real_1520825964429.gif" class="price-loading" alt=""></span>
                </td>
            </tr>
          </tbody>
      </table>

    </div>
  </div>
</template>

<script>
import { addDays } from "../../../util.js"

export default {
  name: '',

  data(){
    return {
      favoriteList: [],
    }
  },

  props: {
    
  },

  components: {

  },

  computed: {
    
  },
  
  methods: {
    // 逐个给没有最低价的酒店实时查询最低价
    getMinPrice(){
      for (let i = 0; i < this.favoriteList.length; i++) {

        let perHotel = this.favoriteList[i]

        if (!perHotel.hasOwnProperty('minPrice') || +perHotel.minPrice === 0) {
          let param = {
            hotelId: perHotel.infoId,
            checkInDate: addDays(new Date(), 0),
            checkOutDate: addDays(new Date(), 1),
            roomNum: 1,
            adultNum: 2,
            childrenNum: 0,
            childrenAgesStr: ''
          }

          this.$api.hotelList.syncGetHotelPriceList(param).then(data => {
            if (data.returnCode === 1 && data.data.hasOwnProperty('priceMin') && data.data.priceMin !== 0) {
              perHotel.minPriceText = `<span class="i-concern-price">￥${data.data.priceMin}</span>起`
            } else {
              perHotel.minPriceText = `<span class="i-concern-price">暂无价格`
            }

            this.favoriteList = Object.assign([], this.favoriteList)
          })
        }
      }
    }
  },

  created(){
    // 查询关注列表
    this.$api.common.syncGetFavoriteList({ categoryId: 0, pageNum: 1, pageSize: 5 }).then(res => {
      if(res.returnCode === 1 && res.dataList){
        this.favoriteList = res.dataList
        this.getMinPrice()
      }else if(res.errcode == 'notLogin'){
      }
    })
  }
}
</script>
