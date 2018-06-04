<!-- 酒店列表页和酒店详情页的搜索栏 -->
<template>
    <div class="search-line-outer">
        <div class="search-line-wrap">
            <CityTypeSelect :cityType="cityType" />
            <RoomNumSelect :roomNum="roomNum" />
            <DateRange :cityType="cityType" />
            <KerywordSuggest :cityType="cityType" />

            <!-- <div class="search-item-wrap siw-hotel-list">
                <label class="s-i-label" for="s-i-keyword-input">城市/酒店</label>
                <input type="text" class="s-i-keyword-input" id="s-i-keyword-input" placeholder="" >
            </div>
        
            <div class="search-item-wrap">
                <label class="s-i-label" for="s-i-dates-input">入离日期</label>
                <input type="text" class="s-i-dates-input my-calendar-input" id="s-i-dates-input" placeholder="入住离店日期" title="入住离店日期" unselectable="on" readonly="readonly">            
            </div>
        
            <div class="drag-down-wrap">
                <div class="s-i-room-num" unselectable="on" data-value="1">1间</div>
                <i class="drag-down"></i>
            </div>
        
            <div class="drag-down-wrap s-i-adult-children-wrap">
                <input type="text" class="s-i-adult-children" value="2成人，0小孩" unselectable="on" readonly="readonly">
                <i class="drag-down"></i>
            </div>
        
            <button class="search-line-btn" >搜索</button> -->
        </div>
    </div>
</template>

<script>
import CityTypeSelect from './modules/CityTypeSelect'
import RoomNumSelect from './modules/RoomNumSelect'
import DateRange from './modules/DateRange'
import KerywordSuggest from './modules/KerywordSuggest'

export default {
  name: 'SearchLine',
  data(){
    return {
    }
  },
  props: {
    cityType: {
      default: 0,
    },
    roomNum: {
      default: 1,
    },
  },
  computed: {
    
  },
  components: {
    CityTypeSelect,
    RoomNumSelect,
    DateRange,
    KerywordSuggest,
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
    text-align: center;
  }
  
  .el-input__suffix{
    right: 0;
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