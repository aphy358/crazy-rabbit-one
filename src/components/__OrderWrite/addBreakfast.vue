<!-- 组件说明 -->
<template>
	<el-form-item label="加早信息" v-show="Object.keys(breakfastData).length > 0" :roomnum="roomNum">
		<el-collapse>
			<el-collapse-item>
				<template slot="title">
					<span class="add-extra-title">成人早 ￥34/份</span>
				</template>
				<el-select v-model="dateValue" placeholder="请选择日期" @change="changeType">
					<el-option
							v-for="item in dates"
							:key="item.value"
							:label="item.label"
							:value="item.value">
					</el-option>
				</el-select>
				<el-select v-model="typeValue" placeholder="请选择类型" @change="getAim">
					<el-option
							v-for="item in types"
							:key="item.value"
							:label="item.label"
							:value="item.value">
					</el-option>
				</el-select>
				<el-input placeholder="请输入份数" v-model="numValue"></el-input>
				<el-button type="primary" icon="el-icon-plus" size="mini" circle @click="addBreakfast"></el-button>
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
				<span>{{tag.name}}</span>
				<span>{{tag.numValue}}份</span>
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
        dateValue : '',
        breakfastData : this.$store.state.orderWrite.breakfastData,
        dates : this.$store.state.orderWrite.breakfastDates,
        typeValue : '',
        types: [],
        numValue : 0,
        finalObj : {},
        totalAddNum : {},
        dynamicTags : []
      }
    },
    
    props: {},
    
    components: {},
    
    computed: {
      roomNum(){
        let roomNum = this.$store.state.orderWrite.roomNum;
        this.dynamicTags = [];
        this.totalAddNum = {};
        this.numValue = 0;
        this.typeValue = '';
        this.dateValue = '';
        return roomNum;
      }
    },
    
    methods: {
      changeType : function (value) {
        let arr = this.breakfastData[value];
        let _this = this;
    
        //清空原有的操作数据
        _this.types = [];
        _this.typeValue = '';
    
        arr.forEach(function (v, i) {
          _this.types.push({
            value: v.type,
            label: v.name
          })
        })
      },
  
      getAim : function (value) {
        let arr = this.breakfastData[this.dateValue];
        this.finalObj = arr.filter(v => v.type === value)[0];
      },
  
      addBreakfast(){
        //先判断三个选择框是否都已经有值
        let reg=/^[1-9]+\d*$/;
        if (!this.dateValue){
          this.$alert('请选择日期', '提示', {
            confirmButtonText: '确定',
          });
        }else if (!this.typeValue){
          this.$alert('请选择早餐类型', '提示', {
            confirmButtonText: '确定',
          });
        }else if (!reg.test(this.numValue)){
          this.$alert('份数应为一个大于0的正整数', '提示', {
            confirmButtonText: '确定',
          });
        }else{
          this.totalAddNum[this.dateValue] = (this.totalAddNum[this.dateValue] || 0) + this.numValue;
          this.dynamicTags.push({
            dateValue : this.dateValue,
            name : this.finalObj.name,
            numValue : this.numValue,
            totalPrice : this.numValue * this.finalObj.price,
            typeValue : this.typeValue
          });
          //改变store中的数据
          this.dealSurchargeBref();
        }
    
    
      },
      handleClose(tag) {
        this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
        this.totalAddNum[tag.dateValue] -= tag.numValue;
  
        //改变store中的数据
        this.dealSurchargeBref();
      },
  
      dealSurchargeBref(){
        let finalArr = [];
        let price = 0;
        this.dynamicTags.forEach(function (v, i) {
          finalArr.push({
            date : v.dateValue,
            count : v.numValue,
            type : v.typeValue,
            name : v.name
          });
          price += v.totalPrice
        });
    
        this.$store.commit('orderWrite/setCommonState', {
          k : 'surchargeBref',
          v : finalArr
        });
  
        this.$store.commit('orderWrite/setCommonState', {
          k : 'brefTotalPrice',
          v : price
        })
      }
    }
  }
</script>

<style scoped lang="scss">
</style>