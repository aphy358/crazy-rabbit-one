<!-- 组件说明 -->
<template>
	<div class="pc-head">
		<div class="pc-head-content clearfix">
			<div class="pc-head-left">
				<h5 class="company-name" data-complete="深圳捷旅国际旅行社有限公司深圳捷旅国际旅行社有限公司">
					深圳捷旅国际旅行社有限公司深圳捷旅国际旅行社有限公司
				</h5>
				
				<p class="user-name">
					<span class="manager-name">支浩松</span>
					<span class="user-status">预订员</span>
					<span class="balance-way">月结</span>
				</p>
				
				<div class="order-status">
					<button class="undealt-order">未处理订单<span class="red">（6）</span></button>
					<button class="unpaid-order">单结待付款订单<span class="red">（123）</span></button>
				</div>
				
				<div class="pc-headline">
					<span class="headline-icon"></span>
					<a href="/mainPush/toTodayPush.do">又有低价酒店了，快去今日主推看看吧！</a>
				</div>
			</div>
			
			
			<div class="item-box pc-credit">
				<p>￥<span class="item-num credit-num">23200</span></p>
			</div>
			
			
			<div class="item-box pc-money">
				<p>￥<span class="item-num money-num">10800</span></p>
				<button class="recharge"><a href="/charge/userCharge.do?chargeType=charge">快速充值</a></button>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'pcHead',
		
		data() {
			return {}
		},
		
		props: {},
		
		components: {
		},
		
		computed: {},
		
		methods: {}
	}
</script>

<style scoped lang="scss">
	@import "../../assets/pc_sprites.scss";
	.pc-head-left{
		float: left;
		width: 380px;
		margin-right: 50px;
		
		@at-root .company-name{
			width: 100%;
			height: 40px;
			line-height: 40px;
			font-size: 22px;
			overflow: hidden;
			text-overflow:ellipsis;
			display: -webkit-box;
			-webkit-line-clamp: 1;
			-webkit-box-orient: vertical;
			word-break: break-all;
		}
		
		@at-root .user-name{
			height: 28px;
			line-height: 28px;
			margin-bottom: 18px;
			
			.manager-name{
				font-size: 18px;
				margin-right: 40px;
				color: #666666;
			}
			
			.user-status{
				display: inline-block;
				color: #ffffff;
				text-align: center;
				font-size: 14px;
				line-height: 28px;
				margin-right: 40px;
				text-indent: 10px;
				@include pc_sprites;
				@include pc-status;
			}
			
			.balance-way{
				color: #3399ff;
				font-size: 14px;
			}
		}
		
		@at-root .order-status{
			height: 36px;
			margin-bottom: 20px;
			
			>button{
				float: left;
				border: 1px solid #E3E3E3;
				border-radius: 4px;
				height: 34px;
				line-height: 34px;
				padding: 0 10px;
				font-size: 14px;
				cursor: pointer;
			}
			
			.undealt-order{
				margin-right: 20px;
			}
		}
		
		@at-root .pc-headline{
			height: 20px;
			line-height: 20px;
			.headline-icon{
				display: inline-block;
				margin: 2px 0;
				float: left;
				margin-right: 4px;
				@include pc_sprites;
				@include jl_headline;
			}
			
			>a{
				color: #666666;
				text-decoration: underline;
				cursor: pointer;
				
				&:hover{
					color: #ffa928;
				}
			}
		}
	}
	
	.item-box{
		float: left;
		color: #ffffff;
		position: relative;
		border-radius: 20px;
		
		>p{
			position: absolute;
			left: 34px;
			bottom: 42px;
			font-size: 18px;
			
			.item-num{
				font-size: 26px;
				letter-spacing: 2px;
			}
		}
	}
	
	
	.pc-credit{
		@include pc_sprites;
		@include pc-credit;
		box-shadow: 0 0 10px #6191fb;
		margin-right: 50px;
	}
	
	
	.pc-money{
		@include pc_sprites;
		@include pc-money;
		box-shadow: 0 0 10px #fda972;
		
		@at-root .recharge{
			position: absolute;
			right: 30px;
			bottom: 42px;
			width: 118px;
			height: 38px;
			line-height: 38px;
			background-color: rgba(255, 255, 255, 0.2);
			color: #ffffff;
			font-size: 16px;
			border: 1px solid #ffffff;
			border-radius: 4px;
			cursor: pointer;
			
			&:hover{
				background-color: rgba(255, 255, 255, 0.4);
			}
			
			>a{
				color: #ffffff;
				display: block;
				width: 100%;
				height: 100%;
				
				&:hover{
					//color: #ffa928;
				}
			}
		}
	}
</style>