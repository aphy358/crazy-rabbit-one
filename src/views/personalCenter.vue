<!-- 组件说明 -->
<template>
	<div class="main">
		<pcHead/>
		
		<pcMain/>
		
		<Sidebar/>
	</div>
</template>

<script>
	import pcHead from '../components/__PersonalCenter/pcHead.vue'
	import pcMain from '../components/__PersonalCenter/pcMain.vue'
	import Sidebar from '../components/common/Sidebar'
	export default {
		name: '',
		
		data() {
			return {}
		},
		
		props: {},
		
		components: {
		  pcHead,
		  pcMain,
          Sidebar
		},
		
		computed: {},
		
		methods: {}
	}
</script>

<style lang="scss">
	body{
		background-color: #f9f9f9;
		
		.main{
			
			@at-root .pc-head{
				background: #ffffff;
				height: 250px;
				margin-bottom: 20px;
				
				.pc-head-content{
					width: 1200px;
					margin: 0 auto;
					padding: 40px 0 50px;
				}
			}
			
			@at-root .pc-main{
				background-color: #fff;
				
				.pc-main-content{
					width: 1200px;
					margin: 0 auto;
					padding: 32px 0 50px;
					
					.tab-right{
						width: 940px;
						
						.tab-content{
							width: 100%;
						}
					}
				}
			}
		}
	}
	
	.red{
		color: red;
	}
	
	.blue{
		color: #3399ff;
	}
	
	.deep-blue{
		color: #4461f7;
	}
	
	.gold{
		color: #ffa825;
	}
	
	.attention{
		width: 14px;
		height: 14px;
		line-height: 14px;
		border-radius: 50%;
		border: 1px solid #ffa825;
		color: #ffa825;
		text-align: center;
		display: inline-block;
		margin-right: 4px;
	}
	
	.bold{
		font-weight: bold;
	}
	
	
	.fl {
		float: left;
	}
	
	.fr {
		float: right;
	}
</style>