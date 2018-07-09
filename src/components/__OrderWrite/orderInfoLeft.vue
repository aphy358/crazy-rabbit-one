<!-- 组件说明 -->
<template>
	<div class="order-info-left fl">
		<el-form :model="orderForm" ref="orderForm" label-width="100px" class="demo-orderForm">
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
			<add-breakfast/>
			<add-bed/>
			<add-network/>
			<write-guest/>
			<el-form-item label="个性化信息">
				<el-checkbox-group v-model="specialConditions" @change="handSpecialReq">
					<el-checkbox v-for="item in conditions" :label="item" name="type"></el-checkbox>
				</el-checkbox-group>
				<p class="orange">请直接勾选您的要求，我们会及时通知酒店并尽量协助安排，但要视酒店情况，不能确保满足</p>
			</el-form-item>
			<el-form-item label="确认方式">
				<el-radio-group v-model="confirmWay" @change="handleConfirmWay">
					<el-radio :label="9">在线确认</el-radio>
					<el-radio :label="1">电子邮件确认</el-radio>
					<el-radio :label="2">传真确认</el-radio>
					<el-radio :label="3">短信确认</el-radio>
				</el-radio-group>
				<div class="confirm-way-info">
					<span>Email</span>
					<el-input
							v-model="email"
							@input="validate('email')"
							placeholder="邮箱"
							:value="confirmWay === 1 ? email = confirmEmail : email = ''"
							:class="{'input-error': errors.emailMsg}"
					></el-input>
					<p class="warning" v-show="errors.emailMsg">
						<i class="el-icon-warning"></i>
						{{errors.emailMsg}}
					</p>
				</div>
				<div class="confirm-way-info">
					<span>传真</span>
					<el-input
							v-model="fax"
							@input="validate('fax')" placeholder="传真号码"
							:value="confirmWay === 2 ? fax = confirmFax : fax = ''"
							:class="{'input-error': errors.faxMsg}"
					></el-input>
					<p class="warning" v-show="errors.faxMsg">
						<i class="el-icon-warning"></i>
						{{errors.faxMsg}}
					</p>
				</div>
				<div class="confirm-way-info">
					<span>手机</span>
					<el-input
							v-model="phone"
							@input="validate('phone')"
							placeholder="手机号码"
							:value="confirmWay === 3 ? phone = confirmPhone : phone = ''"
							:class="{'input-error': errors.phoneMsg}"
					></el-input>
					<p class="warning" v-show="errors.phoneMsg">
						<i class="el-icon-warning"></i>
						{{errors.phoneMsg}}
					</p>
				</div>
			</el-form-item>
			<el-form-item label="结算信息">
				<div class="balance-info">
					<span>客户订单号</span>
					<el-input
							v-model="customerCode"
							@input="validate('customerCode')"
							:class="{'input-error': errors.customerCodeMsg}"
					></el-input>
					<p class="warning" v-show="errors.customerCodeMsg">
						<i class="el-icon-warning"></i>
						{{errors.customerCodeMsg}}
					</p>
				</div>
				<div class="balance-info">
					<span :paymenttype="paymentType" :paymentterm="paymentTerm">结算方式</span>
					<el-select v-model="value9" placeholder="单结">
						<el-option
								v-for="item in balanceWay"
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
		
		<pay-warning/>
		
		<el-button type="success" class="go-to-pay">下一步，支付</el-button>
	</div>
</template>

<script>
	import payWarning from './payWarning.vue'
    import addBreakfast from './addBreakfast.vue'
    import addBed from './addBed.vue'
    import addNetwork from './addNetwork.vue'
	import writeGuest from './writeGuest.vue'
	import { validator } from '../../components/validator.js'
	
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
        options: [],
        value: this.$store.state.orderWrite.roomNum + '间',
        value9: '',
        
        checkin : this.$store.state.orderWrite.checkin,
        checkout : this.$store.state.orderWrite.checkout,
        roomNum : this.$store.state.orderWrite.roomNum,
        dateNum : this.$store.state.orderWrite.dateNum,
  
  
        specialConditions : [],
        checked: true,
        confirmWay : 9,
        balanceWay: [],
        
        
        email : '',
        fax : '',
        phone : '',
        rules : {},
  
        customerCode : '',
        
        
        errors : {
          validated: true,
        },
        
      };
    },
  
    created() {
      let _this = this;
    
      this.rules = {
        email: function (name) {
          validator(
            _this,
            name,
            [
              'email',
            ]
          );
        },
        fax: function (name) {
          validator(
            _this,
            name,
            [
              'fax',
            ]
          );
        },
        phone:function (name) {
          validator(
            _this,
            name,
            [
              'mobile',
            ]
          );
        },
        customerCode:function (name) {
          validator(
            _this,
            name,
            [
              {
                byteRangeLength : [0,1],
                msg: '最多允许输入64位字符'
              }
            ]
          );
        }
      }
    
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
  
      maxPersonNum : function () {
        return this.$store.state.orderWrite.maxPersonNum;
      },
  
      conditions : function () {
        let specialConditions = this.$store.state.orderWrite.specialConditions;
        let conditions = [];
        specialConditions.forEach(function (v, i) {
          conditions.push(v.optionname);
        });
        return conditions;
      },
      
      confirmEmail : function () {
        return this.$store.state.orderWrite.confirmEmail
      },
      confirmFax : function () {
        return this.$store.state.orderWrite.confirmFax
      },
      confirmPhone : function () {
        return this.$store.state.orderWrite.confirmPhone
      },
  
  
      paymentType : function () {
        return this.$store.state.orderWrite.paymentType
      },
      paymentTerm : function () {
        let paymentType = this.paymentType;
        let paymentTerm = this.$store.state.orderWrite.paymentTerm;
        this.balanceWay = [];
        let paymentTermName = ["客人前台现付", '单结', '周结', '半月结', '月结', '不固定', '三日结', '十日结', '额度结'];
        if (paymentType === 0){
          this.balanceWay.push({
            value: '0',
            label: '单结'
          });
          if (paymentTerm !== 0){
            this.balanceWay.push({
              value: paymentTerm,
              label: paymentTermName[paymentTerm + 1]
            })
          }
        }
        return paymentTerm
      },
      
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
  
      handSpecialReq : function (value) {
        this.specialConditions = value;
      },
  
      handleConfirmWay : function (value) {
        this.confirmWay = value;
      },
  
  
      validate : function (name) {
        this.rules[name](name);
      },
    },
  
    components: {
      payWarning,
      addBed,
      addBreakfast,
      addNetwork,
      writeGuest
    }
  }
</script>

<style lang="scss">
	.fl{
		float: left;
	}
	
	.fr{
		float: right;
	}
	
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
			
			.el-icon-plus{
				color: #ffffff;
			}
		}
		
		.warning{
			display: inline-block;
			margin-left: 20px;
			
			.el-icon-warning{
				color: red;
			}
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