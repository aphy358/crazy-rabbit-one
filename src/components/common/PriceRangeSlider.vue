
<!-- 价格区间选择滑块 -->
<template>
  <el-slider
    v-model="priceRange"
    class="price-range-slider"
    :format-tooltip="formatTooltip"
    range
    :max="3000">
  </el-slider>
</template>

<script>
export default {
  name: 'PriceRangeSlider',

  data(){
    return {
      
    }
  },
  
  props: ['page'],

  computed: {
    priceRange: {
      get: function () {
        return this.$store.state[this.page].priceRange
      },
      set: function (newValue) {
        this.$store.commit(`${this.page}/setCommonState`, {t: 'priceRange', v: newValue})
      }
    },
  },

  methods: {
    formatTooltip(value){
      if(value != null){
        if(value >= 3000){
          return '3000 元以上'
        }

        return `${value} 元`
      }
    }
  }
}
</script>


<style lang="scss">
.price-range-slider{
  width: 150px;
}
</style>
