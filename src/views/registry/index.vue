
<!-- 注册页面 -->
<template>
  <div class="registry-main-box">
      <div v-if="!registSuccess" class="main">
          <!-- 头部 -->
          <RegistHeader />

          <div class="company-message">
              <h6 class="company-title">企业基本信息</h6>

              <ul class="message-list clearfix">
                  <li class="company-item">
                      <div class="fl item-l">
                          <span class="item-title message-required">企业名称</span>
                      </div>
                      <input v-model="companyName" type="text" class="fl submit-required" placeholder="请填写正确的公司名称全称" 
                        :class="{'input-error': errors.companyNameMsg}" 
                        @input="validateRules.validateCompanyName"/>

                      <p class="warning" v-show="errors.companyNameMsg"><i class="icon-warning"></i>{{errors.companyNameMsg}}</p>
                  </li>
                  <li class="company-item">
                      <div class="fl item-l">
                          <span class="item-title message-required">企业所在地</span>
                      </div>
                      <div class="item-r fl">
                          <!-- 国家省份城市选择器 -->
                          <RegionSelector :validated="errors.validated" @regionChange="regionChange($event)" />
                      </div>
                      <p class="warning" v-show="errors.companyLocationMsg"><i class="icon-warning"></i>{{errors.companyLocationMsg}}</p>
                  </li>
                  <li class="company-item">
                      <div class="fl item-l">
                          <span class="item-title message-required">企业地址</span>
                      </div>
                      <input v-model="address" type="text" class="fl submit-required" placeholder="请填写正确的公司办公地址" 
                        :class="{'input-error': errors.addressMsg}" 
                        @input="validateRules.validateAddress" />

                      <p class="warning" v-show="errors.addressMsg"><i class="icon-warning"></i>{{errors.addressMsg}}</p>
                  </li>
                  <li class="company-item">
                      <div class="fl item-l">
                          <span class="item-title">企业电话</span>
                      </div>
                      <input v-model="telephone" type="text" class="fl" placeholder="请填写正确格式，如075533397777"
                        :class="{'input-error': errors.telephoneMsg}" 
                        @input="validateRules.validateTelephone" />

                      <p class="warning" v-show="errors.telephoneMsg"><i class="icon-warning"></i>{{errors.telephoneMsg}}</p>
                  </li>
                  <li class="company-item">
                      <div class="fl item-l">
                          <span class="item-title message-required">企业传真</span>
                      </div>
                      <input v-model="fax" type="text" class="fl submit-required" placeholder="请填写正确格式，如075533397777" 
                        :class="{'input-error': errors.faxMsg}" 
                        @input="validateRules.validateFax"/>

                      <p class="warning" v-show="errors.faxMsg"><i class="icon-warning"></i>{{errors.faxMsg}}</p>
                  </li>
                  <li class="company-item">
                      <div class="fl item-l">
                          <span class="item-title message-required">收单方式</span>
                      </div>
                      <div class="item-r fl">
                          <el-select v-model="selValue4">
                            <el-option
                              v-for="item in selOptions4"
                              :key="item.value"
                              :label="item.label"
                              :value="item.value">
                            </el-option>
                          </el-select>
                      </div>
                  </li>
                  <li class="company-item">
                      <div class="fl item-l">
                          <span class="item-title message-required">收单时间</span>
                      </div>
                      <div class="item-r">
                          <span class="start-time">开始时间</span>
                          <el-select v-model="selValue5" style="width: 140px;margin-right: 25px;">
                            <el-option
                              v-for="item in selOptions5"
                              :key="item.value"
                              :label="item.label"
                              :value="item.value">
                            </el-option>
                          </el-select>
                          <span class="end-time">结束时间</span>
                          <el-select v-model="selValue6" style="width: 140px;">
                            <el-option
                              v-for="item in selOptions5"
                              :key="item.value"
                              :label="item.label"
                              :value="item.value">
                            </el-option>
                          </el-select>
                      </div>
                  </li>
                  <li class="company-item">
                      <div class="fl item-l">
                          <span class="item-title message-required">收单适用星期</span>
                      </div>
                      <ul class="item-r fl" style="width: 457px;">
                          <li class="sdweek" v-for="(item, i) in selectedWeek" :key="i" :class="{'selected': item}" @click="toggleWeekSelect(i)">{{i + 1}}</li>
                      </ul>
                      <p class="warning" v-show="errors.selectedWeekMsg"><i class="icon-warning"></i>{{errors.selectedWeekMsg}}</p>
                  </li>
              </ul>
          </div>


          <div class="company-message">
              <h6 class="company-title">用户信息</h6>

              <ul class="message-list clearfix">
                  <li class="company-item">
                      <div class="fl item-l">
                          <span class="item-title message-required">用户名</span>
                      </div>
                      <input v-model="userName" type="text" class="fl submit-required" placeholder="请设置用户名，由4至16位数字或英文字母组成"
                        :class="{'input-error': errors.userNameMsg}" 
                        @input="validateRules.validateUserName"/>

                      <p class="warning" v-show="errors.userNameMsg"><i class="icon-warning"></i>{{errors.userNameMsg}}</p>
                  </li>
                  <li class="company-item">
                      <div class="fl item-l">
                          <span class="item-title message-required">密码</span>
                      </div>
                      <input v-model="password" type="password" class="fl submit-required" placeholder="请设置密码，由4至16位字符组成"
                        :class="{'input-error': errors.passwordMsg}" 
                        @input="validateRules.validatePassword"/>

                      <p class="warning" v-show="errors.passwordMsg"><i class="icon-warning"></i>{{errors.passwordMsg}}</p>
                  </li>
                  <li class="company-item">
                      <div class="fl item-l">
                          <span class="item-title message-required">确认密码</span>
                      </div>
                      <input v-model="passwordConfirm" type="password" class="fl submit-required" placeholder="请再次输入密码" 
                        :class="{'input-error': errors.passwordConfirmMsg}" 
                        @input="validateRules.validatePasswordConfirm"/>

                      <p class="warning" v-show="errors.passwordConfirmMsg"><i class="icon-warning"></i>{{errors.passwordConfirmMsg}}</p>
                  </li>
                  <li class="company-item">
                      <div class="fl item-l">
                          <span class="item-title message-required">姓名</span>
                      </div>
                      <input v-model="name" type="text" class="fl submit-required" placeholder="请填写您的真实姓名" 
                        :class="{'input-error': errors.nameMsg}" 
                        @input="validateRules.validateName"/>

                      <p class="warning" v-show="errors.nameMsg"><i class="icon-warning"></i>{{errors.nameMsg}}</p>
                  </li>
                  <li class="company-item">
                      <div class="fl item-l">
                          <span class="item-title message-required">手机</span>
                      </div>
                      <input v-model="mobile" type="text" class="fl submit-required" placeholder="请填写您的手机号码" 
                        :class="{'input-error': errors.mobileMsg}" 
                        @input="validateRules.validateMobile"/>

                      <p class="warning" v-show="errors.mobileMsg"><i class="icon-warning"></i>{{errors.mobileMsg}}</p>
                  </li>
                  <li class="company-item">
                      <div class="fl item-l">
                          <span class="item-title message-required">邮箱</span>
                      </div>
                      <input v-model="email" type="text" class="fl submit-required" placeholder="请填写您的邮箱地址" 
                        :class="{'input-error': errors.emailMsg}" 
                        @input="validateRules.validateEmail"/>

                      <p class="warning" v-show="errors.emailMsg"><i class="icon-warning"></i>{{errors.emailMsg}}</p>
                  </li>
                  <li class="company-item">
                      <div class="fl item-l">
                          <span class="item-title">推荐人信息</span>
                      </div>
                      <input v-model="applicantInfo" type="text" class="fl" placeholder="请填写您的推荐人信息" />
                  </li>
                  <li class="company-item">
                      <div class="fl item-l">
                          <span class="item-title message-required">验证码</span>
                      </div>
                      <div class="item-r fl" style="margin-left: 0;">
                          <input v-model="verificationCode" type="text" class="fl submit-required" maxlength="4" placeholder="请输入验证码" style="width: 360px;margin-right: 18px;" 
                            :class="{'input-error': errors.verificationCodeMsg}" 
                            @input="validateRules.validateVerificationCode"/>

                          <img class="yzm-img" :src="'/user/getCheckcodeImg.do?time=' + codeTimeStamp" @click="codeTimeStamp = +new Date()" />
                      </div>
                      <p class="warning" v-show="errors.verificationCodeMsg"><i class="icon-warning"></i>{{errors.verificationCodeMsg}}</p>
                  </li>
              </ul>
          </div>

          <el-button type="warning" style="font-size: 18px;letter-spacing: 18px;width: 300px;padding-left: 48px;margin: 50px auto;display: block;" @click="submitRegistry">提交</el-button>
      </div>

      <!-- 注册成功 -->
      <RegistSuccess v-if="registSuccess" />
  </div>
</template>

<script>
import Velocity from 'velocity-animate';
import { validator } from "../../utils/validator.js"
import { Message } from "element-ui"
import RegistHeader from './RegistHeader'
import RegionSelector from './RegionSelector'
import RegistSuccess from './RegistSuccess'

export default {
  name: 'Registry',

  data(){
    return {
      // 企业名称
      companyName: '',

      // 国家
      selValue1: '-1',

      // 省份
      selValue2: '-1',

      // 城市
      selValue3: '-1',

      // 企业地址
      address: '',

      // 企业电话
      telephone: '',

      // 企业传真
      fax: '',

      // 收单方式
      selValue4: '0',

      selOptions4: [
        { value: '0', label: '直连' },
        { value: '1', label: 'Email' },
        { value: '2', label: '传真' },
        { value: '3', label: '手机' },
      ],

      // 收单时间
      selValue5: '0',
      selValue6: '24',

      selOptions5: [
        { value: '0', label: '00:00' },
        { value: '1', label: '01:00' },
        { value: '2', label: '02:00' },
        { value: '3', label: '03:00' },
        { value: '4', label: '04:00' },
        { value: '5', label: '05:00' },
        { value: '6', label: '06:00' },
        { value: '7', label: '07:00' },
        { value: '8', label: '08:00' },
        { value: '9', label: '09:00' },
        { value: '10', label: '10:00' },
        { value: '11', label: '11:00' },
        { value: '12', label: '12:00' },
        { value: '13', label: '13:00' },
        { value: '14', label: '14:00' },
        { value: '15', label: '15:00' },
        { value: '16', label: '16:00' },
        { value: '17', label: '17:00' },
        { value: '18', label: '18:00' },
        { value: '19', label: '19:00' },
        { value: '20', label: '20:00' },
        { value: '21', label: '21:00' },
        { value: '22', label: '22:00' },
        { value: '23', label: '23:00' },
        { value: '24', label: '24:00' },
      ],

      // 收单适用星期
      selectedWeek: [false, false, false, false, false, false, false],

      // 用户名
      userName: '',

      // 密码
      password: '',

      // 确认密码
      passwordConfirm: '',

      // 姓名
      name: '',

      // 手机
      mobile: '',

      // 邮箱
      email: '',

      // 推荐人信息
      applicantInfo: '',

      // 验证码
      verificationCode: '',

      // 验证码时间戳
      codeTimeStamp: 0,

      errors: {
        validated: false,
      },

      registSuccess: false,

      validateRules: {},

    }
  },

  components: {
    RegistHeader,
    RegionSelector,
    RegistSuccess,
  },

  created(){
    let _this = this

    this.validateRules = {
      // 验证企业名称
      validateCompanyName(){
        validator(
          _this,
          'companyName', 
          [
            'required',
            {
              callback: function(){
                return _this.$api.registry.registRemoteCheck({ key: 'allName', val: _this.companyName })
              }, 
              callback2: function(res){
                return res.isSucc !== false || res.msg === "需要检查的值为空"
              },
              msg: '该企业名称已存在，请使用其他名称，或联系0755-33336999'
            }
          ]
        )
      },

      // 验证国家省份城市必填
      validateCompanyLocation(){
        validator(
          _this,
          'companyLocation', 
          [{
            callback: function(){ return _this.selValue1 != '-1' && _this.selValue2 != '-1' && _this.selValue3 != '-1' }, 
            msg: '国家、省份、城市信息均为必填'
          }]
        )
      },

      // 验证企业地址
      validateAddress(){
        validator(_this, 'address', {preset: '企业地址', rules: ['required']})
      },

      // 验证企业电话
      validateTelephone(){
        validator(
          _this,
          'telephone', 
          [
            'telephone',
            {
              callback: function(){
                return _this.$api.registry.registRemoteCheck({ key: 'tel', val: _this.telephone })
              }, 
              callback2: function(res){
                return res.isSucc !== false || res.msg === "需要检查的值为空"
              },
              msg: '该电话号已被注册，请使用其他号码，或联系0755-33336999'
            }
          ]
        )
      },

      // 验证企业传真
      validateFax(){
        validator(
          _this,
          'fax', 
          [
            'required',
            'fax',
            {
              callback: function(){
                return _this.$api.registry.registRemoteCheck({ key: 'fax', val: _this.fax })
              }, 
              callback2: function(res){
                return res.isSucc !== false || res.msg === "需要检查的值为空"
              },
              msg: '该传真号已被注册，请使用其他号码，或联系0755-33336999'
            }
          ]
        )
      },

      // 验证 '收单适用星期'
      validateWeekSelect(){
        validator(
          _this,
          'selectedWeek', 
          [{
            callback: function(){ return _this.selectedWeek.filter(n => n).length > 0 }, 
            msg: '适用星期不能为空'
          }]
        )
      },

      // 验证用户名
      validateUserName(){
        validator(
          _this,
          'userName', 
          [
            'required',
            {
              callback: function(){ return /^[a-zA-Z\d]{4,16}$/.test(_this.userName) || _this.userName === '' }, 
              msg: '用户名必须由4至16位数字或英文字母组成'
            }
          ]
        )
      },

      // 验证密码
      validatePassword(){
        validator(_this, 'password', {preset: '密码', rules: ['required', {'range': [4,16]}]})
      },

      // 验证确认密码
      validatePasswordConfirm(){
        validator(
          _this,
          'passwordConfirm', 
          [
            'required',
            {
              callback: function(){ return _this.passwordConfirm === _this.password }, 
              msg: '确认密码必须和密码一致'
            }
          ]
        )
      },

      // 验证姓名
      validateName(){
        validator(
          _this,
          'name', 
          [
            'required',
            {
              callback: function(){ return /^[\u4e00-\u9fa5_a-zA-Z]{1,}$/.test(_this.name) || _this.name === '' }, 
              msg: '姓名格式不正确'
            }
          ]
        )
      },

      // 验证手机
      validateMobile(){
        validator(
          _this,
          'mobile', 
          [
            'required',
            'mobile',
            {
              callback: function(){
                return _this.$api.registry.registRemoteCheck({ key: 'mobile', val: _this.mobile })
              }, 
              callback2: function(res){
                return res.isSucc !== false || res.msg === "需要检查的值为空"
              },
              msg: '该手机号已被注册，请使用其他号码，或联系0755-33336999'
            }
          ]
        )
      },

      // 验证邮箱
      validateEmail(){
        validator(
          _this,
          'email', 
          [
            'required',
            'email',
            {
              callback: function(){
                return _this.$api.registry.registRemoteCheck({ key: 'email', val: _this.email })
              }, 
              callback2: function(res){
                return res.isSucc !== false || res.msg === "需要检查的值为空"
              },
              msg: '该邮箱已被注册，请使用其他邮箱，或联系0755-33336999'
            }
          ]
        )
      },

      // 验证码
      validateVerificationCode(){
        validator(_this, 'verificationCode', ['required'])
      },

    }
  },

  methods: {

    // 点击 '收单适用星期'
    toggleWeekSelect(index){
      this.selectedWeek[index] = !this.selectedWeek[index]
      this.selectedWeek = Object.assign([], this.selectedWeek)

      this.validateRules.validateWeekSelect()
    },

    // 响应改变 国家、省份、城市 的事件
    regionChange(param){
      this[param.k] = param.v
      this.validateRules.validateCompanyLocation()
    },

    // 点击 '提交'
    submitRegistry(){
      // 先打开这个开关，开启验证
      this.errors.validated = true

      for (const key in this.validateRules) {
        if (this.validateRules.hasOwnProperty(key)) {
          const element = this.validateRules[key];
          element()
        }
      }
      
      if(this.errors.isValid){
        let params = {
          "registercountry"    : this.selValue1,
          "registerProvince"   : this.selValue2,
          "registerCity"       : this.selValue3,
          "registerCompanyName": this.companyName,
          "registerAccount"    : this.userName,
          "registerAddress"    : this.address,
          "registerName"       : this.name,
          "registerEmail"      : this.email,
          "registerMobile"     : this.mobile,
          "registerTel"        : this.telephone,
          "registerFax"        : this.fax,
          "registerReference"  : this.applicantInfo,
          "confirmStart"       : this.selValue5,
          "confirmEnd"         : this.selValue6,
          "confirmWeek"        : this.selectedWeek.map((n, i) => { return n && i + 1 }).filter(n => n).join(','),
          "confirmType"        : this.selValue4,
          "confirmWay"         : this.selValue4,
          "registerPassWord"   : this.password,
          "vcode"              : this.verificationCode
        };

        let _this = this
        this.$api.registry.submitRegist(params).then(function(data){
          if(data.isSucc === true){
            _this.registSuccess = true
          }else{
            _this.registSuccess = false

            // 显示错误信息
            Message({
              type: "error",
              message: data.msg
            });
          }
        })
      }else{
        setTimeout(() => {
          let error = document.querySelector('.input-error')
          let container = document.querySelector('.el-scrollbar__wrap')
          Velocity(error, 'scroll', {container: container, offset: '-50px'})
        }, 100)
      }
    },

  }
}
</script>

<!-- 覆盖 element 原有样式，注意这里不能用 scoped 限定作用域 -->
<style lang="scss">
.registry-main-box{
  .el-input__inner{
    font-size: 14px;
    padding: 0 10px;
    border-radius: 0;
  }
  
  .el-input--suffix .el-input__inner {
    padding-right: 25px;
  }
  
  .el-input__suffix{
    right: 0;
  }

  .el-button.el-button--primary.el-button--small{
    float: right;
    letter-spacing: 5px;
    font-size: 15px;
    height: 32px;
    line-height: 12px;
    margin-right: 0;
  }

  .input-error{
    .el-select .el-input.is-focus .el-input__inner,
    .el-input__inner{
      border-color: red!important;
    }
  }
}

.el-select-dropdown__item{
  padding: 0 10px!important;
}
</style>

<style scoped lang="scss">    
@import "../../assets/jl_sprites.scss";

.registry-main-box{
  background-color: #f8f8f8;
  overflow: hidden;
  
  .main{
    width: 1200px;
    margin: 25px auto 40px;
    background-color: #fff;
    box-shadow: 0 0 10px #eeeeee;
    overflow: hidden;
  }

  .fl{
    float: left;
  }

  .fr{
    float: right;
  }
}

.company-message{
  margin: 36px auto;
  width: 650px;
  
  @at-root .company-title{
    display: inline-block;
    height: 20px;
    line-height: 20px;
    font-size: 16px;
    color: #000;
    border-bottom: 2px solid #ffa825;
  }
  
  @at-root .message-list{
    width: 920px;
    
    @at-root .company-item{
      display: block;
      height: 40px;
      line-height: 40px;
      margin: 20px auto;
      font-size: 14px;
      
      .item-l{
        width: 84px;
        height: 100%;
        text-align: right;
        display: inline-block;
        .item-title{
          display: inline-block;
          height: 40px;
          line-height: 40px;
          position: relative;
          
          &.message-required{
            &:before{
              content: '*';
              position: absolute;
              top: 0;
              left: -10px;
              color: red;
            }
          }
        }
      }
      
      input{
        height: 40px;
        line-height: 40px;
        border: 1px solid #dcdfe6;
        margin-left: 20px;
        padding-left: 10px;
        width: 460px;
        box-sizing: border-box;
        transition: border-color .2s cubic-bezier(.645,.045,.355,1);

        &:hover{
          border-color: #c0c4cc;
        }
        
        &:focus{
          border-color: #409EFF;
        }
        
        &.input-error{
          border-color: #ff5a5a;
        }
      }
      
      select{
        transition: border-color .2s cubic-bezier(.645,.045,.355,1);
        border: 1px solid #dcdfe6;
        
        &:hover{
          border-color: #c0c4cc;
        }
      }
      
      .item-r{
        margin-left: 20px;
        display: inline-block;
        
        >select{
          height: 40px;
          line-height: 40px;
          width: 140px;
          margin-right: 16px;
          padding-left: 10px;
        }
        
        #city{
          margin-right: 0;
          margin-left: 1px;
        }
        
        >.start-time,.end-time{
          color: #3399ff;
          margin-right: 10px;
        }
        
        >.end-time{
          margin-left: 20px;
        }
        
        >.sdweek{
          width: 40px;
          height: 40px;
          line-height: 40px;
          border: 1px solid #e4e4e4;
          color: #999999;
          float: left;
          border-radius: 50%;
          text-align: center;
          margin-right: 20px;
          cursor: pointer;
          box-sizing: border-box;
          
          &.selected{
            background-color: #409EFF;
            color: #ffffff;
            border: none;
          }
        }
        
        input[name="vcode"]{
          margin-left: 0;
          width: 357px;
          margin-right: 21px;
        }
        
        .yzm-img{
          width: 82px;
          height: 40px;
        }
      }
      
      .warning{
        float: left;
        font-size: 12px;
        color: red;
        
        .icon-warning{
          display: inline-block;
          margin: 0 4px 2px 6px;
          vertical-align: middle;
          @include jl_sprites;
          @include warning_red;
        }
      }
    }
  }
}

</style>