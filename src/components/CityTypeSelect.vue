
<!-- 城市类型选择框 -->
<template>
    <el-select 
      class="city-type-select"
      v-model="value" 
      size="small" 
      placeholder="请选择城市类型"
      @change="changeCityType" >
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
    changeCityType(){
      // Vue 异步执行 DOM 更新，组件不会立即重新渲染。当刷新队列时，组件会在事件循环队列清空时的下一个“tick”更新。
      this.$nextTick(function () {
        this.$store.commit('hotelList/changeCityType', this.$children[0].value)
      })
    }
  }
}
</script>


<style lang="scss">
.city-type-select{
  width: 78px;
}
</style>
