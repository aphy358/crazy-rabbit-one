<!-- 组件说明 -->
<template>
	<el-alert
			title="单结订单在您主动取消后将扣除相应的手续费。"
			type="warning"
			:closable="false"
			show-icon>
		<el-tooltip placement="top" popper-class="cost-detail" :visible-arrow="false">
			<div slot="content">
				<div class="cost-detail">
					<h5>费用说明</h5>
					<h6>在线支付订单：</h6>
					<p>当您主动取消订单时，若支付渠道为：快钱、支付宝，需扣手续费千分之五，与我司公账转出费4元（金额1万以下）；微信需扣手续费千分之六。</p>
					<h6>公账支付：</h6>
					<p>当您主动取消订单时，若支付渠道为：我司公账（招行、建行、工行、农行、中行、兴业），需扣手续费4元（金额1万以下）。</p>
				</div>
			</div>
			<span class="blue">费用明细</span>
		</el-tooltip>
	</el-alert>
</template>

<script>
  export default {
    name: '',
    
    data() {
      return {}
    },
    
    props: {},
    
    components: {},
    
    computed: {},
    
    methods: {}
  }
</script>

<style lang="scss">
	
	body .el-tooltip__popper.cost-detail{
		width: 450px;
		background-color: #fffff3;
		color: #333333;
		padding: 10px 15px;
		border: 1px solid #e5c799;
		
		h5{
			font-size: 14px;
			text-align: center;
		}
		
		h6{
			font-weight: bold;
			margin-top: 10px;
		}
		
		p{
			line-height: 22px;
		}
	}
</style>