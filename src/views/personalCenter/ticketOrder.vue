<!-- 组件说明 -->
<template>
	<div class="tab-content list-module ticket-order">
		<div class="list-head clearfix">
			<div class="list-head-line head-line-flex">
				<label>
					<span>景点名</span>
					<input type="text" class="target-location spots-name">
				</label>
				<label>
					<span>游玩日期</span>
					<input type="text" class="play-date">
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
					<span>游客姓名</span>
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
						<th class="th-hotel">景点名</th>
						<th class="th-client">游客</th>
						<th class="th-buyer">预订员</th>
						<th class="th-money">总金额</th>
						<th class="th-order-status">订单状态</th>
						<th class="th-pay-status">支付状态</th>
						<th class="th-checkin-checkout">使用时间</th>
						<th class="th-book-time">预订日期</th>
						<th class="th-option">操作</th>
					</tr>
					</thead>
					<tbody class="list-tbody order-tbody" v-for="o in orderList">
					
					<tr class="per-line">
						<td class="tb-code">
							<span>{{ o.orderCode }}</span>
						</td>
						<td class="tb-hotel">
							<span>{{ o.itemName }}</span>
						</td>
						<td class="tb-client">
							<span>{{ o.userName }}</span>
						</td>
						<td class="tb-buyer">
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
							<span>{{ o.beginDate }}</span>
						</td>
						<td class="tb-book-time">
							<span>{{ o.createTime }}</span>
						</td>
						<td class="tb-option">
							<button class="read-order" @click="seeDetail">查看</button>
						</td>
					</tr>
					
					</tbody>
				</table>
			</div>
			
			<div class="paging"></div>
		</div>
		
		<div class="order-detail" v-show="showDetail === true">
			<h6 class="order-detail-title gold">订单详情</h6>
			
			<div class="rough-msg">
				<div class="rough-top clearfix">
					<span class="rough-span fl">订单号：xxxxxxxxxxxx</span>
					<span class="rough-span fl">预订时间：xxxx-xx-xx</span>
					
					<button class="pay-ticket fr">付款</button>
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
						<span class="detailed-son-title"><i class="gold-dot"></i>游客信息</span>
						
						<div class="detailed-son-msg checkin-msg">
							<span>取票人：xxx、xxx</span>
							<span>Email:xxxxxxxxxxx@xx.xxx</span>
							<span>手机：xxxxxxxxxxx</span>
						</div>
					</div>
					
					<div class="detailed-son-box">
						<span class="detailed-son-title"><i class="gold-dot"></i>预订信息</span>
						
						<div class="detailed-son-msg book-msg">
							<p>景点名称：香港海洋公园</p>
							<p class="book-roombed">
								<span>门票类型：成人电子票</span>
								<span>价格类型：成人票</span>
							</p>
							<p>使用日期：xxxx-xx-xx * 2张</p>
							<p>总金额：<span class="red order-total">￥526</span></p>
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
				
				</div>
			</div>
			
			
			<h6 class="order-detail-title gold">景点详情</h6>
			
			<div class="hotel-msg-box hotel-msg">
				<span class="detailed-msg-title">景点信息</span>
				
				<div class="hotel-son-detail hotel-msg-detail">
					<p>景点名称：<a href="javascript:void(0)" class="blue">香港海洋公园</a></p>
					<p>
						<span>电话：xxxxxxxxxxxx</span>
						<span>传真：xxxxxxxxxxxx</span>
					</p>
					<p>地址：
						<a href="javascript:void(0)" class="hotel-address blue">澳门路氹区连贯公路，澳门新濠影汇酒店</a>
						<i class="hotel-map"></i>
					</p>
					<p>开放时间：10:00-21:00（不同月份，乐园开放时间略有不同，故此营业时间仅供参考，并有可能于游览乐园当天作出更改。请于游览当天到市镇会堂索取乐园时间表，以获得当天最新的各项表演时间详情。）</p>
					<p>
						<i class="attention">!</i>门票温馨提示：您新增的服务要求请以门票书面回传确认为准。
					</p>
				</div>
			</div>
			
			
			<div class="hotel-msg-box">
				<span class="detailed-msg-title">交易规则</span>
				
				<div class="hotel-son-detail trade-msg-detail">
					<p>取消条款：即订即保，一旦预订，不可修改或取消；noshow罚全段。</p>
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
          innerStatus: '',
          paymentStatus: '',
          currPage: currentPage || 1,
          orderType: 2
        };
    
        API.personalCenter.syncGetTicketOrder(params).then(res => {
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

<style scoped lang="scss">
</style>