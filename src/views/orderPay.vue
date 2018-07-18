<!-- 组件说明 -->
<template>
	<div class="main">
		<div class="order-pay">
			<steps/>
			<orderInfo/>
			<payWay/>
			<el-alert class="pay-explain" type="warning" title="支付说明" :closable="false" show-icon>
				<p>预订成功并在完成支付宝、快钱方式支付后，非我公司原因导致的取消，在办理退款时由原支付宝、</p>
				<p>快钱公司向我公司收取的手续费须由客户自行承担。</p>
				<p>如遇付款限额问题，请联系第三方支付平台或银行咨询，捷旅不会限制您的付款额度</p>
				<span class="el-alert__title is-bold">支付须知</span>
				<p>本通道为深圳市捷旅国际旅行社有限公司客户专用。请在支付前与本网站达成一致。</p>
				<p>请务必与深圳市捷旅国际旅行社有限公司确认好支付金额后，再付款。可以在快速付款通道里的“附加说明”和“付款金额”中填入相应的支付信息。</p>
				<p>如有交易疑问，请联系捷旅假期：</p>
				<p>0755-33389845/0755-33389846</p>
			</el-alert>
			<el-button class="go-pay" type="success">前往支付</el-button>
			<!--<el-alert class="pay-explain" title="支付须知" type="warning" show-icon>-->
				<!--<p>本通道为深圳市捷旅国际旅行社有限公司客户专用。请在支付前与本网站达成一致。</p>-->
				<!--<p>请务必与深圳市捷旅国际旅行社有限公司确认好支付金额后，再付款。可以在快速付款通道里的“附加说明”和“付款金额”中填入相应的支付信息。</p>-->
				<!--<p>如有交易疑问，请联系捷旅假期：</p>-->
				<!--<p>0755-33389845/0755-33389846</p>-->
			<!--</el-alert>-->
		</div>
	</div>
</template>

<script>
	import steps from '../components/__OrderPay/steps.vue'
	import orderInfo from '../components/__OrderPay/orderInfo.vue'
	import payWay from '../components/__OrderPay/payWay.vue'
	
  export default {
    name: '',
    
    data() {
      return {}
    },
    
    props: {},
    
    components: {
      steps,
      orderInfo,
      payWay,
    },
    
    computed: {},
    
    methods: {}
  }
</script>

<style scoped lang="scss">
	.main{
		background-color: #fff;
	}
	
	.order-pay{
		width: 1200px;
		margin: 0 auto;
	}
	
	.pay-explain{
		margin-top: 20px;
	}
	
	.go-pay{
		display: block;
		margin: 20px auto 40px;
	}
</style>