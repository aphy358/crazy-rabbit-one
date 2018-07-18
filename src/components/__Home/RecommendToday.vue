
<!-- 今日主推 -->
<template>
  <!-- 今日主推 -->
  <section class="index-recommend-today-outer">
    <div class="i-r-t-inner">
      <div class="i-r-title">
        <div class="i-r-title-line"><i class="i-r-title-icon right"></i></div>
        <h1>今日主推</h1>
        <div class="i-r-title-line"><i class="i-r-title-icon left"></i></div>
      </div>
      
      <div id="recommendTodayWrap">
        
        <ul class="i-r-switch-group">
          <li v-for="o in mainPushCityDtoList" :key="o.infoId">
            <button class="i-r-switch-btn" :checked="o.cityName == checkedCity" @click="checkedCity = o.cityName">{{o.cityName}}</button>
          </li>
        </ul>

        <el-carousel v-for="o in mainPushCityDtoList" :key="o.infoId" class="main-push-carousel-block" 
          arrow="always" indicator-position="none" height="325px" :autoplay="false">

          <el-carousel-item v-for="(p, i) in o.groupedProductDtoList" :key="i">
            <ul class="i-r-t-hotel-group">
              <li v-for="(q, j) in p" :key="j" class="i-r-t-hotel-item">
                <a :href="q.detailLink" target="_blank">
                  <div class="irt-img-wrap">
                    <img :src="q.picSrc" alt="" :class="{'noPic': q.picSrc === '/common/images/nopic.png'}" >
                    <i class="irt-gz-icon"></i>
                  </div>
                  <div class="irt-row-one">
                    <b>{{q.infoName}}</b>
                    <span class="irt-order-btn">立即预订</span>
                  </div>
                </a>
              </li>
            </ul>
          </el-carousel-item>
        </el-carousel>        

        <div class="i-recommend-btn">
          <a href="/mainPush/toTodayPush.do" target="_blank" class="">查看全部<i class="i-check-more-icon"></i></a>
        </div>

      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: '',

  data(){
    return {
      mainPushCityDtoList: [],
      checkedCity: '',
    }
  },

  props: {
    
  },

  components: {

  },

  computed: {
    
  },
  
  methods: {
    // 过滤数据，同一酒店只允许出现一个主推产品
    grepData(mainPushCityDtoList){
      for(let i = 0; i < mainPushCityDtoList.length; i++){
        let o = mainPushCityDtoList[i], tmpProductList = [];
        
        if(o.isShow){
          for(let j = 0; o.mainPushProductDtoList && j < o.mainPushProductDtoList.length; j++){
            let p = o.mainPushProductDtoList[j];

            if(tmpProductList.filter(n => n.infoId == p.infoId).length < 1){
              tmpProductList.push(p)
            }
          }

          o.mainPushProductDtoList = tmpProductList
          o.groupedProductDtoList = []

          for(let k = 0; k < tmpProductList.length; k++){
            let q = tmpProductList[k]
            let l = Math.floor(k / 4)

            if(!o.groupedProductDtoList[l]){
              o.groupedProductDtoList[l] = []
            }
            o.groupedProductDtoList[l].push(q)
          }

        }else{
          mainPushCityDtoList.splice(i--, 1);
        }
      }
      
      return mainPushCityDtoList
    },

  },

  created(){
    this.$api.home.syncGetTodayPush().then(res => {
      if( res.returnCode === 1 ){
        if( res.data.mainPushCityDtoList && res.data.mainPushCityDtoList.length ){
          this.grepData(res.data.mainPushCityDtoList)
          this.mainPushCityDtoList = res.data.mainPushCityDtoList

          if(this.mainPushCityDtoList.length > 0){
            this.checkedCity = this.mainPushCityDtoList[0].cityName
          }
        }
      }else if( res.returnCode === -400001 ){
      }
    })
  }
}
</script>

<style lang="scss">
@import '../../assets/jl_sprites.scss';

// 今日主推
.index-recommend-today-outer{
    background: white;
    margin-top: 20px;

    @at-root .i-r-t-inner{
        font-size: 14px;
        color: #333333;
        width: 1200px;
        min-height: 200px;
        margin: auto;
        padding-top: 20px;

        @at-root .i-r-title{
            margin-bottom: 20px;
            overflow: hidden;

            @at-root .i-r-title-line{
                position: relative;
                float: left;
                width: 515px;
                border-bottom: solid 1px #e3e3e3;
                margin-top: 19px;

                @at-root .i-r-title-icon{
                    @include jl_sprites;
                    @include little_ball;
                    position: absolute;
                    top: -3px;

                    &.right{
                        right: 0;
                    }

                    &.left{
                        left: 0;
                    }
                }
            }

            h1{
                float: left;
                width: 170px;
                text-align: center;
                font-size: 26px;
                font-weight: normal;
            }
        }

        @at-root .i-r-switch-group{
            text-align: center;
            overflow: hidden;

            li{
                display: inline-block;
            }

            @at-root .i-r-switch-btn{
                min-width: 80px;
                height: 30px;
                border: none;
                font-size: 18px;
                margin: 0 10px;
                padding: 0 10px;

                &:hover{
                    color: orange;
                }

                &[checked]{
                    color: orange;
                    border: solid 1px orange;
                    border-radius: 5px;
                }
            }
        }

        @at-root .main-push-carousel-block{
            width: 1340px;
            margin-left: -70px;

            .el-carousel__item{
              margin: 0 50px;
            }
        }

        @at-root .i-r-switch-hotels{
            position: relative;
            display: none;
            height: 310px;

            &[checked]{
                display: block;
            }

            .switch-bar{
                @include jl_sprites;
                position: absolute;
                top: 50%;
                margin-top: -20px;
    
                &.switch-left{
                    @include left_n2;
                    left: 0;
                    margin-left: -50px;
    
                    &:hover{
                        @include left_n3;
                    }
    
                    &.disabled{
                        @include left_n1;
                    }
                }
    
                &.switch-right{
                    @include right_n2;
                    right: 0;
                    margin-right: -50px;
    
                    &:hover{
                        @include right_n3;
                    }
    
                    &.disabled{
                        @include right_n1;
                    }
                }
            }

            @at-root .i-r-t-hotel-group{
                width: 1220px;
                padding: 20px;
                margin-left: -20px;
                overflow: hidden;

                &:after{
                    content: '';
                    display: block;
                    clear: both;
                }

                @at-root .i-r-t-hotel-item{
                    float: left;
                    width: 285px;
                    height: 282px;
                    margin: 0 0 20px 20px;
                    border: solid 1px #e3e3e3;
                    box-sizing: border-box;
                    transition: all .2s linear;
                    user-select: none;

                    a{
                        text-decoration: none;
                    }
                    
                    &:hover{
                        //box-shadow: 0 0 15px rgba(82, 80, 84, 0.2);
                        box-shadow: 0 15px 30px rgba(0,0,0,0.1);
                        transform: translate3d(-2px, -2px, 0)
                    }
                    
                    @at-root .irt-img-wrap{
                        position: relative;
                        height: 220px;
                        overflow: hidden;

                        img{
                            float: left;
                            width: 100%;
                            min-height: 100%;

                            &.noPic{
                              width: auto;
                              margin-left: 32px;
                            }
                        }

                        @at-root .irt-img-tag-icon{
                            @include jl_sprites;
                            @include hotel_tag;
                            position: absolute;
                            top: 0;
                            left: 0;
                            color: white;
                            font-style: normal;
                            line-height: 30px;
                            text-align: center;
                        }

                        @at-root .irt-gz-icon{
                            //display: none;
                            @include jl_sprites;
                            position: absolute;
                            top: 5px;
                            right: 5px;

                            &.icon-gz-off{
                                @include gz4;
                            }

                            &.icon-gz-on{
                                @include gz3;
                            }
                        }
                    }

                    @at-root .irt-row-one{
                        font-size: 16px;
                        color: #339afc;
                        height: 30px;
                        line-height: 30px;
                        margin: 15px 10px;

                        b{
                            float: left;
                            max-width: 175px;
                            height: 30px;
                            overflow: hidden;
                        }

                        @at-root .irt-order-btn{
                            float: right;
                            font-size: 15px;
                            text-align: center;
                            width: 80px;
                            height: 30px;
                            border: none;
                            border-radius: 5px;
                            background: orange;
                            color: white;
                        }
                    }

                }
            }
        }

        @at-root .i-recommend-btn{
            text-align: center;
            min-height: 70px;

            a{
                display: inline-block;
                color: #333333;
                text-decoration: none;
                border: solid 1px #ccc;
                border-radius: 5px;
                height: 30px;
                line-height: 30px;
                width: 100px;
                margin-bottom: 0;
                transition: all 0.2s linear;
                cursor: context-menu;

                @at-root .i-check-more-icon{
                    @include jl_sprites;
                    @include more1;
                    display: inline-block;
                    margin-left: 5px;
                    margin-bottom: 1px;
                }                

                &.bottom-one{
                    margin: 0px 0 60px;
                }

                &:hover{
                    color: #1d78ce;
                    border: solid 1px #1d78ce;
                    box-shadow: 0 0 5px #2d93f3;

                    .i-check-more-icon{
                        @include more2;
                    }
                }
            }
        }
    }

}

</style>