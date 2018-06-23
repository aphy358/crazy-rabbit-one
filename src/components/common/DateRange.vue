
<!-- 入住离店日期选择组件 -->
<template>
    <el-date-picker
      v-model="getDateRange"
      class="date-range-picker"
      style="width:260px;padding-right:0;"
      size="small" 
      :clearable=false
      type="daterange"
      range-separator="至"
      start-placeholder="入住日期"
      end-placeholder="离店日期"
      :picker-options="pickerOptions" >
    </el-date-picker>
</template>

<script>
import { addDays } from "../../util.js"

export default {
  name: 'DateRange',

  data(){
    return {
      checkedFirstDate: '',
      minDate: '',
      maxDate: '',
      lastValue: [],
    }
  },

  props: [],

  computed: {
    // 获取入离日期
    getDateRange: {
      get: function () {
        let checkin = new Date(this.$store.state.checkin)
        let checkout = new Date(this.$store.state.checkout)
        return [checkin, checkout]
      },
      set: function (newValue) {
        // 矫正手动输入日期超出范围的情形
        if(newValue){
          (+newValue[1] - (+newValue[0])) > 15 * 24 * 60 * 60 * 1000
            ? this.$store.commit('setDate', this.lastValue)
            : (this.$store.commit('setDate', newValue), this.lastValue = newValue)
        }
      }
    },

    pickerOptions(){
      let _this = this
      let cityType = this.$store.state.cityType
      let baseMinDate = new Date( addDays(new Date, cityType == 3 ? 1 : 0) + ' 00:00:00' )
      
      return {
        disabledDate(time) {
          if(_this.maxDate){
            let timeStr = time.Format('yyyy-MM-dd')
            return _this.minDate > +time || +time > _this.maxDate || timeStr === _this.checkedFirstDate;
          }else{
            return +time < baseMinDate;
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

            _this.minDate = Math.max(_minDate, baseMinDate)
            _this.maxDate = _maxDate
          }else{
            // 当第一个日期和第二个日期都选定了，则将之前的限制放开，这样又可以随意选择日期了
            _this.minDate = baseMinDate
            _this.maxDate = null
          }
        }
      }
    }
  },
}
</script>

<style lang="scss">
.el-range-editor--small .el-range-input{
  font-size: 14px!important;
}
.el-range-editor--small .el-range-separator{
  font-size: 14px!important;
}

.el-date-editor .el-range__close-icon{
  display: none!important;
}
</style>
