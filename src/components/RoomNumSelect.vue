
<!-- 预订间数选择框 -->
<template>
    <el-select 
      class="room-num-select"
      v-model="getRoomNum" 
      size="small" 
      placeholder="请选择城市类型" >
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
    }
  },
  props: ['roomNum'],

  computed: {
    // 获取关键字
    getRoomNum: {
      get: function () {
        return this.$store.state.hotelList.roomNum
      },
      set: function (newValue) {
        this.$store.commit('hotelList/setRoomNum', newValue)
      }
    },
  },
}
</script>


<style lang="scss">
.room-num-select{
  width: 60px;
}
</style>
