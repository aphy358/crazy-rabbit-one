
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
            <a 
              target="_blank" class="hli-check-detail-btn">
              查看详情
            </a>
          </div>
        </div>
        
        <div class="hli-price-list-outer">
          <!-- <div class="progress-outer"></div> -->
      
          <div class="hli-price-list-wrap">
            <div class="fzg-loading-wrap" v-if="!hotelPriceArr[o.infoId]">
              <img src="https://qnb.oss-cn-shenzhen.aliyuncs.com/real_1514022140288.gif"/>
            </div>
          </div>
        </div>
        
        <div class="hli-expand-wrap">
          <div class="hli-expand-inner" @click="expandPrice(o.infoId)">
            <span>展开全部房型</span>
            <i class="hli-icon icon-down" style="margin-left:3px"></i>
          </div>
        </div>
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

        this.queryPriceList(params)
      }
    },

    async queryPriceList(params){
      let res = await this.$api.hotelList.syncGetHotelPriceListInStock(params)
      this.$set(this.hotelPriceArr, params.hotelId, res)
      
      // this.hotelPriceArr[params.hotelId] = res
    }
  }
}
</script>

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
            box-shadow: 0 0 5px #dadada;
            
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
                        right: 20px;
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
                        position: absolute;
                        bottom: 25px;
                        left: 0;
                        width: 130px;
                        height: 50px;
                        line-height: 50px;
                        text-align: center;
                        font-size: 18px;
                        color: #339afc;
                        border: solid 1px #339afc;
                        border-radius: 5px;
                        letter-spacing: 1px;
                        text-decoration: none!important;
                        transition: all 0.2s linear;

                        &:hover{
                            color: darken($color: #339afc, $amount: 10%);
                            border-color: darken($color: #339afc, $amount: 10%);
                            box-shadow: 0 0 5px #339afc;
                        }
                    }
                }
            }
            
            @at-root .progress-outer{
                position: relative;
                box-shadow: 0 0 5px #dadada;
                border: solid 1px #d0d0d0;
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
                height: 30px;
                line-height: 30px;
                text-align: center;
                color: #339afc;
                background: #f4fbfe;
                border-top: solid 1px #ddd;
                box-sizing: border-box;
                cursor: context-menu;
                
                &.fix-bottom{
                    position: fixed;
                    bottom: 0;
                    width: 1200px;
                    box-shadow: 0 0 5px #dadada;
                    z-index: 9999;
                }
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
        
        &.icon-down{
            @include triangle_blue_down;
            top: -1px;

            &:before{
                content: none;
            }
        }
        
        &.icon-up{
            @include triangle_blue_up;
            top: -1px;

            &:before{
                content: none;
            }
        }
    }
}
</style>