<!-- 组件说明 -->
<template>
	<el-form-item label="加宽带信息">
		<el-collapse>
			<el-collapse-item>
				<template slot="title">
					<span class="add-extra-title">宽带 ￥34/份</span>
				</template>
				<el-select v-model="dateValue" placeholder="请选择日期" @change="getPrice">
					<el-option
							v-for="item in dates"
							:key="item.value"
							:label="item.label"
							:value="item.value">
					</el-option>
				</el-select>
				<el-select v-model="numValue" placeholder="请选择间数">
					<el-option
							v-for="item in nums"
							:key="item.value"
							:label="item.label"
							:value="item.value">
					</el-option>
				</el-select>
				<el-button type="primary" icon="el-icon-plus" size="mini" circle @click="addNetwork"></el-button>
			</el-collapse-item>
			
			<el-tag
					:key="i"
					v-for="(tag, i) in dynamicTags"
					closable
					:disable-transitions="false"
					color="#fff"
					hit
					class="extra-tag"
					@close="handleClose(tag)">
				<span>{{tag.dateValue}}</span>
				<span>宽带</span>
				<span>{{tag.numValue}}间</span>
				<span>￥{{tag.totalPrice}}</span>
			</el-tag>
			
		</el-collapse>
	</el-form-item>
</template>

<script>
  export default {
    name: '',
    
    data() {
      return {
        value8: '',
        dynamicTags: [],
        dateValue : [],
        dates : this.$store.state.orderWrite.netDates,
        numValue : '',
        nums : [],
        finalObj : {},
        totalAddNum : {},
        roomNum: this.$store.state.orderWrite.roomNum,
      }
    },
    
    props: {},
    
    components: {},
    
    computed: {},
    
    methods: {
      setNum : function () {
        for (let i = 0; i < this.roomNum; i++) {
          this.nums.push({
            value: i + 1,
            label: i + 1
          });
        }
      },
  
      getPrice : function () {
        let arr = this.$store.state.orderWrite.netData[this.dateValue];
        this.finalObj = arr[0];
      },
      
  
      addNetwork(){
        //先判断两个选择框是否都已经有值
        if (!this.dateValue){
          this.$alert('请选择日期', '提示', {
            confirmButtonText: '确定',
          });
        }else if (!this.numValue){
          this.$alert('请选择间数', '提示', {
            confirmButtonText: '确定',
          });
        }else{
          this.totalAddNum[this.dateValue] = (this.totalAddNum[this.dateValue] || 0) + this.numValue;
          if (this.roomNum >= this.totalAddNum[this.dateValue]){
            this.dynamicTags.push({
              dateValue : this.dateValue,
              numValue : this.numValue,
              totalPrice : this.numValue * this.finalObj.price
            });
        
          }else{
            this.totalAddNum[this.dateValue] -= this.numValue;
            this.$alert(this.dateValue + '已超过最大加宽带数', '提示', {
              confirmButtonText: '确定',
            });
          }
        }
    
    
      },
      handleClose(tag) {
        this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
        this.totalAddNum[tag.dateValue] -= tag.numValue;
      }
    },
    
    created(){
      this.setNum();
    }
  }
</script>

<style scoped lang="scss">
</style>