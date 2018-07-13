<template>
  <div class="home-page">
    <!-- 页首 -->
    <Header />

    <!-- banner 轮播 -->
    <Banner />
    
  </div>
</template>
<script>
import Header from '../layout/header'
import Banner from '../components/__Home/Banner'
import SearchLine from '../components/__Home/SearchLine.vue'

export default {
  data() {
    return {
    }
  },
  components: {
    Header,
    Banner,
    SearchLine,
  },
  methods: {
    
  },
  computed: {},

  mounted() {
    
  }
}
</script>


<style lang="scss">
@import '../assets/jl_sprites.scss';

.home-page{

  .i-t-n-bg{
    background: #000!important;
    opacity: .6;
    filter: Alpha(opacity=60);
  }
}

</style>
