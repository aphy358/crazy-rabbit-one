
<!-- 酒店详情页，第一部分酒店信息 -->
<template>
  <div class="hotel-detail-info-outer">
    <div class="hotel-detail-info-inner" v-if="hotelInfo">
      <div class="hdi-head">
        <h1 class="hdi-hotel-name1">
          {{ hotelInfo.infoName }}
          <i class="hli-icon0 icon-star">
            {{ 
              ~('50,55'.indexOf( hotelInfo.star )) ? '豪华型' :
              ~('40,45'.indexOf( hotelInfo.star )) ? '高档型' :
              ~('30,35'.indexOf( hotelInfo.star )) ? '舒适型' : '经济型'
            }}
          </i>
          <i class="hli-icon" :class="hotelInfo.displayFlag === '1' ? ' icon-jinpai' : hotelInfo.displayFlag === '2' ? ' icon-tuiguang' : ''"></i>
        </h1>
      
        <h2 class="hdi-hotel-name2">{{ hotelInfo.enName || '' }}</h2>
      
      <div class="hdi-location">
        <label>位置：</label>
        <a title="map" class="hdi-open-map" href="javascript:;" >
          <span class="hdi-location-text">{{ hotelInfo.address.replace(/[： 。，！、:.!,]+$/g,'') || '' }}</span>
          <i class="hli-icon icon-location2"></i>
        </a>
      </div>
      
      <div class="hdi-lowest-wrap">
        <div class="hdi-gz-wrap">
          <div class="hdi-gz-inner" v-if="hotelInfo.hasOwnProperty('isMyFavorite') && hotelInfo.isMyFavorite === 1">
            <p><i class="hli-icon icon-gz-on"></i></p>
            <p class="icon-gz-on-tips">已关注</p>
          </div>
          <div class="hdi-gz-inner" v-else>
            <p><i class="hli-icon icon-gz-off"></i></p>
            <p class="icon-gz-on-tips">未关注</p>
          </div>
        </div>
      </div>
      </div>

      <div class="hdi-body">
      <div class="hdi-img-outer">
        <div class="hdi-img-wrap-big">
          <img :src="picSrc" :style="hotelInfo.extraStyle" />
        </div>
        <div class="hdi-img-wrap-small">
          <div class="hdi-img-scroll scroll-up">
            <div class="hdi-img-scroll-mask"></div>
            <i class="hli-icon disabled"></i>
          </div>
          <div class="hdi-img-scroll scroll-down">
            <div class="hdi-img-scroll-mask"></div>
            <i class="hli-icon"></i>
          </div>
          <ul class="hdi-img-small-list">
            <li class="hdi-img-small-item" v-for="(pic, i) in hotelInfo.picList" :key="i" @click="clickHotelImg(pic, i)">
              <img :src="pic" :style="hotelInfo.extraStyle2" />
              <div class="hdi-isi-mask" :class="i === currentImgIndex ? '' : ' hidden'"></div>
            </li>
          </ul>
        </div>
      </div>
      <div class="hdi-brief-wrap">
        <el-scrollbar class="hdi-brief-scroll">
          <ul class="hdi-brief-list">
            <li class="hdi-brief-item">
              <p class="hdi-brief-item-title">
                <i class="hli-icon icon-jiudianjianjie"></i>
                <span>酒店简介</span>
              </p>
              <p class="hdi-brief-item-content">{{ hotelInfo.infoDesc || '' }}</p>
            </li>
            <li class="hdi-brief-item">
              <p class="hdi-brief-item-title">
                <i class="hli-icon icon-lianxifangshi"></i>
                <span>联系方式</span>
              </p>
              <p class="hdi-brief-item-content">{{ hotelInfo.bookingPhone || '' }}</p>
            </li>
            <li class="hdi-brief-item">
              <p class="hdi-brief-item-title">
                <i class="hli-icon icon-tebietixing"></i>
                <span>特别提示</span>
              </p>
              <p class="hdi-brief-item-content">{{ hotelInfo.indicate || '无' }}</p>
            </li>
          </ul>
        </el-scrollbar>
      </div>
      </div>
  </div>
  </div>
</template>

<script>
export default {
  name: '',

  data(){
    return {
      picSrc: '54',
      currentImgIndex: 0,
    }
  },

  // props: ['hotelInfo'],

  components: {

  },

  computed: {
    hotelInfo: function(){
      let hotelInfo = this.$store.getters["hotelDetail/getHotelInfo"]

      if(hotelInfo){
        this.picSrc = hotelInfo.picSrc
      }

      return hotelInfo
    }
  },
  
  methods: {
    clickHotelImg(pic, i){
      this.picSrc = pic
      this.currentImgIndex = i
    }

  }
}
</script>

<style  lang="scss">
@import "../assets/jl_sprites.scss";
.hotel-detail-info-outer{
    background: white;
    box-shadow: 0 0 5px #ddd;
    
    @at-root .hotel-detail-info-inner{
        color: #666666;
        width: 1200px;
        margin: auto;
        padding: 20px 0;
        
        @at-root .hdi-head{
            position: relative;
            
            @at-root .hdi-hotel-name1{
                font-size: 20px;
                color: #339afc;
                font-weight: bold;
                
                i{
                    margin-left: 5px;
                }
            }
            
            @at-root .hdi-hotel-name2{
                color: #666666;
                font-size: 14px;
                font-weight: normal;
            }
            
            @at-root .hdi-location{
              font-size: 14px;
                margin: 5px 0;
                max-width: 800px;
                
                label{

                }
                
                @at-root .hdi-location-text{
                    color: #333333;
                    text-decoration: underline;
                    margin-right: 5px;
                }
            }
            
            @at-root .hdi-lowest-wrap{
                position: absolute;
                 //width: 400px;
                width: 200px;
                height: 60px;
                line-height: 60px;
                top: 10px;
                right: 0;
                color: red;
                
                > *{
                    float: left;
                }
                
                @at-root .hdi-lowest-price{
                    //display: none;
                    width: 200px;
                    text-align: center;
                    
                    @at-root .hdi-lowest-num{
                        font-size: 30px;
                        margin: 0 3px;
                        letter-spacing: 1px;
                    }
                }
                
                @at-root .hdi-lowest-seperator{
                    width: 1px;
                    height: 60px;
                    background: #ccc;
                    
                }
                
                @at-root .hdi-gz-wrap{
                    width: 199px;
                    
                    @at-root .hdi-gz-inner{
                        font-size: 14px;
                        width: 45px;
                        text-align: center;
                        color: #666;
                        line-height: 20px;
                        margin: 4px auto;
                        
                        p{
                            
                        }
                    }
                }
            }
        }
        
        @at-root .hdi-body{
            margin-top: 10px;
            overflow: hidden;
            
            @at-root .hdi-img-outer{
                float: left;
                width: 765px;
                margin-right: 20px;
                
                @at-root .hdi-img-wrap-big{
                    float: left;
                    width: 600px;
                    height: 400px;
                    margin-right: 5px;
                    overflow: hidden;
                    
                    img{
                        float: left;
                        width: 100%;
                        min-height: 100%;
                    }
                }
                
                @at-root .hdi-img-wrap-small{
                    position: relative;
                    float: left;
                    width: 160px;
                    height: 400px;
                    overflow: hidden;
                    
                    @at-root .hdi-img-scroll{
                        position: absolute;
                        left: 0;
                        width: 100%;
                        z-index: 9;
                        
                        @at-root .hdi-img-scroll-mask{
                            height: 30px;
                            background: black;
                            opacity: 0.5;
                            filter: alpha(opacity=50);
                        }
                        
                        i{
                            position: absolute;
                            top: 0;
                            left: 50%;
                            margin-left: -10px;
                            margin-top: 9px;
                        }
                        
                        &.scroll-up{
                            top: 0;
                            
                            i{
                                @include swipeUp2;
                                
                                &.disabled{
                                    @include swipeUp1
                                }
                            }
                        }
                        
                        &.scroll-down{
                            bottom: 0;
                            
                            i{
                                @include swipeDown2;
                                
                                &.disabled{
                                    @include swipeDown1
                                }
                            }
                        }
                    }
                        
                    @at-root .hdi-img-small-list{
                        
                        @at-root .hdi-img-small-item{
                            float: left;
                            width: 160px;
                            height: 110px;
                            margin-top: 5px;
                            overflow: hidden;
                            
                            &:first-child{
                                margin-top: 0;
                            }
                            
                            img{
                                float: left;
                                width: 100%;
                                min-height: 100%;
                            }
                            
                            .hdi-isi-mask{
                                position: relative;
                                border: solid 3px #339afc;
                                height: 110px;
                                box-sizing: border-box;
                            }
                        }
                    }
                }
            }
            
            @at-root .hdi-brief-wrap{
                float: left;
                width: 415px;
                height: 400px;
                border: solid 1px #e3e3e3;
                box-sizing: border-box;

                @at-root .hdi-brief-scroll{
                  height: 100%;

                  .el-scrollbar__wrap{
                    overflow: auto;

                    .el-scrollbar__view{
                      padding: 20px;
                    }
                  }
                }
                
                @at-root .hdi-brief-list{
                    
                    @at-root .hdi-brief-item{
                        
                        @at-root .hdi-brief-item-title{
                            height: 26px;
                            line-height: 26px;
                            color: #339afc;
                            margin-bottom: 5px;
                            
                            .hli-icon{
                                float: left;
                                margin-right: 10px;
                            }
                            
                            span{
                                font-size: 18px;
                            }
                        }
                        
                        @at-root .hdi-brief-item-content{
                            font-size: 15px;
                            margin-bottom: 15px;
                            padding-left: 35px;
                        }
                    }
                }
            }
        }
    }
}
</style>