<!-- 组件说明 -->
<template>
	<div class="main">
		<div class="order-write">
			<steps/>
			<div class="order-info clearfix">
				<orderInfoLeft/>
				<orderInfoRight/>
			</div>
		</div>
	</div>
</template>

<script>
  import steps from '../components/__OrderWrite/steps.vue'
  import orderInfoLeft from '../components/__OrderWrite/orderInfoLeft.vue'
  import orderInfoRight from '../components/__OrderWrite/orderInfoRight.vue'
  
  export default {
    name: '',
    
    data() {
      return {}
    },
    
    props: {},
    
    components: {
      steps,
      orderInfoLeft,
      orderInfoRight
    },
    
    computed: {},
    
    methods: {
      checkOrder : function () {
        this.$store.dispatch('orderWrite/checkOrder')
      },
  
      getOrderInfo : function () {
        this.$store.dispatch('orderWrite/getOrderInfo')
      },
  
      getExtraInfo : function () {
        this.$store.dispatch('orderWrite/getExtraInfo', {typeId : 1});
        this.$store.dispatch('orderWrite/getExtraInfo', {typeId : 2});
        this.$store.dispatch('orderWrite/getExtraInfo', {typeId : 3});
      }
    },
    
    created() {
      this.checkOrder();
      this.getOrderInfo();
      this.getExtraInfo();
    }
  }
</script>

<style scoped lang="scss">
	body {
		background-color: #fff;
	}
	
	.main {
		padding: 50px 0;
		background-color: #fff !important;
	}
	
	.order-write {
		width: 1200px;
		margin: 0 auto;
	}
</style>