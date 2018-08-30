
<!-- 重要通知 -->
<template>
  <section class="index-notice-outer">
      <div class="i-n-inner">
          <i class="i-n-icon"></i>
          <b> 重要通知：</b>
          <div class="index-notice-content-box">
              <span>各位同行好，因我司产品不允许线上售卖，如被检测到是团购网站或OTA等线上渠道来源的订单，我司将终止与贵司合作并索取不低于2晚的赔付。请各位同行配合，谢谢！</span>
          </div>
      </div>
  </section>
</template>

<script>
export default {}
</script>

<style scoped lang="scss">
@import '../../assets/jl_sprites.scss';

.index-notice-outer{
    position: relative;
    background: white;
    box-shadow: 0 3px 10px #ddd;

    @at-root .i-n-inner{
        font-size: 14px;
        color: #333333;
        width: 1200px;
        height: 40px;
        line-height: 40px;
        margin: auto;
        overflow: hidden;
        position: relative;

        @at-root .i-n-icon{
            @include jl_sprites;
            @include trumpet;
            position: relative;
            display: inline-block;
            top: 2px;
            margin-right: 5px;
        }

        marquee{
            float: right;
            color: #666;
            width: 1100px;
        }
        
        @at-root .index-notice-content-box{
            width: 1100px;
            height: 40px;
            position: absolute;
            top: 0;
            right: 0;
            
            span{
                display: block;
            }
            
            .new-year-notice{
                a{
                    text-decoration: underline;
                    color: #000;
                    
                    &:hover{
                        color: blue;
                    }
                }
            }
        }
    }
}

.notice-box{
    padding: 0 30px;
    
    @at-root .notice-title{
        height: 60px;
        line-height: 60px;
        font-size: 20px;
        color: #fea925;
        text-align: center;
    }
    
    @at-root .notice-subtitle{
        display: block;
        color: #3399ff;
        margin-bottom: 10px;
    }
    
    p{
        line-height: 22px;
    }
    
    @at-root .notice-belong{
        margin: 10px 0 10px;
        .span-right{
            overflow: hidden;
            span{
                display: block;
                float: right;
                width: 170px;
                text-align: center;
            }
        }
    }
}
</style>