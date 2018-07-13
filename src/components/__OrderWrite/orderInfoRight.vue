<!-- 组件说明 -->
<template>
	<div class="order-info-right fl">
		<el-row>
			<el-card :body-style="{ padding: '0px' }">
				<img src="https://qnb.oss-cn-shenzhen.aliyuncs.com/13657610619700h4341.jpg" class="image">
				<div class="my-choose">
					<h6>{{staticInfo.infoName}}</h6>
					<p>
						<el-tag size="mini">{{hotelPrice.roomName}}</el-tag>
						<el-tag size="mini" type="success"
						        v-show="hotelPrice.hasOwnProperty('breakFastName') && hotelPrice.breakFastName"
						>
							{{hotelPrice.breakFastName}}
						</el-tag>
					</p>
					<p>入住日期 <span class="choose-date orange">{{checkin}}</span></p>
					<p>退房日期 <span class="choose-date orange">{{checkout}}</span></p>
					
					
					<h6 class="need-pay">需支付</h6>
					<p class="blue">
						房费
						<span class="fr">{{roomCost}}</span>
					</p>
					<p class="blue">
						税和服务费
						<span class="fr">{{taxesAndFeesRMB}}</span>
					</p>
					<span class="sales-tax"
					      v-show="content.hasOwnProperty('isExpediaSupplier') && content.isExpediaSupplier == 1"
					>（已包含的销售税：{{hotelPrice.salesTaxRMB }}）</span>
					<p class="blue">
						<span>总价</span>
						<span class="fr">
							RMB
							<span class="total-pay red">{{payTotalMoney + taxesAndFeesRMB}}</span>
						</span>
					</p>
				</div>
			</el-card>
		</el-row>
	</div>
</template>

<script>
	import { mapState } from 'vuex'
	
  export default {
    name: '',
  
    data() {
      return {
        checkin: this.$store.state.orderWrite.checkin,
        checkout: this.$store.state.orderWrite.checkout,
        
      };
    },
    
    props: {},
    
    components: {},
    
    computed: mapState({
      staticInfo : state => state.orderWrite.staticInfo,
      hotelPrice : state => state.orderWrite.hotelPrice,
      content : state => state.orderWrite.content,
      roomCost : state => state.orderWrite.roomCost,
      payTotalMoney : state => state.orderWrite.payTotalMoney,
      taxesAndFeesRMB(){
        let taxesAndFeesRMB = this.$store.state.orderWrite.taxesAndFeesRMB;
        let bedTotalPrice = this.$store.state.orderWrite.bedTotalPrice;
        let brefTotalPrice = this.$store.state.orderWrite.brefTotalPrice;
        let netTotalPrice = this.$store.state.orderWrite.netTotalPrice;
        return taxesAndFeesRMB + bedTotalPrice + brefTotalPrice + netTotalPrice
      },
    }),
    
    methods: {}
  }
</script>

<style scoped lang="scss">
	.red{
		color: red;
	}
	
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
		
		.sales-tax{
			display: block;
			font-size: 12px;
			color: #67c23a;
		}
	}
</style>