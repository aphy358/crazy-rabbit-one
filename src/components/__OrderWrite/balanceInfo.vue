<!-- 组件说明 -->
<template>
	<el-form-item class="inline-warning-module" label="结算信息">
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
			<el-select v-model="balanceType" placeholder="单结">
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
			<el-input
					v-model="advancePayment"
					@input="checkAdvancePayment()"
					:class="{'input-error': errors.advancePaymentMsg}"
			></el-input>
			<p class="warning" v-show="errors.advancePaymentMsg">
				<i class="el-icon-warning"></i>
				{{errors.advancePaymentMsg}}
			</p>
		</div>
		<div class="balance-info">
			<span>剩余预收款</span>
			<p>RMB <span class="orange">{{balance}}</span> 元</p>
		</div>
	</el-form-item>
</template>

<script>
  import {validator} from '../../components/validator.js'

  import { mapState } from 'vuex'
  
  export default {
    name: '',
    
    data() {
      return {
        
        balanceType: '',
        balanceWay: [],
        
        customerCode: '',
        advancePayment: '',
        
        
        errors: {
          validated: true,
        },
      }
    },
    
    props: {},
    
    components: {},
    
    created() {
      let _this = this;
      
      this.rules = {
        customerCode: function (name) {
          validator(
            _this,
            name,
            [
              {
                callback() {
                  let value = _this[name];
                  let length = value.length;
                  for (let i = 0; i < value.length; i++) {
                    if (value.charCodeAt(i) > 127) {
                      length += 2;
                    }
                  }
                  
                  return ( length >= 0 && length <= 64 ) || value === ''
                },
                msg: '最多允许输入64位字符'
              }
            ]
          )
        }
      }
      
    },
    
    computed: mapState({
      content : state => state.orderWrite.content,
      distributor : state => state.orderWrite.distributor,
      balance : state => state.orderWrite.balance,
      paymentType : state => state.orderWrite.paymentType,
      paymentTerm(){
        let paymentType = this.paymentType;
        let paymentTerm = this.distributor.paymentTerm;
        this.balanceWay = [];
        let paymentTermName = ["客人前台现付", '单结', '周结', '半月结', '月结', '不固定', '三日结', '十日结', '额度结'];
        if (paymentType === 0) {
          this.balanceWay.push({
            value: '0',
            label: '单结'
          });
          this.balanceType = '单结';
          if (paymentTerm !== 0) {
            this.balanceWay.push({
              value: paymentTerm,
              label: paymentTermName[paymentTerm + 1]
            });
            this.balanceType = paymentTermName[paymentTerm + 1];
          }
        }
        return paymentTerm
      },
    }),
    
    methods: {
      
      validate: function (name) {
        this.rules[name](name);
      },
      
      checkAdvancePayment: function () {
        let value = this.advancePayment;
        let reg = /^[1-9]+\d*$/;
        let payTotalMoney = this.$store.state.orderWrite.payTotalMoney;
        let taxesAndFeesRMB = this.$store.state.orderWrite.taxesAndFeesRMB;
        let bedTotalPrice = this.$store.state.orderWrite.bedTotalPrice;
        let brefTotalPrice = this.$store.state.orderWrite.brefTotalPrice;
        let netTotalPrice = this.$store.state.orderWrite.netTotalPrice;
        if (value === '') {
          this.errors.advancePaymentMsg = '';
        } else if (!reg.test(value)) {
          this.errors.advancePaymentMsg = '请输入一个正数';
        } else if (+value > this.content.balance) {
          this.errors.advancePaymentMsg = '使用的预收款不能超过账号剩余预收款';
        } else if (+value > (payTotalMoney + taxesAndFeesRMB + bedTotalPrice + brefTotalPrice + netTotalPrice)) {
          this.errors.advancePaymentMsg = '使用的预收款不能超过订单总金额';
        } else {
          this.errors.advancePaymentMsg = '';
          this.$store.commit('orderWrite/setCommonState', {
            k : 'willUsedBalance',
            v : +value
          })
        }
      },
    }
  }
</script>

<style scoped lang="scss">
</style>