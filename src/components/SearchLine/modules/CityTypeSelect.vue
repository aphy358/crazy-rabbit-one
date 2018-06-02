
<!-- 城市类型选择框 -->
<template>
    <el-select 
      class="city-type-select"
      v-model="value" 
      size="small" 
      placeholder="请选择城市类型"
      @change="changeCity" >
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
  name: '',
  data(){
    return {
      options: [{
        value: '0',
        label: '国内'
      }, {
        value: '2',
        label: '港澳台'
      }, {
        value: '3',
        label: '国外'
      }],
      value: this.$store.state.hotelList.cityType   // this.$props.cityType
    }
  },
  props: {
    cityType: {
      default: 0,
    },
  },
  computed: {
    
  },
  components: {
  },
  methods: {
    changeCity(){
      var _this = this.$children[0]

      // setTimeout 之前获取到的值是改变之前的值，在 setTimeout 里获取到的值才是改变之后的值，and I don't know why...
      setTimeout(function(){
        _this.$store.commit('changeCityType', _this.value)
      }, 0)
    }
  }
}
</script>


<style lang="scss">
.city-type-select{
  width: 76px;

  .el-input__inner{
    padding: 0 10px;
  }

  .el-input--suffix .el-input__inner {
    padding-right: 25px;
    text-align: center;
    border-radius: 0;
  }

  .el-input__suffix{
    right: 0;
  }
}

.el-select-dropdown__item{
  padding: 0 10px!important;
}
</style>
