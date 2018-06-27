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
						<button class="read-order">查看</button>
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
					:total="pageCount">
			</el-pagination>
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
				currentPage: 1
			}
		},
		
		props: {},
		
		components: {},
		
		computed: {},
		
		methods: {
			searchOrderList(currentPage) {
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
					this.$data.orderList = res.item;
					this.$data.pageCount = res.pageCount;
				})
			},
			handleCurrentChange(val) {
				this.searchOrderList(val);
			}
		}
	}
</script>

<style lang="scss">
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
			width: 100px;
		}
		.th-book-time {
			width: 140px;
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
					width: 100px;
				}
			}
			.tb-book-time {
				> span {
					width: 140px;
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
</style>