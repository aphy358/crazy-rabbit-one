<template>
  <el-select class="hotel-key-word-select" size="small" 
    v-model="value7"
    filterable
    remote
    reserve-keyword
    placeholder="城市/酒店"
    :remote-method="remoteMethod" >

    <el-option
      v-if="showPanel === 1"
      v-for="item in cityList"
      :key="item.cityid"
      :label="item.aname"
      :value="item.cityid">
    </el-option>
    <el-option
      v-else
      v-for="item in hotelList"
      :key="item.id"
      :label="item.name"
      :value="item.id">
    </el-option>

  </el-select>
</template>

<script>
export default {
  name: '',
  data() {
    return {
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
  },
  methods: {
    async remoteMethod(keyword) {
      if (keyword !== '') {
        this.showPanel = 2

        let param = {
          type: this.$props.cityType,
          key: keyword,
          keys: keyword
        };

        let res_city = await this.$api.hotelList.syncGetCity(param)

        if(res_city.returnCode === 1 && res_city.dataList){
          this.cityList = res_city.dataList
        }

        let res_hotel = await this.$api.hotelList.syncGetHotels(param)

        if(res_hotel.returnCode === 1 && res_hotel.dataList){
          this.hotelList = res_hotel.dataList
        }
      }else{
        this.showPanel = 1
      }
    }
  }
}
</script>

<style lang="scss">
.hotel-key-word-select{
  
  .el-input--suffix .el-input__inner {
    text-align: left!important;
  }
}
</style>