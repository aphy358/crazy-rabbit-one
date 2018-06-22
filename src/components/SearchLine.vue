<!-- 酒店列表页和酒店详情页的搜索栏 -->
<template>
    <div class="search-line-outer" :class="fixTop === true ? 'fix-top' : ''">
        <div class="search-line-wrap">
            <CityTypeSelect />
            <KerywordSuggest />
            <DateRange />
            <RoomNumSelect />
            <AdultChildrenSelect v-if="getCityType != 0" />
            <el-button type="primary" size="small" @click="queryHotelList">搜索</el-button>
        </div>
    </div>
</template>

<script>
import CityTypeSelect from './CityTypeSelect'
import RoomNumSelect from './RoomNumSelect'
import DateRange from './DateRange'
import KerywordSuggest from './KerywordSuggest'
import AdultChildrenSelect from './AdultChildrenSelect'

export default {
  name: 'SearchLine',

  data(){
    return {
      fixTop: false,
    }
  },

  props: {},

  computed: {
    // 获取城市类型，如：'国内'、'港澳台'、'国外'
    getCityType(){
      return this.$store.state.hotelList.cityType
    },
  },

  components: {
    CityTypeSelect,
    RoomNumSelect,
    DateRange,
    KerywordSuggest,
    AdultChildrenSelect,
  },

  methods: {
    queryHotelList(){
      this.$store.dispatch("hotelList/actionHotelList", { api: this.$api })
    },

    // 根据页面滚动，将搜索栏固定在页面顶部
    onScroll(){
      let topNavWrapper = document.querySelector('.top-nav-wrap')
      let rect = topNavWrapper.getBoundingClientRect()

      rect.top < -20
        ? this.fixTop = true
        : this.fixTop = false
    }
  },

  created(){
    this.queryHotelList()
  },

  mounted(){
    document.querySelector('.el-scrollbar__wrap').addEventListener("scroll", this.onScroll)
  }
}
</script>

<!-- 覆盖 element 原有样式，注意这里不能用 scoped 限定作用域 -->
<style lang="scss">
.search-line-wrap{
  .el-input__inner{
    font-size: 14px;
    padding: 0 10px;
    border-radius: 0;
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
    &.fix-top{
        position: fixed;
        top: 0;
        width: 100%;
        min-width: 1400px;
        background: white;
        box-shadow: 0 0 10px #999;
        z-index: 999;

        .search-line-wrap{
            margin: 5px auto;
            box-shadow: none;
        }
    }

    @at-root .search-line-wrap{
        width: 1200px;
        font-size: 15px;
        padding: 10px;
        margin: 20px auto;
        box-shadow: 0 0 5px #dadada;
        box-sizing: border-box;
        background: white;

        > * {
          margin-right: 15px;
        }
    
        &:after{
            content: '';
            display: block;
            clear: both;
        }
    }
}
</style>