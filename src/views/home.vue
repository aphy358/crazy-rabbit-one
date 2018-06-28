<template>
    <div>
        <el-carousel :interval="5000" arrow="always" height="520px" indicator-position="none">
            <el-carousel-item v-for="item in imgList" :key="item">
                <a href="#">
                    <img :src="item" class="carousel_img"></img>
                </a>
            </el-carousel-item>
        </el-carousel>
        <SearchBlock></SearchBlock>
        <div class="todayPush">
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane :label="item.isShow == 1?item.cityName:''" name="first" v-for="(item, i) in todayPushList" :key="i" v-show="item.isShow == 1">{{item.cityName}}</el-tab-pane>
            </el-tabs>
        </div>

    </div>
</template>
<script>
import SearchBlock from '../components/__Home/SearchBlock.vue'

export default {
  data() {
    return {
      imgList: [
        'https://qnb.oss-cn-shenzhen.aliyuncs.com/real_1525853655236.jpg',
        'https://qnb.oss-cn-shenzhen.aliyuncs.com/real_1525853493176.jpg',
        'https://qnb.oss-cn-shenzhen.aliyuncs.com/real_1528177347640.jpg',
        'https://qnb.oss-cn-shenzhen.aliyuncs.com/real_1525853953297.jpg'
      ],
      activeName: 'first',
      todayPushList: ''
    }
  },
  components: {
    SearchBlock
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event)
    }
  },
  mounted() {
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
      const finallArr = []

        res.data.mainPushCityDtoList.map((item, index) => {
          if (item.isShow == 1) {
            finallArr.push(Object.assign({}, item, { sorting: sort[key] }))
          }
        })

      console.log(finallArr)
    })
  }
}
</script>


<style lang="scss">
.carousel_img {
  width: 100%;
}
.el-carousel__arrow {
  width: 70px !important;
  height: 70px !important;
  border-radius: 8px !important;
}
.el-carousel__arrow--left {
  left: 100px !important;
  background-color: rgba(31, 45, 61, 0.5) !important;
  > i {
    font-size: 50px;
  }
}
.el-carousel__arrow--right {
  background-color: rgba(31, 45, 61, 0.5) !important;
  right: 100px !important;
  > i {
    font-size: 50px;
  }
}
.todayPush {
  margin: 0 auto;
  width: 1200px;
}
</style>
