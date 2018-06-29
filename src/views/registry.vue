
<!-- 注册页面 -->
<template>
  <div class="registry-main-box">
      <div class="main">
          <div class="register-head clearfix">
              <h5 class="register-title fl">注册账号</h5>
              <div class="register-h-r fr">
                  <p class="fl">已有房掌柜账号？</p>
                  <router-link class="to-login fl" to="/registry">直接登录</router-link>
              </div>
          </div>

          <div class="tips">
              <i class="icon"></i>
              <span class="tips-title">温馨提示：</span>
              如您已在我司有合作，请先咨询注册组0755-33336999索要贵公司账号，无需重复注册，谢谢合作！
          </div>


          <div class="company-message">
              <h6 class="company-title">企业基本信息</h6>

              <ul class="message-list clearfix">
                  <li class="company-item">
                      <div class="fl item-l">
                          <span class="item-title message-required">企业名称</span>
                      </div>
                      <input type="text" class="fl submit-required" placeholder="请填写正确的公司名称全称" />
                      <p class="warning"></p>
                  </li>
                  <li class="company-item">
                      <div class="fl item-l">
                          <span class="item-title message-required">企业所在地</span>
                      </div>
                      <div class="item-r fl">
                          <el-select v-model="selValue1" filterable @change="changeCountry" style="width: 140px;margin-right: 20px;">
                            <el-option
                              v-for="item in selOptions1"
                              :key="item[1]"
                              :label="item[2]"
                              :value="item[1]">
                            </el-option>
                          </el-select>

                          <el-select v-model="selValue2" filterable @change="changeState" style="width: 140px;margin-right: 20px;">
                            <el-option
                              v-for="item in selOptions2"
                              :key="item[1]"
                              :label="item[2]"
                              :value="item[1]">
                            </el-option>
                          </el-select>

                          <el-select v-model="selValue3" filterable style="width: 140px;">
                            <el-option
                              v-for="item in selOptions3"
                              :key="item[1]"
                              :label="item[2]"
                              :value="item[1]">
                            </el-option>
                          </el-select>
                      </div>
                      <p class="warning"></p>
                  </li>
                  <li class="company-item">
                      <div class="fl item-l">
                          <span class="item-title message-required">企业地址</span>
                      </div>
                      <input type="text" class="fl submit-required" placeholder="请填写正确的公司办公地址" />
                      <p class="warning"></p>
                  </li>
                  <li class="company-item">
                      <div class="fl item-l">
                          <span class="item-title">企业电话</span>
                      </div>
                      <input type="text" class="fl" placeholder="请填写正确格式，如075533397777" />
                      <p class="warning"></p>
                  </li>
                  <li class="company-item">
                      <div class="fl item-l">
                          <span class="item-title message-required">企业传真</span>
                      </div>
                      <input type="text" class="fl submit-required" placeholder="请填写正确格式，如075533397777" />
                      <p class="warning"></p>
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
                      <p class="warning"></p>
                  </li>
                  <li class="company-item">
                      <div class="fl item-l">
                          <span class="item-title message-required">收单适用星期</span>
                      </div>
                      <ul class="item-r fl">
                          <li class="sdweek" :class="{'selected': selectedWeek[0]}" @click="toggleWeekSelect(0)">1</li>
                          <li class="sdweek" :class="{'selected': selectedWeek[1]}" @click="toggleWeekSelect(1)">2</li>
                          <li class="sdweek" :class="{'selected': selectedWeek[2]}" @click="toggleWeekSelect(2)">3</li>
                          <li class="sdweek" :class="{'selected': selectedWeek[3]}" @click="toggleWeekSelect(3)">4</li>
                          <li class="sdweek" :class="{'selected': selectedWeek[4]}" @click="toggleWeekSelect(4)">5</li>
                          <li class="sdweek" :class="{'selected': selectedWeek[5]}" @click="toggleWeekSelect(5)">6</li>
                          <li class="sdweek" :class="{'selected': selectedWeek[6]}" @click="toggleWeekSelect(6)">7</li>
                      </ul>
                      <p class="warning"></p>
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
                      <input type="text" class="fl submit-required" placeholder="请设置用户名，由4至16位数字或英文字母组成" />
                      <p class="warning"></p>
                  </li>
                  <li class="company-item">
                      <div class="fl item-l">
                          <span class="item-title message-required">密码</span>
                      </div>
                      <input type="password" class="fl submit-required" placeholder="请设置密码，由4至16位字符组成" />
                      <p class="warning"></p>
                  </li>
                  <li class="company-item">
                      <div class="fl item-l">
                          <span class="item-title message-required">确认密码</span>
                      </div>
                      <input type="password" class="fl submit-required" placeholder="请再次输入密码" />
                      <p class="warning"></p>
                  </li>
                  <li class="company-item">
                      <div class="fl item-l">
                          <span class="item-title message-required">姓名</span>
                      </div>
                      <input type="text" class="fl submit-required" placeholder="请填写您的真实姓名" />
                      <p class="warning"></p>
                  </li>
                  <li class="company-item">
                      <div class="fl item-l">
                          <span class="item-title message-required">手机</span>
                      </div>
                      <input type="text" class="fl submit-required" placeholder="请填写您的手机号码" />
                      <p class="warning"></p>
                  </li>
                  <li class="company-item">
                      <div class="fl item-l">
                          <span class="item-title message-required">邮箱</span>
                      </div>
                      <input type="text" class="fl submit-required" placeholder="请填写您的邮箱地址" />
                      <p class="warning"></p>
                  </li>
                  <li class="company-item">
                      <div class="fl item-l">
                          <span class="item-title">推荐人信息</span>
                      </div>
                      <input type="text" class="fl" placeholder="请填写您的推荐人信息" />
                      <p class="warning"></p>
                  </li>
                  <li class="company-item">
                      <div class="fl item-l">
                          <span class="item-title message-required">验证码</span>
                      </div>
                      <div class="item-r fl" style="margin-left: 0;">
                          <input type="text" class="fl submit-required" placeholder="请输入验证码" style="width: 360px;margin-right: 18px;" />
                          <img class="yzm-img" :src="'/user/getCheckcodeImg.do?time=' + codeTimeStamp" @click="codeTimeStamp = +new Date()" />
                      </div>
                      <p class="warning"></p>
                  </li>
              </ul>
          </div>

          <el-button type="warning" style="font-size: 18px;letter-spacing: 18px;width: 300px;padding-left: 48px;margin: 50px auto;display: block;">提交</el-button>
      </div>
  </div>
</template>

<script>
import { area } from "../assets/area.js";
const { countrys, states, citys } = area

export default {
  name: '',

  data(){
    return {
      // 验证码时间戳
      codeTimeStamp: 0,

      // 选择国家
      selValue1: '-1',

      selOptions1: countrys,

      // 选择省份
      selValue2: '-1',

      selOptions2: [["-1","-1","请选择省份"]],

      // 选择城市
      selValue3: '-1',

      selOptions3: [["-1","-1","请选择城市"]],

      // 收单方式
      selValue4: '0',

      selOptions4: [
        { value: '0', label: '直连' },
        { value: '1', label: 'Email' },
        { value: '2', label: '传真' },
        { value: '3', label: '手机' },
      ],

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

    }
  },

  props: {
    
  },

  components: {

  },

  computed: {
    
  },
  
  methods: {
    changeCountry(e){
      this.selOptions2 = states.filter(n => n[0] == e)

      if(!this.selOptions2[0]){
        this.selOptions2 = [["-1","-1","请选择省份"]]
      }

      this.selValue2 = this.selOptions2[0][1]
      this.changeState(this.selValue2)
    },

    changeState(e){
      this.selOptions3 = citys.filter(n => n[0] == e)

      if(!this.selOptions3[0]){
        this.selOptions3 = [["-1","-1","请选择城市"]]
      }

      this.selValue3 = this.selOptions3[0][1]
    },

    toggleWeekSelect(index){
      this.selectedWeek[index] = !this.selectedWeek[index]
      this.selectedWeek = Object.assign([], this.selectedWeek)
    }
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
}

.el-select-dropdown__item{
  padding: 0 10px!important;
}
</style>

<style scoped lang="scss">    
@import "../assets/jl_sprites.scss";

.registry-main-box{
	background-color: #f8f8f8;
	overflow: hidden;
	
	.main{
		width: 1200px;
		margin: 25px auto 40px;
		background-color: #fff;
		box-shadow: 0 0 10px #eeeeee;
		overflow: hidden;
		
		@at-root .register-head{
			height: 60px;
			line-height: 60px;
			border-bottom: 1px solid #E3E3E3;
			
			.register-title{
				font-size: 24px;
				color: #666666;
				margin-left: 30px;
			}
			
			.register-h-r{
				font-size: 16px;
				margin-right: 30px;
				
				.to-login{
					color: #3399ff;
					text-decoration: underline;
				}
			}
		}
		
		@at-root .tips{
			margin-left: 30px;
			height: 40px;
			line-height: 40px;
			font-size: 14px;
			.icon{
				display: inline-block;
				vertical-align: middle;
				@include jl_sprites;
				@include trumpet;
			}
			.tips-title{
				color: #ffa825;
				margin-left: 10px;
			}
		}
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