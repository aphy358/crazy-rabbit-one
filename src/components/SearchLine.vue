<!-- 酒店列表页和酒店详情页的搜索栏 -->
<template>
    <div class="search-line-outer">
        <div class="search-line-wrap">
            <CityTypeSelect />
            <KerywordSuggest />
            <DateRange />
            <RoomNumSelect />
            <AdultChildrenSelect v-if="getCityType != 0" />
            <el-button type="primary" size="small" @click="toOtherPage">搜索</el-button>
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
    toOtherPage(){
      let state = window.JSON.stringify(this.$store.state)
      sessionStorage.setItem('jlfzg__state', state)
    }
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
        z-index: 9999;

        .search-line-wrap{
            margin: 10px auto;
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