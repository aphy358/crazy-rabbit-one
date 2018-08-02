
<!-- 我的订单 -->
<template>
  <div class="i-order-outer">
    <div class="i-c-o-title">
      <i class="i-c-o-icon order"></i>
      <h1>订单管理</h1>
      <router-link target="_blank" to="personalCenter?tabindex=2">查看全部</router-link>
      <button class="i-c-order-btn" @click="searchOrderList">搜索</button>
      <input type="text" placeholder="请输入订单号/酒店名称" ref="orderListInput" title="请输入订单号/酒店名称">
    </div>
    <div id="i-order-wrap">

      <div class="no-content" v-if="myOrderList.length < 1"></div>
      <table v-else>
        <thead>
          <tr>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(o, i) in myOrderList" :key="i">
            <td><a :href="o.orderLink" target="_blank" class="i-c-o-link-item">{{o.orderCode}}</a></td>
            <td>
              <router-link :to="o.link2" target="_blank" class="i-c-o-link-item index-order-hotel-link">{{o.itemName}}</router-link>
            </td>
            <td>{{o.beginDate}} - {{o.endDate}}</td>
            <td>
              {{o.innerStatusText}} / {{o.paymentStatusText}}
            </td>
            <td lastChild>
              <a v-if="o.downloadLink" :href="o.downloadLink" target="_blank"><span class="i-o-download">下载入住房券</span></a>
              <a :href="o.orderLink" target="_blank"><span class="i-o-check">查看</span></a>
            </td>
          </tr>
        </tbody>
      </table>

    </div>
  </div>
</template>

<script>
export default {
  name: '',

  data(){
    return {
      myOrderList: [],
    }
  },

  props: {
    
  },

  components: {

  },

  computed: {
    
  },
  
  methods: {
    // 查询订单列表
    getOrderList(params){
      this.$api.home.syncGetOrderList(params).then(res => {
        if(res.returnCode === 1 && res.dataList){
          this.processData(res.dataList)
          this.myOrderList = res.dataList
        }else if(res.errcode == 'notLogin'){
        }
      })
    },

    // 对订单列表返回的数据进行结构变更，以便适用于模板
    processData(dataList) {
        for (var i = 0; i < dataList.length; i++) {
            var o = dataList[i]
            
            if (o.categoryId === 1) {   // 门票订单
                o.orderLink = '/ticketController/findOrderDetail.do?orderId=' + o.orderInfoId
            } else {      // 酒店订单
                o.orderLink = '/myinfo/findOrderDetail.do?orderId=' + o.orderInfoId
                if (o.status === 1) {
                    o.downloadLink = '/myinfo/exportPdfdownticket.do?orderid=' + o.orderInfoId
                }
            }
            
            o.innerStatusText =
                o.innerStatus === -1 ? '待确认' : 
                o.innerStatus === 0 ? '已确认' : 
                o.innerStatus === 1 ? '已拒单' : 
                o.innerStatus === 2 ? '申请取消中' : 
                o.innerStatus === 3 ? '不能取消' : '已取消'
            
            if (o.paymentTerm === 0 && o.refunded != null) {
                o.paymentStatusText =
                    o.refunded === 0 ? '未支付' : 
                    o.refunded === 1 ? '退款成功' : 
                    o.refunded === 2 ? '已支付' : 
                    o.refunded === 3 ? '退款中' : 
                    o.refunded === 4 ? '快钱支付成功' : 
                    o.refunded === -1 ? '退款失败' : 
                    o.refunded === -4 ? '快钱支付失败' : 
                    o.refunded === -2 ? '支付失败' :
                    o.refunded === 5 ? '微信支付成功' :
                    o.refunded === -5 ? '微信支付失败' : ''
            } else {
                o.paymentStatusText =
                    o.paymentStatus === 0 ? '已支付' : 
                    o.paymentStatus === 1 ? '未支付' : 
                    o.paymentStatus === 2 ? '挂账' : ''
            }

            if(o.link){
              o.link2 = 'hotelDetail?' + o.link.split('?')[1]
            }else{
              o.link2 = 'javascript:;'
            }
        }
    },

    // 点击 '搜索'
    searchOrderList(){
      let searchKey = this.$refs.orderListInput.value.replace(/^\s+|\s+$/g, '')
      this.getOrderList({ currPage: 1, pageSize: 5, searchKey: searchKey })
    }
  },

  created(){
    // 查询订单列表
    this.getOrderList({ currPage: 1, pageSize: 5 })
  }
}
</script>
