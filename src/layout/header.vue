<template>
  <!-- 顶部导航栏 -->
  <header class="index-top-nav">
    <div class="i-t-n-bg"></div>
    <div class="i-t-n-wrap">
      <a href="/user/bookHotel.do">
        <i class="jl-logo"></i>
      </a>

      <div class="i-t-n-hotline">
        <div class="i-t-n-user-wrap" @click="user =='请登录'?centerDialogVisible = true : ''">
          <div class="i-t-n-triangle"></div>
          <div class="i-t-n-user">{{user}}</div>
          <div>您好，</div>
          <ul class="i-t-n-drop" v-if="user != '请登录'">
            <li>
              <a href="#">个人中心</a>
            </li>
            <li>
              <a href="#">酒店订单</a>
            </li>
            <li>
              <a href="#">门票订单</a>
            </li>
            <li>
              <a href="#">发票索取</a>
            </li>
            <li>
              <a href="#" id="logout" @click="exitDialogVisible = true">退出</a>
            </li>
          </ul>
          <el-dialog title="提示" :visible.sync="exitDialogVisible" width="260px" center>
            <span class="exit_content">是否确定要退出</span>
            <span slot="footer" class="dialog-footer">
              <el-button type="primary" @click="logout" size="small">确 定</el-button>
              <el-button @click="exitDialogVisible = false" size="small">取 消</el-button>
            </span>
          </el-dialog>

          <el-dialog title="" :visible.sync="centerDialogVisible" width="360px" center>
            <div class="login-box">
              <form id="loginJl">
                <!--<h2>房掌柜登录</h2>-->
                <ul>
                  <li>
                    <i class="login-icon login-icon-1"></i>
                    <input :placeholder="companyId" id="accountCode" title="企业编号" name="accountCode" autocomplete="off" type="text" v-model="accountCode">
                  </li>
                  <li>
                    <i class="login-icon login-icon-2"></i>
                    <input :placeholder="userid" id="username" title="用户名" name="username" autocomplete="off" type="text" v-model="username">
                  </li>
                  <li>
                    <i class="login-icon login-icon-3"></i>
                    <input :placeholder="pwd" id="password" title="密码" name="password" autocomplete="off" type="password" v-model="password">
                  </li>
                  <li class="yzm-box">
                    <i class="login-icon login-icon-4"></i>
                    <input :placeholder="isCode" id="checkcode" title="请输入验证码" name="checkcode" type="text" autocomplete="off" v-model="checkcode">
                    <img class="yzm-img" src="/user/getCheckcodeImg.do?time=<%=new Date().getTime()%>" alt="" />
                  </li>
                </ul>
                <p class="err-msg">{{errinfo}}</p>
                <button id="loginIn" @click.prevent="login">登录</button>
                <div class="login-bottom">
                  <input id="remberCode" name="rememberMe" type="checkbox" value="true" v-model="rememberMe">
                  <label for="remberCode">记住账号</label>
                  <a class="find-password" href="#">忘记密码？</a>
                  <a class="register" href="/user/toRegister.do" target="_blank" data-track="房掌柜首页_登录框_免费注册">免费注册</a>
                </div>
              </form>
            </div>
          </el-dialog>

        </div>
        <div>0755-33397777</div>
        <i class="i-t-n-phone"></i>
      </div>
    </div>
  </header>
</template>

<script>
import {
  setCookies,
  getCookies,
  delCookies
} from '../components/Login/login.js'
export default {
  data() {
    return {
      centerDialogVisible: false,
      user: '',
      accountCode: '',
      username: '',
      password: '',
      checkcode: '',
      rememberMe: false,
      companyId: '企业编号',
      userid: '用户名',
      pwd: '密码',
      isCode: '请输入验证码',
      errinfo: '',
      exitDialogVisible:false
    }
  },
  mounted() {
    
    let userCookie = this.$api.hotelList.getCurrentUser()
     console.log(userCookie)
    if (userCookie.returnCode == 1) {
      this.user = userCookie.user.loginName
    } else {
      this.user = '请登录'
    }
  },
  methods: {
    async login() {
      // await this.$api.hotelList.syncCheckcode()
      let params = {
        accountCode: this.accountCode,
        username: this.username,
        password: this.password,
        checkcode: this.checkcode,
        rememberMe: false
      }
      if (params) {
        if (!params.accountCode) {
          this.errinfo = '*企业编号不能为空'
          return false
        }
        if (!params.username) {
          this.errinfo = '*用户名不能为空'
          return false
        }
        if (!params.password) {
          this.errinfo = '*密码不能为空'
          return false
        }
        if (!params.checkcode) {
          this.errinfo = '*验证码不能为空'
          return false
        }
      }

      let res = await this.$api.hotelList.syncLogin(params)

      if (res.returnCode != 1) {
        console.log(res.errinfo)
        if (res.errinfo == '用户名或密码不正确！') {
          this.errinfo = '*用户名或密码不正确！'
        }
      } else {
        setCookies('jl_username', this.username, 1000 * 60)
        this.user = this.username
        this.centerDialogVisible = false
        location.reload()
      }
    },

    async logout() {
      let res = await this.$api.hotelList.syncLogout()
      if (res.returnCode != 1) {
        console.log(res.errinfo)
      } else {
        delCookies('jl_username')
        this.exitDialogVisible = false
        this.user = '请登录'
        location.reload()
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import '../assets/jl_sprites.scss';

.index-top-nav {
  position: relative;
  height: 60px;
  //   z-index: 99;

  @at-root .i-t-n-bg {
    height: 100%;
    background: #333;
  }

  @at-root .i-t-n-wrap {
    position: relative;
    width: 1200px;
    height: 60px;
    line-height: 60px;
    margin: auto;
    margin-top: -60px;

    @at-root .jl-logo {
      @include jl_sprites;
      @include jl_logo;
      float: left;
      margin-top: 12px;
      margin-right: 110px;
    }

    // 右边热线电话、用户
    @at-root .i-t-n-hotline {
      float: right;
      color: #fea925;
      font-size: 14px;

      & > * {
        float: right;
      }

      @at-root .i-t-n-phone {
        @include jl_sprites;
        @include phone;
        margin-top: 18px;
        margin-right: 10px;
      }

      @at-root .i-t-n-user-wrap {
        position: relative;
        margin-left: 50px;
        color: white;
        padding: 0 10px;
        cursor: context-menu;

        & > * {
          float: right;
        }

        @at-root .i-t-n-triangle {
          @include jl_sprites;
          @include triangle_down;
          margin-top: 26px;
          margin-left: 10px;
        }

        // 用户下拉框
        @at-root .i-t-n-drop {
          position: absolute;
          display: none;
          width: 100%;
          top: 60px;
          left: 0;
          background: white;
          color: #333;
          box-shadow: 0 5px 10px #333;
          z-index: 9;

          & > * {
            line-height: 30px;
            text-align: center;
            transition: all 0.2s linear 0s;

            a {
              display: block;
              color: #333;
            }

            &:hover {
              background: rgb(85, 163, 236);

              a {
                color: white;
                text-decoration: none;
              }
            }
          }
        }

        &:hover {
          background: #fea925;

          .i-t-n-drop {
            display: block;
          }
        }
      }
    }
  }

  //登陆框样式
  .login-box {
    width: 360px;
    height: 392px;
    background-color: #fff;
    padding-top: 30px;
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.3);
    font-family: consolas, 'lucida console', monaco, 'courier new', courier,
      monospace, mono, serif;
    #loginJl {
      > h2 {
        font-size: 20px;
        font-weight: normal;
        text-align: center;
        height: 20px;
        line-height: 20px;
      }
      > .err-msg {
        width: 100%;
        height: 40px;
        line-height: 40px;
        color: #c50f0f;
        text-indent: 90px;
        //font-size: 14px;
      }
      > ul {
        width: 260px;
        margin: 0 auto;
        > li {
          display: block;
          width: 100%;
          height: 60px;
          border-bottom: 1px solid #cccccc;

          &.li-error {
            border-bottom: 1px solid red;
          }

          > input {
            display: inline-block;
            border: none;
            width: 180px;
            height: 30px;
            float: left;
            line-height: 30px;
            margin: 26px 0 0;
            padding-left: 20px;
            overflow: hidden;
            font-size: 14px;
          }
          > i {
            float: left;
            display: inline-block;
            margin: 30px 9px 10px;
            @include jl_sprites;
          }
          .login-icon-1 {
            @include company_number;
          }
          .login-icon-2 {
            @include user_name;
          }
          .login-icon-3 {
            @include password;
          }
          .login-icon-4 {
            @include identify_code;
          }
        }
        .yzm-box {
          height: 60px;
          line-height: 60px;
          border-bottom: 1px solid #999999;
          > input {
            float: left;
            display: inline-block;
            height: 30px;
            line-height: 30px;
            margin-top: 26px;
            font-size: 14px;
            width: 140px;
            padding-left: 12px;
          }
          > img {
            float: left;
            display: block;
            width: 60px;
            height: 30px;
            margin-top: 22px;
          }
        }
      }
      @at-root .exit_content{
        padding: 20px;
        font-size: 16px;
      }
      #loginIn {
        display: block;
        width: 260px;
        height: 40px;
        line-height: 40px;
        background-color: #ffa825;
        color: #ffffff;
        text-align: center;
        border-radius: 4px;
        margin: 0 auto 10px;
        font-size: 16px;
        letter-spacing: 15px;
        border: none;
        cursor: pointer;
        &:hover {
          background-color: #ff8400;
        }
      }
      .login-bottom {
        margin: 0 auto;
        width: 260px;
        height: 14px;
        line-height: 14px;
        > input {
          display: inline-block;
          width: 14px;
          height: 14px;
          vertical-align: middle;
          margin-bottom: 2px;
        }
        > label {
          display: inline-block;
          line-height: 14px;
        }
        > a {
          float: right;
          display: inline-block;
          line-height: 14px;
          margin: 0 6px;
        }
        .find-password {
          color: #000;
          margin: 0;
        }
        .register {
          color: #ffa825;
        }
      }
    }
  }
  .el-dialog__header {
    padding: 0;
  }
  .el-dialog--center .el-dialog__body {
    padding: 0;
  }
  .el-dialog__body {
    padding: 0;
  }
  .el-dialog__footer{
    padding: 0
  }
}
</style>

