
<!-- 酒店星级选择框 -->
<template>
  <el-select
    v-model="checkedStar"
    multiple
    collapse-tags
    :multiple-limit="3"
    class="star-select"
    size="small" 
    placeholder="请选择酒店等级">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
</template>

<script>
export default {
  name: 'StarSelect',

  data(){
    return {
      options: [{
        value: '10,15,20,25',
        label: '二星级及以下/经济'
      }, {
        value: '30,35',
        label: '三星级/舒适'
      }, {
        value: '40,45',
        label: '四星级/高档'
      }, {
        value: '50,55',
        label: '五星级/豪华'
      }],
    }
  },
  
  props: ['page'],

  computed: {
    checkedStar: {
      get: function () {
        return this.$store.state[this.page].checkedStar
      },
      set: function (newValue) {
        this.$store.commit(`${this.page}/setCommonState`, {t: 'checkedStar', v: newValue})
      }
    },
  },
}
</script>


<style lang="scss">
.star-select{
  width: 200px;
}
</style>
