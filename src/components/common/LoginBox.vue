
<!-- 登录框 -->
<template>
    <el-dialog title="" :visible="true" width="360px" center @close="$emit('close')">
      <div class="login-box">
        <form id="loginJl">
          <ul>
            <li>
              <i class="login-icon login-icon-1"></i>
              <input placeholder="企业编号" name="accountCode" autocomplete="off" type="text" v-model="accountCode" @input="_validator('accountCode')">
            </li>
            <li>
              <i class="login-icon login-icon-2"></i>
              <input placeholder="用户名" name="username" autocomplete="off" type="text" v-model="username" @input="_validator('username')">
            </li>
            <li>
              <i class="login-icon login-icon-3"></i>
              <input placeholder="密码" name="password" autocomplete="off" type="password" v-model="password" @input="_validator('password')">
            </li>
            <li class="yzm-box">
              <i class="login-icon login-icon-4"></i>
              <input placeholder="验证码" name="checkcode" type="text" autocomplete="off" v-model="checkcode" @input="_validator('checkcode')">
              <img class="yzm-img" :src="'/user/getCheckcodeImg.do?time=' + codeTimeStamp" @click="codeTimeStamp = +new Date()" />
            </li>
          </ul>
          <p class="err-msg">{{errinfo}}</p>
          <button id="loginIn" @click.prevent="login">登录</button>
          <div class="login-bottom">
            <input id="remberCode" name="rememberMe" type="checkbox" value="true" v-model="rememberMe" @change="toggleRememberMe">
            <label for="remberCode">记住账号</label>
            <a class="find-password" href="#">忘记密码？</a>
            <a class="register" href="#">免费注册</a>
          </div>
        </form>
      </div>
    </el-dialog>
</template>

<script>
export default {
  name: '',

  data(){
    return {
      accountCode: '',
      username: '',
      password: '',
      checkcode: '',
      rememberMe: false,
      errinfo: '',
      codeTimeStamp: 0,
    }
  },
  
  methods: {
    // 验证器
    _validator(type){
      let errinfo = 
        type === 'accountCode' ? '* 企业编号不能为空' :
        type === 'username'    ? '* 用户名不能为空' :
        type === 'password'    ? '* 密码不能为空' : '* 验证码不能为空'

      if(!this[type]){
        this.errinfo = errinfo
      }else{
        this.errinfo = ''
      }

      return !!this[type]
    },

    login() {
      if( !this._validator('accountCode') || !this._validator('username') || !this._validator('password') || !this._validator('checkcode') ){
        return false
      }
      
      let params = {
        accountCode: this.accountCode,
        username: this.username,
        password: this.password,
        checkcode: this.checkcode,
        rememberMe: false
      }

      this.$api.home.syncLogin(params).then(res => {
        if (res.returnCode != 1) {
          this.errinfo = '* ' + res.errinfo
          this.codeTimeStamp = +new Date
        } else {
          location.reload();
        }
      })
    },

    toggleRememberMe(){
      if(this.rememberMe){
        let account = {
          accountCode: this.accountCode,
          username: this.username,
          password: this.password
        }

        localStorage.setItem('crazy-rabbit-one-account', JSON.stringify(account))
      }else{
        localStorage.removeItem('crazy-rabbit-one-account')
      }
    },

    // 设置已经记住的密码
    setRememberMe(){
      let account = localStorage.getItem('crazy-rabbit-one-account')

      if(account){
        account = JSON.parse(account)

        this.accountCode = account.accountCode
        this.username = account.username
        this.password = account.password
        this.rememberMe = true
      }
    }

  },

  created(){
    this.setRememberMe()
  }
}
</script>

<style>
.el-dialog__headerbtn{
  font-size: 20px!important;
  z-index: 99;
}
</style>


<style scoped lang="scss">
@import '../../assets/jl_sprites.scss';

//登陆框样式
.login-box {
  height: 365px;
  background-color: #fff;

  #loginJl {
    position: relative;

    > h2 {
      font-size: 20px;
      font-weight: normal;
      text-align: center;
      height: 20px;
      line-height: 20px;
    }
    > .err-msg {
      position: absolute;
      top: -25px;
      width: 100%;
      height: 40px;
      line-height: 40px;
      color: red;
      text-align: center;
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
          width: 146px;
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
    
    #loginIn {
      display: block;
      width: 260px;
      height: 40px;
      line-height: 40px;
      background-color: #ffa825;
      color: #ffffff;
      text-align: center;
      border-radius: 4px;
      margin: 40px auto 20px;
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
</style>