<!-- 组件说明 -->
<template>
	<div class="tab-content personal-center">
		<div class="msg-detailis user-msg">
			<h6 class="msg-title">用户信息</h6>
			<table class="msg-list">
				<tbody>
				<tr>
					<td class="item-title">用户名</td>
					<td class="item-content">Cris</td>
					<td class="item-title">姓名</td>
					<td class="item-content">刘娜娜</td>
				</tr>
				<tr>
					<td class="item-title">电话</td>
					<td class="item-content">0074-54586555</td>
					<td class="item-title">邮箱</td>
					<td class="item-content">451458522@qq.com</td>
				</tr>
				<tr>
					<td class="item-title">QQ</td>
					<td class="item-content">1271648224</td>
					<td class="item-title">部门</td>
					<td class="item-content">预订部</td>
				</tr>
				<tr>
					<td class="item-title">岗位</td>
					<td class="item-content">预订员</td>
					<td class="item-title">密码</td>
					<td class="item-content reset-password">修改密码</td>
				</tr>
				</tbody>
			</table>
		</div>
		
		<div class="msg-detailis">
			<h6 class="msg-title">公司信息</h6>
			<table class="msg-list">
				<tbody>
				<tr>
					<td class="item-title">公司账号</td>
					<td class="item-content">sz4378</td>
					<td class="item-title">公司名称</td>
					<td class="item-content">IT测试有限公司</td>
				</tr>
				<tr>
					<td class="item-title">结算周期</td>
					<td class="item-content">单结</td>
					<td class="item-title">当前预收款</td>
					<td class="item-content">451458522元</td>
				</tr>
				<tr>
					<td class="item-title">公司电话</td>
					<td class="item-content">12716482224</td>
					<td class="item-title">公司邮箱</td>
					<td class="item-content">451458522@qq.com</td>
				</tr>
				</tbody>
			</table>
		</div>
	</div>

</template>

<script>
	export default {
		name: '',
		
		data() {
			return{
			
			}
		},
		
		props: {
		
		},
		
		components: {},
		
		computed: {},
		
		methods: {}
	}
</script>

<style lang="scss">
	.msg-detailis{
		width: 100%;
		padding: 12px  20px 28px;
		box-shadow: 0 0 10px #eeeeee;
		box-sizing: border-box;
		
		&.user-msg{
			margin-bottom: 20px;
		}
		
		@at-root .msg-title{
			height: 35px;
			line-height: 35px;
			border-bottom: 2px solid #ffa927;
			margin-bottom: 20px;
			font-size: 18px;
			color: #ffa927;
		}
		
		@at-root .msg-list{
			table-layout:fixed;
			border-collapse:collapse;
			border-top: 1px solid #e8e8e8;
			border-left: 1px solid #e8e8e8;
			
			tr{
				height: 50px;
				line-height: 50px;
				width: 900px;
				box-sizing: border-box;
				
				
				td{
					height: 50px;
					float: left;
					box-sizing: border-box;
					border-right: 1px solid #e8e8e8;
					border-bottom: 1px solid #e8e8e8;
				}
				
				.item-title{
					width: 159px;
					text-align: center;
					background-color: #EAF5FF;
				}
				
				.item-content{
					width: 290px;
					padding-left: 20px;
				}
				
				.reset-password{
					color: #3399ff;
					cursor: pointer;
					
					&:hover{
						text-decoration: underline;
					}
				}
			}
		}
	}
</style>