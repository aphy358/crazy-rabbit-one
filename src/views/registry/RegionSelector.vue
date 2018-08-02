
<!-- 国家省份城市选择器 -->
<template>
  <div>
    <el-select v-model="selValue1" filterable @change="changeCountry" style="width: 140px;margin-right: 20px;" :class="{'input-error': validated && selValue1 === '-1'}" >
      <el-option
        v-for="item in selOptions1"
        :key="item[1]"
        :label="item[2]"
        :value="item[1]">
      </el-option>
    </el-select>

    <el-select v-model="selValue2" filterable @change="changeState" style="width: 140px;margin-right: 20px;" :class="{'input-error': validated && selValue2 === '-1'}">
      <el-option
        v-for="item in selOptions2"
        :key="item[1]"
        :label="item[2]"
        :value="item[1]">
      </el-option>
    </el-select>

    <el-select v-model="selValue3" filterable @change="changeCity" style="width: 140px;" :class="{'input-error': validated && selValue3 === '-1'}">
      <el-option
        v-for="item in selOptions3"
        :key="item[1]"
        :label="item[2]"
        :value="item[1]">
      </el-option>
    </el-select>
  </div>
</template>

<script>
import { area } from "../../assets/area.js";
const { countrys, states, citys } = area

export default {
  name: 'RegionSelector',

  data(){
    return {
      // 国家
      selValue1: '-1',

      selOptions1: countrys,

      // 省份
      selValue2: '-1',

      selOptions2: [["-1","-1","请选择省份"]],

      // 城市
      selValue3: '-1',

      selOptions3: [["-1","-1","请选择城市"]],
    }
  },

  props: ['validated'],
  
  methods: {
    // 切换国家
    changeCountry(e){
      this.selOptions2 = states.filter(n => n[0] == e || n[0] == '-1')
      this.selValue2 = this.selOptions2[0][1]
      this.changeState(this.selValue2)

      this.$emit('regionChange', {k: 'selValue1', v: this.selValue1})
    },

    // 切换省份
    changeState(e){
      this.selOptions3 = citys.filter(n => n[0] == e || n[0] == '-1')
      this.selValue3 = this.selOptions3[0][1]

      this.$emit('regionChange', {k: 'selValue2', v: this.selValue2})
    },

    // 切换城市
    changeCity(e){
      this.$emit('regionChange', {k: 'selValue3', v: this.selValue3})
    },

  }
}
</script>

<style scoped lang="scss">
</style>