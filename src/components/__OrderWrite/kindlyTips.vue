<!-- 组件说明 -->
<template>
	<el-form-item label="温馨提示">
		<div class="kindly-tips">
			<span>取消条款</span>
			<p>{{hotelPrice.cancellationDesc}}</p>
		</div>
		<div class="kindly-tips">
			<span>入住离店时间</span>
			<p v-if="staticInfo.country === 70007">
				酒店入住时间最早为{{hotelPrice.arriveStartTime || "14:00"}},
				退房时间最晚为次日{{hotelPrice.arriveEndTime || "12:00"}}
			</p>
			<p v-if="staticInfo.country !== 70007">
				酒店入住时间最早为{{hotelPrice.arriveStartTime || "14:00"}},
				入住最晚时间为{{hotelPrice.arriveEndTime || "24:00"}}
			</p>
		</div>
		<div class="kindly-tips"
		     v-show="content.hasOwnProperty('specialHintsSuppids') && content.specialHintsSuppids.indexOf(content.supplierId) !== -1"
		>
			<span>预订提示</span>
			<p>此房价为2人入住价格，若多人入住，则需在酒店前台支付相应费用</p>
		</div>
	</el-form-item>
</template>

<script>
  export default {
    name: '',
    
    data() {
      return {}
    },
    
    props: {},
    
    components: {},
    
    computed: {
      content : function () {
        return this.$store.state.orderWrite.content
      },
      hotelPrice : function () {
        return this.$store.state.orderWrite.hotelPrice
      },
      staticInfo : function () {
        return this.$store.state.orderWrite.staticInfo
      },
    },
    
    methods: {}
  }
</script>

<style scoped lang="scss">
</style>