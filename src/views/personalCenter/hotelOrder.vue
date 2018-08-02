<!-- 组件说明 -->
<template>
	<div class="tab-content list-module hotel-order">
		<div class="list-head clearfix">
			<div class="list-head-line head-line-flex">
				<label>
					<span>酒店名</span>
					<input type="text" class="hotel-name">
				</label>
				<label>
					<span>入离日期</span>
					<input type="text" class="checkin-checkout">
				</label>
				<label>
					<span>订单号</span>
					<input type="text" class="order-code">
				</label>
				<label>
					<span>客户订单号</span>
					<input type="text" class="customer-order-code">
				</label>
			</div>
			
			<div class="list-head-line head-line-flex">
				<label>
					<span>入住人</span>
					<input type="text" class="checkin-name">
				</label>
				<label>
					<span>预订员</span>
					<input type="text" class="book-name">
				</label>
				<label>
					<span>订单状态</span>
					<input type="text" class="order-status">
				</label>
				<label>
					<span>支付状态</span>
					<input type="text" class="pay-status">
				</label>
				<button class="search-order blue-btn fr" @click="searchOrderList(1)">查询</button>
			</div>
		</div>
		
		<div class="list-outer" v-show="showDetail === false">
			<div class="list-box">
				<table class="list-table order-list">
					<thead>
					<tr>
						<th class="th-code">订单号/客户单号</th>
						<th class="th-hotel">酒店名</th>
						<th class="th-client">入住人</th>
						<th class="th-buyer">预订员</th>
						<th class="th-money">总金额</th>
						<th class="th-order-status">订单状态</th>
						<th class="th-pay-status">支付状态</th>
						<th class="th-checkin-checkout">入离时间</th>
						<th class="th-book-time">预订日期</th>
						<th class="th-option">操作</th>
					</tr>
					</thead>
					<tbody class="list-tbody order-tbody" v-for="o in orderList">
					<tr class="per-line">
						<td class="tb-code">
							<span>{{ o.orderCode }}</span>
						</td>
						<td class="tb-hotel" :data-title="o.itemName">
							<span>{{ o.itemName }}</span>
						</td>
						<td class="tb-client" :data-title="o.userName">
							<span>{{ o.userName }}</span>
						</td>
						<td class="tb-buyer" :data-title="o.name">
							<span>{{ o.name }}</span>
						</td>
						<td class="tb-money">
							<span>￥{{ o.salePrice }}</span>
						</td>
						<td class="tb-order-status">
							<span>
								{{
                              o.innerStatus === -1 ? '待确认'
                                : o.innerStatus === 0 ? '已确认'
                                : o.innerStatus === 1 ? '已拒单'
                                  : o.innerStatus === 2 ? '取消申请中'
                                    : o.innerStatus === 3 ? '无法取消'
                                      : '已取消'
								}}
							</span>
						</td>
						<td class="tb-pay-status">
							<span>
								{{
                              o.paymentStatus === 0 ? '已支付'
                                : o.paymentStatus === 1 ? '未支付'
                                : '挂账'
								}}
							</span>
						</td>
						<td class="tb-checkin-checkout">
							<span>入:{{ o.beginDate }}</span>
							<span>离:{{ o.endDate }}</span>
						</td>
						<td class="tb-book-time">
							<span>{{ o.createTime }}</span>
						</td>
						<td class="tb-option" data-class="tb-option">
							<button class="read-order" @click="seeDetail">查看</button>
							<button class="upload-pdf">下载入住券</button>
						</td>
					</tr>
					</tbody>
				</table>
			</div>
			
			<div class="paging" v-show="orderList.length > 0">
				<el-pagination
						@current-change="handleCurrentChange"
						:page-size="10"
						layout="prev, pager, next, jumper"
						:page-count="pageCount">
				</el-pagination>
			</div>
		</div>
		
		<div class="order-detail" v-show="showDetail === true">
			<h6 class="order-detail-title gold">订单详情</h6>
			
			<div class="rough-msg">
				<div class="rough-top clearfix">
					<span class="rough-span fl">订单号：xxxxxxxxxxxx</span>
					<span class="rough-span fl">预订时间：xxxx-xx-xx</span>
					
					<span class="update-balance fr">下载结算单</span>
					<span class="update-checkin fr">下载入住券</span>
					<span class="calcel-order fr">取消订单</span>
				</div>
				
				<div class="rough-bot">
					<label>
						<span>客户订单号</span>
						<input class="customer-code" type="text">
					</label>
					<button class="do-code">确定</button>
					<span>结算周期：月结</span>
					<span>支付状态：未支付</span>
					<span>订单状态：<i class="red">已取消</i></span>
				</div>
			</div>
			
			<div class="detailed-msg">
				<span class="detailed-msg-title">订单信息</span>
				
				<div class="detailed-son">
					
					<div class="detailed-son-box checkin-box">
						<span class="detailed-son-title"><i class="gold-dot"></i>入住人信息</span>
						
						<div class="detailed-son-msg checkin-msg">
							<span>入住人：xxx、xxx</span>
							<span>Email:xxxxxxxxxxx@xx.xxx</span>
							<span>手机：xxxxxxxxxxx</span>
						</div>
					</div>
					
					<div class="detailed-son-box">
						<span class="detailed-son-title"><i class="gold-dot"></i>预订信息</span>
						
						<div class="detailed-son-msg book-msg">
							<p>酒店名：<span class="deep-blue">捷旅IT测试香港酒店</span></p>
							<p class="book-roombed">
								<span>房型：标准大床房</span>
								<span>早餐：双早</span>
								<span>床型：大床</span>
							</p>
							<p>入离日期：xxxx-xx-xx 至 xxxx-xx-xx</p>
							<p>到店时间：xxxx-xx-xx xx:xx</p>
							<p>入住晚数：3晚</p>
							<p>入住人数：2成人 0儿童 x 2间</p>
							<p>总金额：<span class="red order-total">￥2500</span>（房费：￥2300 + 杂费：￥200）</p>
						</div>
					</div>
					
					
					<div class="detailed-son-box">
						<span class="detailed-son-title"><i class="gold-dot"></i>支付信息</span>
						
						<div class="detailed-son-msg pay-msg">
							<span>支付状态：未支付</span>
							<span>支付方式：支付宝</span>
							<span>支付时间：xxxx-xx-xx xx:xx</span>
						</div>
					</div>
					
					
					
					<div class="detailed-son-box">
						<span class="detailed-son-title"><i class="gold-dot"></i>备注</span>
						
						<div class="detailed-son-msg extra-msg">
							<ul class="extra-fee-ul">
								<li>
									<p class="extra-fee-item"><span class="blue">加早</span>add breakfast</p>
									<p class="extra-fee-detail">
										<span>xxxx-xx-xx 至 xxxx-xx-xx</span>
										<span>成人早</span>
										<span>2份</span>
									</p>
									<p class="extra-fee-detail">
										<span>xxxx-xx-xx 至 xxxx-xx-xx</span>
										<span>成人早</span>
										<span>2份</span>
									</p>
								</li>
								<li>
									<p class="extra-fee-item"><span class="blue">加床</span>add bed</p>
									<p class="extra-fee-detail">
										<span>xxxx-xx-xx 至 xxxx-xx-xx</span>
										<span>成人床</span>
										<span>4</span>
									</p>
									<p class="extra-fee-detail">
										<span>xxxx-xx-xx 至 xxxx-xx-xx</span>
										<span>成人床</span>
										<span>4</span>
									</p>
								</li>
								<li>
									<p class="extra-fee-item"><span class="blue">加宽带</span>add WBN</p>
									<p class="extra-fee-detail">
										<span>xxxx-xx-xx 至 xxxx-xx-xx</span>
										<span>数量：2</span>
										<span></span>
									</p>
								</li>
							</ul>
						
						</div>
					</div>
				
				</div>
			</div>
			
			<h6 class="order-detail-title gold">酒店详情</h6>
			
			<div class="hotel-msg-box hotel-msg">
				<span class="detailed-msg-title">酒店信息</span>
				
				<div class="hotel-son-detail hotel-msg-detail">
					<p>酒店名：捷旅IT测试香港酒店</p>
					<p>
						<span>电话：xxxxxxxxxxxx</span>
						<span>传真：xxxxxxxxxxxx</span>
					</p>
					<p>地址：
						<a href="javascript:void(0)" class="hotel-address blue">Zhongxing Road 105 Rujun Building（中心路105号儒骏大厦）</a>
						<i class="hotel-map"></i>
					</p>
					<p>
						<i class="attention">!</i>酒店温馨提示：您新增的服务要求请以酒店书面回传确认为准。
					</p>
				</div>
			</div>
			
			<div class="hotel-msg-box">
				<span class="detailed-msg-title">交易规则</span>
				
				<div class="hotel-son-detail trade-msg-detail">
					<p>取消条款：此房即订即保，一旦预订，不可修改或取消；noshow罚全段。</p>
					<p>交易规则：</p>
					<p>1.在线支付订单：当您主动取消订单时，若支付渠道为：快钱、支付宝需扣手续费千分之五，并我司公账转出费4元（金额1万以下）；微信需扣手续费千分之六。</p>
					<p>2.公账支付订单：当您主动取消订单时，若支付渠道为：我司公账（招行、建行、工行、农行、中行、兴业）需扣手续费4元（金额1万以下）。</p>
				</div>
			</div>
		</div>
	
	</div>
</template>

<script>
  import API from '../../api'
  
  export default {
    name: '',
    
    data() {
      return {
        orderList: [],
        pageCount: 0,
        currentPage: 1,
        showDetail: false,
      }
    },
    
    props: {},
    
    components: {},
    
    computed: {},
    
    methods: {
      searchOrderList(currentPage) {
        this.showDetail = false;
        
        let params = {
          beginDate: '',
          endDate: '',
          orderCode: '',
          itemName: '',
          userName: '',
          customerOrderCode: '',
          innerStatus: '',
          paymentStatus: '',
          currPage: currentPage || 1,
          orderType: 2
        };
        
        API.personalCenter.syncGetHotelOrder(params).then(res => {
          this.orderList = res.item;
          this.pageCount = res.pageCount;
        })
      },
      handleCurrentChange(val) {
        this.searchOrderList(val);
      },
      seeDetail() {
        this.showDetail = true;
      }
    },
    
    created(){
      this.searchOrderList(1);
    }
  }
</script>

<style lang="scss">
	i{
		font-style: normal;
	}
	
	.order-list {
		
		.th-code {
			width: 142px;
		}
		.th-hotel {
			width: 116px;
		}
		.th-client {
			width: 70px;
		}
		.th-buyer {
			width: 60px;
		}
		.th-money {
			width: 74px;
		}
		.th-order-status {
			width: 70px;
		}
		.th-pay-status {
			width: 78px;
		}
		.th-checkin-checkout {
			width: 110px;
		}
		.th-book-time {
			width: 130px;
		}
		.th-option {
			width: 90px;
			padding-left: 10px;
		}
		
		.order-tbody {
			.tb-code {
				> span {
					width: 142px;
					color: #4461f7;
					font-weight: bold;
					cursor: pointer;
					
					&:hover {
						text-decoration: underline;
					}
				}
			}
			.tb-hotel {
				text-align: left;
				> span {
					max-width: 96px;
					max-height: 34px;
				}
			}
			.tb-client {
				> span {
					width: 70px;
				}
			}
			.tb-buyer {
				> span {
					width: 60px;
				}
			}
			.tb-money {
				> span {
					width: 74px;
				}
			}
			.tb-order-status {
				> span {
					width: 70px;
				}
			}
			.tb-pay-status {
				> span {
					width: 78px;
				}
			}
			.tb-checkin-checkout {
				> span {
					width: 110px;
				}
			}
			.tb-book-time {
				> span {
					width: 130px;
				}
			}
			.tb-option {
				button {
					&.read-order {
						color: #ffa928;
					}
					&.upload-pdf {
						color: #3399ff;
					}
				}
			}
		}
	}
	
	.paging {
		float: right;
		margin-top: 40px;
	}
	
	.order-detail{
		
		@at-root .order-detail-title{
			font-size: 16px;
			height: 40px;
			line-height: 40px;
			border-bottom: 2px solid #ffa825;
		}
		
		@at-root .rough-msg{
			box-shadow: 0 0 10px #eeeeee;
			margin-bottom: 20px;
			
			@at-root .rough-top{
				height: 50px;
				line-height: 50px;
				background-color: #eaf5ff;
				padding: 0 20px;
				
				.rough-span{
					font-weight: bold;
					margin-right: 20px;
				}
				
				.update-balance,.update-checkin{
					color: #3399ff;
					margin-right: 15px;
					cursor: pointer;
					
					&:hover{
						text-decoration: underline;
					}
				}
				
				.calcel-order{
					color: #999999;
					margin-right: 15px;
					cursor: pointer;
					
					&:hover{
						text-decoration: underline;
					}
				}
				
				.pay-ticket{
					width: 70px;
					height: 32px;
					line-height: 32px;
					background-color: #f15292;
					color: #ffffff;
					border-radius: 5px;
					margin: 9px 0;
				}
			}
			
			@at-root .rough-bot{
				padding: 0 20px;
				height: 74px;
				line-height: 74px;
				font-size: 14px;
				
				.customer-code{
					width: 174px;
					height: 30px;
					border: 1px solid #e3e3e3;
					margin: 0 6px;
				}
				
				.do-code{
					width: 70px;
					height: 30px;
					color: #ffffff;
					background-color: #3399ff;
					border-radius: 4px;
				}
				
				>span{
					margin-left: 40px;
				}
			}
		}
		
		@at-root .detailed-msg{
			box-shadow: 0 0 10px #eeeeee;
			margin-bottom: 20px;
			
			@at-root .detailed-msg-title{
				display: block;
				height: 48px;
				line-height: 48px;
				padding: 0 20px;
				background-color: #eaf7ff;
				font-size: 14px;
				font-weight: bold;
			}
			
			@at-root .detailed-son{
				padding: 0 20px;
				
				
				@at-root .detailed-son-box{
					padding: 20px 0;
					border-bottom: 1px dashed #eeeeee;
					
					&:last-child{
						border-bottom: none;
					}
					
					
					@at-root .detailed-son-title{
						display: block;
						height: 34px;
						line-height: 34px;
						font-size: 14px;
						color: #333333;
						font-weight: bold;
						
						.gold-dot{
							display: inline-block;
							background-color: #ffa825;
							width: 10px;
							height: 10px;
							border-radius: 50%;
							margin-right: 10px;
						}
					}
					
					@at-root .detailed-son-msg{
						line-height: 34px;
						font-size: 14px;
						color: #666666;
						
						.order-total{
							font-size: 16px;
							font-weight: bold;
						}
					}
					
					@at-root .checkin-msg,.pay-msg{
						>span{
							margin-right: 60px;
						}
					}
					
					@at-root .book-msg{
						.book-roombed{
							>span{
								margin-right: 60px;
							}
						}
					}
					
					@at-root .extra-msg{
						@at-root .extra-fee-ul{
							>li{
								.extra-fee-item{
									padding: 0 10px;
									height: 32px;
									line-height: 32px;
									background-color: #f5f5f5;
									
									>.blue{
										margin-right: 8px;
									}
								}
								
								.extra-fee-detail{
									text-align: right;
									padding: 0 20px;
									
									>span{
										margin-left: 60px;
										display: inline-block;
										text-align: left;
										
										&:nth-child(1){
											width: 200px;
										}
										&:nth-child(2){
											width: 50px;
										}
										&:nth-child(3){
											width: 30px;
										}
									}
									
								}
							}
						}
					}
				}
			}
			
		}
		
		@at-root .hotel-msg-box{
			box-shadow: 0 0 10px #eeeeee;
			font-size: 14px;
			
			@at-root .hotel-son-detail{
				padding: 20px;
				color: #666666;
				>p{
					line-height: 34px;
					>span{
						margin-right: 60px;
					}
					
					.hotel-map{
						display: inline-block;
						cursor: pointer;
						/*@include jl_sprites;
						@include location2;*/
					}
				}
			}
			
			&.hotel-msg{
				margin-bottom: 20px;
			}
		}
	}
</style>