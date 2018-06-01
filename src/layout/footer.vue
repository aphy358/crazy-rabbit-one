<template>
  <footer class="footer-wrap">
      <div class="footer-inner">
          <ul class="footer-top">
              <li class="f-i-block f-i-block-1">
                  <dl class="inner">
                      <dt class="title">关于我们</dt>
                      <dd class="link-item"><a href="#">关于捷旅</a></dd>
                      <dd class="link-item"><a href="#">Ebooking</a></dd>
                      <dd class="link-item"><a href="#">捷旅招聘</a></dd>
                      <dd class="link-item"><a href="#">操作说明</a></dd>
                  </dl>
              </li>
              <li class="f-i-block f-i-block-2">
                  <dl class="inner">
                      <dt class="title">合作加盟</dt>
                      <dd class="link-item"><a href="#">供应商合作</a></dd>
                      <dd class="link-item"><a href="#">分销商合作</a></dd>
                      <dd class="link-item"><a href="#">市场合作</a></dd>
                  </dl>
              </li>
              <li class="f-i-block f-i-block-3">
                  <dl class="inner">
                      <dt class="title">服务协议</dt>
                      <dd class="link-item"><a href="#">服务协议下载</a></dd>
                      <dd class="link-item"><a href="#">预订须知</a></dd>
                      <dd class="link-item"><a href="#">入住须知</a></dd>
                  </dl>
              </li>
              <li class="f-i-block f-i-block-4">
                  <dl class="inner">
                      <dt class="title">联系我们</dt>
                      <dd class="link-item"><p>售后客服（7*24小时）</p></dd>
                      <dd class="link-item"><p class="jl-telephone">0755-33397777</p></dd>
                      <dd class="link-item">
                          <p class="sale-ask">售前咨询点击聊天</p>
                          <a href="http://wpa.qq.com/msgrd?v=3&uin=800089800" target="_blank" class="qq-ask"></a>
                      </dd>
                  </dl>
              </li>
              <li class="f-i-block f-i-block-5">
                  <dl class="inner">
                      <dt class="title wechat-number">微信公众号</dt>
                      <dd class="erweima-wrap">
                          <div class="erweima"></div>
                      </dd>
                      <dd class="follow-weixin">关注微信 随时预订</dd>
                  </dl>
              </li>
          </ul>
          <div class="footer-bottom">
              <ul class="sundry-link">
                  <li class="friendly-link">
                      <dl>
                          <dt>友情链接：</dt>
                          <dd><a href="http://www.ctrip.com/" target="_blank">携程旅游网</a></dd>
                          <dd><a href="http://www.elong.com/" target="_blank">艺龙旅游网</a></dd>
                          <dd><a href="https://www.ihg.com/hotels/cn/zh/reservation" target="_blank">洲际酒店集团</a></dd>
                          <dd><a href="http://www.marriott.com.cn/default.mi" target="_blank">万豪酒店集团</a></dd>
                          <dd><a href="http://www.starwoodhotels.com/" target="_blank">喜达屋酒店集团</a></dd>
                          <dd><a href="https://www.bestwestern.net.cn/" target="_blank">贝斯特韦斯特</a></dd>
                      </dl>
                  </li>
              </ul>
              <div class="gongshang-outer">
                  <div class="gongshang-inner">
                      <a href="http://szcert.ebs.org.cn/6768cf73-7a38-463b-a3d3-83bfb2959cf9" target="_blank" class="gongshang-icon">
                          <i class="gov-logo" title="深圳市市场监督管理局企业主体身份公示"></i>
                      </a>
                      <a href="http://www.miitbeian.gov.cn" target="_blank">粤ICP备11071174号</a>&nbsp;&nbsp;&nbsp;Copyright © 2001-2018 版权所有
                  </div>
              </div>
          </div>
      </div>
  </footer>
</template>

<script>
export default {};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
// 雪碧图样式
@import "../assets/jl_sprites.scss";

.footer-wrap {
  background: #333333;
  position: relative;

  *{
    box-sizing: border-box;
  }

  &:after{
    content: '';
    position: absolute;
    width: 1220px;
    height: 1px;
    background-color: #3b3b3b;
    top: 230px;
    left: 50%;
    margin-left: -610px;
  }

  @at-root .footer-inner {
    width: 1220px;
    margin: 0 auto;
    overflow: hidden;

    @at-root .footer-top {
      width: 100%;
      height: 230px;

      .f-i-block{
        float: left;
        *zoom: 1;
        width: 20%;

        @at-root .inner{

          .title{
            font-size: 18px;
            color: white;
            height: 50px;
            line-height: 50px;
            margin: 20px 0 10px;
          }
          .wechat-number{
            text-align: left;
            padding-left: 14px;
          }
          .link-item{
            font-size: 14px;
            height: 30px;
            line-height: 30px;
            a{
              color: #999999;
              &:hover{
                color: #3384d8;
              }
            }
            p{
              color: #999999;
            }
            .jl-telephone{
              color: #f6a226;
            }
            .sale-ask{
              float: left;
              width: 60px;
              height: 48px;
              line-height: 24px;
            }
            .qq-ask{
              float: left;
              margin: 13px 20px;
              @include jl_sprites;
              @include qq;
            }
          }
          .erweima-wrap{
            .erweima{
              @include jl_sprites;
              @include erweima_notext;
              margin: 0 0 10px 10px;
            }
          }
          .follow-weixin{
            color: #CCCCCC;
            font-size: 14px;
          }
        }
      }

      .f-i-block-5{
        padding-left: 125px;
      }
    }
    @at-root .footer-bottom{
      width: 100%;

      @at-root .sundry-link{
        margin: 10px 0;

        .hot-city,.friendly-link{
          width: 100%;
          height: 40px;
          line-height: 40px;
          color: #999999;
          overflow: hidden;
          dl{
            float: left;
            dt{
              float: left;
            }
            dd{
              float: left;
              margin: 0 10px 10px;
              cursor: pointer;
              a{
                color: #999999;
              }
            }
          }
        }
      }

      //底部工商标识区
      @at-root .gongshang-outer{
        height: 30px;
        margin-bottom: 20px;

        @at-root .gongshang-inner{
          color: #A7AFAC;
          text-align: center;

          a{
            color: #A7AFAC;
          }

          @at-root #ebsgovicon+a{
            position: relative;
            top: 7px;
            margin-right: 5px;
          }

          @at-root .gongshang-icon{
            position: relative;
            top: 7px;

            .gov-logo{
              @include jl_sprites;
              @include govIcon;
              display: inline-block;
            }
          }
        }
      }
    }
  }
}
</style>