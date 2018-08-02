<!-- 组件说明 -->
<template>
	<el-dialog title="确认订单信息" :visible.sync="dialogTableVisible" :show-close="false">
		<ul>
			<li class="clearfix">
				<span class="fl order-title">预定酒店</span>
				<p class="fl order-txt">{{orderInfo.hotelName}}</p>
			</li>
			<li class="clearfix">
				<span class="fl order-title">房型</span>
				<p class="fl order-txt">
					{{hotelPrice.roomName}}
					{{hotelPrice.hasOwnProperty('breakFastName') && hotelPrice.breakFastName ? '[' + hotelPrice.breakFastName + ']' : ''}}
				</p>
			</li>
			<li class="clearfix">
				<span class="fl order-title">入住日期</span>
				<p class="fl order-txt">{{orderInfo.startDate}}日到{{orderInfo.endDate}}日</p>
			</li>
			<li class="clearfix">
				<span class="fl order-title">预定房间数</span>
				<p class="fl order-txt">{{orderInfo.roomNum}}间</p>
			</li>
			<li class="clearfix" v-if="surchargeBed">
				<span class="fl order-title">加床信息</span>
				<p class="fl order-txt">{{surchargeBed}}</p>
			</li>
			<li class="clearfix" v-if="surchargeBref">
				<span class="fl order-title">加早信息</span>
				<p class="fl order-txt">{{surchargeBref}}</p>
			</li>
			<li class="clearfix" v-if="surchargeInternet">
				<span class="fl order-title">加宽带信息</span>
				<p class="fl order-txt">{{surchargeInternet}}</p>
			</li>
			<li class="clearfix">
				<span class="fl order-title">入住人</span>
				<p class="fl order-txt">{{orderInfo.userNames}}</p>
			</li>
			<li class="clearfix">
				<span class="fl order-title">确认方式</span>
				<p class="fl order-txt">{{confirmWay[orderInfo.checkType]}}</p>
			</li>
			<li class="clearfix">
				<span class="fl order-title">支付方式</span>
				<p class="fl order-txt">
					{{paymentTermArr[orderInfo.paymentTerm + 1]}}
					{{
					orderInfo.paymentTerm === 0 ? '(使用预收款' + willUsedBalance + '元，需支付' + (orderInfo.payTotalMoney + taxesAndFeesRMB - willUsedBalance) + '元)' : ''
					}}
				</p>
			</li>
			<li class="clearfix" v-if="specialReq">
				<span class="fl order-title">特殊需求</span>
				<p class="fl order-txt">{{specialReq}}</p>
			</li>
			<li class="clearfix">
				<span class="fl order-title">取消条款</span>
				<p class="fl order-txt">{{hotelPrice.cancellationDesc}}</p>
			</li>
			<li class="clearfix">
				<span class="fl order-title">订单价格</span>
				<p class="fl order-txt">RMB<span class="red">{{orderInfo.payTotalMoney + taxesAndFeesRMB}}</span>元</p>
			</li>
		</ul>
		<div slot="footer" class="dialog-footer">
			<el-button class="drop" @click="drop">取 消</el-button>
			<el-button class="ensure" type="primary" @click="ensure">确 定</el-button>
		</div>
	</el-dialog>

</template>

<script>
	import { mapState } from 'vuex'
	
  export default {
    name: '',
    
    data() {
      return {
        confirmWay : {
          '9' : '在线确认',
          '1' : '电子邮件确认',
          '2' : '传真确认',
          '3' : '短信确认'
        },
        paymentTermArr : ['客人前台现付', '单结', '周结', '半月结', '月结', '不固定', '三日结', '十日结', '额度结']
        
      }
    },
    
    props: {},
    
    components: {},
    
    computed : mapState({
      dialogTableVisible: state => state.orderWrite.dialogTableVisible,
      orderInfo: state => state.orderWrite.orderInfo,
      hotelPrice: state => state.orderWrite.hotelPrice,
      willUsedBalance: state => state.orderWrite.willUsedBalance,
      taxesAndFeesRMB(){
        let taxesAndFeesRMB = this.$store.state.orderWrite.taxesAndFeesRMB;
        let bedTotalPrice = this.$store.state.orderWrite.bedTotalPrice;
        let brefTotalPrice = this.$store.state.orderWrite.brefTotalPrice;
        let netTotalPrice = this.$store.state.orderWrite.netTotalPrice;
        
        return taxesAndFeesRMB + bedTotalPrice + brefTotalPrice + netTotalPrice
      },
      surchargeBref(){
        let surchargeBref = this.$store.state.orderWrite.surchargeBref;
        let breakfastData = this.$store.state.orderWrite.breakfastData;
        let str = '';
        let count = 0;
        surchargeBref.forEach(function (v1, i1) {
          count += +v1.count;
          breakfastData[v1.date].forEach(function (v2, i2) {
            if (v2.type === v1.type){
              str += v1.date + ' ' + v2.name + ' ' + v1.count + ' 份；'
            }
          });
        });
        str = str.replace(/(.*)；/, '$1');
        return count === 0 ? '' : count + '份(' + str + ')';
      },
      surchargeBed(){
        let surchargeBed = this.$store.state.orderWrite.surchargeBed;
        let bedData = this.$store.state.orderWrite.bedData;
        let str = '';
        let count = 0;
        surchargeBed.forEach(function (v1, i1) {
          count += +v1.count;
          bedData[v1.date].forEach(function (v2, i2) {
            if (v2.type === v1.type){
              str += v1.date + ' ' + v2.name + ' ' + v1.count + ' 份；'
            }
          });
        });
        str = str.replace(/(.*)；/, '$1');
        return count === 0 ? '' : count + '张(' + str + ')';
      },
      surchargeInternet(){
        let surchargeInternet = this.$store.state.orderWrite.surchargeInternet;
        let str = '';
        let count = 0;
        surchargeInternet.forEach(function (v1, i1) {
          count += +v1.count;
          str += v1.date + ' 宽带 ' + v1.count + ' 份；'
        });
        str = str.replace(/(.*)；/, '$1');
        return count === 0 ? '' : count + '份(' + str + ')';
      },
      specialReq(){
        let specialReq = this.$store.state.orderWrite.specialReq;
        let str = '';
        specialReq.forEach(function (v, i) {
          str += v + '，'
        });
        str = str.replace(/(.*)，/, '$1');
        
        return str;
      }
    }),
    
    methods: {
      drop(){
        this.$store.commit('orderWrite/setCommonState', {
          k : 'dialogTableVisible',
          v : false
        })
      },
      ensure(){
        this.$store.dispatch('orderWrite/saveOrder');
        
        this.$store.commit('orderWrite/setCommonState', {
          k : 'dialogTableVisible',
          v : false
        })
      },
    }
  }
</script>

<style scoped lang="scss">
	li{
		height: 40px;
		line-height: 40px;
	}
	
	.order-title{
		display: inline-block;
		width: 100px;
	}
	
	.dialog-footer{
		width: 160px;
		margin: 0 auto;
	}
	
	.drop,.ensure{
		padding: 10px 20px;
		border-radius: 0;
	}
</style>