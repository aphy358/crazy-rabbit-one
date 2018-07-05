<!-- 组件说明 -->
<template>
	<el-form-item label="入住信息">
		<div class="guest-box">
			<div class="guest guest-required">
				住客1：
				<el-input placeholder="姓" v-model="guestSurname" :class="{'input-error': errors.guestSurnameMsg}"
				          @blur="validateGuestSurname"></el-input>
				<p class="warning" v-show="errors.guestSurnameMsg"><i class="icon-warning"></i>{{errors.guestSurnameMsg}}</p>
				<el-input placeholder="名"></el-input>
				<el-input placeholder="护照国籍"></el-input>
			</div>
			<div class="guest">
				住客2：
				<el-input placeholder="姓"></el-input>
				<el-input placeholder="名"></el-input>
				<el-input placeholder="护照国籍"></el-input>
			</div>
			<div class="guest">
				住客3：
				<el-input placeholder="姓"></el-input>
				<el-input placeholder="名"></el-input>
				<el-input placeholder="护照国籍"></el-input>
			</div>
		</div>
	</el-form-item>
</template>

<script>
  import { validator } from "../../components/validator.js";
  
  
  export default {
    name: '',
    
    data() {
      return {
        guestSurname : '',
  
        errors: {
          validated: true,
        }
      }
    },
    
    props: {},
    
    components: {},
    
    computed: {},
    
    methods: {
      validateGuestSurname(){
        this.errors.validated = true;
        validator(this, 'guestSurname', {preset: '姓', rules: ['required']})
        this.errors = Object.assign({}, this.errors)
  
        console.log(this.errors.guestSurnameMsg);
      }
    }
  }
</script>

<style lang="scss">
</style>