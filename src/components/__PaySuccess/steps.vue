<!-- 组件说明 -->
<template>
	<div class="steps">
		<div class="content-head">
			<ul>
				<li>1.填写信息</li>
				<li></li>
				<li>2.确认支付</li>
				<li></li>
				<li>3.预订成功</li>
			</ul>
		</div>
		
		<div class="head-notice"></div>
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
	//内容头部样式
	.content-head {
		width: 1200px;
		height: 30px;
		margin-top: 50px;
		ul {
			li {
				float: left;
				height: 30px;
				line-height: 30px;
				text-align: center;
				&:nth-child(1) {
					width: 394px;
					background-color: #f5f5f5;
				}
				&:nth-child(2) {
					position: relative;
					left: 3px;
					width: 0;
					height: 0;
					border-left: 15px solid white;
					border-top: 15px solid #f3f3f3;
					border-bottom: 15px solid #f3f3f3;
				}
				&:nth-child(2)::after {
					content: "";
					position: absolute;
					top: -15px;
					left: -18px;
					display: block;
					width: 0;
					height: 0;
					border-left: 15px solid #f5f5f5;
					border-top: 15px dashed transparent;
					border-bottom: 15px dashed transparent;
				}
				&:nth-child(3) {
					width: 376px;
					background-color: #f3f3f3;
					color: black;
				}
				&:nth-child(4) {
					position: relative;
					left: 3px;
					width: 0;
					height: 0;
					border-left: 15px solid white;
					border-top: 15px solid #55b6fe;
					border-bottom: 15px solid #55b6fe;
				}
				&:nth-child(4)::after {
					content: "";
					position: absolute;
					top: -15px;
					left: -18px;
					display: block;
					width: 0;
					height: 0;
					border-left: 15px solid #f3f3f3;
					border-top: 15px dashed transparent;
					border-bottom: 15px dashed transparent;
				}
				&:nth-child(5) {
					width: 400px;
					background-color: #55b6fe;
					color: white;
				}
			}
		}
	}
	
	.head-notice{
		height: 20px;
	}
</style>