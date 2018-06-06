
<!-- 城市类型选择框 -->
<template>
    <el-select 
      class="city-type-select"
      v-model="value" 
      size="small" 
      placeholder="请选择城市类型"
      @change="setCityType($event)" >
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
      value: this.$props.cityType
    }
  },
  props: ['cityType'],
  methods: {
    setCityType($event){
      this.$store.commit('hotelList/setCityType', $event)
    }
  }
}
</script>


<style lang="scss">
.city-type-select{
  width: 78px;
}

.city-type-select{
  .el-input--suffix{
    .el-input__inner{
      text-align: center;
    }
  }
}
</style>

