
<!-- 分页组件 -->
<template>
    <div class="hotel-list-page-outer">
        <el-pagination
          background
          layout="prev, pager, next"
          style="float: right;margin-right: -10px;"
          @current-change="changePage"
          :current-page="pageNow"
          :page-count="pageTotal" >
        </el-pagination>
    </div>
</template>

<script>
export default {
  name: "",

  data() {
    return {};
  },

  props: {},

  components: {},

  computed: {
    pageNow() {
      return +this.$store.state.hotelList.pageNow
    },

    pageTotal() {
      return +this.$store.state.hotelList.pageTotal
    },
  },

  methods: {
    changePage($event){
      this.$store.dispatch("hotelList/actionHotelList", {t: 'pageNow', v: $event, api: this.$api});
    }
  }
};
</script>

<style lang="scss">
.hotel-list-page-outer {
  width: 1200px;
  margin: 30px auto 50px;

  &:after {
    content: "";
    display: block;
    clear: both;
  }

  .el-pagination.is-background .btn-next,
  .el-pagination.is-background .btn-prev,
  .el-pagination.is-background .el-pager li {
    background-color: white;
  }
}
</style>