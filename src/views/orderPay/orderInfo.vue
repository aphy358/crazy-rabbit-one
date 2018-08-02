<!-- 组件说明 -->
<template>
	<div class="order-info">
		<ul>
			<li class="clearfix">
				<span class="fl order-title">订单号：</span>
				<p class="fl order-txt orange">AA180713146957</p>
			</li>
			<li class="clearfix">
				<span class="fl order-title">订单金额：</span>
				<p class="fl order-txt orange">￥ 100.0</p>
			</li>
			<li class="clearfix">
				<span class="fl order-title">收款方：</span>
				<p class="fl order-txt">深圳市捷旅国际旅行社有限公司<span class="red">[深圳捷旅假期]</span></p>
			</li>
			<li class="clearfix">
				<span class="fl order-title">付款方：</span>
				<p class="fl order-txt">xxxxxxxxxxx</p>
			</li>
			<li class="clearfix">
				<span class="fl order-title">付款金额：</span>
				<p class="fl order-txt"><span class="orange">￥ 100.0</span> 元 使用预收款金额：<span class="orange">0.0</span> 元</p>
			</li>
			<li class="clearfix">
				<span class="fl order-title">付款提示：</span>
				<p class="fl order-txt red">请在2018-07-13 17:00前付款，超过2018-07-13 17:00后会自动取消。</p>
			</li>
		</ul>
	</div>
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

<style scoped lang="scss">
	.order-info{
		padding: 20px 60px;
		/*border-top: 1px solid #ccc;*/
		margin-top: 20px;
		/*box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);*/
		border: 1px solid #ebeef5;
	}
	
	li{
		height: 40px;
		line-height: 40px;
	}
	
	.order-title{
		display: inline-block;
		width: 100px;
		font-weight: bold;
	}
	
	.order-txt{
		display: inline-block;
		font-weight: bold;
	}
	
	.orange{
		color: #F07C13;
	}
	
	.red{
		color: red;
	}
	
	.bold{
		font-weight: bold;
	}
</style>