<!-- 组件说明 -->
<template>
	<el-form-item label="个性化信息">
		<el-checkbox-group v-model="specialReq" @change="handSpecialReq">
			<el-checkbox v-for="(item, i) in conditions" :key="i" :label="item" name="type"></el-checkbox>
		</el-checkbox-group>
		<p style="color: #ff6600;">请直接勾选您的要求，我们会及时通知酒店并尽量协助安排，但要视酒店情况，不能确保满足</p>
	</el-form-item>
</template>

<script>
  export default {
    name: '',
    
    data() {
      return {
        specialReq : [],
      }
    },
    
    props: {},
    
    components: {},
    
    computed: {
      conditions : function () {
        let specialReq = this.$store.state.orderWrite.specialConditions;
        let conditions = [];
        specialReq.forEach(function (v, i) {
          conditions.push(v.optionname);
        });
        return conditions;
      },
    },
    
    methods: {
      handSpecialReq : function (value) {
        this.specialReq = value;
        
        this.$store.commit('orderWrite/setCommonState', {
          k : 'specialReq',
          v : value
        })
      },
    }
  }
</script>

<style scoped lang="scss">
</style>