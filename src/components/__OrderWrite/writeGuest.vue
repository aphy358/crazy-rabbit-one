<!-- 组件说明 -->
<template>
	<el-form-item label="入住信息">
		<div class="guest-outer" :roomNum="roomNum">
			<div class="guest-group" :maxPersonNum="maxPersonNum" v-for="(room, i) in roomArr" :key="i">
				<div class="guest-box" v-for="(guest, j) in guestArr" :key="j">
					<div class="guest guest-required clearfix">
						<span class="guest-label">住客{{guest + 1}}：</span>
						<div class="guest-info-box">
							<el-input
									placeholder="姓"
									v-model="modelArr['surname' + num(guest, room)]"
									@input="validate('surname', num(guest, room))"
									:class="{'input-error': errors['surname' + num(guest, room) + 'Msg']}"
							>
							</el-input>
							<p class="warning"
							   v-show="errors['surname' + num(guest, room) + 'Msg']"
							>
								<i class="el-icon-warning"></i>
								{{errors['surname' + num(guest, room) + 'Msg']}}
							</p>
						</div>
						<div class="guest-info-box">
							<el-input
									placeholder="名"
									v-model="modelArr['username' + num(guest, room)]"
									@input="validate('username', num(guest, room))"
									:class="{'input-error': errors['username' + num(guest, room) + 'Msg']}"
							></el-input>
							<p class="warning"
							   v-show="errors['username' + num(guest, room) + 'Msg']"
							>
								<i class="el-icon-warning"></i>
								{{errors['username' + num(guest, room) + 'Msg']}}
							</p>
						</div>
						<div class="guest-info-box">
							<el-autocomplete class="inline-input"
							                 v-model="modelArr['country' + num(guest, room)]"
							                 @input="validate('country', num(guest, room))"
							                 :class="{'input-error': errors['country' + num(guest, room) + 'Msg']}"
							                 :id="modelArr['countryId' + num(guest, room)]"
							                 :fetch-suggestions="querySearch"
							                 placeholder="护照国籍"
							                 :trigger-on-focus="false"
							                 @select="((item) =&gt; handleSelect(item, {guest : guest, room : room}))"
							                 @blur="setSelect({guest : guest, room : room})"
							></el-autocomplete>
							<p class="warning"
							   v-show="errors['country' + num(guest, room) + 'Msg']"
							>
								<i class="el-icon-warning"></i>
								{{errors['country' + num(guest, room) + 'Msg']}}
							</p>
						</div>
					</div>
					
				</div>
			</div>
		</div>
	</el-form-item>
</template>

<script>
  import {validator} from "../../components/validator.js";
  
  
  export default {
    name: '',
    
    data() {
      return {
        modelArr: [],
        guestArr: [],
        roomArr: [],
        countryList: [],
        
        errors: {
          validated: true,
        },
        
        keys: ['surname', 'username', 'country'],
        
        rules: {},
        
        flag: false,
        
      }
    },
    
    props: {},
    
    components: {},
    
    computed: {
      maxPersonNum() {
        //根据最大入住人数决定每间房可以填多少个住客信息
        let maxPersonNum = this.$store.state.orderWrite.hotelPrice.maxPersonNum;
        this.guestArr = [];
        for (let i = 0; i < maxPersonNum; i++) {
          this.guestArr.push(i);
        }
  
        let roomNum = this.$store.state.orderWrite.roomNum;
        let maxIndex = maxPersonNum * roomNum;
        for (let i = 0; i < maxIndex; i++) {
          //由于v-model中不能直接拼接变量名，故将变量名及值存于modelArr中，注意modelArr中放入的是真正的用户输入的值
          this.modelArr['surname' + i] = '';
          this.modelArr['username' + i] = '';
          this.modelArr['country' + i] = '';
          this.modelArr['countryId' + i] = '';
  
          //因为validator.js中27行let value = _com[_key]要取得实例的data中对应的值，如果不赋值为空字符串的话，value会等于undefined，故在此赋值，所以此处的值为一份复制的值，仅用于将modelArr中真正的值copy过来，然后用于validate的验证
          this['surname' + i] = '';
          this['username' + i] = '';
          this['country' + i] = '';
          this['countryId' + i] = '';
        }
        
        return maxPersonNum;
      },
  
      roomNum() {
        //根据房间数决定住客的组数
        let roomNum = this.$store.state.orderWrite.roomNum;
        this.roomArr = [];
        for (let i = 0; i < roomNum; i++) {
          this.roomArr.push(i);
        }
        return roomNum;
      },
    },
    
    created() {
      let _this = this;
      
      this.rules = {
        surname: function (key, index) {
          validator(
            _this,
            key + index,
            [
              {required: '该信息不能为空'},
              {
                callback: function () {
                  return /^[\u4e00-\u9fa5_a-zA-Z]{1,}$/.test(_this[key + index]) || _this[key + index] === ''
                },
                msg: '只能输入中文或拼音'
              }
            ]
          );
        },
        username: function (key, index) {
          validator(
            _this,
            key + index,
            [
              {required: '该信息不能为空'},
              {
                callback: function () {
                  return /^[\u4e00-\u9fa5_a-zA-Z]{1,}$/.test(_this[key + index]) || _this[key + index] === ''
                },
                msg: '只能输入中文或拼音'
              }
            ]
          );
        },
        country:function (key, index) {
          validator(
            _this,
            key + index,
            [
              {required: '该信息不能为空'}
            ]
          );
        }
      }
      
    },
    
    methods: {
  
      num(guest, room){
        //将每个输入框对应的索引部分依次赋值为0、1、2......以此类推
        let maxPersonNum = this.maxPersonNum;
        return guest + (room * maxPersonNum);
      },
      
      validate(key, index) {
        this.flag = false;
        
        let _this = this;
        let maxPersonNum = this.maxPersonNum;
        //如果未传参数进来，说明是全部验证，而非单个
        if (!key && !index){
          let o = _this.rules;
          let suffix = maxPersonNum * this.roomNum;
          let result = true;
          for (let i1 = 0; i1 < suffix; i1++) {
            if (i1 === 0 || i1 % maxPersonNum === 0){
              if (i1 !== 1){
                _this.keys.forEach(function (v2, i2) {
                  _this[v2 + i1] = _this.modelArr[v2 + i1];
                  o[v2](v2, i1)
                  
                  if (_this.errors[v2 + i1 + 'Msg']){
                    result = false;
                  }
                })
              }
            }
            
          }
          
          return result;
        }else{
          //因为validator.js中27行let value = _com[_key]要取得实例的data中对应的值，而如果此处直接将modelArr[key + index]作为_key传入validate的话，_com[_key]将会转化为例如this[modelArr[key + index]]这样的表达式，这种表达式是无法取到正确的值的，而且双重的中括号将导致js报错，所以此处复制一份用户在该输入框真正输入的值，用于validate的验证
          this[key + index] = this.modelArr[key + index];
    
          let flag = true;
          //当用户在非必填住客信息栏中某个输入框中输入信息时，那么该栏其他输入框也为必填，相反，当用户将在栏填入的信息全数删除时，则该栏所有项都不需要填
          if (index !== 0 && index % maxPersonNum !== 0){
            //要保证该栏中的所有输入框均无值
            this.keys.forEach(function (v, i) {
              if (_this.modelArr[v + index] !== ''){
                flag = false;
              }
            });
          }else{
            flag = false;
          }
    
          if (flag === true){
            this.errors.validated = false;
            this.keys.forEach(function (v, i) {
              _this.errors[v + index + 'Msg'] = '';
            });
          }else{
            this.errors.validated = true;
            let o = this.rules;
      
            this.keys.forEach(function (v, i) {
              o[v](v, index);
            });
          }
        }
      },
      
      querySearch(queryString, cb) {
        let _this = this;
        let results = [];
        let params = {key: queryString};
        this.$api.orderWrite.getCountrySuggest(params).then(function (data) {
          let list = data.list;
          _this.countryList = data.list;
          list.forEach(function (v, i) {
            results.push({
              value: v.name.split('-')[1],
              id: v.countryid
            });
          })
        });
        
        // 调用 callback 返回建议列表的数据
        cb(results);
      },
      
      handleSelect(item, obj) {
        let index = this.num(obj.guest, obj.room);
  
        this.modelArr['countryId' + index] = item.id;
        
        this.flag = true;
        
        this.checkMarket(index);
      },
  
      setSelect(item){
        if (this.flag=== true){
          return;
        }
        
        let _this = this;
        //当前输入框的栏索引
        let index = _this.num(item.guest, item.room);
  
        let name = this.modelArr['country' + index];
        if (!name) {
          //用户未输入任何字然后离开此输入框时，无需做校验
          return;
        }
  
        let list = this.countryList;
        let flag = false;
        list.forEach(function (v, i) {
          if (_this.modelArr['country' + index] === v.name.split('-')[1]) {
            _this.modelArr['countryId' + index] = v.countryid;
            flag = true;
          }
        });
  
  
        if (flag === false){
          this.$set(this.modelArr, 'country' + index, '');
          this.$set(this.modelArr, 'countryId' + index, '');
          _this.validate('country', index);
//          _this.$message({
//            message: '请输入一个正确的国籍',
//            type: 'error'
//          });
    
          return;
        }
  
        this.checkMarket(index);
      },
      
      
      checkMarket(index){
        let _this = this;
        //检查用户国籍是否在酒店适用市场范围内
        let id = this.modelArr['countryId' + index];
        let params = {
          suppId: this.$store.state.orderWrite.supplierId,
          countryId: id
        };
        this.$api.orderWrite.checkMarket(params).then(function (data) {
          if (data.inProperMarket === true) {
            //清空用户输入的值
            _this.modelArr['country' + index] = '';
            _this.modelArr['countryId' + index] = '';
      
            //由于dom并不主动响应数据的改变，所以这里将数据深拷贝一遍然后再赋值给其本身
            _this.modelArr = Object.assign({}, _this.modelArr);
      
            //因为手动清空了用户输入的值，所以将该输入框的必填验证再重复一遍
            _this.validate('country', index);
      
            _this.$message({
              message: '当前价格不适于该国籍客人，请联系捷旅客服后下单，电话33397777',
              type: 'error'
            });
          }
        })
      }
    },
    
  }
</script>

<style lang="scss">
	.input-error {
		.el-input__inner {
			border-color: red !important;
		}
	}
	
	.guest-label {
		float: left;
	}
	
	.guest-info-box {
		float: left;
		margin-right: 20px;
		
		.warning {
			height: 14px;
			line-height: 14px;
			margin-top: 6px;
			
			.el-icon-warning {
				color: red;
				margin-right: 4px;
			}
		}
	}
</style>