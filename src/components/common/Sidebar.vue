<!-- 组件说明 -->
<template>
	<div class="sidebar">
		<div class="sidebar-btn">
			<el-button type="warning" icon="el-icon-star-off" circle @click="myConcern"></el-button>
			<el-button type="danger" icon="el-icon-arrow-up" circle></el-button>
		</div>
		
		<div class="sidebar-spread">
		
		</div>
	</div>
</template>

<script>
  export default {
    name: '',
    
    data() {
      return {}
    },
    
    props: {},
    
    components: {},
    
    computed: {},
    
    methods: {
      myConcern(){
      
      }
    }
  }
</script>

<style scoped lang="scss">
	.sidebar{
		position: fixed;
		bottom: 20px;
		right: 20px;
		z-index: 100;
	}
	
	.sidebar-btn{
		width: 40px;
	}
	
	.el-button+.el-button{
		margin-left: 0;
		margin-top: 10px;
	}
</style>