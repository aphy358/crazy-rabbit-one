<!-- 组件说明 -->
<template>
	<el-form-item label="预订信息">
		<p class="book-info">
			<span>入离时间:</span>
			<span class="start-date">{{checkin}}</span>
			<span>至</span>
			<span class="end-date">{{checkout}}</span>
			<span class="day-count">{{dateNum}}晚</span>
		</p>
		<div class="book-info">
			<span>房间数量:</span>
			<el-select popper-class="select-roomnum" v-model="value" placeholder="间数" @change="changeRoomNum">
				<el-option
						v-for="item in options"
						:key="item.value"
						:label="item.label"
						:value="item.value">
				</el-option>
			</el-select>
			<span class="order-room-max">最多可预订{{stock}}间（该房型每间最多入住{{maxPersonNum}}人）</span>
		</div>
	</el-form-item>
</template>

<script>
  export default {
    name: '',
    
    data() {
      return {
        value: this.$store.state.orderWrite.roomNum + '间',
  
        checkin : this.$store.state.orderWrite.checkin,
        checkout : this.$store.state.orderWrite.checkout,
        dateNum : this.$store.state.orderWrite.dateNum,
        
        options: [],
      }
    },
    
    props: {},
    
    components: {},
    
    computed: {
  
      stock : function(){
        let stock = this.$store.state.orderWrite.stock;
        let arr = [];
    
        for (let i = 0; i < stock; i++) {
          arr.push({
            value: i + 1,
            label: (i + 1) + '间'
          })
        }
    
        this.options = arr;
    
        return stock;
      },
  
  
      maxPersonNum : function () {
        return this.$store.state.orderWrite.maxPersonNum;
      },
    },
    
    methods: {
      changeRoomNum : function (value) {
        this.$store.dispatch('orderWrite/getOrderInfo', {
          k : 'roomNum',
          v : value
        })
      },
    }
  }
</script>

<style scoped lang="scss">
</style>