<!-- 组件说明 -->
<template>
	<div class="pay-way-radio clearfix">
		<div class="pay-platform-box">
			<span class="pay-platform-txt">平台支付：</span>
			<div class="radio-item">
				<input type="radio" name="pay">
				<img src="./images/alipay.jpg" alt="">
			</div>
			<div class="radio-item">
				<input type="radio" name="pay">
				<img src="./images/kuaiqian.gif" alt="">
			</div>
			<div class="radio-item">
				<input type="radio" name="pay">
				<img src="./images/WePayLogo.png" alt="">
			</div>
		</div>
		
		<div class="pay-bank-box">
			<span class="pay-bank-txt">银行支付：</span>
			<ul>
				<li class="clearfix">
					<div class="bank-item">
						<input type="radio" name="pay">
						<div class="bank-icon BOC"></div>
					</div>
					<div class="bank-item">
						<input type="radio" name="pay">
						<div class="bank-icon ABC"></div>
					</div>
					<div class="bank-item">
						<input type="radio" name="pay">
						<div class="bank-icon ICBC"></div>
					</div>
					<div class="bank-item">
						<input type="radio" name="pay">
						<div class="bank-icon CCB"></div>
					</div>
					<div class="bank-item">
						<input type="radio" name="pay">
						<div class="bank-icon COMM"></div>
					</div>
				</li>
				<li class="clearfix">
					<div class="bank-item">
						<input type="radio" name="pay">
						<div class="bank-icon POSTGC"></div>
					</div>
					<div class="bank-item">
						<input type="radio" name="pay">
						<div class="bank-icon CMB"></div>
					</div>
					<div class="bank-item">
						<input type="radio" name="pay">
						<div class="bank-icon CMBC"></div>
					</div>
					<div class="bank-item">
						<input type="radio" name="pay">
						<div class="bank-icon CITIC"></div>
					</div>
					<div class="bank-item">
						<input type="radio" name="pay">
						<div class="bank-icon GDB"></div>
					</div>
				</li>
				<li class="clearfix">
					<div class="bank-item">
						<input type="radio" name="pay">
						<div class="bank-icon SPABANK"></div>
					</div>
					<div class="bank-item">
						<input type="radio" name="pay">
						<div class="bank-icon CIB"></div>
					</div>
					<div class="bank-item">
						<input type="radio" name="pay">
						<div class="bank-icon SPDB"></div>
					</div>
					<div class="bank-item">
						<input type="radio" name="pay">
						<div class="bank-icon CEB"></div>
					</div>
					<div class="bank-item">
						<input type="radio" name="pay">
						<div class="bank-icon BJBANK"></div>
					</div>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
  export default {
    name: '',
    
    data() {
      return {
        radio2 : ''
      }
    },
    
    props: {},
    
    components: {},
    
    computed: {},
    
    methods: {}
  }
</script>

<style scoped lang="scss">
	.pay-way-radio{
		border: 1px solid #ebeef5;
		margin-top: 20px;
	}
	
	.pay-platform-txt{
		float: left;
		margin-right: 30px;
		font-weight: bold;
	}
	
	.pay-bank-txt{
		float: left;
		height: 150px;
		line-height: 150px;
		margin-right: 30px;
		font-weight: bold;
	}
	
	.pay-platform-box{
		height: 100px;
		line-height: 100px;
		padding: 0 60px;
	}
	
	.radio-item{
		float: left;
		margin: 32px 100px 32px 0;
		
		>input{
			margin: 11px 0;
			float: left;
		}
		
		>img{
			float: left;
			display: inline-block;
			width: 120px;
			height: 35px;
			margin-left: 10px;
		}
	}
	
	.pay-bank-box{
		padding: 20px 60px;
		margin-top: 20px;
		
		li{
			display: block;
			height: 30px;
			line-height: 30px;
			padding: 10px 0;
		}
	}
	
	.bank-item{
		display: inline-block;
		
		>input{
			margin: 8px 0;
			float: left;
		}
	}
	
	.bank-icon{
		float: left;
		background-image: url(./images/bankicon.png);
		width: 120px;
		height: 30px;
		margin: 0 40px 0 10px;
	}
	
	
	.ICBC{
		background-position: 0 -40px;
	}
	.CMB {
		background-position: 0 -80px;
	}
	.CCB{
		background-position: 0 -320px;
	}
	.BOC{
		background-position: 0 -520px;
	}
	.ABC{
		background-position: 0 -480px;
	}
	.COMM{
		background-position: 0 -600px;
	}
	.PSBC {
		background-position: 0 -400px;
	}
	.CEB {
		background-position: 0 -440px;
	}
	.POSTGC {
		background-position: 0 -400px;
	}
	.SPDB {
		background-position: 0 -360px;
	}
	.GDB {
		background-position: 0 -280px;
	}
	.CITIC {
		background-position: 0 -200px;
	}
	.CIB {
		background-position: 0 -3365px;
	}
	.SDB {
		background-position: 0 -240px;
	}
	.CMBC {
		background-position: 0 -120px;
	}
	.HZCB {
		background-position: 0 -760px;
	}
	.SHBANK {
		background-position: 0 -840px;
	}
	.BJRCB {
		background-position: 0 -2640px;
	}
	.SPABANK {
		background-position: 0 -1880px;
	}
	.FDB {
		background-position: 0 -1320px;
	}
	.NBBANK {
		background-position: 0 -1240px;
	}
	.BJBANK {
		background-position: 0 -3240px;
	}
	.WZCB {
		background-position: 0 -1720px;
	}
</style>