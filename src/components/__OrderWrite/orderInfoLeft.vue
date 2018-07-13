<!-- 组件说明 -->
<template>
	<div class="order-info-left fl">
		<el-form :model="orderForm" label-width="100px" class="demo-orderForm">
			<book-info/>
			<add-breakfast/>
			<add-bed/>
			<add-network/>
			<write-guest ref="guestinfo"/>
			<special-req ref="specialreq"/>
			<confirm-way ref="confirmway"/>
			<balance-info ref="balanceinfo"/>
			<kindly-tips/>
			<travel-tips/>
		</el-form>
		
		<pay-warning/>
		
		<el-button type="success" class="go-to-pay" @click="goPay">下一步，支付</el-button>
		
		<confirm-order/>
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
  import confirmOrder from './confirmOrder.vue'
  
  import API from '../../api'
  import { mapState } from 'vuex'
  
  import {_scrollTop} from '../../store/util.js'
  
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
        
        roomNum: this.$store.state.orderWrite.roomNum,
      };
    },
    
    computed : mapState('orderWrite', [
      'staticInfo',
      'content',
      'hotelPrice',
    ]),
    
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
      
      goPay: function () {
        //先检查必填项是否均为已填
        let guestinfo = this.$refs.guestinfo;
        
        let guestFlag = guestinfo.validate();
        
        let inputError = document.querySelector('.input-error');
        
        if (!!inputError || guestFlag === false) {
          _scrollTop()
        } else {
          //获取信息
          let confirmway = this.$refs.confirmway;
          let balanceinfo = this.$refs.balanceinfo;
          let specialreq = this.$refs.specialreq;
          
          //入住信息
          let userNames = '';
          let groupNum = guestinfo.maxPersonNum * guestinfo.roomNum;
          for (let index = 0; index < groupNum; index++) {
            let str = '';
            let flag = true;
            guestinfo.keys.forEach(function (v, i) {
              let value = guestinfo.modelArr[v + index];
              if (value){
                str += guestinfo.modelArr[v + index] + '#';
              }else{
                flag = false;
              }
            });
            if (flag === true){
              userNames += str.replace(/(.*)#/, '$1') + ',';
            }
          }
          userNames = userNames.replace(/(.*),/, '$1');
          
          //结算方式
          let paymentTermArr = ['客人前台现付', '单结', '周结', '半月结', '月结', '不固定', '三日结', '十日结', '额度结'];
          let paymentTerm = paymentTermArr.indexOf(balanceinfo.balanceType) - 1;
          
          let params = {
            staticInfoId: this.staticInfo.staticInfoId,
            supplierId: this.$store.state.orderWrite.supplierId,
            roomId: this.content.roomId,
            startDate: this.$store.state.orderWrite.checkin,
            endDate: this.$store.state.orderWrite.checkout,
            paymentType: this.$store.state.orderWrite.paymentType,
            roomNum: this.roomNum,
            childrenNum: this.content.childrenNum,
            childrenAgeStr: this.content.childrenAgeStr,
            hotelPriceStrs: window.JSON.stringify(this.hotelPrice),
            rateType: this.content.rateType,
            checkType: confirmway.confirmWay,
            voucherEmail: confirmway.email,
            voucherFax: confirmway.fax,
            voucherMobile: confirmway.phone,
            customerOrderCode: balanceinfo.customerCode,
            willUsedBalance: balanceinfo.advancePayment || 0,
            hotelName: this.staticInfo.infoName,
            adultNum: this.content.adultNum,
            dateNum: this.$store.state.orderWrite.dateNum,
            paymentTerm: paymentTerm,
            surchargeBref: window.JSON.stringify(this.$store.state.orderWrite.surchargeBref),
            surchargeBed: window.JSON.stringify(this.$store.state.orderWrite.surchargeBed),
            surchargeInternet: window.JSON.stringify(this.$store.state.orderWrite.surchargeInternet),
            userNames: userNames,
            payTotalMoney: this.$store.state.orderWrite.payTotalMoney,
            toatlBasePrice: this.content.toatlBasePrice,
            totalNowPrice: this.content.nowTotalMoney,
            specialRequire: window.JSON.stringify(specialreq.specialReq),
            bedTypeStrs: this.content.bedTypeStrs,
            isHasMarketing: this.$store.state.orderWrite.isHasMarketing
          };
  
          if (params.isHasMarketing === '1'){
            params['marketing.marketingPrice'] = queryString('marketingPrice');
            params['marketing.startTime'] = queryString('startTime').replace(/\s+/g, ' ');
            params['marketing.endTime'] = queryString('endTime').replace(/\s+/g, ' ');
          }
          
          this.$store.dispatch('orderWrite/confirmOrderInfo', {
            k : 'orderInfo',
            v : params
          })
        }
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
      specialReq,
      confirmOrder
    }
  }
</script>

<style lang="scss">
	.fl {
		float: left;
	}
	
	.fr {
		float: right;
	}
	
	.orange {
		color: #ff6600;
	}
	
	.blue {
		color: #7698e5;
	}
	
	.order-info-left {
		width: 870px;
		margin-right: 20px;
		/*padding: 0 20px;*/
		box-sizing: border-box;
		color: #606266;
		
		form.el-form.demo-orderForm {
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
			min-width: 120px;
			
			.el-checkbox__label{
				padding-left: 5px;
			}
		}
		
		.el-radio__label{
			padding-left: 5px;
		}
		
		.el-radio-group {
			margin-top: 10px;
		}
		
		.el-form-item__content {
			padding-left: 10px;
			padding-bottom: 10px;
			background: #f7fcfd;
			
			* {
				color: #606266;
			}
			
			.el-icon-plus {
				color: #ffffff;
			}
		}
		
		.inline-warning-module {
			.warning {
				display: inline-block;
				margin-left: 20px;
				
				.el-icon-warning {
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
		.el-input {
			width: 192px;
		}
	}
	
	.kindly-tips {
		margin: 5px 0 10px;
		> span {
			display: inline-block;
			width: 150px;
		}
		> p {
			display: inline-block;
		}
	}
	
	.go-to-pay.el-button {
		display: block;
		margin: 50px auto 0;
	}
	
	//expedia供应商入住提示特殊样式
	.expedia-tips-box {
		padding: 0 20px 10px 0;
		> p {
			line-height: 30px;
			> b {
				line-height: 50px;
			}
		}
		> ul {
			> li {
				line-height: 30px;
			}
		}
	}
</style>