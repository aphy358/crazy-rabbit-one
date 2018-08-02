<template>
  <div class="home-page">
    <!-- 页首 -->
    <Header />

    <!-- banner 轮播 -->
    <Banner />

    <!-- 搜索栏 -->
    <SearchLine />

    <!-- 重要通知 -->
    <Notice />

    <!-- 我的关注、我的订单 -->
    <ConcernAndOrder v-if="user" />

    <!-- 今日主推 -->
    <RecommendToday />

    <!-- 热门推荐 -->
    <RecommendHot />
    
    <!-- 侧边栏 -->
    <Sidebar/>
    
  </div>
</template>
<script>
import Header from '../../layout/header'
import Banner from './Banner'
import SearchLine from './SearchLine.vue'
import Notice from './Notice.vue'
import ConcernAndOrder from './ConcernAndOrder'
import RecommendToday from './RecommendToday'
import RecommendHot from './RecommendHot'
import Sidebar from '../../components/Sidebar'

export default {
  data() {
    return {
    }
  },

  components: {
    Header,
    Banner,
    SearchLine,
    Notice,
    ConcernAndOrder,
    RecommendToday,
    RecommendHot,
    Sidebar,
  },

  methods: {
    
  },

  computed: {
    user(){
      return this.$store.state.user
    },
  },

  mounted() {
    
  }
}
</script>


<style lang="scss">
@import '../../assets/jl_sprites.scss';

.home-page{
  position: relative;
  background: #f6f6f6!important;

  .i-t-n-bg{
    background: #000!important;
    opacity: .6;
    filter: Alpha(opacity=60);
  }
}

</style>
