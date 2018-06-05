<template>
  <el-popover
    width="550"
    style="width:260px;display: inline-block;"
    trigger="focus"
    placement="bottom-start"
    v-model="visible2">

    <CitySelectPanel :cityType="cityType" />

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
import CitySelectPanel from '../../CitySelectPanel'

export default {
  name: '',
  data() {
    return {
      visible2: false,
      loading: false,

      // 1：显示默认的城市选择面板、2：显示查询到的酒店列表面板
      showPanel: 1,

      cityList: [{"countryName":"Z-中国","count":534,"provinceName":"G广东","type":0,"aname":"深圳","cityid":70002}],

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
    CitySelectPanel
  },
  methods: {
    remoteMethod(keyword) {
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
        this.cityList = res_city.dataList
      }
    },

    // 查酒店列表
    async getHotelList(param){
      let res_hotel = await this.$api.hotelList.syncGetHotels(param)

      if(res_hotel.returnCode === 1 && res_hotel.dataList){
        this.hotelList = res_hotel.dataList
      }
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
