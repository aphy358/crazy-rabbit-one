
<!-- 我的关注、我的订单 -->
<template>
  <section class="index-concern-order-outer">
      <div class="i-c-o-inner">
          <!-- 我的关注 -->
          <MyConcern />

          <!-- 订单管理 -->
          <MyOrder />
      </div>
  </section>
</template>

<script>
import MyConcern from './MyConcern'
import MyOrder from './MyOrder'

export default {
  name: '',

  data(){
    return {
    }
  },

  props: {
    
  },

  components: {
    MyConcern,
    MyOrder,
  },

  computed: {
    
  },
  
  methods: {
    
  }
}
</script>

<style lang="scss">
@import '../../../assets/jl_sprites.scss';

// 我的关注、订单管理
.index-concern-order-outer{
    background: white;
    overflow: hidden;

    @at-root .i-c-o-inner{
        width: 1200px;
        margin: 20px auto;
        overflow: hidden;

        @at-root .i-concern-outer{
            width: 400px;
            float: left;
            overflow: hidden;

            .no-content{
                @include jl_sprites;
                @include noConcern;
                margin: 30px auto;
            }
        }

        @at-root .i-order-outer{
            width: 730px;
            //width: 100%;
            float: right;

            .no-content{
                @include jl_sprites;
                @include noOrder;
                margin: 30px auto;
            }
        }

        @at-root .i-c-o-title{
            height: 30px;
            line-height: 30px;
            border-bottom: solid 1px #e3e3e3;
            padding: 10px 0;

            h1{
                font-size: 16px;
                color: #333333;
                letter-spacing: 1px;
                float: left;
            }

            input{
                float: right;
                font-size: 14px;
                width: 280px;
                height: 30px;
                line-height: 30px;
                padding: 0 10px;
                border: solid 1px #ccc;
                box-sizing: border-box;
                margin-right: 10px;
                transition: all 0.2s linear 0s;

                &:hover,
                &:focus{
                    border: solid 1px rgb(95, 205, 212);
                    box-shadow: 0 0 5px rgb(95, 205, 212);
                }
            }

            @at-root .i-c-order-btn{
                float: right;
                font-size: 14px;
                color: white;
                width: 50px;
                height: 30px;
                background: orange;
                border: none;
                border-radius: 3px;
                margin-right: 20px;
                transition: all 0.2s linear 0s;

                &:hover{
                    background: #db8b09;
                }
            }

            a{
                float: right;
                font-size: 14px;
                color: #339afc;
            }

            @at-root .i-c-o-icon{
                @include jl_sprites;
                position: relative;
                top: 6px;
                float: left;
                margin-right: 10px;

                &.concern{
                    @include gz5;
                }
    
                &.order{
                    @include order_logo;
                }
            }
        }

        table{
            color: #333;
            width: 100%;
            font-size: 14px;
            margin-top: 10px;
            background: white;

            @at-root .i-c-o-link-item{
                color: #333333;
                //cursor: context-menu;
                cursor: pointer;
                
                &:hover{
                    color: #339afc;
                }
            }
            
            @at-root .index-concern-link{
                display: block;
                width: 305px;
                height: 30px;
                line-height: 30px;
                //height: 14px;
                //line-height: 14px;
                //margin: 8px 0;
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 1;
                -webkit-box-orient: vertical;
            }
            
            @at-root .index-order-hotel-link{
                display: block;
                width: 160px;
                height: 30px;
                line-height: 30px;
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 1;
                -webkit-box-orient: vertical;
            }
    
            @at-root .i-concern-price{
                font-size: 16px;
                color: orange;
                margin-right: 2px;
            }
            
            .price-loading{
                width: 20px;
                height: 20px;
                margin: 5px 0 5px 5px;
                float: right;
            }
    
            td{
                height: 30px;
                line-height: 30px;
                
                &:last-child{
                    text-align: right;
                    font-size: 12px;
                    color: #aaaaaa;
                }

                // 兼容 ie8，只要给其中一个设置 important 就行
                &[lastChild]{
                    text-align: right;
                    font-size: 12px;
                    color: #aaaaaa!important;
                }
                
                a{
                    text-decoration: none;
                }

                span{
                    border: none;
                    font-size: 14px;

                    &.i-o-check{
                        color: #339afc;

                        &:hover{
                            color: #1d78ce;
                        }
                    }

                    &.i-o-download{
                        color: orange;
                        margin-right: 10px;
                        
                        &:hover{
                            color: #db8b09;
                        }
                    }
                }
            }

        }
    }
}
</style>