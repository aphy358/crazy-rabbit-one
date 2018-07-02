
<!-- 分页组件 -->
<template>
    <div class="hotel-list-page-outer">
        <el-pagination
          background
          layout="prev, pager, next"
          style="float: right;margin-right: -10px;"
          @current-change="$emit('changePage', $event)"
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

  props: ['pageNow', 'pageTotal'],

  computed: {
    
  },

  methods: {
    
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