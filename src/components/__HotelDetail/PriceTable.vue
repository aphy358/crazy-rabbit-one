
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
      
      <div class="fzg-loading-wrap" v-if="!priceList">
        <img src="https://qnb.oss-cn-shenzhen.aliyuncs.com/real_1514022140288.gif" style="display: block;margin: 20px auto;"/>
      </div>
      
      <transition name="slide-price" v-if="priceList" >
        <PriceList :priceList="priceList" :class="{ 'expanded': expanded, 'to-be-expand': toBeExpand }" :page="'hotelDetail'" />
      </transition>

      <div v-if="priceList && combinedRows.length > 10" class="hli-expand-inner" :class="{ 'fix-bottom': fixBottom }" @click="toggleExpand">
        <span style="margin-right: 5px;">展开全部房型</span>
        <i class="hli-icon" :class="!expanded ? 'icon-down' : 'icon-up'"></i>
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

      // 是否已经展开
      expanded: false,

      // 只有当总价格条数超过 10 条，才显示展开按钮
      toBeExpand: true,

      priceTableHeight: 0,

      // '展开全部房型' 按钮是否固定在页面底部
      fixBottom: false,

    }
  },

  props: [],

  components: {
    PriceList,
  },

  computed: {
    hotel: function(){
      return this.$store.getters["hotelDetail/getHotelInfo"];
    },

    priceList: function(){
      console.log(this.$store.getters["hotelDetail/getHotelPriceList"]);
      
      return this.$store.getters["hotelDetail/getHotelPriceList"];
    },

    combinedRows: function(){
      let combinedRows = this.$store.state.hotelDetail.combinedRows

      if(combinedRows.length > 10){
        this.toBeExpand = true
      }else{
        this.toBeExpand = false
      }

      return combinedRows
    }
  },
  
  methods: {
    toggleExpand(){
      this.expanded = !this.expanded
      let elem = document.querySelector('.hotel-price-table-wrapper')

      let elem2 = document.querySelector('.hotel-price-table')
      this.priceTableHeight = elem2.getBoundingClientRect().height
      let _this = this

      if(this.expanded){
        Velocity(elem, { height: this.priceTableHeight }, {
          complete: function(elems) { 
            elems[0].removeAttribute('style') 
            _this.onScroll()
          }
        })
      }else{
        Velocity(elem, { height: '249px' })

        let container = document.querySelector('.el-scrollbar__wrap')
        Velocity(elem, 'scroll', {offset: '20px', container: container})
        Velocity(elem, 'finish')

        this.fixBottom = false
      }
    },

    // 处理页面滚动
    onScroll() {
      // 只有当价格全部展开的时候才处理底部 '展开全部房型' 按钮的固定
      if(this.expanded){
        let priceTable = document.querySelector('.hotel-price-table')
        let rect = priceTable.getBoundingClientRect()
        let clientHeight = document.documentElement.clientHeight;

        rect.bottom > clientHeight
          ? this.fixBottom = true
          : this.fixBottom = false

				if(rect.top >= clientHeight - 300){
					this.fixBottom = false
        }
      }else{
        this.fixBottom = false
      }
    },

  },

  mounted(){
    document.querySelector('.el-scrollbar__wrap').addEventListener("scroll", this.onScroll)
  }
}
</script>

<style lang="scss">
.hotel-price-table-wrapper{
  overflow: hidden;

  &.to-be-expand{
    height: 249px;
  }

  &.expanded{
    height: auto;
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

    .hotel-price-table{
      margin-bottom: 0;
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
      width: 1200px;
      margin-bottom: 0;
      box-sizing: border-box;
      box-shadow: 0 0 5px #dadada;
      z-index: 9999;
    }
  }
}
</style>