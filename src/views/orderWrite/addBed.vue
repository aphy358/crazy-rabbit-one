<!-- 组件说明 -->
<template>
	<el-form-item label="加床信息" v-show="Object.keys(bedData).length > 0" :roomnum="roomNum">
		<el-collapse>
			<el-collapse-item>
				<template slot="title">
					<span class="add-extra-title">成人床 ￥34/份</span>
				</template>
				<el-select v-model="dateValue" placeholder="请选择日期" @change="changeType">
					<el-option
							v-for="item in dates"
							:key="item.value"
							:label="item.label"
							:value="item.value">
					</el-option>
				</el-select>
				<el-select v-model="typeValue" placeholder="请选择类型" @change="changeNum">
					<el-option
							v-for="item in types"
							:key="item.value"
							:label="item.label"
							:value="item.value">
					</el-option>
				</el-select>
				<el-select v-model="numValue" placeholder="请选择份数">
					<el-option
							v-for="item in nums"
							:key="item.value"
							:label="item.label"
							:value="item.value">
					</el-option>
				</el-select>
				<el-button type="primary" icon="el-icon-plus" size="mini" circle @click="addBed"></el-button>
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
        dynamicTags: [],
        dateValue : '',
        bedData : this.$store.state.orderWrite.bedData,
        dates : this.$store.state.orderWrite.bedDates,
        typeValue : '',
        types : [],
        numValue : '',
        nums : [],
        finalObj : {},
        totalAddNum : {}
      }
    },
    
    props: {},
    
    components: {},
    
    computed: {
      roomNum(){
        let roomNum = this.$store.state.orderWrite.roomNum;
        this.dynamicTags = [];
        this.totalAddNum = {};
        this.numValue = '';
        this.typeValue = '';
        this.dateValue = '';
        return roomNum;
      }
    },
    
    methods: {
      changeType : function (value) {
        let arr = this.bedData[value];
        let _this = this;
        
        //清空原有的操作数据
        _this.types = [];
        _this.typeValue = '';
        _this.nums = [];
        _this.numValue = '';
        
        arr.forEach(function (v, i) {
          _this.types.push({
            value: v.type,
            label: v.name
          })
        })
      },
  
      changeNum : function (value) {
        let arr = this.bedData[this.dateValue];
        this.finalObj = arr.filter(v => v.type === value)[0];
  
        //清空原有的操作数据
        this.nums = [];
        this.numValue = '';
        
        for (let i = 0; i < this.finalObj.max * this.roomNum; i++) {
          this.nums.push({
            value: i + 1,
            label: i + 1
          });
        }
      },
  
      addBed(){
        //先判断三个选择框是否都已经有值
        if (!this.dateValue){
          this.$alert('请选择日期', '提示', {
            confirmButtonText: '确定',
          });
        }else if (!this.typeValue){
          this.$alert('请选择床型', '提示', {
            confirmButtonText: '确定',
          });
        }else if (!this.numValue){
          this.$alert('请选择份数', '提示', {
            confirmButtonText: '确定',
          });
        }else{
          this.totalAddNum[this.dateValue] = (this.totalAddNum[this.dateValue] || 0) + this.numValue;
          if (this.finalObj.max * this.roomNum >= this.totalAddNum[this.dateValue]){
            this.dynamicTags.push({
              dateValue : this.dateValue,
              name : this.finalObj.name,
              numValue : this.numValue,
              totalPrice : this.numValue * this.finalObj.price,
              typeValue : this.typeValue
            });
            
            //将添加的信息整合好放入store的surchargeBed中，以备提交订单时使用
            this.dealSurchargeBed();
  
          }else{
            this.totalAddNum[this.dateValue] -= this.numValue;
            this.$alert(this.dateValue + '已超过最大加床数', '提示', {
              confirmButtonText: '确定',
            });
          }
        }
        
        
      },
      handleClose(tag) {
        this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
        this.totalAddNum[tag.dateValue] -= tag.numValue;
  
  
        //更改store的surchargeBed中对应的数据，以备提交订单时使用
        this.dealSurchargeBed();
      },
      
      dealSurchargeBed(){
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
          k : 'surchargeBed',
          v : finalArr
        });
        
        this.$store.commit('orderWrite/setCommonState', {
          k : 'bedTotalPrice',
          v : price
        })
      }
    }
  }
</script>

<style lang="scss">
	.order-info-left{
		
		.el-collapse {
			display: inline-block;
			border: none;
		}
		
		.el-collapse-item__header {
			border: none;
			background-color: transparent;
			height: 50px;
			line-height: 50px;
			display: inline-block;
		}
		
		.el-collapse-item__arrow {
			clear: both;
			margin-left: 10px;
		}
		
		.el-collapse-item__content {
			padding-bottom: 10px;
			display: flex;
			border: none;
			max-width: 600px;
			
			> div {
				margin-right: 20px;
				height: 30px;
				line-height: 30px;
			}
		}
		
		.el-collapse-item__wrap {
			background-color: transparent;
			border: none;
		}
		
		.extra-tag{
			width: 400px;
			border-radius: 0;
			font-size: 14px;
			padding: 0 20px;
			margin-top: 10px;
			color: #55b6fe;
			
			>span{
				display: inline-block;
				width: 87px;
			}
		}
	}
	
</style>