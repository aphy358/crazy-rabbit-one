<!-- 酒店详情页的搜索栏 -->
<template>
    <div class="search-line-outer" :class="{'fix-top': fixTop}">
        <div class="search-line-wrap">
            <DateRange />
            <RoomNumSelect />

            <div class="search-item-price-wrap">
              <input v-model.number="priceRange1" class="search-line-price" placeholder="最低价" type="number" >
              <i class="search-line-seperator"></i>
              <input v-model.number="priceRange2" class="search-line-price" placeholder="最高价" type="number" >
            </div>

            <AdultChildrenSelect v-if="getCityType != 0" />

            <el-checkbox v-model="onlyCanBook" label="isbook" key="isbook" style="position: relative;top: 5px;">只显示可订</el-checkbox>

            <el-checkbox v-model="checkedCancelType" label="canceltype-0" key="canceltype-0" style="position: relative;top: 5px;margin-left: 0;">可取消</el-checkbox>

            <el-checkbox-group v-model="checkedConfirmType" style="position: relative;margin-bottom: -10px;top: -2px;">
              <el-checkbox label="XS-1" key="XS-1" style="display: block;margin-bottom: -5px;">立即确认</el-checkbox>
              <el-checkbox label="XS-2" key="XS-2" style="margin-left: 0;">60秒确认</el-checkbox>
            </el-checkbox-group>

            <el-checkbox-group v-model="checkedExtraService" style="position: relative;margin-bottom: -10px;top: -2px;">
              <el-checkbox label="bedbreakfast-0" key="bedbreakfast-0" style="display: block;margin-bottom: -5px;">可加早</el-checkbox>
              <el-checkbox label="bedbreakfast-1" key="bedbreakfast-1" style="margin-left: 0;">可加床</el-checkbox>
            </el-checkbox-group>
            
            <el-button type="primary" size="small" @click="queryHotelPriceList">搜索</el-button>
        </div>
    </div>
</template>

<script>
import RoomNumSelect from '../common/RoomNumSelect'
import DateRange from '../common/DateRange'
import AdultChildrenSelect from '../common/AdultChildrenSelect'

export default {
  name: 'SearchLine',

  data(){
    return {
      // 搜索栏固定在页面顶部，默认不固定
      fixTop: false
    }
  },

  props: {},

  computed: {
    // 获取城市类型，如：'国内'、'港澳台'、'国外'
    getCityType(){
      return this.$store.state.cityType
    },

    priceRange1: {
      get() {
        return this.$store.state.hotelDetail.priceRange1;
      },
      set(priceRange1) {
        this.$store.commit("hotelDetail/setCommonState", { t: "priceRange1", v: priceRange1 });
      }
    },

    priceRange2: {
      get() {
        return this.$store.state.hotelDetail.priceRange2;
      },
      set(priceRange2) {
        this.$store.commit("hotelDetail/setCommonState", { t: "priceRange2", v: priceRange2 });
      }
    },
    
    onlyCanBook: {
      get() {
        return this.$store.state.hotelDetail.onlyCanBook;
      },
      set(onlyCanBook) {
        this.$store.commit("hotelDetail/setCommonState", { t: "onlyCanBook", v: onlyCanBook });
      }
    },

    checkedCancelType: {
      get() {
        return this.$store.state.hotelDetail.checkedCancelType;
      },
      set(checkedCancelType) {
        this.$store.commit("hotelDetail/setCommonState", { t: "checkedCancelType", v: checkedCancelType });
      }
    },

    checkedConfirmType: {
      get() {
        return this.$store.state.hotelDetail.checkedConfirmType;
      },
      set(checkedConfirmType) {
        this.$store.commit("hotelDetail/setCommonState", { t: "checkedConfirmType", v: checkedConfirmType });
      }
    },

    checkedExtraService: {
      get() {
        return this.$store.state.hotelDetail.checkedExtraService;
      },
      set(checkedExtraService) {
        this.$store.commit("hotelDetail/setCommonState", { t: "checkedExtraService", v: checkedExtraService });
        this.queryHotelPriceList()
      }
    }
  },

  components: {
    RoomNumSelect,
    DateRange,
    AdultChildrenSelect,
  },

  methods: {
    queryHotelPriceList(){
      this.$store.dispatch("hotelDetail/queryHotelPriceList")
    },

    // 根据页面滚动，将搜索栏固定在页面顶部
    onScroll(){
      // 只有当价格全部展开的时候才处理底部 '展开全部房型' 按钮的固定
      let expanded = document.querySelector('.hli-icon.icon-up')

      if(expanded){
        let _bottom = document.querySelector('.hotel-detail-info-outer').getBoundingClientRect().bottom
        
        _bottom < 0
          ? this.fixTop = true
          : this.fixTop = false
      }else{
        this.fixTop = false
      }
    },
  },

  created(){
  },

  mounted(){
    document.querySelector('.el-scrollbar__wrap').addEventListener("scroll", this.onScroll)
  }
}
</script>

<!-- 覆盖 element 原有样式，注意这里不能用 scoped 限定作用域 -->
<style lang="scss">
.el-popover{
  padding: 0;
}

.search-line-wrap{

  .el-input__inner{
    font-size: 14px;
    padding: 3px 10px;
    border-radius: 0;
  }

  .el-radio__label,
  .el-checkbox__label {
    padding-left: 4px;
  }
  
  .el-input--suffix .el-input__inner {
    padding-right: 25px;
  }
  
  .el-input__suffix{
    right: 0;
  }

  .el-button.el-button--primary.el-button--small{
    float: right;
    letter-spacing: 5px;
    font-size: 15px;
    height: 32px;
    line-height: 12px;
    margin-right: 0;
  }
}

.el-select-dropdown__item{
  padding: 0 10px!important;
}
</style>

<style scoped lang="scss">
.search-line-outer{
    background: #fff;
    padding: 20px 0;
    margin-top: 20px;
    box-shadow: 0 0 5px #ddd;

    &.fix-top{
        position: fixed;
        top: 0;
        width: 100%;
        min-width: 1400px;
        background: white;
        box-shadow: 0 0 10px #999;
        z-index: 999;
        opacity: .8;
        margin-top: 0;
        padding: 5px 0;

        &:hover{
          opacity: 1;
        }

        .search-line-wrap{
          border: none;
          box-shadow: none;
        }
    }

    @at-root .search-line-wrap{
        width: 1200px;
        font-size: 15px;
        padding: 10px;
        margin: 0 auto;
        border: 1px solid #e3e3e3;
        box-sizing: border-box;
        background: white;

        > * {
          margin-right: 15px;
          float: left;
        }
    
        &:after{
            content: '';
            display: block;
            clear: both;
        }
    }
}

.search-item-price-wrap {
  display: inline-block;
  height: 32px;
  line-height: 32px;
  border: 1px solid #dcdfe6;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  background: white;
  transition: all 0.2s linear 0s;

  @at-root input.search-line-price {
    float: left;
    padding: 0 10px;
    width: 45px;
    height: 30px;
    border: none;
  }

  @at-root .search-line-seperator {
    float: left;
    display: inline-block;
    height: 20px;
    border-right: solid 1px #ccc;
    margin-top: 5px;
  }
}
</style>