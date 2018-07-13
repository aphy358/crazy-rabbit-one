<template>
  <div>
    <!-- 轮播图 -->
    <div class="runImg">
      <!-- 轮播图 -->
      <el-collapse-transition>
        <el-carousel :interval="5000" arrow="always" :height="(520 + open_height)+'px'" indicator-position="none">
          <el-carousel-item v-for="item in imgList" :key="Math.random()">
            <router-link target="_blank" :to="'hotelDetail' + item.adLink">
              <img :src="item.adImg" class="carousel_img">
            </router-link>
          </el-carousel-item>
        </el-carousel>
      </el-collapse-transition>

      <!-- 搜索框 -->
      <SearchBlock @child-msg="get_msg"></SearchBlock>
    </div>

    <div class="importantNotice">
      <div>
        <i></i>
        <b>重要通知：</b>
        <span> 各位同行好，因我司产品不允许放在各大团购网站上售卖，如被检测到是团购网站上来源的订单，我司将终止与贵司合作并索取不低于2晚房费的赔付。请各位同行配合，谢谢！</span>
      </div>
    </div>
    <!-- 订单管理和关注列表 -->
    <div class="favriteList_orderList" v-if="!needLogin">
      <div>
        <div class="favriteList">
          <div class="favriteList-title">
            <i class="el-icon-star-off"></i>
            <h2>我的关注</h2>
            <a href="javascript:void(0)" class="orderList-all">查看全部</a>
          </div>
          <div class="favriteList-content" v-if="favoriteList">
            <router-link target="_blank" :to="'hotelDetail'+i.detailLink" v-for="i in favoriteList">
              <el-popover :popper-class="home_popover" placement="top-start" width="180" trigger="hover" offset="20" :visible-arrow=false :content="i.cityName +' | '+ i.infoName">
                <div slot="reference">{{i.cityName}} | {{i.infoName}}</div>
              </el-popover>
              <div class="needARoom"></div>
              <div v-if="i.minPrice">
                <span>￥{{parseInt(i.minPrice)}}</span>
                <span> 起</span>
              </div>
              <div v-else>暂无价格</div>
            </router-link>
          </div>
          <div class="favriteList-content" v-else>
            <div class="favriteList-nodata"></div>
          </div>
        </div>
        <div class="orderList">
          <div class="orderList-title">
            <i class="el-icon-tickets"></i>
            <h2>订单管理</h2>
            <el-input size="mini" width="280px" placeholder="请输入订单号/酒店名称" v-model="searchKeyword"></el-input>
            <el-button type="warning" plain size="mini" @click="refreshKeyword">搜索</el-button>
            <router-link target="_blank" to="personalCenter" class="orderList-all">
              查看全部
            </router-link>

          </div>
          <div class="orderList-content" v-if="orderList">
            <li v-for="i in orderList">
              <el-popover :popper-class="home_popover" placement="top-start" width="120" trigger="hover" offset="20" :visible-arrow=false :content="i.orderCode">
                <router-link target="_blank" :to="'hotelDetail'+i.link" slot="reference">{{i.orderCode}}</router-link>
              </el-popover>
              <el-popover :popper-class="home_popover" placement="top-start" width="120" trigger="hover" offset="20" :visible-arrow=false :content="i.itemName">
                <router-link target="_blank" :to="'hotelDetail'+i.link" slot="reference">{{i.itemName}}</router-link>
              </el-popover>
              <div>{{i.beginDate}}-{{i.endDate}}</div>
              <div>{{i.innerStatus===-1 ? '待确认' : i.innerStatus === 0 ? '已确认' : i.innerStatus === 1 ? '已拒单' : i.innerStatus === 2 ? '申请取消中' : i.innerStatus === 3 ? '不能取消' : '已取消'}}/{{i.paymentStatusText = i.paymentStatus === 0 ? '已支付' : i.paymentStatus === 1 ? '未支付' : i.paymentStatus === 2 ? '挂账' : ''}}</div>
              <router-link target="_blank" :to="'hotelDetail'+i.link">查看</router-link>
            </li>
          </div>
          <div class="orderList-content" v-else>
            <div class="orderList-nodata"></div>
          </div>
        </div>
      </div>

    </div>
    <!-- 今日热推 -->
    <div class="todayPush">
      <div>
        <div class="i-r-title">
          <div class="i-r-title-line">
            <i class="i-r-title-icon right"></i>
          </div>
          <h1>今日热推</h1>
          <div class="i-r-title-line">
            <i class="i-r-title-icon left"></i>
          </div>
        </div>
        <el-tabs v-model="activeName" v-loading="loading" :data="todayPushList" style="width: 100%">
          <el-tab-pane :label="item.isShow == 1?item.cityName:''" :name="item.sorting" v-for="(item) in todayPushList">
            <el-carousel :autoplay="false" indicator-position="none" arrow="always">
              <el-carousel-item v-for="e in item.mainPushProductDtoList" :key="Math.random()">
                <div v-for="i in e" class="carousel_content">
                  <router-link target="_blank" :to="'hotelDetail' + i.detailLink">
                    <div class="today_hotel_img"><img :src="i.picSrc"></div>
                    <div class="today_hotel_info">
                      <div>{{i.suppName}}</div>
                      <el-button type="warning" size="small" class="today_hotel_order">立即预订</el-button>
                    </div>
                  </router-link>
                </div>
              </el-carousel-item>
            </el-carousel>
          </el-tab-pane>
        </el-tabs>
        <div class="checkAllContent">
          <el-button plain size="small">查看全部
            <i class="el-icon-arrow-right"></i>
          </el-button>
        </div>
      </div>

    </div>

    <!-- 今日推荐 -->
    <div class="hotPush">
      <div>
        <div class="i-r-title">
          <div class="i-r-title-line">
            <i class="i-r-title-icon right"></i>
          </div>
          <h1>热门推荐</h1>
          <div class="i-r-title-line">
            <i class="i-r-title-icon left"></i>
          </div>
        </div>
        <ul>
          <li v-for="i in toayHotList">
            <router-link target="_blank" :to="'hotelDetail' + i.adLink">
              <div class="hot_push_info">
                <img :src="i.adImg" alt="">
                <div class="hot_push_mask"></div>
                <div class="hot_push_title">
                  <b>{{i.adTitle}}</b>
                </div>
              </div>
            </router-link>
          </li>
        </ul>
      </div>
    </div>

    <!-- 置顶&关注 -->
    <div>
      <TopAndNotice></TopAndNotice>
    </div>
  </div>
</template>
<script>
import SearchBlock from '../components/__Home/SearchBlock.vue'
import TopAndNotice from '../components/common/TopAndNotice.vue'

export default {
  data() {
    return {
      imgList: '',
      open_height: '',
      activeName: 'first',
      todayPushList: '',
      toayHotList: '',
      favoriteList: '',
      orderList: '',
      showLoginDialog: false,
      needLogin: true,
      loading: true,
      searchKeyword: '',
      home_popover: 'homePopover'
    }
  },
  components: {
    SearchBlock,
    TopAndNotice
  },
  methods: {
    sliceArray(array, size) {
      const finallResult = []
      for (let x = 0; x < Math.ceil(array.length / size); x++) {
        let start = x * size
        let end = start + size
        finallResult.push(array.slice(start, end))
      }
      return finallResult
    },
    needLogin_in() {
      this.showLoginDialog = true
    },
    getURL(str) {
      let location = str.indexOf('?')
      let lastStr = str.slice(location, str.length)
      return lastStr
    },
    refreshKeyword() {
      this.$api.home
        .syncGetOrderList({
          searchKey: this.searchKeyword,
          currPage: 1,
          pageSize: 5
        })
        .then(res => {
          //console.log(res)
          if (res.returnCode == 1) {
            res.dataList.forEach((v, i) => {
              //console.log(this.getURL(res.dataList[i].adLink))
              res.dataList[i].link = this.getURL(res.dataList[i].link)
            })
            this.orderList = res.dataList
          } else {
            console.log(res.errinfo)
            if (res.returnCode == -400001) {
              this.needLogin = true
            }
          }
        })
    },
    get_msg(msg) {
      //console.log(msg)
      this.open_height = msg
    }
  },
  computed: {},

  mounted() {
    const _this = this
    this.$api.home.getCurrentUser().then(res => {
      if (res.returnCode == '-400001') {
        this.needLogin = true
      } else {
        this.needLogin = false
      }
    })
    this.$api.home.syncGetCarouselList().then(res => {
      if (res.returnCode == 1) {
        res.dataList.forEach((v, i) => {
          //console.log(this.getURL(res.dataList[i].adLink))
          res.dataList[i].adLink = this.getURL(res.dataList[i].adLink)
        })
        this.imgList = res.dataList
      } else {
        console.log(res.errinfo)
      }
    })
    this.$api.home.syncGetTodayPush().then(res => {
      let sort = [
        'first',
        'second',
        'third',
        'fourth',
        'fifth',
        'sixth',
        'seventh',
        'eighth',
        'ninth',
        'tenth'
      ]
      const secondArr = []

      res.data.mainPushCityDtoList.map(item => {
        if (item.isShow == 1) {
          secondArr.push(Object.assign({}, item, { sorting: 'first' }))
        }
      })

      secondArr.forEach(function(v, i) {
        secondArr[i].sorting = sort[i]
        if (secondArr[i].mainPushProductDtoList) {
          secondArr[i].mainPushProductDtoList.forEach((v, index) => {
            secondArr[i].mainPushProductDtoList[
              index
            ].detailLink = _this.getURL(
              secondArr[i].mainPushProductDtoList[index].detailLink
            )
          })
          secondArr[i].mainPushProductDtoList = _this.sliceArray(
            secondArr[i].mainPushProductDtoList,
            4
          )
        }
      })
      this.todayPushList = secondArr
      this.loading = false

      //console.log(this.todayPushList)
    })
    this.$api.home.syncGetHotPush({ block: 1 }).then(res => {
      // console.log(res)
      if (res.returnCode == 1) {
        res.dataList.forEach((v, i) => {
          //console.log(this.getURL(res.dataList[i].adLink))
          res.dataList[i].adLink = this.getURL(res.dataList[i].adLink)
        })
        this.toayHotList = res.dataList
      } else {
        console.log(res.errinfo)
      }
    })
    this.$api.home
      .syncGetFavoriteList({ pageNum: 1, pageSize: 5 })
      .then(res => {
        //console.log(res)
        if (res.returnCode == 1) {
          res.dataList.forEach((v, i) => {
            //console.log(this.getURL(res.dataList[i].adLink))
            res.dataList[i].detailLink = this.getURL(res.dataList[i].detailLink)
          })
          this.favoriteList = res.dataList
        } else {
          console.log(res.errinfo)
          if (res.returnCode == -400001) {
            this.needLogin = true
          }
        }
      })
    this.refreshKeyword()
  }
}
</script>


<style lang="scss">
@import '../assets/jl_sprites.scss';
.homePopover {
  background: #fffff3 !important;
  border: 1px solid #ffc65f !important;
}
//轮播图
.carousel_img {
  width: 100%;
}
.runImg {
  position: relative;
  .el-carousel__container {
    transition: height 0.4s;
  }
  & .el-carousel__arrow {
    width: 70px;
    height: 70px;
    border-radius: 8px;
  }
  & .el-carousel__arrow--left {
    left: 100px;
    background-color: rgba(31, 45, 61, 0.5);
    > i {
      font-size: 50px;
    }
  }
  & .el-carousel__arrow--right {
    background-color: rgba(31, 45, 61, 0.5);
    right: 100px;
    > i {
      font-size: 50px;
    }
  }
}
.more-serch-line{
  .el-input__inner{
    border-radius: 1px;
  }
}
.todayPush {
  .el-carousel__container {
    & .el-carousel__arrow--left {
      left: 50px;
      background-color: #c0c0c0;
      &:hover {
        background-color: #4e4b4b69;
      }
      > i {
        font-size: 25px;
      }
    }
    & .el-carousel__arrow--right {
      right: 50px;
      background-color: #c0c0c0;
      &:hover {
        background-color: #4e4b4b69;
      }
      > i {
        font-size: 25px;
      }
    }
  }
}

.favriteList_orderList {
  background: white;
  > div {
    width: 1200px;
    height: 216px;
    margin: auto;
    padding: 20px 0;
    display: flex;
    .orderList-all {
      margin-left: 10px;
      color: #0884fb;
    }

    //关注列表
    .favriteList {
      width: 400px;
      flex: 1;
      .favriteList-title {
        display: flex;
        padding: 10px 0;
        border-bottom: solid 1px rgb(227, 227, 227);
        align-items: center;
        > i {
          font-size: 20px;
        }
        > h2 {
          flex: 1;
          font-size: 18px;
          font-weight: 600;
          padding-left: 10px;
        }
      }
      .favriteList-content {
        > a {
          display: flex;
          font-size: 14px;
          padding-top: 10px;
          color: #333;
          &:hover {
            text-decoration: none;
          }
          > span {
            &:hover {
              color: #339afc;
            }
          }
          .needARoom {
            flex: 1;
          }
          > div {
            > span {
              &:first-child {
                color: orange;
              }
            }
          }
        }
        .favriteList-nodata {
          @include jl_sprites;
          @include noConcern;
          margin: 30px auto;
        }
      }
    }

    //订单列表
    .orderList {
      width: 730px;
      margin-left: 70px;
      .orderList-title {
        display: flex;
        padding: 10px 0;
        border-bottom: solid 1px rgb(227, 227, 227);
        align-items: center;
        > i {
          font-size: 20px;
        }
        > h2 {
          flex: 1;
          font-size: 18px;
          font-weight: 600;
          padding-left: 10px;
        }
        & .el-input {
          width: 280px !important;
          margin-right: 10px;
        }
      }
      .orderList-content {
        > li {
          display: flex;
          font-size: 14px;
          padding-top: 10px;
          > span {
            &:first-child {
              width: 149px;
            }
            &:nth-child(2) {
              width: 160px;
              margin-right: 40px;
            }
            > a {
              cursor: pointer;
              color: #333;
              &:hover {
                text-decoration: none;
                color: #339afc;
              }
            }
          }
          > a {
            cursor: pointer;
            &:hover {
              text-decoration: none;
            }
            &:last-child {
              color: #339afc;
              &:hover {
                color: #0884fb;
              }
            }
          }
          > div {
            &:first-of-type {
              width: 196px;
            }
            &:last-of-type {
              flex: 1;
            }
          }
        }
        .orderList-nodata {
          @include jl_sprites;
          @include noOrder;
          margin: 30px auto;
        }
      }
    }
  }
}

//通知
.importantNotice {
  background-color: white;
  box-shadow: 0 3px 10px #ddd;
  position: relative;
  > div {
    width: 1200px;
    margin: auto;
    padding: 10px 0;
    font-size: 14px;
    > i {
      @include jl_sprites;
      @include trumpet;
      position: relative;
      display: inline-block;
      top: 2px;
      margin-right: 5px;
    }
  }
}

//今日主推
.todayPush {
  & .i-r-title {
    padding-left: 100px;
  }
}
.i-r-title {
  padding-top: 20px;
  margin-bottom: 20px;
  overflow: hidden;

  @at-root .i-r-title-line {
    position: relative;
    float: left;
    width: 515px;
    border-bottom: solid 1px #e3e3e3;
    margin-top: 19px;

    @at-root .i-r-title-icon {
      @include jl_sprites;
      @include little_ball;
      position: absolute;
      top: -3px;

      &.right {
        right: 0;
      }

      &.left {
        left: 0;
      }
    }
  }

  h1 {
    float: left;
    width: 170px;
    text-align: center;
    font-size: 26px;
    font-weight: normal;
  }
}
.todayPush {
  background: white;
  > div {
    margin: 20px auto;
    width: 1400px;
    position: relative;
  }
}
.el-carousel__item {
  display: flex !important;
  & .carousel_content:first-child {
    margin-left: 100px;
  }
}
.today_hotel_img {
  width: 283px;
  height: 220px;
  overflow: hidden;
  > img {
    width: 100%;
    min-height: 100%;
  }
}

.carousel_content {
  margin: 0 20px 20px 0;
  transition: all 0.2s linear;
  border: 1px solid #e3e3e3;
  > a {
    &:hover {
      text-decoration: none;
    }
  }
  &:hover {
    box-shadow: 0 15px 15px rgba(0, 0, 0, 0.1);
    transform: translate3d(-2px, -2px, 0);
  }
}

.el-tabs__header {
  margin: 15px 366px !important;
}
.moveRight {
  transition: move_right 1s;
}
.today_push_toggle {
  position: absolute;
  top: 210px;
  & span:first-child {
    position: absolute;
    left: -55px;
  }
  & span:last-child {
    position: absolute;
    left: 1210px;
  }
  > span {
    background-color: #c3c0c0;
    opacity: 0.5;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    display: inline-block;
    > i {
      font-size: 40px;
      color: white;
    }
  }
}
.today_hotel_info {
  width: 265px;
  display: flex;
  padding: 10px 9px;
  > div {
    width: 175px;
    flex: 1;
    white-space: nowrap;
    word-break: break-all;
    text-overflow: ellipsis;
    overflow: hidden;
    font-size: 16px;
    color: #339afc;
    font-weight: 600;
    line-height: 30px;
    align-self: center;
  }
  > .today_hotel_order {
    margin-left: 10px;
  }
}
.checkAllContent {
  text-align: center;
  padding-bottom: 20px;
}

//热门推荐
.hotPush {
  background: white;
  height: 600px;
  > div {
    width: 1200px;
    margin: 20px auto;
    > ul {
      display: flex;
      flex-wrap: wrap;
      > li {
        margin-bottom: 20px;
        transition: all 0.2s linear;
        &:hover {
          box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
          transform: translate3d(-2px, -2px, 0);
        }
        &:nth-child(3n + 2) {
          margin: 0 20.5px 20px 20.5px;
        }
      }
    }
  }
}
.hot_push_info {
  height: 220px;
  position: relative;
  overflow: hidden;
  > img {
    width: 386px;
  }
  > .hot_push_title {
    width: 365px;
    line-height: 50px;
    margin: 0 10px;
    transform: translateZ(0);
    position: absolute;
    bottom: 0;
    left: 0;
    > b {
      font-size: 18px;
      color: white;
    }
  }
  > .hot_push_mask {
    position: absolute;
    bottom: 0;
    left: 0;
    height: 50px;
    width: 100%;
    background: #000;
    opacity: 0.6;
  }
}
</style>
