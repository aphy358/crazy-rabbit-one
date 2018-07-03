<!-- 组件说明 -->
<template>
	<div class="order-info-right fl">
		<el-row>
			<el-card :body-style="{ padding: '0px' }">
				<img src="https://qnb.oss-cn-shenzhen.aliyuncs.com/13657610619700h4341.jpg" class="image">
				<div class="my-choose">
					<h6>扬州长乐客栈主题文化酒店</h6>
					<p>
						<el-tag size="mini">标准房</el-tag>
						<el-tag size="mini" type="success">大床</el-tag>
						<el-tag size="mini" type="danger">无餐</el-tag>
					</p>
					<p>入住日期 <span class="choose-date orange">{{checkin}}</span></p>
					<p>退房日期 <span class="choose-date orange">2018-06-30</span></p>
					
					
					<h6 class="need-pay">需支付</h6>
					<p class="blue">
						房费
						<span class="fr">193</span>
					</p>
					<p class="blue">
						税和服务费
						<span class="fr">0</span>
					</p>
					<p class="blue">
						<span>总价</span>
						<span class="fr">
							RMB
							<span class="total-pay red">193</span>
						</span>
					</p>
				</div>
			</el-card>
		</el-row>
	</div>
</template>

<script>
  export default {
    name: '',
  
    data() {
      return {
        checkin: this.$store.state.orderWrite.checkin
      };
    },
    
    props: {},
    
    components: {},
    
    computed: {},
    
    methods: {}
  }
</script>

<style scoped lang="scss">
	.order-info-right{
		width: 310px;
	}
	
	.time {
		font-size: 13px;
		color: #999;
	}
	
	.bottom {
		margin-top: 13px;
		line-height: 12px;
	}
	
	.button {
		padding: 0;
		float: right;
	}
	
	.image {
		width: 100%;
		display: block;
	}
	
	.my-choose{
		padding: 14px;
		font-size: 14px;
		
		>h6{
			font-size: 16px;
		}
		
		>h6,>p{
			line-height: 40px;
		}
		
		.el-tag{
			margin-right: 10px;
		}
		
		.choose-date{
			margin-left: 30px;
		}
		
		.need-pay{
			border-top: 1px dashed #ffa825;
			margin-top: 20px;
			padding-top: 20px;
		}
		
		.total-pay{
			font-size: 30px;
		}
	}
</style>