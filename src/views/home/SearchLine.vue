
<!-- banner 搜索栏 -->
<template>
  <section class="search-outer">
      <div class="index-search-wrap">
          <div class="i-s-row-one-wrap">
              <div class="i-s-bg-one"></div>
              <div class="i-s-row-one">

                  <ul class="i-s-origin-group">
                      <li v-for="type in cityTypes" :key="type.value">
                        <span class="i-s-origin-switch" 
                          :checked="type.value == cityType" 
                          @click="setCityType(type.value, $event)">
                          {{type.label}}
                        </span>
                      </li>
                  </ul>
      
                  <div class="i-s-keyword">
                    <KerywordSuggest extraStyle="width: 300px;" page="home" :extraClass="keywordclass" />
                  </div>
      
                  <div class="i-s-gap"></div>
      
                  <div class="i-s-dates">
                    <DateRange extraStyle="width: 280px;" />
                  </div>
      
                  <button class="i-s-search-btn" @click="toHotelListPage">搜索</button>
              </div>
          </div>

          <div class="i-s-row-two-wrap">
              <div class="i-s-bg-two"></div>
              <div class="i-s-row-two">
                  <div class="i-s-label-pair">
                      <label>间数</label>
                      <RoomNumSelect />
                  </div>

                  <ul class="i-s-label-pair">
                      <label>酒店等级</label>
                      <StarSelect page="home" />
                  </ul>
                  
                  <div class="i-s-label-pair" v-if="cityType != 0">
                      <label>入住人数</label>
                      <AdultChildrenSelect />
                  </div>
                  
                  <div class="i-s-label-pair">
                      <label style="margin-right: 20px;">价格区间</label>
                      <PriceRangeSlider page="home" />
                  </div>
                  
                  <div class="i-s-label-pair" lastChild>
                      <el-checkbox v-model="checkedConfirmType" key="XS-1">立即确认</el-checkbox>
                  </div>
              </div>
          </div>

          <div class="i-s-row-slide-bar-wrap">
              <div class="i-s-row-slide-bar-bg"></div>
              <div class="i-s-row-slide-bar" @click="toggleSearchLineTwo">
                  高级搜索条件
                  <i class="slide-bar" :class="isSearchLineTwoShow ? 'up' : 'down'"></i>
              </div>
          </div>
      </div>
  </section>
</template>

<script>
import CityTypeSelect from '../../components/CityTypeSelect'
import RoomNumSelect from '../../components/RoomNumSelect'
import DateRange from '../../components/DateRange'
import KerywordSuggest from '../../components/KerywordSuggest'
import AdultChildrenSelect from '../../components/AdultChildrenSelect'
import StarSelect from '../../components/StarSelect'
import PriceRangeSlider from '../../components/PriceRangeSlider'
import Velocity from 'velocity-animate';

export default {
  name: 'SearchLine',

  data() {
    return {
      isSearchLineTwoShow: false,

      cityTypes: [
        {value: '0', label: '国内'},
        {value: '2', label: '港澳台'},
        {value: '3', label: '境外'},
      ],

      keywordclass: '',
    }
  },

  props: [],

  computed: {
    checkedConfirmType: {
      get: function () {
        return this.$store.state.home.checkedConfirmType
      },
      set: function (newValue) {
        this.$store.commit(`home/setCommonState`, {t: 'checkedConfirmType', v: newValue})
      }
    },

    cityType(){
      return this.$store.state.cityType
    },
    
  },

  components: {
    CityTypeSelect,
    RoomNumSelect,
    DateRange,
    KerywordSuggest,
    AdultChildrenSelect,
    StarSelect,
    PriceRangeSlider
  },

  methods: {
    // 切换 '高级搜索' 的显示
    toggleSearchLineTwo(){
      let elem1 = document.querySelector('.i-s-row-two-wrap')
      let elem2 = document.querySelector('.home-page .el-carousel__container')

      this.isSearchLineTwoShow = !this.isSearchLineTwoShow

      if(this.isSearchLineTwoShow){
        Velocity(elem1, { height: '80px' }, { duration: 300 })
        Velocity(elem2, { height: '580px' }, { duration: 300 })
      }else{
        Velocity(elem1, { height: '0' }, { duration: 300 })
        Velocity(elem2, { height: '500px' }, { duration: 300 })
      }
    },

    // 设置城市类型
    setCityType(type, e){
      if(!e.target.getAttribute('checked')){
        this.$store.commit('setCommonState', {t: 'cityType', v: type})
        this.$store.commit('resetQueryParams')
        this.$store.commit('home/resetQueryParams')
      }
    },

    toHotelListPage(){
      // 如果未登录，则弹出登录框
      if(!this.$store.state.user){
        this.$store.commit('setCommonState', {t: 'showLoginDialog', v: true})
        return
      }

      let rootState = this.$store.state
      let state = this.$store.state.home

      let p1 = parseInt(state.priceRange[0])
      let p2 = parseInt(state.priceRange[1])
      let checkedPriceRange = p1 === 0
        ? (p2 === 3000 ? '' : `0-${p2}_${p2}元以下`)
        : (p2 === 3000 ? `${p1}-29999_${p1}元以上` : `${p1}-${p2}_${p1}-${p2}元`)

      let params = {
        "cityType":           rootState.cityType,
        "cityId":             state.cityId,
        "checkedStar":        state.checkedStar,
        "checkin":            rootState.checkin,
        "checkout":           rootState.checkout,
        "keyword":            state.keyword.replace(/^\s+|\s+$/g, ''),
        "roomNum":            rootState.roomNum,
        "adultNum":           rootState.adultNum,
        "childrenNum":        rootState.childrenNum,
        "childrenStr":        rootState.childrenStr,
        "checkedConfirmType": state.checkedConfirmType ? ['XS-1_立即确认'] : [],
        "checkedPriceRange":  checkedPriceRange,
      }

      if(params.keyword === ''){
        this.keywordclass = 'no-keyword'
        this.$alert('请输入酒店名或关键字！', '', {
          confirmButtonText: '确定',
          callback: action => {
            this.keywordclass = ''
          }
        });
        return
      }

      console.log(params);
      

      sessionStorage.setItem("initialHotelListParams",  window.JSON.stringify(params));

      window.open('#/hotelList')

    }
    
  },

  created() {
  },

  mounted() {}
}
</script>


<style lang="scss">
@import '../../assets/jl_sprites.scss';

.i-s-row-two-wrap {
    .el-input__inner{
      font-size: 14px;
      height: 40px;
      padding: 3px 10px;
      border: none;
      border-radius: 2px;
    }

    .el-checkbox__label{
      padding-left: 4px
    }
}

.search-outer{
    position: absolute;
    top: 360px;
    z-index: 99;
    left: 50%;
    margin-left: -520px;
    user-select: none;
    
    @at-root .index-search-wrap{
        width: 1040px;
        margin: auto;

        @at-root .i-s-row-slide-bar-wrap{

            @at-root .i-s-row-slide-bar-bg{
                width: 200px;
                height: 24px;
                background: white;
                margin: auto;
                border-bottom-left-radius: 5px;
                border-bottom-right-radius: 5px;
                opacity: .5;
                filter: Alpha(opacity=50);
            }

            @at-root .i-s-row-slide-bar{
                position: relative;
                font-size: 12px;
                color: #339afc;
                width: 200px;
                text-align: center;
                padding: 3px 0;
                margin: auto;
                margin-top: -24px;
                cursor: context-menu;
                
                .slide-bar{
                    @include jl_sprites;
                    position: relative;
                    display: inline-block;
                    margin-left: 5px;
                    top: -1px;

                    &.down{
                        @include triangle_blue_down;
                        
                    }

                    &.up{
                        @include triangle_blue_up;
                    }
                }
            }
        }
    }
}


// 顶部搜索栏第一行样式
.i-s-row-one-wrap{

    &:after{
        content: '';
        display: block;
        clear: both;
    }
    
    @at-root .i-s-bg-one{
        height: 80px;
        background: white;
        opacity: .75;
        filter: Alpha(opacity=75);
    }

    @at-root .i-s-row-one{
        position: relative;
        margin: 15px;
        height: 50px;
        background: white;
        margin-top: -65px;
        border-radius: 5px;
        overflow: hidden;

        @at-root .i-s-hotel-group{
            float: left;
            height: 50px;
            line-height: 50px;
            padding: 0 10px;
            border-right: solid 2px orange;

            @at-root .i-s-group-select{
                width: 75px;
                font-size: 16px;
            }
        }

        @at-root .i-s-origin-group{
            float: left;
            width: 248px;
            height: 50px;
            line-height: 50px;
            overflow: hidden;
            border-right: solid 2px orange;

            li{
                float: left;
                margin: 0 20px;
                cursor: context-menu;
                
                @at-root span.i-s-origin-switch{
                    font-size: 16px;
                    font-weight: bold;
                    color: #666666;

                    &[checked]{
                        color: orange;
                        border-bottom: solid 3px;
                        padding-bottom: 3px;
                    }
                }
            }
        }

        @at-root .i-s-keyword{
            float: left;
            padding-left: 15px;

            .el-input__prefix{
              font-size: 16px;
            }

            .el-input__inner{
              border: none;
              height: 50px;
              font-size: 16px;
              padding-left: 35px;
            }


        }

        @at-root .i-s-gap{
            float: left;
            border-right: solid 1px #999;
            height: 20px;
            margin-top: 15px;
        }

        @at-root .i-s-dates{
            float: left;
            padding-left: 15px;

            .date-range-picker.el-range-editor--small .el-range-input{
              font-size: 16px;
            }

            .el-range-editor--small.el-input__inner{
              border: none;
              height: 50px;
            }

            .el-range-editor--small .el-range-separator{
              line-height: 44px;
              font-size: 16px;
              width: 20px;
            }

            .el-date-editor .el-range__icon{
              font-size: 16px;
            }
        }

        @at-root .i-s-search-btn{
            float: right;
            width: 140px;
            height: 50px;
            background: orange;
            color: white;
            font-size: 20px;
            border: none;
            letter-spacing: 10px;
            padding-left: 10px;
            transition: all 0.2s linear 0s;

            &:hover{
                background: #e19202;
            }
        }
    }
}


// 顶部搜索栏第二行样式
.i-s-row-two-wrap{
    height: 0;
    overflow: hidden;

    &:after{
        content: '';
        display: block;
        clear: both;
    }
    
    @at-root .i-s-bg-two{
        height: 80px;
        background: white;
        opacity: .5;
        filter: Alpha(opacity=50);
    }

    @at-root .i-s-row-two{
        position: relative;
        margin: -60px 15px 10px;
        height: 50px;

        @at-root .i-s-label-pair{
            position: relative;
            margin-right: 30px;
            float: left;

            &:last-child{
                margin-right: 0;
            }

            // 兼容 ie8
            &[lastChild]{
                margin-right: 0!important;
            }

            >*{
                float: left;
            }

            label{
                margin-right: 10px;
                font-size: 14px;
                color: #333;
                line-height: 40px;
            }
        }
    }
}
</style>