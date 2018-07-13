<!-- 组件说明 -->
<template>
	<el-form-item label="出行提示" v-show="content.hasOwnProperty('isExpediaSupplier') && content.isExpediaSupplier == 1">
		<!--ExpediaSupplie供应商-->
		<div class="kindly-tips"
		     v-show="hotelPrice.hasOwnProperty('checkInInstructions') &&
				     hotelPrice.checkInInstructions !== '' &&
				     hotelPrice.checkInInstructions !== undefined &&
				     hotelPrice.checkInInstructions !== null"
		>
			<span>入住提示</span>
			<div class="expedia-tips-box">
				{{hotelPrice.checkInInstructions}}
			</div>
		</div>
		
		<div class="kindly-tips"
		     v-show="hotelPrice.hasOwnProperty('specialCheckInInstructions') &&
				     hotelPrice.specialCheckInInstructions !== '' &&
				     hotelPrice.specialCheckInInstructions !== undefined &&
				     hotelPrice.specialCheckInInstructions !== null"
		>
			<span>特殊入住提示</span>
			<p>{{hotelPrice.specialCheckInInstructions}}</p>
		</div>
	</el-form-item>
</template>

<script>
	import { mapState } from 'vuex'
	
  export default {
    name: '',
    
    data() {
      return {}
    },
    
    props: {},
    
    components: {},
    
    computed : mapState('orderWrite', [
      'content',
      'hotelPrice',
    ]),
    
    methods: {}
  }
</script>

<style scoped lang="scss">
</style>