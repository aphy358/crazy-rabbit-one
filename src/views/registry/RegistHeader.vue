
<!-- 注册页面头部 -->
<template>
  <div>
    <div class="register-head clearfix">
        <h5 class="register-title fl">注册账号</h5>
        <div class="register-h-r fr">
            <p class="fl">已有房掌柜账号？</p>
            <router-link class="to-login fl" to="/registry">直接登录</router-link>
        </div>
    </div>

    <div class="tips">
        <i class="icon"></i>
        <span class="tips-title">温馨提示：</span>
        如您已在我司有合作，请先咨询注册组0755-33336999索要贵公司账号，无需重复注册，谢谢合作！
    </div>
  </div>
</template>

<script>
export default {
  name: 'RegisterHeader',
}
</script>

<style scoped lang="scss">
@import "../../assets/jl_sprites.scss";

.register-head{
  height: 60px;
  line-height: 60px;
  border-bottom: 1px solid #E3E3E3;
  
  .register-title{
    font-size: 24px;
    color: #666666;
    margin-left: 30px;
  }
  
  .register-h-r{
    font-size: 16px;
    margin-right: 30px;
    
    .to-login{
      color: #3399ff;
      text-decoration: underline;
    }
  }

  .fl{
    float: left;
  }

  .fr{
    float: right;
  }
}

.tips{
  margin-left: 30px;
  height: 40px;
  line-height: 40px;
  font-size: 14px;
  .icon{
    display: inline-block;
    vertical-align: middle;
    @include jl_sprites;
    @include trumpet;
  }
  .tips-title{
    color: #ffa825;
    margin-left: 10px;
  }
}
</style>