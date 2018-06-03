
<!-- 预订间数选择框 -->
<template>
    <el-select 
      class="room-num-select"
      v-model="value" 
      size="small" 
      placeholder="请选择城市类型"
      @change="changeRoomNum" >
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
  name: 'RoomNumSelect',
  data(){
    return {
      options: [{
        value: '1',
        label: '1间'
      }, {
        value: '2',
        label: '2间'
      }, {
        value: '3',
        label: '3间'
      }, {
        value: '4',
        label: '4间'
      }, {
        value: '5',
        label: '5间'
      }, {
        value: '6',
        label: '6间'
      }, {
        value: '7',
        label: '7间'
      }],
      value: this.$props.roomNum
    }
  },
  props: {
    roomNum: {
      default: '1',
    },
  },
  methods: {
    changeRoomNum(){
      // Vue 异步执行 DOM 更新，组件不会立即重新渲染。当刷新队列时，组件会在事件循环队列清空时的下一个“tick”更新。
      this.$nextTick(function () {
        this.$store.commit('hotelList/changeRoomNum', this.$children[0].value)
      })
    }
  }
}
</script>


<style lang="scss">
.room-num-select{
  width: 60px;
}
</style>
