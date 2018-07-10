<!-- 组件说明 -->
<template>
	<div class="order-info-left fl">
		<el-form :model="orderForm" label-width="100px" class="demo-orderForm">
			<book-info/>
			<add-breakfast/>
			<add-bed/>
			<add-network/>
			<write-guest ref="guestinfo"/>
			<special-req/>
			<confirm-way/>
			<balance-info/>
			<kindly-tips/>
			<travel-tips/>
		</el-form>
		
		<pay-warning/>
		
		<el-button type="success" class="go-to-pay" @click="goPay">下一步，支付</el-button>
	</div>
</template>

<script>
  import payWarning from './payWarning.vue'
  import addBreakfast from './addBreakfast.vue'
  import addBed from './addBed.vue'
  import addNetwork from './addNetwork.vue'
  import writeGuest from './writeGuest.vue'
  import confirmWay from './confirmWay.vue'
  import balanceInfo from './balanceInfo.vue'
  import kindlyTips from './kindlyTips.vue'
  import travelTips from './travelTips.vue'
  import bookInfo from './bookInfo.vue'
  import specialReq from './specialReq.vue'
	
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
        
        roomNum : this.$store.state.orderWrite.roomNum,
      };
    },
    
    computed: {
    
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
  
      goPay : function () {
        console.log(this.$refs.guestinfo.modelArr);
      }
    },
  
    components: {
      payWarning,
      addBed,
      addBreakfast,
      addNetwork,
      writeGuest,
      confirmWay,
      balanceInfo,
      kindlyTips,
      travelTips,
      bookInfo,
      specialReq
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
		
		.inline-warning-module{
			.warning{
				display: inline-block;
				margin-left: 20px;
				
				.el-icon-warning{
					color: red;
				}
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
	
	//expedia供应商入住提示特殊样式
	.expedia-tips-box{
		padding: 0 20px 10px 0;
		>p{
			line-height: 30px;
			>b{
				line-height: 50px;
			}
		}
		>ul{
			>li{
				line-height: 30px;
			}
		}
	}
</style>