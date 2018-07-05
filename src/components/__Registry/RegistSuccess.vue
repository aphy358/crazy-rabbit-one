
<!-- 注册成功 -->
<template>
  <div class="regist-success">
      <div class="success-top">
          <div class="success-img"></div>
          <h6 class="submit-suc">提交成功</h6>
      </div>
      <p class="success-mid">
          我们将在3个工作日内进行审核，如有任何疑问，请致电：
          <span class="orange">0755-33336999</span>
      </p>
      <button class="success-bot">
          <a href="#">知道了</a>
      </button>
  </div>
</template>

<script>
export default {
  name: 'RegistSuccess',
}
</script>

<style scoped lang="scss">
@import "../../assets/jl_sprites.scss";

.regist-success{
	width: 500px;
	height: 280px;
	margin: 120px auto 160px;
	
	
	@at-root .success-top{
		width: 220px;
		height: 100px;
		margin: 0 auto;
		
		.success-img{
			@include jl_sprites;
			@include submit_success;
			float: left;
			margin: 11px 0;
		}
		
		.submit-suc{
			float: left;
			height: 100px;
			line-height: 100px;
			font-size: 26px;
			margin-left: 30px;
			font-weight: normal;
		}
	}
	
	@at-root .success-mid{
		font-size: 14px;
		text-align: center;
		height: 74px;
		line-height: 74px;
		color: #999999;
		
		.orange{
			color: #ffa825;
		}
	}
	
	@at-root .success-bot{
		width: 300px;
		height: 42px;
		line-height: 42px;
		background-color: #ffa825;
		text-align: center;
		display: block;
		margin: 0 auto;
		border-radius: 6px;
		margin-top: 50px;
		cursor: pointer;
		
		
		>a{
			display: block;
			width: 100%;
			height: 100%;
			color: #ffffff;
			font-size: 16px;
			
			&:hover{
				text-decoration: none;
			}
		}
	}
}
</style>