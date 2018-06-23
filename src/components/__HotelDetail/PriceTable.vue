
<!-- 组件说明 -->
<template>
  <div class="price-table-outer">
    <div class="price-table-inner">
      <!-- 进度条 -->
      <div class="progress-outer" v-if="hotel && hotel.percentage > 0" style="position: relative;margin-bottom: 10px;">
        <el-progress :text-inside="true" :stroke-width="18" :show-text=false
          :percentage="hotel.percentage" 
          :color="hotel.color"
          ></el-progress>
        <div style="position: absolute;top: 0;width: 100%;text-align: center;color: rgb(21, 169, 94);line-height: 18px;">正在查询最低价，请稍候...</div>
      </div>
      
      <div class="fzg-loading-wrap" v-if="!hotel || !hotel.priceList">
        <img src="https://qnb.oss-cn-shenzhen.aliyuncs.com/real_1514022140288.gif" style="display: block;margin: auto;"/>
      </div>
      
      <PriceList v-if="hotel && hotel.priceList" :priceList="hotel.priceList" />
    </div>
  </div>
</template>

<script>
import PriceList from "../common/PriceList"

export default {
  name: '',

  data(){
    return {
    }
  },

  props: ['hotel'],

  components: {
    PriceList,
  },

  computed: {
    
  },
  
  methods: {

  }
}
</script>

<style lang="scss">
.price-table-outer{
  padding-bottom: 20px;
  background: white;
  
  @at-root .price-table-inner{
    width: 1200px;
    margin: auto;

    @at-root .hotel-price-thead{
      th{
        position: relative;
        font-size: 14px;
        color: #666;
        height: 40px;
        border: 1px solid #E3E3E3;
        background: #f4fbfe;
        font-weight: bold;
        
        span{
          display: table-cell!important;
          padding-left: 15px;
        }

        &.align-center{
          span{
            display: inline-block!important;
            padding-left: 0;
          }
        }
      }
    }
  }   
}
</style>