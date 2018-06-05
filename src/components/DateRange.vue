
<!-- 入住离店日期选择组件 -->
<template>
    <el-date-picker
      v-model="value"
      class="date-range-picker"
      style="width:260px;padding-right:5px;"
      size="small" 
      type="daterange"
      range-separator="至"
      start-placeholder="入住日期"
      end-placeholder="离店日期"
      @change="changeDate"
      :picker-options="pickerOptions" >
    </el-date-picker>
</template>

<script>
import { addDays } from "../util.js"

export default {
  name: 'DateRange',
  data(){
    return {
      value: '',
      checkedFirstDate: '',
      minDate: new Date( new Date().Format('yyyy-MM-dd') + ' 00:00:00' ),
      maxDate: '',
      lastValue: [],
    }
  },
  props: {
    cityType: {
      default: 0,
    },
  },
  computed: {
    pickerOptions(){
      let _this = this
      let _today = new Date( new Date().Format('yyyy-MM-dd') + ' 00:00:00' )

      return {
        disabledDate(time) {
          if(_this.minDate && _this.maxDate){
            let timeStr = time.Format('yyyy-MM-dd')
            return _this.minDate > +time || +time > _this.maxDate || timeStr === _this.checkedFirstDate;
          }else{
            return +time < _this.minDate;
          }
        },
        // 动态的根据选定的第一个日期，重新设置第二个日期的可选范围，最终将两个日期的日期间隔控制在 15 天之内
        onPick({ maxDate, minDate }){
          _this.checkedFirstDate = minDate.Format('yyyy-MM-dd')
          _this.lastValue = [minDate, maxDate]

          if(!maxDate){
            // 当选了第一个日期而没选第二个日期时，则需要对第二个日期的选择范围进行限定
            let _minDate = new Date( addDays(minDate, -15) + ' 23:59:59' )
            let _maxDate = new Date( addDays(minDate, 15) + ' 00:00:00' )

            _this.minDate = Math.max(_minDate, _today)
            _this.maxDate = _maxDate
          }else{
            // 当第一个日期和第二个日期都选定了，则将之前的限制放开，这样又可以随意选择日期了
            _this.minDate = _today
            _this.maxDate = null
          }
        }
      }
    }
  },
  methods: {
    // 矫正手动输入日期超出范围的情形
    changeDate(){
      if( this.value && (+this.value[1] - (+this.value[0])) > 15 * 24 * 60 * 60 * 1000 ){
        this.value = this.lastValue
      }
    }
  }
}
</script>

<style lang="scss">
.el-range-editor--small .el-range-input{
  font-size: 14px!important;
}
.el-range-editor--small .el-range-separator{
  font-size: 14px!important;
}
</style>
