
<!-- 关键字搜索（城市/酒店名） -->
<template>
  <el-popover
    :width="getShowPanel == 1 ? 550 : 390"
    style="width:260px;display: inline-block;"
    trigger="focus"
    placement="bottom-start"
    v-model="visible">

    <CitySelectPanel v-if="getShowPanel == 1" @pickvalue="pickvalue($event)" />
    <HotelSelectPanel v-if="getShowPanel == 2" :hotelList="hotelList" :cityList="cityList" @pickvalue="pickvalue($event)" />

    <el-input
      size="small"
      slot="reference"
      placeholder="城市/酒店"
      class="hotel-key-word-select"
      prefix-icon="el-icon-search"
      v-model="getKeyword"
      @input="remoteMethod"
      @paste="remoteMethod"
      @focus="remoteMethod"
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
      visible: false,
      cityList: [],
      hotelList: [],
    }
  },

  props: [],

  components: {
    CitySelectPanel,
    HotelSelectPanel
  },

  computed: {
    // 获取关键字
    getKeyword: {
      get: function () {
        return this.$store.state.hotelList.keyword
      },
      set: function (newValue) {
        this.$store.commit('hotelList/setKeyword', newValue)

        // 当关键字是通过输入获取的，则只将其当做关键字（所以这里把城市 ID 设置为 null），除非是通过点击某个城市才当做是城市
        this.$store.commit('hotelList/setCityId', null)
      }
    },

    getShowPanel(){
      return this.$store.state.hotelList.keyword === '' ? '1' : '2'
    }
  },

  methods: {
    remoteMethod(keyword) {
      keyword = typeof keyword === 'object'
        ? keyword.srcElement.value
        : keyword
      
      if (keyword && keyword !== '') {
        let param = {
          type: this.$store.state.hotelList.cityType,
          key: keyword,
          keys: keyword
        };

        this.getCityList(param)
        this.getHotelList(param)
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

    // 接收子组件发送过来的事件（当选中某个城市或者点击了某个酒店时）
    pickvalue(event){
      this.visible = false
      this.$store.commit('hotelList/setKeyword', event.n)
      this.$store.commit('hotelList/setCityId', event.i)
    },
  }
}
</script>

<style lang="scss">
.el-popper[x-placement^=bottom]{
  padding: 0;
}
</style>
