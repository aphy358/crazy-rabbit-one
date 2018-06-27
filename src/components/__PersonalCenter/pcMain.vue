<!-- 组件说明 -->
<template>
	<div class="pc-main" v-bind:tabindex="getindex">
		<div class="pc-main-content clearfix">
			<tabLeft/>
			
			<div class="tab-right fl">
				
				<content1 v-show="getindex === 1"/>
				<content2 v-show="getindex === 2"/>
				
				<div class="tab-content list-module ticket-order" data-tab="3"></div>
				<div class="tab-content basic-info" data-tab="4"></div>
				<div class="tab-content staff-info" data-tab="5"></div>
				<div class="tab-content my-bill" data-tab="7"></div>
				<div class="tab-content get-invoice" data-tab="9"></div>
				<div class="tab-content invoice-list" data-tab="10"></div>
				<div class="tab-content invoice-info" data-tab="11"></div>
				<div class="tab-content invoice-address" data-tab="12"></div>
			</div>
		</div>
	</div>

</template>

<script>
	import tabLeft from './tabLeft.vue'
	
	import content1 from './privateCenter.vue'
	import content2 from './hotelOrder.vue'
	
	export default {
		name: 'pcMain',
		
		data() {
			 return{
			 
			 }
		},
		
		props: {
		
		},
		
		components: {
			tabLeft,
		    content1,
		    content2
		},
		
		computed: {
			getindex(){
				return this.$store.state.personalCenter.tabindex
			}
		},
		
		methods: {
		
		}
	}
</script>

<style lang="scss">
	@import "../../assets/pc_sprites";
	.tab-right{
		margin-left: 30px;
	}
	
	.list-head{
		margin-top: 20px;
		@at-root .list-head-line{
			float: left;
			margin-bottom: 20px;
			width: 100%;
			height: 32px;
			line-height: 32px;
			
			&.head-line-flex{
				display: flex;
				justify-content: space-between;
			}
			
			label{
				>span{
					margin-right: 10px;
					float: left;
				}
				
				>input{
					border: 1px solid #e8e8e8;
					height: 30px;
					line-height: 30px;
					float: left;
					padding-left: 10px;
				}
				
				>select{
					border: 1px solid #e8e8e8;
					height: 30px;
					line-height: 30px;
					float: left;
					padding-left: 10px;
				}
				
				.staff-name,.bill-date,.invoice-num,.invoice-title,.start-end{
					margin-right: 40px;
				}
				
				.checkin-checkout{
					width: 190px;
				}
				
				.bill-type,.bill-status,.checkin-name{
					margin-right: 30px;
				}
				
				.checkin-name,.book-name{
					width: 120px;
				}
			}
			
			
			.order-status,.pay-status{
				width: 120px;
			}
			
			button{
				width: 90px;
				height: 30px;
				line-height: 30px;
				border-radius: 4px;
			}
			
			.blue-btn{
				color: #ffffff;
				background-color: #3399ff;
			}
			
			.search-staff,.search-invoice{
				margin-right: 20px;
			}
			
			.gold-btn{
				color: #ffffff;
				background-color: #ffa825;
			}
		}
	}
	
	.list-module{
		@at-root .list-box{
			@at-root .list-table{
				width: 100%;
				table-layout:fixed;
				thead{
					background-color: #eaf5ff;
					tr{
						height: 50px;
						vertical-align: middle;
						th{
							box-sizing: border-box;
							padding: 0 10px;
							text-align: left;
							color: #333333;
						}
					}
				}
				@at-root .list-tbody{
					@at-root .per-line{
						border-bottom: 1px solid #f3f3f3;
						height: 68px;
						overflow: hidden;
						
						&:hover{
							box-shadow: 0 0 10px #dddddd;
						}
						
						td{
							height: 68px;
							vertical-align: middle;
							overflow: hidden;
							text-align: left;
							box-sizing: border-box;
							padding: 0 10px;
							color: #666666;
							
							>span{
								max-width: 100%;
								display: inline-block;
								max-height: 34px;
								overflow: hidden;
								text-overflow:ellipsis;
								display: -webkit-box;
								-webkit-line-clamp: 2;
								-webkit-box-orient: vertical;
								word-break: break-all;
							}
						}
						
						.tb-option{
							button{
								width: 90px;
								text-align: left;
								line-height: 25px;
								cursor: pointer;
								
								&:hover{
									text-decoration: underline;
								}
								
								&.read-order{
									color: #ffa928;
								}
								&.upload-pdf{
									color: #3399ff;
								}
								
								&.reset-staff{
									color: #3399ff;
								}
								
								&.account{
									color: #3399ff;
								}
							}
						}
						.tb-overflow{
							//line-height: 20px;
							span{
								padding-top: 10px;
								line-height: 20px;
								text-overflow:ellipsis;
								display: -webkit-box;
								-webkit-line-clamp: 2;
								-webkit-box-orient: vertical;
								word-break: break-all;
							}
						}
					}
				}
			}
		}
		
		@at-root .paging{
			margin-top: 30px;
		}
	}
</style>