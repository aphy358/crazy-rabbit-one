<!-- 组件说明 -->
<template>
	<el-row class="tac">
		<el-col :span="4">
			<el-menu
					default-active="2"
					class="el-menu-vertical-demo"
					@open="handleOpen"
					@close="handleClose">
				
				<el-menu-item index="1">
					<i class="el-icon-menu"></i>
					<span slot="title">个人首页</span>
				</el-menu-item>
				
				<el-menu-item index="2">
					<i class="el-icon-document"></i>
					<span slot="title">酒店订单</span>
				</el-menu-item>
				
				<el-menu-item index="3">
					<i class="el-icon-setting"></i>
					<span slot="title">门票订单</span>
				</el-menu-item>
				
				<el-submenu index="4">
					<template slot="title">
						<i class="el-icon-location"></i>
						<span>企业信息</span>
					</template>
					<el-menu-item-group>
						<el-menu-item index="4-1">基本信息</el-menu-item>
						<el-menu-item index="4-2">员工信息</el-menu-item>
						<el-menu-item index="4-3">结算信息管理</el-menu-item>
					</el-menu-item-group>
				</el-submenu>
				
				<el-submenu index="5">
					<template slot="title">
						<i class="el-icon-location"></i>
						<span>财务管理</span>
					</template>
					<el-menu-item-group>
						<el-menu-item index="5-1">财务管理</el-menu-item>
						<el-menu-item index="5-2">交易明细</el-menu-item>
						<el-menu-item index="5-3">索取发票</el-menu-item>
						<el-menu-item index="5-4">发票列表</el-menu-item>
						<el-menu-item index="5-5">发票信息管理</el-menu-item>
						<el-menu-item index="5-6">发票寄送地址管理</el-menu-item>
					</el-menu-item-group>
				</el-submenu>
				
				<el-submenu index="6">
					<template slot="title">
						<i class="el-icon-location"></i>
						<span>房掌柜小工具</span>
					</template>
					<el-menu-item-group>
						<el-menu-item index="5-1">房掌柜后台</el-menu-item>
						<el-menu-item index="5-2">房掌柜集团助手</el-menu-item>
						<el-menu-item index="5-3">跟价页面</el-menu-item>
					</el-menu-item-group>
				</el-submenu>
			</el-menu>
		</el-col>
	</el-row>
</template>

<script>
	export default {
		methods: {
			handleOpen(key, keyPath) {
				console.log(key, keyPath);
			},
			handleClose(key, keyPath) {
				console.log(key, keyPath);
			}
		}
	}
</script>

<style scoped lang="scss">
</style>