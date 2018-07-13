
<!-- banner 搜索栏 -->
<template>
  <section class="search-outer">
      <div class="index-search-wrap">
          <div class="i-s-row-one-wrap">
              <div class="i-s-bg-one"></div>
              <div class="i-s-row-one">

                  <ul class="i-s-origin-group">
                      <li><span switch name="i-s-origin-switch" class="i-s-origin-switch" data-src="kwc-block-0" data-val="0" data-track="公共_搜索栏_区域_国内" checked>国内</span></li>
                      <li><span switch name="i-s-origin-switch" class="i-s-origin-switch" data-src="kwc-block-2" data-val="2" data-track="公共_搜索栏_区域_港澳台">港澳台</span></li>
                      <li><span switch name="i-s-origin-switch" class="i-s-origin-switch" data-src="kwc-block-3" data-val="3" data-track="公共_搜索栏_区域_境外">境外</span></li>
                  </ul>
      
                  <div class="i-s-keyword">
                      <i class="i-s-keyword-icon"></i>
                      <input type="text" class="i-s-keyword-input" placeholder="城市/酒店名称" title="城市/酒店名称" data-track="公共_搜索栏_关键字">
                  </div>
      
                  <div class="i-s-gap"></div>
      
                  <div class="i-s-dates">
                      <i class="i-s-dates-icon"></i>
                      <input type="text" class="i-s-dates-input my-calendar-input" placeholder="入住离店日期" unselectable='on' readonly title="入住离店日期">
                  </div>
      
                  <button class="i-s-search-btn" data-track="公共_搜索栏_搜索">搜索</button>
              </div>
          </div>

          <div class="i-s-row-two-wrap hidden">
              <div class="i-s-bg-two"></div>
              <div class="i-s-row-two">
                  <div class="i-s-label-pair">
                      <label>间数</label>
                      <div class="drag-down-wrap">
                          <my-select class="i-s-room-num" unselectable="on" data-value="1" data-track="公共_搜索栏_间数">1间</my-select>
                          <i class="drag-down"></i>
                      </div>
                  </div>

                  <ul class="i-s-label-pair">
                      <label>酒店等级</label>
                      <div class="drag-down-wrap">
                          <input type="text" class="i-s-star" placeholder="酒店等级" unselectable='on' readonly data-track="公共_酒店等级">
                          <i class="drag-down"></i>
                      </div>
                  </ul>
                  
                  <div class="i-s-label-pair hidden" id="index-adult-children">
                      <label>入住人数</label>
                      <div class="drag-down-wrap">
                          <input type="text" class="i-s-adult-children" value="2成人，0小孩" unselectable='on' readonly>
                          <i class="drag-down"></i>
                      </div>
                  </div>
                  
                  <div class="i-s-label-pair">
                      <label>价格区间</label>
                      <div class="i-s-range-outer"></div>
                  </div>
                  
                  <div class="i-s-label-pair" lastChild>
                      <label><input type="checkbox" class="i-s-confirm-now" data-track="公共_搜索栏_立即确认"><span>立即确认</span></label>
                  </div>
              </div>
          </div>

          <div class="i-s-row-slide-bar-wrap">
              <div class="i-s-row-slide-bar-bg"></div>
              <div class="i-s-row-slide-bar" data-track="公共_搜索栏_高级搜索条件">
                  高级搜索条件
                  <i class="slide-bar down"></i>
              </div>
          </div>
      </div>
  </section>
</template>

<script>
import CityTypeSelect from '../common/CityTypeSelect'
import RoomNumSelect from '../common/RoomNumSelect'
import DateRange from '../common/DateRange'
import KerywordSuggest from '../common/KerywordSuggest'
import AdultChildrenSelect from '../common/AdultChildrenSelect'

export default {
  name: 'SearchLine',

  data() {
    return {
    }
  },

  props: [],

  computed: {
    
  },

  components: {
    CityTypeSelect,
    RoomNumSelect,
    DateRange,
    KerywordSuggest,
    AdultChildrenSelect
  },

  methods: {
    
  },

  created() {
  },

  mounted() {}
}
</script>


<style lang="scss">
@import '../../assets/jl_sprites.scss';

.search-outer{
    position: absolute;
    top: 360px;
    z-index: 99;
    left: 50%;
    margin-left: -520px;
    user-select: none;
    
    @at-root .let-me-fly{
        position: relative;
        margin: 0 auto;
        padding: 120px 0 60px;
        width: 564px;

        @at-root .l-m-f-icon{
            @include jl_sprites;
            @include letmefly;
            display: block;
        }

        &.visible-hidden{
            visibility: hidden;
            position: static;
        }
    }

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
                
                @at-root span[name="i-s-origin-switch"]{
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

            >*{
                float: left;
            }

            @at-root .i-s-keyword-icon{
                @include jl_sprites;
                @include location;
                margin: 16px 12px 0 32px;
            }

            @at-root .i-s-keyword-input{
                border: none;
                height: 50px;
                line-height: 50px;
                font-size: 16px;
                width: 290px;
                padding-right: 5px;
                box-sizing: border-box;

                &.error{
                    background: rgb(249, 144, 144);
                }
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

            >*{
                float: left;
            }

            @at-root .i-s-dates-icon{
                @include jl_sprites;
                @include datelogo;
                margin: 17px 12px 0 32px;
            }

            @at-root .i-s-dates-input{
                border: none;
                height: 50px;
                line-height: 50px;
                font-size: 16px;
                width: 190px;
                cursor: context-menu;
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

            select{
                height: 40px;
                line-height: 40px;
                font-size: 14px;
                background: white;
                border: none;
                border-radius: 3px;
                padding: 10px 5px;
                color: #333;
            }           
            
            @at-root .i-s-confirm-now{
                float: left;
                margin: 14px 2px;
                background: none!important;
                padding: 0!important;
            }

            @at-root .i-s-room-num{
                width: 50px;
            }

            @at-root .i-s-adult-children{
                width: 115px;
                cursor: context-menu;
            }

            .i-s-star{
                width: 180px;
                cursor: context-menu;
            }
        }
    }
}
</style>