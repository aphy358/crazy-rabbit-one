<!-- 组件说明 -->
<template>
	<div class="pc-main">
		<div class="pc-main-content clearfix">
			<tabLeft/>
			
			<div class="tab-right fl">
				
				
				<div class="tab-content list-module hotel-order" data-tab="2">
					<!--<%= hotelOrder %>-->
				</div>
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
	export default {
		name: 'pcMain',
		
		data() {
			return {}
		},
		
		props: {},
		
		components: {
			tabLeft
		},
		
		computed: {},
		
		methods: {}
	}
</script>

<style lang="scss">
	@import "../../assets/pc_sprites";
	.tab-left{
		width: 230px;
		margin-right: 30px;
		float: left;
		box-shadow: 0 0 10px #eeeeee;
		color: #333333;
		
		@at-root .tab-item{
			width: 100%;
			box-sizing: border-box;
			
			>dt{
				margin: 0 10px;
				height: 60px;
				line-height: 60px;
				padding-left: 14px;
				border-bottom: 1px solid #eeeeee;
				position: relative;
				cursor: pointer;
				
				&.need-to-open{
					&:after{
						content: '';
						position: absolute;
						top: 26px;
						right: 10px;
						width: 0;
						height: 0;
						border-top: 9px solid #999999;
						border-left: 7px solid transparent;
						border-right: 7px solid transparent;
					}
					
					&:hover{
						&:after{
							right: 20px;
							border-top: 9px solid #ffa928;
						}
					}
				}
				
				>i{
					display: inline-block;
					float: left;
					margin: 18px 20px 18px 0;
					
					@include pc_sprites;
					&.pc-icon01{
						@include pc_icon01;
					}
					&.pc-icon02{
						@include pc_icon02;
					}
					&.pc-icon03{
						@include pc_icon03;
					}
					&.pc-icon04{
						@include pc_icon04;
					}
					&.pc-icon05{
						@include pc_icon05;
					}
					&.pc-icon06{
						@include pc_icon06;
					}
				}
				
				&:hover,&.selected{
					color: #ffa928;
					box-shadow: 0 0 10px #dddddd;
					margin: 0;
					>i{
						&.pc-icon01{
							@include pc_icon01_sel;
						}
						&.pc-icon02{
							@include pc_icon02_sel;
						}
						&.pc-icon03{
							@include pc_icon03_sel;
						}
						&.pc-icon04{
							@include pc_icon04_sel;
						}
						&.pc-icon05{
							@include pc_icon05_sel;
						}
						&.pc-icon06{
							@include pc_icon06_sel;
						}
					}
					
				}
				
				&:hover{
					padding-left: 24px;
				}
				
				&.selected{
					margin: 0;
					border-left: 5px solid #ffa928;
					padding-left: 19px;
					box-shadow: 0 0 10px #dddddd;
					
					&.need-to-open{
						&:after{
							right: 20px;
							border-top: 9px solid #ffa928;
						}
					}
				}
			}
			
			>.dd-box{
				display: none;
				>dd{
					margin: 0 10px;
					height: 60px;
					line-height: 60px;
					padding-left: 58px;
					border-bottom: 1px solid #EEEEEE;
					cursor: pointer;
					
					&:hover{
						color: #ffa928;
						box-shadow: 0 0 10px #dddddd;
						margin: 0;
						padding-left: 68px;
					}
					
					&.selected{
						color: #ffa928;
						border-left: 5px solid #ffa928;
						margin: 0;
						padding-left: 63px;
						box-shadow: 0 0 10px #dddddd;
					}
				}
			}
			
			&.open{
				>dt{
					&.need-to-open{
						&:after{
							content: '';
							position: absolute;
							top: 26px;
							right: 10px;
							width: 0;
							height: 0;
							border-top: none;
							border-left: 7px solid transparent;
							border-right: 7px solid transparent;
							border-bottom: 9px solid #999999;
						}
						
						&:hover{
							&:after{
								right: 20px;
								border-bottom: 9px solid #ffa928;
							}
						}
					}
					
					&.selected{
						&.need-to-open{
							&:after{
								right: 20px;
								border-bottom: 9px solid #ffa928;
							}
						}
					}
				}
				
				dd{
					//display: block;
				}
			}
		}
	}
</style>