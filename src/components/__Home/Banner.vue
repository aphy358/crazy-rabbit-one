
<!-- 首页 banner -->
<template>
  <el-carousel trigger="click" height="500px">
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

<style scoped lang="scss">
</style>