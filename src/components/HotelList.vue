
<!-- 酒店列表页，酒店列表 -->
<template>
  <div class="hotel-list-outer">
    <ul class="hl-list">
      <li class="hl-item" v-for="o in hotelList" :key="o.infoId">
        <div class="hli-info-wrap">
          <div class="hli-img">
            <a href="#" 
              target="_blank">
              <img :src="o.picSrc" :style="o.extraStyle" />
            </a>
          </div>
          
          <div class="hli-info">
            <div class="hli-hotel-name-wrap">
              <a href="#"
                target="_blank">
                <h1 class="hli-hotel-name1">
                  {{o.infoName}}
                  <i class="hli-icon0 icon-star">
                    {{
                      ~('50,55'.indexOf( o.star )) ? '豪华型' :
                      ~('40,45'.indexOf( o.star )) ? '高档型' :
                      ~('30,35'.indexOf( o.star )) ? '舒适型' : '经济型'
                    }} 
                  </i>
                  <i class="hli-icon" :class="o.displayFlag === '1' ? ' icon-jinpai' : o.displayFlag === '2' ? ' icon-tuiguang' : ''"></i>
                </h1>
                <br>
                <h2 class="hli-hotel-name2">{{o.enName || ''}}</h2>
              </a>
            </div>
            
            <div class="hli-location">
              <label>位置：</label>
              <a title="map" class="hli-open-map" href="javascript:;" >
                <span class="hli-location-text">{{o.address.replace(/[： 。，！、:.!,]+$/g,'') || ''}}</span>
                <i class="hli-icon icon-location2"></i>
              </a>
            </div>
            
            <div class="hli-notice-wrap">
              <i class="hli-icon icon-notice"></i>
              <label>特别提示：</label>
              <span class="hli-notice-text" >{{o.indicate || '无'}}</span>
            </div>
          </div>
          
          <div class="hli-check-detail">
            <i class="hli-check-gz-icon" :class="o.isMyFavorite == 1 ? 'icon-gz-on' : 'icon-gz-off'"></i>
            <span class="hli-lowest-price-wrap">￥<span class="hli-lowest-price">{{parseInt( (o.minPrice || 0) )}}</span>起</span>
            <a target="_blank" href="#" style="position: absolute;right: 0;top: 75px;">
              <el-button type="primary" class="hli-check-detail-btn" size="small" plain style="font-size: 16px;padding: 9px;" icon="el-icon-document">
                查看详情
              </el-button>
            </a>
          </div>
        </div>

        <el-collapse >
            <el-collapse-item>
                <template slot="title">
                  <el-button type="text" class="hli-expand-wrap" size="small" style="font-size: 16px;padding: 9px;" @click="expandPrice(o.infoId)">
                    展开全部房型
                  </el-button>
                </template>
                <div class="hli-price-list-outer">
                  <div class="progress-outer" >
                    <el-progress :text-inside="true" :stroke-width="18" :show-text=false
                      :percentage="pricePercentageArr[o.infoId]" 
                      :color="progressArr[o.infoId]"
                      ></el-progress>
                    <div style="position: absolute;top: 0;width: 100%;text-align: center;color: rgb(21, 169, 94);line-height: 18px;">正在查询最低价，请稍候...</div>
                  </div>
              
                  <div class="hli-price-list-wrap">
                    <div class="fzg-loading-wrap" v-if="!hotelPriceArr[o.infoId]">
                      <img src="https://qnb.oss-cn-shenzhen.aliyuncs.com/real_1514022140288.gif"/>
                    </div>
                  </div>
                </div>
            </el-collapse-item>
        </el-collapse>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: '',

  data(){
    return {
      hotelPriceArr: {},
      pricePercentageArr: {},
      progressArr: {},
    }
  },

  props: {
    
  },

  components: {

  },

  computed: {
    hotelList(){
      return this.$store.getters['hotelList/getHotelList']
    },
  },
  
  methods: {
    expandPrice(infoId){
      if(!this.hotelPriceArr[infoId]){
        let params = {
          hotelId: infoId,
          checkInDate: this.$store.state.hotelList.checkin,
          checkOutDate: this.$store.state.hotelList.checkout,
          roomNum: this.$store.state.hotelList.roomNum,
          adultNum: this.$store.state.hotelList.adultNum,
          childrenNum: this.$store.state.hotelList.childrenNum,
          childrenAgesStr: this.$store.state.hotelList.childrenStr,
          isSearchSurcharge: 0
        }

        this.queryPriceListInStock(params)
        this.queryPriceList(params)
      }
    },

    // 查缓存内的价格
    async queryPriceListInStock(params){
      let res = await this.$api.hotelList.syncGetHotelPriceListInStock(params)

      // 如果实查的价格比缓存的价格更早返回前端，则不再将缓存的价格赋值给相关变量
      if(!this.hotelPriceArr[params.hotelId]){
          this.$set(this.hotelPriceArr, params.hotelId, res)
      }
    },

    // 查价，实查
    async queryPriceList(params){
      let timer1, timer2, timer3
      let percentage = 1
      let c1 = 255, c2 = 45, c3 = 0
      let _this = this

      _this.$set(_this.pricePercentageArr, params.hotelId, percentage)
      _this.$set(_this.progressArr, params.hotelId, `rgba(${c1}, ${c2}, ${c3}, 0.7)`)

      // 前面 80% 的部分，每一个百分比耗时 35 毫秒
      timer1 = setInterval(() => {
        percentage = _this.pricePercentageArr[params.hotelId] + 1
        c1 = parseInt(255 - percentage * 2.2)
        c2 = parseInt(45 + percentage * 1.38)
        c3 = parseInt(percentage * 0.35)

        _this.$set(_this.pricePercentageArr, params.hotelId, percentage)
        _this.$set(_this.progressArr, params.hotelId, `rgba(${c1}, ${c2}, ${c3}, 0.7)`)

        if(_this.pricePercentageArr[params.hotelId] >= 80){
          clearInterval(timer1)

          // 80% ~ 95% 的部分，每一个百分比耗时 333 毫秒
          timer2 = setInterval(() => {
            percentage = _this.pricePercentageArr[params.hotelId] + 1
            c1 = parseInt(255 - percentage * 2.2)
            c2 = parseInt(45 + percentage * 1.38)
            c3 = parseInt(percentage * 0.35)

            _this.$set(_this.pricePercentageArr, params.hotelId, percentage)
            _this.$set(_this.progressArr, params.hotelId, `rgba(${c1}, ${c2}, ${c3}, 0.7)`)
            
            if(_this.pricePercentageArr[params.hotelId] >= 95){
              clearInterval(timer2)

              // 95% ~ 99% 的部分，每一个百分比耗时 1250 毫秒
              timer3 = setInterval(() => {
                percentage = _this.pricePercentageArr[params.hotelId] + 1
                c1 = parseInt(255 - percentage * 2.2)
                c2 = parseInt(45 + percentage * 1.38)
                c3 = parseInt(percentage * 0.35)

                _this.$set(_this.pricePercentageArr, params.hotelId, percentage)
                _this.$set(_this.progressArr, params.hotelId, `rgba(${c1}, ${c2}, ${c3}, 0.7)`)

                if(_this.pricePercentageArr[params.hotelId] >= 99){
                  clearInterval(timer3)
                }
              }, 1250)
            }
          }, 333)
        }
      }, 35)
    
      let res = await this.$api.hotelList.syncGetHotelPriceList(params)
      this.$set(this.hotelPriceArr, params.hotelId, res)

      clearInterval(timer1)
      clearInterval(timer2)
      clearInterval(timer3)

      _this.$set(_this.pricePercentageArr, params.hotelId, 100)
      _this.$set(_this.progressArr, params.hotelId, `rgba(35, 183, 35, 0.7)`)

      setTimeout(() => {
        _this.$set(_this.pricePercentageArr, params.hotelId, 0)
      }, 300)
    }
  },
}
</script>


<style lang="scss">
.hotel-list-outer{

    .el-collapse {
        position: relative;
        border-top: none;
        border-bottom: none;
    }

    .el-collapse-item__header{
        height: 35px;
        line-height: 35px;
        position: absolute;
        right: 18px;
        top: -58px;
        border-bottom: none;
    }

    .el-collapse-item__arrow{
        position: relative;
        line-height: 35px;
        margin-right: 0;
        margin-left: -8px;
        color: #409EFF;
    }

    .el-button [class*=el-icon-]+span{
      margin-left: 0;
    }

    .el-collapse-item:last-child {
        margin-bottom: 0px;
    }
}
</style>


<style scoped lang="scss">
@import "../assets/jl_sprites.scss";

.hotel-list-outer{
    min-height: 200px;
    
    @at-root .hl-list{
        width: 1200px;
        margin: auto;
        
        @at-root .hl-item{
            background: white;
            margin: 20px 0;
            box-sizing: border-box;
            box-shadow: 0 0 5px #e8e8e8;
            
            @at-root .hli-info-wrap{
                font-size: 15px;
                padding: 20px;
                
                > *{
                    float: left;
                    height: 160px;
                }
                
                &:after{
                    content: '';
                    display: block;
                    clear: both;
                }
                
                @at-root .hli-img{
                    width: 280px;
                    overflow: hidden;
                    
                    img{
                        float: left;
                        width: 100%;
                        min-height: 100%;
                    }
                }
                
                @at-root .hli-info{
                    width: 700px;
                    margin: 0 20px;
                    
                    @at-root .hli-hotel-name-wrap{
                        a{
                            text-decoration: none;
                        }
                        
                        @at-root .hli-hotel-name1{
                            display: inline-block;
                            font-weight: normal;
                            font-size: 20px;
                            color: #339afc;
                        }
                        
                        @at-root .hli-hotel-name2{
                            display: inline-block;
                            color: #666666;
                            font-weight: normal;
                        }
                    }
                    
                    @at-root .hli-location{
                        margin: 30px 0 20px;
                        
                        label{

                        }
                        
                        @at-root .hli-location-text{
                            color: #333333;
                            text-decoration: underline;
                            margin-right: 5px;
                        }
                    }
                    
                    @at-root .hli-notice-wrap{
                        
                        > *{
                            float: left;
                        }
                        
                        &:after{
                            content: '';
                            display: block;
                            clear: both;
                        }
                        
                        label{
                            color: black;
                            font-weight: bold;
                            margin-left: 5px;
                        }
                        
                        @at-root .hli-notice-text{
                            display: inline-block;
                            width: 590px;
                            height: 22px;
                            cursor: context-menu;

                            text-overflow: ellipsis;
                            white-space: nowrap;
                            overflow: hidden;
                        }
                    }
                }
                
                @at-root .hli-check-detail{
                    float: right;
                    position: relative;
                    width: 130px;
                    
                    @at-root .hli-check-gz-icon{
                        position: absolute;
                        top: 0;
                        right: 0;
                    }
                    
                    @at-root .hli-lowest-price-wrap{
                        position: absolute;
                        top: 30px;
                        right: 0;
                        width: 280px;
                        color: red;
                        font-size: 16px;
                        text-align: right;
                        
                        @at-root .hli-lowest-price{
                            font-size: 26px;
                            margin: 0 2px;
                        }
                    }
                    
                    @at-root .hli-check-detail-btn{
                        
                    }

                    .icon-gz-off{
                        @include jl_sprites;
                        @include gz4;
                    }

                    .icon-gz-on{
                        @include jl_sprites;
                        @include gz3;
                    }
                }
            }
            
            @at-root .progress-outer{
                position: relative;
                box-shadow: 0 0 5px #e8e8e8;
                border: solid 1px #e8e8e8;
                margin: 0 20px 10px;
                border-radius: 10px;
                overflow: hidden;
            }

            @at-root .hli-price-list-outer{

                @at-root .hli-price-list-wrap{
                    margin: 0 20px;
                    overflow: hidden;
    
                    @at-root .fzg-loading-wrap{
                        max-width: 1200px;
                        margin: auto;
                        padding: 15px 0;
                        border-top: solid 1px #ddd;
                        background: white;
    
                        img{
                            display: block;
                            margin: auto;
                        }
                    }
    
                    @at-root .hli-error-msg{
                        text-align: center;
                        color: red;
                        font-size: 16px;
                        padding: 15px;
                        border-top: solid 1px #ddd;
                    }
                }
            }

            @at-root .hli-expand-wrap{
                
            }
        }
    }

    @at-root .hli-icon0{
        margin-right: 5px;
    }
    
    @at-root .hli-icon{
        @include jl_sprites;
        display: inline-block;
        position: relative;
        
        @at-root .icon-star{
            position: relative;
            top: -2px;
            display: inline-block;
            font-size: 12px;
            font-style: normal;
            background: #7eb6ec;
            color: white;
            width: 50px;
            height: 18px;
            line-height: 18px;
            text-align: center;
            border-radius: 3px;
        }
        
        &.icon-jinpai{
            @include jinpai;
            top: 3px;
        }
        
        &.icon-tuiguang{
            @include tuiguang;
            top: 3px;
        }
        
        &.icon-location2{
            @include location2;
            top: 3px;
        }
        
        &.icon-notice{
            @include specialNotice;
            top: 1px;
        }
    }
}
</style>