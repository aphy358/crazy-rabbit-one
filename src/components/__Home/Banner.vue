
<!-- 首页 banner -->
<template>
  <el-carousel class="home-page-banner" trigger="click" height="500px">
    <el-carousel-item v-for="item in bannerAds" :key="item.adId">
      <img alt="" :src="item.adImg">
    </el-carousel-item>
  </el-carousel>
</template>

<script>
export default {
  name: 'Banner',

  data(){
    return {
      bannerAds: [],
    }
  },

  props: {
    
  },

  components: {

  },

  computed: {
    
  },
  
  methods: {
    getBannerAds(){
      this.$api.home.syncGetCarouselList({channel:1, block:0, pageSize: 100}).then(res => {
        if(res.returnCode === 1 && res.dataList){
          this.bannerAds = res.dataList
          console.log(this.bannerAds );
          
        }else if(res.errcode == 'notLogin'){
        }
      })
    }
  },

  created(){
    this.getBannerAds()
  }
}
</script>

<style lang="scss">
.home-page-banner{

  &.el-carousel{
    margin-top: -60px;
    overflow-x: inherit;

    img{
      width: 100%;
    }

    .el-carousel__indicators{
      display: none
    }

    .el-carousel__arrow{
      width: 70px;
      height: 70px;
      background-color: rgba(0, 0, 0, 0.4);

      &:hover{
        background-color: rgba(0, 0, 0, 0.6);
      }
    }

    .el-carousel__arrow i{
      font-size: 40px;
    }

    .el-carousel__arrow--left{
      left: 50px;
    }

    .el-carousel__arrow--right{
      right: 50px;
    }
  }
}
</style>