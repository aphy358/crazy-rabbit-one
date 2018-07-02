<!-- 组件说明 -->
<template>
	<div class="order-info-left fl">
		<el-form :model="orderForm" :rules="rules" ref="orderForm" label-width="100px" class="demo-orderForm">
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
					<el-select popper-class="select-roomnum" v-model="value" placeholder="间数">
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
			<el-form-item label="加床信息">
				<el-collapse>
					<el-collapse-item>
						<template slot="title">
							<span class="add-extra-title">成人床 ￥34/份</span>
						</template>
						<el-date-picker
								type="daterange"
								range-separator="至"
								:start-placeholder="checkin"
								:end-placeholder="checkout"
								v-model="bedDateStr"
								value-format="yyyy-MM-dd">
						</el-date-picker>
						<el-select v-model="bedType" placeholder="成人床">
							<el-option
									v-for="item in bedtypes"
									:key="item.value"
									:label="item.label"
									:value="item.value">
							</el-option>
						</el-select>
						<el-input placeholder="请输入份数" v-model="bedNum"></el-input>
						<el-button type="primary" icon="el-icon-plus" size="mini" circle @click="addBed"></el-button>
					</el-collapse-item>
					
					<el-tag
							:key="tag"
							v-for="tag in dynamicTags"
							closable
							:disable-transitions="false"
							@close="handleClose(tag)">
						{{tag}}
					</el-tag>
					
				</el-collapse>
			</el-form-item>
			<el-form-item label="加早信息">
				<el-collapse>
					<el-collapse-item>
						<template slot="title">
							<span class="add-extra-title">成人早 ￥34/份</span>
						</template>
						<el-date-picker
								v-model="value7"
								type="daterange"
								range-separator="至"
								start-placeholder="开始日期"
								end-placeholder="结束日期">
						</el-date-picker>
						<el-select v-model="value" placeholder="成人早">
							<el-option
									v-for="item in eattypes"
									:key="item.value"
									:label="item.label"
									:value="item.value">
							</el-option>
						</el-select>
						<el-input placeholder="请输入份数"></el-input>
						<el-button type="primary" icon="el-icon-plus" size="mini" circle></el-button>
					</el-collapse-item>
				</el-collapse>
			</el-form-item>
			<el-form-item label="加宽带信息">
				<el-collapse>
					<el-collapse-item>
						<template slot="title">
							<span class="add-extra-title">宽带 ￥34/份</span>
						</template>
						<el-date-picker
								v-model="value8"
								type="daterange"
								range-separator="至"
								start-placeholder="开始日期"
								end-placeholder="结束日期">
						</el-date-picker>
						<el-input placeholder="请输入份数"></el-input>
						<el-button type="primary" icon="el-icon-plus" size="mini" circle></el-button>
					</el-collapse-item>
				</el-collapse>
			</el-form-item>
			<el-form-item label="入住信息">
				<div class="guest-box">
					<div class="guest guest-required">
						住客1：
						<el-input placeholder="姓"></el-input>
						<el-input placeholder="名"></el-input>
						<el-input placeholder="护照国籍"></el-input>
					</div>
					<div class="guest">
						住客2：
						<el-input placeholder="姓"></el-input>
						<el-input placeholder="名"></el-input>
						<el-input placeholder="护照国籍"></el-input>
					</div>
					<div class="guest">
						住客3：
						<el-input placeholder="姓"></el-input>
						<el-input placeholder="名"></el-input>
						<el-input placeholder="护照国籍"></el-input>
					</div>
				</div>
			</el-form-item>
			<el-form-item label="个性化信息">
				<el-checkbox-group>
					<el-checkbox label="立即到店" name="type"></el-checkbox>
					<el-checkbox label="原房续住" name="type"></el-checkbox>
					<el-checkbox label="安静房间" name="type"></el-checkbox>
					<el-checkbox label="吸烟楼层" name="type"></el-checkbox>
					<el-checkbox label="连通房间" name="type"></el-checkbox>
					<el-checkbox label="相同楼层" name="type"></el-checkbox>
					<el-checkbox label="尽量有窗" name="type"></el-checkbox>
					<el-checkbox label="尽量无烟楼层" name="type"></el-checkbox>
					<el-checkbox label="尽量相邻房间" name="type"></el-checkbox>
					<el-checkbox label="尽量高层楼房" name="type"></el-checkbox>
					<el-checkbox label="残疾设施房间" name="type"></el-checkbox>
					<el-checkbox label="尽量大床房" name="type"></el-checkbox>
					<el-checkbox label="尽量双床房" name="type"></el-checkbox>
				</el-checkbox-group>
				<p class="orange">请直接勾选您的要求，我们会及时通知酒店并尽量协助安排，但要视酒店情况，不能确保满足</p>
			</el-form-item>
			<el-form-item label="确认方式">
				<el-radio-group>
					<el-radio label="在线确认"></el-radio>
					<el-radio label="电子邮件确认"></el-radio>
					<el-radio label="传真确认"></el-radio>
					<el-radio label="短信确认"></el-radio>
				</el-radio-group>
				<div class="confirm-way-info">
					<span>Email</span>
					<el-input placeholder="邮箱"></el-input>
				</div>
				<div class="confirm-way-info">
					<span>传真</span>
					<el-input placeholder="传真号码"></el-input>
				</div>
				<div class="confirm-way-info">
					<span>手机</span>
					<el-input placeholder="手机号码"></el-input>
				</div>
			</el-form-item>
			<el-form-item label="结算信息">
				<div class="balance-info">
					<span>结算方式</span>
					<el-input></el-input>
				</div>
				<div class="balance-info">
					<span>客户订单号</span>
					<el-select v-model="value9" placeholder="单结">
						<el-option
								v-for="item in balanceways"
								:key="item.value"
								:label="item.label"
								:value="item.value">
						</el-option>
					</el-select>
				</div>
				<div class="balance-info">
					<span>使用预收款</span>
					<el-input></el-input>
				</div>
				<div class="balance-info">
					<span>剩余预收款</span>
					<p>RMB <span class="orange">99999999999</span> 元</p>
				</div>
			</el-form-item>
			<el-form-item label="温馨提示">
				<div class="kindly-tips">
					<span>取消条款</span>
					<p>入住前5天8点不可修改或取消，罚金为首晚</p>
				</div>
				<div class="kindly-tips">
					<span>入住离店时间</span>
					<p>酒店入住时间最早为14:00, 退房时间最晚为次日12:00</p>
				</div>
				<div class="kindly-tips">
					<span>预订提示</span>
					<p>此房价为2人入住价格，若多人入住，则需在酒店前台支付相应费用</p>
				</div>
			</el-form-item>
		</el-form>
		
		<payWarning/>
		
		<el-button type="success" class="go-to-pay">下一步，支付</el-button>
	</div>
</template>

<script>
	import payWarning from './payWarning.vue'
	
  export default {
    data() {
      return {
        orderForm: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        rules: {
          name: [
            {required: true, message: '请输入活动名称', trigger: 'blur'},
            {min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur'}
          ],
          region: [
            {required: true, message: '请选择活动区域', trigger: 'change'}
          ],
          date1: [
            {type: 'date', required: true, message: '请选择日期', trigger: 'change'}
          ],
          date2: [
            {type: 'date', required: true, message: '请选择时间', trigger: 'change'}
          ],
          type: [
            {type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change'}
          ],
          resource: [
            {required: true, message: '请选择活动资源', trigger: 'change'}
          ],
          desc: [
            {required: true, message: '请填写活动形式', trigger: 'blur'}
          ]
        },
        options: [
          {
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
          }
        ],
        bedtypes: [
          {
            value: '1',
            label: '成人床'
          }, {
            value: '2',
            label: '儿童床'
          }
        ],
        eattypes: [
          {
            value: '1',
            label: '成人早'
          }, {
            value: '2',
            label: '儿童早'
          }
        ],
        balanceways: [
          {
            value: '1',
            label: '单结'
          }, {
            value: '2',
            label: '月结'
          }
        ],
        value: this.$store.state.orderWrite.roomNum,
        value7: '',
        value8: '',
        value9: '',
        
        checkin : this.$store.state.orderWrite.checkin,
        checkout : this.$store.state.orderWrite.checkout,
        roomNum : this.$store.state.orderWrite.roomNum,
        dateNum : this.$store.state.orderWrite.dateNum,
        maxPersonNum : this.$store.state.orderWrite.maxPersonNum,
  
        dynamicTags: [],
        bedDateStr : [this.$store.state.orderWrite.checkin, this.$store.state.orderWrite.checkout],
        bedNum : 0
      };
    },
    
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
  
      bedType : function () {
        this.$store.dispatch('orderWrite/getExtraInfo', {typeId : 2})
      }
    },
    
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
  
      addBed(){
        this.dynamicTags.push(
          this.bedDateStr[0] + ' 至 ' + this.bedDateStr[1] + this.bedType + this.bedNum + '份'
        )
      },
      handleClose(tag) {
        this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
      }
    },
  
    components: {
      payWarning
    }
  }
</script>

<style lang="scss">
	.orange {
		color: #ff6600;
	}
	
	.blue{
		color: #7698e5;
	}
	
	.order-info-left {
		width: 870px;
		margin-right: 20px;
		/*padding: 0 20px;*/
		box-sizing: border-box;
		color: #606266;
		
		form.el-form.demo-orderForm{
			border-top: 1px solid #d7e8f5;
			border-left: 1px solid #d7e8f5;
			border-right: 1px solid #d7e8f5;
		}
		
		* {
			font-size: 14px;
		}
		
		.el-form-item__label {
			line-height: 50px;
		}
		
		.el-input__inner {
			border-radius: 0;
			padding: 0 10px;
			height: 30px;
			line-height: 30px;
			
			.el-range-separator {
				height: auto;
			}
		}
		
		.el-input__icon {
			height: 30px;
			line-height: 30px;
		}
		
		.el-input--suffix {
			
			.el-input__inner {
				padding-right: 20px;
			}
		}
		
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
			padding-bottom: 0;
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
		
		.el-input {
			width: auto;
			height: 30px;
			line-height: 30px;
		}
		
		.el-form-item {
			margin-bottom: 0;
			border-bottom: 1px solid #d7e8f5;
		}
		
		.el-checkbox-group {
			margin-top: 5px;
		}
		
		.el-checkbox + .el-checkbox {
			margin-left: 0;
		}
		
		.el-checkbox {
			margin-right: 30px;
		}
		
		.el-radio-group {
			margin-top: 10px;
		}
		
		.el-form-item__content{
			padding-left: 10px;
			padding-bottom: 10px;
			background: #f7fcfd;
			
			*{
				color: #606266;
			}
		}
		
		.el-icon-plus{
			color: #ffffff;
		}
	}
	
	.book-info {
		height: 50px;
		line-height: 50px;
		
		> span, > .el-select {
			margin-right: 40px;
		}
		
		> .el-select {
			width: 60px;
			
		}
	}
	
	.select-roomnum {
		min-width: 40px;
	}
	
	.add-extra-title {
		float: left;
	}
	
	.add-extra-item {
		display: inline-block;
		width: 16px;
		height: 16px;
		line-height: 16px;
		border-radius: 50%;
		border: 1px solid #5db2ee;
		color: #5db2ee;
		text-align: center;
	}
	
	.guest-box {
		margin-top: 5px;
	}
	
	.guest {
		> .el-input {
			margin-right: 20px;
		}
	}
	
	.confirm-way-info {
		margin-top: 10px;
		> span {
			display: inline-block;
			width: 80px;
		}
	}
	
	.balance-info {
		margin: 5px 0 10px;
		> span {
			display: inline-block;
			width: 80px;
		}
		> p {
			display: inline-block;
		}
		.el-input{
			width: 192px;
		}
	}
	
	.kindly-tips{
		margin: 5px 0 10px;
		> span {
			display: inline-block;
			width: 150px;
		}
		> p {
			display: inline-block;
		}
	}
	
	
	.go-to-pay.el-button{
		display: block;
		margin: 50px auto 0;
	}


</style>