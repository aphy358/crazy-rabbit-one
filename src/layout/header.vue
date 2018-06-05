<template>
  <!-- 顶部导航栏 -->
  <header class="index-top-nav">
    <div class="i-t-n-bg"></div>
    <div class="i-t-n-wrap">
      <a href="/user/bookHotel.do"><i class="jl-logo"></i></a>

      <div class="i-t-n-hotline">
        <div class="i-t-n-user-wrap">
          <div class="i-t-n-triangle"></div>
          <div class="i-t-n-user">请登录</div>
          <div>您好，</div>
          <ul class="i-t-n-drop">
            <li><a href="#">个人中心</a></li>
            <li><a href="#">酒店订单</a></li>
            <li><a href="#">门票订单</a></li>
            <li><a href="#">发票索取</a></li>
            <li><a href="#" id="logout">退出</a></li>
          </ul>
        </div>
        <div>0755-33397777</div>
        <i class="i-t-n-phone"></i>
      </div>
    </div>
  </header>
</template>

<script>
export default {};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

@import "../assets/jl_sprites.scss";

.index-top-nav{
    position: relative;
    height: 60px;
    z-index: 999;

    @at-root .i-t-n-bg{
        height: 100%;
        background: #333;
    }

    @at-root .i-t-n-wrap{
        position: relative;
        width: 1200px;
        height: 60px;
        line-height: 60px;
        margin: auto;
        margin-top: -60px;

        @at-root .jl-logo{
            @include jl_sprites;
            @include jl_logo;
            float: left;
            margin-top: 12px;
            margin-right: 110px;
        }

        // 右边热线电话、用户
        @at-root .i-t-n-hotline{
            float: right;
            color: #fea925;
            font-size: 14px;

            &>*{
                float: right;
            }

            @at-root .i-t-n-phone{
                @include jl_sprites;
                @include phone;
                margin-top: 18px;
                margin-right: 10px;
            }

            @at-root .i-t-n-user-wrap{
                position: relative;
                margin-left: 50px;
                color: white;
                padding: 0 10px;
                cursor: context-menu;

                &>*{
                    float: right;
                }               

                @at-root .i-t-n-triangle{
                    @include jl_sprites;
                    @include triangle_down;
                    margin-top: 26px;
                    margin-left: 10px;
                }

                // 用户下拉框
                @at-root .i-t-n-drop{
                    position: absolute;
                    display: none;
                    width: 100%;
                    top: 60px;
                    left: 0;
                    background: white;
                    color: #333;
                    box-shadow: 0 5px 10px #333;
                    z-index: 9999;

                    &>*{
                        line-height: 30px;
                        text-align: center;
                        transition: all 0.2s linear 0s;
                        
                        a{
                            display: block;
                            color: #333;
                        }

                        &:hover{
                            background: rgb(85, 163, 236);
                            
                            a{
                                color: white;
                                text-decoration: none;
                            }
                        }
                    }
                }

                &:hover{
                    background: #fea925;

                    .i-t-n-drop{
                        display: block;
                    }
                }
            }
        }
    }
}
</style>