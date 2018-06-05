<template>
  <el-popover
    :width="keyword === '' ? 550 : 390"
    style="width:260px;display: inline-block;"
    trigger="focus"
    placement="bottom-start"
    v-model="visible2">

    <CitySelectPanel v-if="showPanel === 1" :cityType="cityType" />
    <HotelSelectPanel v-if="showPanel === 2" :hotelList="hotelList" :cityList="cityList" />

    <el-input
      size="small"
      slot="reference"
      placeholder="城市/酒店"
      class="hotel-key-word-select"
      @input="remoteMethod"
      @keyup="remoteMethod"
      @paste="remoteMethod"
      clearable >
    </el-input>

  </el-popover>
</template>

<script>
import CitySelectPanel from './CitySelectPanel'
import HotelSelectPanel from './HotelSelectPanel'

export default {
  name: '',
  data() {
    return {
      keyword: '',
      visible2: false,
      loading: false,

      // 1：显示默认的城市选择面板、2：显示查询到的酒店列表面板
      showPanel: 1,

      cityList: [],

      hotelList: [],

      value7: ''
    }
  },
  props: {
    cityType: {
      default: 0,
    },
  },
  computed: {
    
  },
  components: {
    CitySelectPanel,
    HotelSelectPanel
  },
  methods: {
    remoteMethod(keyword) {
      this.keyword = keyword

      if (keyword !== '') {
        this.showPanel = 2

        let param = {
          type: this.$props.cityType,
          key: keyword,
          keys: keyword
        };

        this.getCityList(param)
        this.getHotelList(param)
      }else{
        this.showPanel = 1
      }
    },

    // 查城市
    async getCityList(param){
      let res_city = await this.$api.hotelList.syncGetCity(param)

      if(res_city.returnCode === 1 && res_city.dataList){
        this.cityList = this.setHighlightStr(res_city.dataList, param.keys, 'aname', 'cityStr')
      }
    },

    // 查酒店列表
    async getHotelList(param){
      let res_hotel = await this.$api.hotelList.syncGetHotels(param)

      if(res_hotel.returnCode === 1 && res_hotel.dataList){
        this.hotelList = this.setHighlightStr(res_hotel.dataList, param.keys, 'name', 'hotelStr')
      }
    },

    /**
     * 将关键字搜索返回的结果设置关键字高亮
     * dataList：待处理数组
     * keyword：关键字，如 '深圳'、'上海'
     * name：数组中高亮处理的原始字段名，如 'aname'、'name'
     * strName：高亮处理后新添加的字段名，如 'cityStr'、'hotelStr'
     */
    setHighlightStr(dataList, keyword, name, strName){
      dataList.forEach(n => {
        n.cityName = n.cityName ? this.trim(n.cityName) : ''
        n.provinceName = this.trim(n.provinceName)
        n.countryName = this.trim(n.countryName)
        n[strName] = ''

        for (let i = 0; i < n[name].length; i++) {
          (~keyword.indexOf(n[name][i]))
            ? n[strName] += '<span class="key">' + n[name][i] + '</span>'
            : n[strName] += n[name][i]
        }
      })

      return dataList
    },

    // 去除字符串中所有的大小字母和 '-'
    trim(str){
      return str.replace(/[A-Za-z-]/g, '')
    },
  }
}
</script>

<style lang="scss">
.hotel-key-word-select{
  
  &.el-input--suffix .el-input__inner {
    text-align: left!important;
  }
}

.el-popper[x-placement^=bottom]{
  padding: 0;
}
</style>
