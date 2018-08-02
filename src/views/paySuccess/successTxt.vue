<!-- 组件说明 -->
<template>
	<div class="success-txt">
		<p class="order-code">您的订单号编号：AB180716116264</p>
		
		<p class="pay-success-txt clearfix">
			<i class="el-icon-success"></i>
			<span>订单已提交，请在“个人中心-订单管理”查看订单明细以及确认状态</span>
		</p>
		
		<p class="read-order">
			<a href="#" class="go-order-detail">查看订单详情</a>
			<a href="#" class="go-order-list">查看订单列表</a>
		</p>
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
	
	
	
	.order-code,.pay-success-txt,.read-order{
		text-align: center;
		color: #333333;
	}
	
	.order-code{
		font-size: 18px;
		height: 150px;
		line-height: 150px;
	}
	
	.pay-success-txt{
		width: 420px;
		margin: 0 auto;
		line-height: 100px;
		
		.el-icon-success{
			color: #67c23a;
			font-size: 40px;
			float: left;
			line-height: 100px;
			margin-right: 20px;
		}
		
		>span{
			float: left;
		}
	}
	
	.read-order{
		>a{
			margin-right: 10px;
			color: #08bdf9;
		}
	}
</style>