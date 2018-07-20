<!-- 组件说明 -->
<template>
	<div class="tab-content basic-info">
		<div class="basic-info-outer" v-show="writeConfirmWay === false">
			<div class="company-msg">
				<h6 class="list-title">公司信息</h6>
				
				<ul class="company-msg-list">
					<li>
						<span class="item-title fl">公司编号：</span>
						<p class="item-txt fl">sz2747</p>
					</li>
					<li>
						<span class="item-title fl">公司名称：</span>
						<p class="item-txt fl">深圳捷旅国际旅行社有限公司</p>
					</li>
					<li>
						<span class="item-title fl">公司简称：</span>
						<p class="item-txt fl">深圳捷旅</p>
					</li>
					<li>
						<span class="item-title fl">公司区域：</span>
						<p class="item-txt fl">中国-湖南-长沙</p>
					</li>
					<li>
						<span class="item-title fl">公司地址：</span>
						<p class="item-txt fl">深圳坂田</p>
					</li>
				</ul>
			</div>
			
			<div class="manage-receive-way">
				<h6 class="list-title fl">收单方式</h6>
				<a class="add-way fl" @click="addReceiveWay">+ 新增</a>
				
				<table class="list-table way-list">
					<thead>
					<tr>
						<th class="th-starttime">开始时间</th>
						<th class="th-endtime">结束时间</th>
						<th class="th-week">星期</th>
						<th class="th-way">确认方式</th>
						<th class="th-aim">发送目标</th>
						<th class="th-default">是否默认</th>
						<th class="th-remark">备注</th>
						<th class="th-option">操作</th>
					</tr>
					</thead>
					<tbody class="list-tbody way-tbody" v-for="(o, i) in wayList" :key="i">
					
					<tr class="per-line">
						<td class="tb-starttime">
							<span>{{ o.startTime }}</span>
						</td>
						<td class="tb-endtime">
							<span>{{ o.endTime }}</span>
						</td>
						<td class="tb-week">
							<span>{{ o.week }}</span>
						</td>
						<td class="tb-way">
						<span>
							{{
                          o.confirm === '0' ? '直连'
                            : o.confirm === '1' ? 'email'
                            : o.confirm === '2' ? '传真'
                              : '短信'
							}}
						</span>
						</td>
						<td class="tb-aim">
							<span>{{ o.target }}</span>
						</td>
						<td class="tb-default">
							<span>{{ o.isDefault === 0 ? '是' : '否' }}</span>
						</td>
						<td class="tb-remark">
							<span>{{ o.remark }}</span>
						</td>
						<td class="tb-option">
							<button class="reset-way blue">修改</button>
							<button class="delete-way red">删除</button>
						</td>
					</tr>
					
					</tbody>
				</table>
				
				<div class="way-list-paging" v-show="wayList.length > 0">
					<el-pagination
							@current-change="handleCurrentChange"
							:page-size="5"
							layout="prev, pager, next, jumper"
							:page-count="pageCount">
					</el-pagination>
				</div>
			</div>
		</div>
		
		<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="110px" class="demo-ruleForm" v-show="writeConfirmWay === true">
			<el-form-item label="收单方式" required>
				<el-select v-model="ruleForm.way" placeholder="请选择">
					<el-option label="直连" value="0"></el-option>
					<el-option label="Email" value="1"></el-option>
					<el-option label="传真" value="2"></el-option>
					<el-option label="手机" value="3"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="收单时间" required>
				<span class="start-time">开始时间</span>
				<el-select v-model="ruleForm.starttime">
					<el-option
							v-for="item in times"
							:key="item.value"
							:label="item.label"
							:value="item.value">
					</el-option>
				</el-select>
				
				<span class="end-time">结束时间</span>
				<el-select v-model="ruleForm.endtime">
					<el-option
							v-for="item in times"
							:key="item.value"
							:label="item.label"
							:value="item.value">
					</el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="收单适用星期" required>
				<el-checkbox>星期一</el-checkbox>
				<el-checkbox>星期二</el-checkbox>
				<el-checkbox>星期三</el-checkbox>
				<el-checkbox>星期四</el-checkbox>
				<el-checkbox>星期五</el-checkbox>
				<el-checkbox>星期六</el-checkbox>
				<el-checkbox>星期日</el-checkbox>
			</el-form-item>
			<el-form-item label="备注" required>
				<el-input></el-input>
			</el-form-item>
			<el-form-item label="是否默认" required>
				<el-radio v-model="ruleForm.radio" label="1">默认</el-radio>
				<el-radio v-model="ruleForm.radio" label="2">不默认</el-radio>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
				<el-button>取消</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
	import API from '../../api'
	
  export default {
    name: '',
    
    data() {
      return {
        pageCount : 0,
        wayList : [],
        writeConfirmWay : false,
        ruleForm: {
          way: '',
          starttime: '',
          endtime: '',
          radio: '',
        },
        rules : {},
      }
    },
    
    props: {},
    
    components: {},
    
    computed: {
      times(){
        let arr = [];
        for (let i = 0; i < 24; i++) {
          arr.push({
            value : i,
            label : i < 10 ? '0' + i + ':00' : i + ':00'
          })
        }
        return arr;
      }
    },
    
    methods: {
      getReceiveWay(){
        let params = {
          distributorId: 35178,
          currentPage: 1
        };
        
        API.personalCenter.syncGetReceiveWay(params).then(res => {
          this.wayList = res.items;
          this.pageCount = res.pageCount;
        })
      },
      handleCurrentChange(){
      
      },
      addReceiveWay(){
        this.writeConfirmWay = true;
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
    },
    
    created(){
      this.getReceiveWay();
    }
  }
</script>

<style scoped lang="scss">
	.basic-info{
		
		@at-root .company-msg{
			
			@at-root .list-title{
				font-size: 18px;
				height: 60px;
				line-height: 60px;
				color: #ffa825;
				
				@at-root .company-msg-list{
					>li{
						height: 50px;
						line-height: 50px;
						font-size: 14px;
						
						.item-title{
							color: #999999;
							width: 70px;
							margin-right: 20px;
						}
						
						.item-txt{
							color: #333333;
						}
					}
				}
			}
		}
		
		@at-root .manage-receive-way{
			.add-way{
				width: 68px;
				height: 26px;
				line-height: 26px;
				border: 1px solid #3399ff;
				border-radius: 4px;
				text-align: center;
				color: #3399ff;
				font-size: 16px;
				margin: 16px 0 16px 20px;
				cursor: pointer;
				
				&:hover{
					text-decoration: none;
				}
			}
			
			@at-root .way-list{
				th{
					color: #555555;
				}
				
				.th-starttime{width: 100px;}
				.th-endtime{width: 114px;}
				.th-week{width: 106px;}
				.th-way{width: 140px;}
				.th-aim{width: 130px;}
				.th-default{width: 122px;}
				.th-remark{width: 100px;}
				.th-option{width: 138px;}
				
				
				.tb-starttime{
					span{width: 100px;}
				}
				.tb-endtime{
					span{width: 114px;}
				}
				.tb-week{
					span{width: 106px;letter-spacing: 2px;}
				}
				.tb-way{
					span{width: 140px;}
				}
				.tb-aim{
					span{width: 130px;}
				}
				.tb-default{
					span{width: 122px;}
				}
				.tb-remark{
					span{width: 100px;}
				}
				.tb-option{
					width: 134px;
					
					>button{
						width: 50px;
					}
				}
			}
		}
		
		@at-root .way-list-paging{
			margin-top: 20px;
			float: right;
		}
		
		.demo-ruleForm{
			width: 570px;
			
			.el-select{
				width: 140px;
			}
			
			.el-input__inner{
				border-radius: 0;
			}
			
			.start-time,.end-time{
				color: #3399ff;
				margin-right: 10px;
			}
			
			.end-time{
				margin-left: 40px;
			}
			
			.el-checkbox+.el-checkbox {
				margin-left: 0px;
			}
			
			.el-checkbox{
				margin-right: 30px;
			}
		}
	}
</style>