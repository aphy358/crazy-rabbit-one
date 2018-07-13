<template>
  <!-- 顶部导航栏 -->
  <header class="index-top-nav">
    <div class="i-t-n-bg"></div>
    <div class="i-t-n-wrap">
      <a href="#">
        <i class="jl-logo"></i>
      </a>

      <div class="i-t-n-hotline">
        <div class="i-t-n-user-wrap" @click="showLoginBox">
          <div class="i-t-n-triangle"></div>
          <div class="i-t-n-user"></div>
          <div>您好，{{user ? user.loginName : '请登录'}}</div>
          <ul class="i-t-n-drop" v-show="user">
            <li>
              <a href="#">个人中心</a>
            </li>
            <!-- <li>
              <a href="#">酒店订单</a>
            </li>
            <li>
              <a href="#">门票订单</a>
            </li>
            <li>
              <a href="#">发票索取</a>
            </li> -->
            <li @click="showConfirmLogoutDialog = true">
              <a href="#">退出</a>
            </li>
          </ul>
        </div>
        <div>0755-33397777</div>
        <i class="i-t-n-phone"></i>
      </div>
    </div>

    <!-- 登录框 -->
    <LoginBox v-if="showLoginDialog" @close="closeLoginDialog" />

    <!-- 退出确认框 -->
    <Confirm v-if="showConfirmLogoutDialog" @confirm="logout" @close="showConfirmLogoutDialog = false">
      <div style="text-align: center;font-size: 16px;">是否确定要退出？</div>
    </Confirm>

  </header>
</template>

<script>
import LoginBox from "../components/common/LoginBox"
import Confirm from "../components/common/Confirm"

export default {
  data() {
    return {
      user: null,
      showConfirmLogoutDialog: false
    }
  },

  components: {
    LoginBox,
    Confirm
  },

  computed: {
    showLoginDialog(){
      return this.$store.state.showLoginDialog
    }
  },
  
  methods: {
    // 关闭登录框
    closeLoginDialog(){
      this.$store.commit('setCommonState', {t: 'showLoginDialog', v: false})
    },

    // 获取当前用户信息
    getCurrentUser(){
      let _this = this

      this.$api.home.getCurrentUser().then(function(res) {
        if (res.returnCode == 1) {
          _this.user = res.data.user
        } else {
          _this.user = null
        }
      })
    },

    logout() {
      this.$api.home.syncLogout().then(res => {
        this.user = null

        if (res.returnCode != 1) {
        } else {
          location.reload()
        }
      })
    },

    showLoginBox(){
      if(!this.user){
        this.$store.commit('setCommonState', {t: 'showLoginDialog', v: true})
      }
    }
  },

  mounted(){
    // 获取当前用户信息
    this.getCurrentUser()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import '../assets/jl_sprites.scss';

.index-top-nav {
  position: relative;
  height: 60px;
  z-index: 99;

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
}
</style>