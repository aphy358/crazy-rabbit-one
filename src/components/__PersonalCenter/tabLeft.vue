<!-- 组件说明 -->
<template>
	<div class="fl">
		<el-menu
				default-active="1"
				class="el-menu-vertical-demo"
				@open="handleOpen"
				@close="handleClose"
				active-text-color="#ffa825"
				unique-opened>
			<el-menu-item index="1" @click="switchleft(1)">
				<i class="iconfont-icons iconfont-personalCenter"></i>
				<span slot="title">个人首页</span>
			</el-menu-item>
			
			<el-menu-item index="2" @click="switchleft(2)">
				<i class="iconfont-icons iconfont-hotelorder"></i>
				<span slot="title">酒店订单</span>
			</el-menu-item>
			
			<el-menu-item index="3" @click="switchleft(3)">
				<i class="iconfont-icons iconfont-ticketorder"></i>
				<span slot="title">门票订单</span>
			</el-menu-item>
			
			<el-submenu index="4">
				<template slot="title">
					<i class="iconfont-icons iconfont-companymsg"></i>
					<span>企业信息</span>
				</template>
				<el-menu-item index="4-1" @click="switchleft(4)">基本信息</el-menu-item>
				<el-menu-item index="4-2" @click="switchleft(5)">员工信息</el-menu-item>
				<el-menu-item index="4-3" @click="switchleft(6)">结算信息管理</el-menu-item>
			</el-submenu>
			
			<el-submenu index="5">
				<template slot="title">
					<i class="iconfont-icons iconfont-finance"></i>
					<span>财务管理</span>
				</template>
				<el-menu-item index="5-1" @click="switchleft(7)">财务管理</el-menu-item>
				<el-menu-item index="5-2" @click="switchleft(8)">交易明细</el-menu-item>
				<el-menu-item index="5-3" @click="switchleft(9)">索取发票</el-menu-item>
				<el-menu-item index="5-4" @click="switchleft(10)">发票列表</el-menu-item>
				<el-menu-item index="5-5" @click="switchleft(11)">发票信息管理</el-menu-item>
				<el-menu-item index="5-6" @click="switchleft(12)">发票寄送地址管理</el-menu-item>
			</el-submenu>
			
			<el-submenu index="6">
				<template slot="title">
					<i class="iconfont-icons iconfont-fzgtool"></i>
					<span>房掌柜小工具</span>
				</template>
				<el-menu-item index="5-1" @click="switchleft(13)">房掌柜后台</el-menu-item>
				<el-menu-item index="5-2" @click="switchleft(14)">房掌柜集团助手</el-menu-item>
				<el-menu-item index="5-3" @click="switchleft(15)">跟价页面</el-menu-item>
			</el-submenu>
		</el-menu>
	</div>
</template>

<script>
	export default {
		data(){
			return{
			
			}
		},
		methods: {
			handleOpen(key, keyPath) {
//				console.log(key, keyPath);
			},
			handleClose(key, keyPath) {
//				console.log(key, keyPath);
			},
		    switchleft(index){
		      this.$store.commit("personalCenter/setCommonState", {k: 'tabindex', v: index})
		    }
		}
	}
</script>

<style lang="scss">
	@import "../../assets/font/iconfont.css";
	.iconfont-icons{
		margin-right: 10px;
	}
	
	body{
		.el-menu{
			width: 230px;
			/*border: 1px solid #e6e6e6;*/
			border: none;
			box-shadow: 0 0 10px #dddddd;
		}
	}
</style>