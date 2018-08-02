<!-- 组件说明 -->
<template>
	<el-form-item class="inline-warning-module" label="确认方式">
		<el-radio-group v-model="confirmWay" @change="handleConfirmWay">
			<el-radio :label="9">在线确认</el-radio>
			<el-radio :label="1">电子邮件确认</el-radio>
			<el-radio :label="2">传真确认</el-radio>
			<el-radio :label="3">短信确认</el-radio>
		</el-radio-group>
		<div class="confirm-way-info">
			<span>Email</span>
			<el-input
					key="a"
					v-model="email"
					@input="validate('email')"
					placeholder="邮箱"
					:class="{'input-error': errors.emailMsg}"
			></el-input>
			<p class="warning" v-show="errors.emailMsg">
				<i class="el-icon-warning"></i>
				{{errors.emailMsg}}
			</p>
		</div>
		<div class="confirm-way-info">
			<span>传真</span>
			<el-input
					key="b"
					v-model="fax"
					@input="validate('fax')" placeholder="传真号码"
					:class="{'input-error': errors.faxMsg}"
			></el-input>
			<p class="warning" v-show="errors.faxMsg">
				<i class="el-icon-warning"></i>
				{{errors.faxMsg}}
			</p>
		</div>
		<div class="confirm-way-info">
			<span>手机</span>
			<el-input
					key="c"
					v-model="phone"
					@input="validate('phone')"
					placeholder="手机号码"
					:class="{'input-error': errors.phoneMsg}"
			></el-input>
			<p class="warning" v-show="errors.phoneMsg">
				<i class="el-icon-warning"></i>
				{{errors.phoneMsg}}
			</p>
		</div>
	</el-form-item>
</template>

<script>
  import { validator } from '../../utils/validator.js'
  
  export default {
    name: '',
    
    data() {
      return {
        confirmWay : 9,
  
        email : '',
        fax : '',
        phone : '',
  
  
        errors : {
          validated: true,
        },
      }
    },
    
    props: {},
    
    components: {},
    
    computed: {
      distributor() {
        return this.$store.state.orderWrite.distributor
      },
      
    },
    
    methods: {
      handleConfirmWay : function (value) {
        this.confirmWay = value;
        
        //清空所有验证信息
        this.errors.emailMsg = '';
        this.errors.faxMsg = '';
        this.errors.phoneMsg = '';
        
        value === 1 ? this.email = this.distributor.email : this.$set(this, 'email', '');
        value === 2 ? this.fax = this.distributor.fax : this.$set(this, 'fax', '');
        value === 3 ? this.phone = this.distributor.phone : this.$set(this, 'phone', '');
        
      },
      
      validate : function (name) {
        this.rules[name](name);
      },
    },
  
    created() {
      let _this = this;
    
      this.rules = {
        email: function (name) {
          validator(
            _this,
            name,
            [
              'email',
            ]
          );
        },
        fax: function (name) {
          validator(
            _this,
            name,
            [
              'fax',
            ]
          );
        },
        phone:function (name) {
          validator(
            _this,
            name,
            [
              'mobile',
            ]
          );
        }
      }
    
    },
  }
</script>

<style scoped lang="scss">
</style>