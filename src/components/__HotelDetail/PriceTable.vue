
<!-- 组件说明 -->
<template>
  <div class="price-table-outer">
    <div class="price-table-inner">

      <!-- 进度条 -->
      <el-collapse :value="hotel && hotel.percentage > 0 ? showv : 0">
          <el-collapse-item name="70">
              <div class="progress-outer" style="position: relative;margin-bottom: 10px;">
                <el-progress :text-inside="true" :stroke-width="18" :show-text=false
                  :percentage="hotel ? hotel.percentage : 0" 
                  :color="hotel ? hotel.color : 'rgba(255, 45, 0, 0.7)'"
                  ></el-progress>
                <div style="position: absolute;top: 0;width: 100%;text-align: center;color: rgb(21, 169, 94);line-height: 18px;">正在查询最低价，请稍候...</div>
              </div>
          </el-collapse-item>
      </el-collapse>
      
      <div class="fzg-loading-wrap" v-if="!hotel || !hotel.priceList">
        <img src="https://qnb.oss-cn-shenzhen.aliyuncs.com/real_1514022140288.gif" style="display: block;margin: 20px auto;"/>
      </div>
      
      <transition name="slide-price" v-if="hotel && hotel.priceList" >
        <PriceList :priceList="hotel.priceList" :class="expanded ? 'expanded' : ''" />
      </transition>

      <div v-if="hotel && hotel.priceList" class="hli-expand-inner" @click="toggleExpand">
        <span style="margin-right: 5px;">展开全部房型</span>
        <i class="hli-icon" :class="expandClass ? 'icon-down' : 'icon-up'"></i>
      </div>
    </div>
  </div>
</template>

<script>
import PriceList from "../common/PriceList"
import Velocity from 'velocity-animate'

export default {
  name: '',

  data(){
    return {
      // 这里的 '70' 是和组件的 name 属性对应的
      showv: '70',

      expanded: false,

      expandClass: true,

      priceTableHeight: 0
    }
  },

  props: [],

  components: {
    PriceList,
  },

  computed: {
    hotel: function(){
      return this.$store.getters["hotelDetail/getHotelInfo"];
    }
  },
  
  methods: {
    toggleExpand(){
      this.expanded = !this.expanded
      this.expandClass = !this.expandClass
      let elem = document.querySelector('.hotel-price-table-wrapper')

      let elem2 = document.querySelector('.hotel-price-table')
      this.priceTableHeight = elem2.getBoundingClientRect().height

      if(this.expanded){
        // Velocity(document.querySelector('.hotel-price-table-wrapper'), 'slideDown')
        Velocity(elem, { height: this.priceTableHeight }, {
          complete: function(elems) { elems[0].removeAttribute('style') }
        })
      }else{
        // Velocity(document.querySelector('.hotel-price-table-wrapper'), 'slideUp')
        Velocity(elem, { height: '249px' })
      }
    },

  },

}
</script>

<style lang="scss">
.hotel-price-table-wrapper{
  overflow: hidden;
  height: 249px;

  &.expanded{
    height: auto;
  }

  .hotel-price-table{
    margin-bottom: 0;
  }
}

.price-table-outer{
  padding-bottom: 20px;
  background: white;
  
  .el-collapse {
    position: relative;
    border-top: none;
    border-bottom: none;
  }

  .el-collapse-item:last-child{
    margin-bottom: 0;
  }

  .el-collapse-item__wrap{
    border-bottom: none;
  }

  .el-collapse-item__header{
    display: none;
  }

  .el-collapse-item__content{
    padding-bottom: 5px;
  }
  
  @at-root .price-table-inner{
    width: 1200px;
    margin: auto;

    .hotel-price-thead{
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
  
  @at-root .hli-expand-inner{
    line-height: 30px;
    text-align: center;
    font-size: 12px;
    color: #339afc;
    background: #f4fbfe;
    cursor: context-menu;
    border: 1px solid #E3E3E3;
    margin-top: -1px;
    margin-bottom: 20px;

    &.fix-bottom{
      position: fixed;
      bottom: 0;
      width: 1198px;
      box-shadow: 0 0 5px #dadada;
      z-index: 9999;
    }
  }
}
</style>