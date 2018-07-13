<template>
  <div class="search-line">
    <div class="search-line-mask">
      <div class="search-line-wrap">
        <CityTypeSelect />
        <KerywordSuggest />
        <DateRange />
        <router-link :to="'/'" target="_blank">
          <el-button type="warning" @click="queryHotelList">搜索</el-button>
        </router-link>
      </div>
    </div>
    <div class="more-serch-line">
      <el-collapse-transition>
        <div class="more-search-back" v-show="show_more">
          <div class="heigher_search">
            <span>间数</span>
            <el-select v-model="roomNums" placeholder="请选择" style="width: 90px;" size="small">
              <el-option v-for="item in numberOfRooms" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
            <span>酒店等级</span>
            <el-select v-model="hotelStars" multiple collapse-tags style="width:220px" placeholder="请选择" size="small">
              <el-option v-for="item in starOfHotels" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
            <span v-if="getCityType != 0">入住人数</span>
            <AdultChildrenSelect v-if="getCityType != 0" style="width:150px" />
            <span>价格区间</span>
            <div class="range-price">
              <el-slider v-model="rangePrice" range :max="3000" style="margin:0 10px" :format-tooltip="formatTooltip" tooltip-class="slider-style">
              </el-slider>
              <span :style="{width:range_price+'px',color:range_red}">{{rangePrice[0]}}元~ {{rangePrice[1]==3000?rangePrice[1]+'元以上':rangePrice[1]+'元'}}</span>
            </div>
            <el-checkbox v-model="rightlyComfirm">立即确认</el-checkbox>
          </div>
        </div>
      </el-collapse-transition>

      <div class="heigher_search_tips" @click="showmoresearch">高级搜索条件
        <i class="el-icon-caret-top" v-if="show_more"></i>
        <i class="el-icon-caret-bottom" v-else></i>
      </div>
    </div>
  </div>

</template>

<script>
import CityTypeSelect from '../common/CityTypeSelect'
import RoomNumSelect from '../common/RoomNumSelect'
import DateRange from '../common/DateRange'
import KerywordSuggest from '../common/KerywordSuggest'
import AdultChildrenSelect from '../common/AdultChildrenSelect'

export default {
  name: 'SearchBlock',

  data() {
    return {
      fixTop: false,
      numberOfRooms: [
        {
          value: '1',
          label: '1间'
        },
        {
          value: '2',
          label: '2间'
        },
        {
          value: '3',
          label: '3间'
        },
        {
          value: '4',
          label: '4间'
        },
        {
          value: '5',
          label: '5间'
        },
        {
          value: '6',
          label: '6间'
        },
        {
          value: '7',
          label: '7间'
        }
      ],
      roomNums: '',
      starOfHotels: [
        {
          value: '10,15,20,25',
          label: '二星级及以下/经济'
        },
        {
          value: '30,35',
          label: '三星级/舒适'
        },
        {
          value: '40,45',
          label: '四星级/高档'
        },
        {
          value: '50,55',
          label: '五星级/豪华'
        }
      ],
      hotelStars: [],
      rangePrice: [0, 1500],
      rightlyComfirm: false,
      range_price: 180,
      range_red: 'red',
      show_more: false
    }
  },

  props: [],

  computed: {
    // 获取城市类型，如：'国内'、'港澳台'、'国外'
    getCityType() {
      return this.$store.state.cityType
    }
  },

  components: {
    CityTypeSelect,
    RoomNumSelect,
    DateRange,
    KerywordSuggest,
    AdultChildrenSelect
  },

  methods: {
    queryHotelList() {
      //console.log(this.$api)
      this.$store.dispatch('hotelList/actionHotelList', { api: this.$api })
    },
    showmoresearch() {
      if (this.show_more) {
        this.show_more = false
        this.$emit('child-msg', 0)
      } else {
        this.show_more = true
        this.$emit('child-msg', 70)
      }
    },
    formatTooltip(val) {
      if (val == 3000) {
        return 3000 + '元以上'
      }
      return val + '元'
    },
    sliderVal(min, max, total) {}
  },

  created() {
    this.queryHotelList()
  },

  mounted() {}
}
</script>

<!-- 覆盖 element 原有样式，注意这里不能用 scoped 限定作用域 -->
<style lang="scss">
.runImg {
  & .search-line-wrap {
    display: flex;
    > .el-input__inner {
      font-size: 14px;
      padding: 0 10px;
      border-radius: 0;
      flex: 1;
    }
    > span {
      flex: 1;
      border-left: 2px solid orange;
      border-right: 2px solid orange;
    }

    .el-input--suffix .el-input__inner {
      padding-right: 25px;
    }

    .el-input__suffix {
      right: 0;
    }
    .el-input__inner {
      border: none;
      line-height: 40px !important;
      height: 40px !important;
    }
    .el-range-separator {
      line-height: 40px !important;
    }
    .el-button--warning {
      width: 120px !important;
      border-radius: 0;
    }
  }
}

.el-select-dropdown__item {
  padding: 0 10px !important;
}
.el-checkbox__input {
  line-height: 50px !important;
}
</style>

<style scoped lang="scss">
.search-line {
  width: 100%;
  position: absolute;
  top: 380px;
  z-index: 99;
}
.search-line-mask {
  padding: 15px;
  background: #ffffffbf;
  width: 1040px;
  margin: 0 auto;
}
// .search_move-enter-active{
//   transition: all 2s;
// }
.search-line-outer {
  &.fix-top {
    position: fixed;
    top: 0;
    width: 100%;
    min-width: 1040px;
    background: white;
    box-shadow: 0 0 10px #999;
    z-index: 999;
    opacity: 0.8;

    &:hover {
      opacity: 1;
    }

    .search-line-wrap {
      margin: 5px auto;
      box-shadow: none;
      display: flex;
    }
  }

  @at-root .more-search-back {
    width: 1070px;
    background: #ffffff70;
    margin: 0 auto;
    height: 80px;
  }

  @at-root .heigher_search {
    padding: 15px 0;
    display: flex;
    width: 1040px;
    > span {
      padding: 0 10px;
      line-height: 50px;
      text-align: center;
    }
    > div {
      line-height: 50px;
    }
    .range-price {
      width: 180px;
      line-height:1;
      margin-right:10px;
      > span {
        text-align:center;
        display: block;
      }
    }
  }
  @at-root .heigher_search_tips {
    margin: 0 auto;
    width: 200px;
    text-align: center;
    background: #ffffff70;
    padding: 3px 0;
    color: #339afc;
    border-radius: 0 0 4px 4px;
    cursor: context-menu;
  }

  @at-root .search-line-wrap {
    width: 1040px;
    font-size: 15px;
    margin: auto;
    box-shadow: 0 0 5px #dadada;
    box-sizing: border-box;
    background: white;
    z-index: 99;
    bottom: 190px;
    > .city-type-select {
      width: 125px;
      padding-right: 10px;
    }

    &:after {
      content: '';
      display: block;
      clear: both;
    }
  }
}
.slider-style {
  font-size: 12px;
}
</style>