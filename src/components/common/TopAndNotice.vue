<template>
  <transition name="el-fade-in-linear">
    <div class="topAndNotice">
      <div>
        <div>
          <el-popover placement="left" width="300" trigger="click" popper-class="favoriteListContent" :visible-arrow="false">
            <el-header>
              <h2>
                <b>我的关注</b>
              </h2>
              <i class="el-icon-circle-close-outline" @click="closeFavoriteList"></i>
            </el-header>
            <el-scrollbar style="height:90%" v-loading="loading" v-if="needLogin==false">
              <router-link :to="'hotelDetail'+i.detailLink" target="_blank" v-for="i in favoriteList">
                <el-card :body-style="{ padding: '0px'}" shadow="hover">
                  <img :src="i.picSrc" class="image" width="80" height="60">
                  <div style="padding: 14px;">
                    <span>{{i.infoName}}</span>
                    <div class="bottom clearfix">
                      <span class="favorite_price" v-if="i.minPrice">￥{{ i.minPrice }}元 起</span>
                      <span class="favorite_price" v-else>暂无价格</span>
                      <i class="el-icon-star-on" :categoryId="i.categoryId" :infoId="i.infoId" @click.prevent.self="addNotice" ref="addNotice"></i>
                    </div>
                  </div>
                </el-card>
              </router-link>
            </el-scrollbar>
            <div class="noneData" v-else></div>

            <div slot="reference" @click="showData">
              <i class="el-icon-star-on"></i>
              <div>关注</div>
            </div>
          </el-popover>
        </div>
        <div @click="scrollToTop">
          <i class="el-icon-arrow-up"></i>
          <div>返回</div>
          <div>顶部</div>
        </div>
      </div>

    </div>
  </transition>
</template>
<script>
export default {
  name: 'TopAndNotice',
  data() {
    return {
      needLogin: '',
      favoriteList: '',
      loading: true,
      needShow: '',
      categoryId: '',
      infoId: ''
    }
  },
  methods: {
    getURL(str) {
      let location = str.indexOf('?')
      let lastStr = str.slice(location, str.length)
      return lastStr
    },
    showData() {
      this.$api.home.syncGetFavoriteList({ pageNum: 1 }).then(res => {
        //console.log(res)
        if (res.returnCode == 1) {
          res.dataList.forEach((v, i) => {
            //console.log(this.getURL(res.dataList[i].adLink))
            res.dataList[i].detailLink = this.getURL(res.dataList[i].detailLink)
          })
          this.favoriteList = res.dataList
          this.loading = false
        } else {
          console.log(res.errinfo)
          if (res.returnCode == -400001) {
            this.needLogin = true
            this.loading = false
          }
        }
      })
    },
    scrollToTop() {
      let elem = document.querySelector('.index-top-nav')
      if (!elem) return
      let container = document.querySelector('.el-scrollbar__wrap')
      Velocity(elem, 'scroll', { container: container })
    },
    addNotice(event) {
      let noticeClass = event.target.className
      let parmcy = {}
      parmcy.infoId = event.target.getAttribute('infoId')
      parmcy.categoryId = event.target.getAttribute('categoryId')
      //console.log(event.target.getAttribute('infoId'))
      if (noticeClass !== 'el-icon-star-off') {
        this.$api.home.syncRemoveFavorite(parmcy).then(res => {
          if (res.returnCode == 1) {
            event.target.className = 'el-icon-star-off'
            //console.log(event.target.className)
          } else {
            console.log(res.errinfo)
          }
        })
      } else {
        this.$api.home.syncSaveFavorite(parmcy).then(res => {
          if (res.returnCode == 1) {
            event.target.className = 'el-icon-star-on'
            //console.log(event.target.className)
          } else {
            console.log(res.errinfo)
            this.needLogin = true
          }
        })
      }
    },
    closeFavoriteList() {
      console.log(document.querySelector('.favoriteListContent'))
      let element = document.querySelector('.favoriteListContent')
      element.style.setProperty('display', 'none')
    }
  }
}
</script>

<style lang="scss">
@import '../../assets/jl_sprites.scss';
.topAndNotice {
  position: fixed;
  top: 0;
  right: 0;
  height: 100%;
  background: #eee;
  width: 36px;
  z-index: 999;
  > div {
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    justify-content: center;
    align-content: center;
    height: 100%;
    .el-icon-star-on{
      font-size: 24px;
      color: orange;
    }
    .el-icon-arrow-up{
      font-size: 24px;
    }
    > div {
      padding: 15px 0;
      cursor:default;
    }
  }
}
.favoriteListContent {
  padding-top: 0 !important;
  height: 100%;
  overflow: hidden;
  border-radius:0 !important;
  top: 0 !important; 
  margin-right: 6px !important;
  z-index: 998 !important;
  .el-header {
    display: flex;
    padding-right: 0;
    > h2 {
      font-size: 18px;
      line-height: 60px;
      flex: 1;
    }
    > i {
      font-size: 25px;
      line-height: 60px;
    }
  }
  .el-scrollbar__wrap {
    overflow-x: hidden;
    > div {
      > a {
        &:hover {
          text-decoration: none;
        }
      }
    }
    .el-card {
      margin-bottom: 5px;
      border: none;
      border-bottom: #eee 1px solid
    }
  }
  .el-card__body {
    display: flex;
    > img {
      padding: 14px 0 14px 14px;
    }
    > div {
      > span {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        width: 175px;
        display: block;
      }
      > div {
        display: flex;
        .favorite_price {
          flex: 1;
          line-height: 40px;
          color: orange;
        }
        > i {
          font-size: 30px;
          line-height: 40px;
          color: orange;
        }
      }
    }
  }
}
.noneData {
  @include jl_sprites;
  @include noConcern;
  margin: 30px auto;
}
</style>



