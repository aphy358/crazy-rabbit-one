<template>
  <el-select class="hotel-key-word-select" size="small" 
    v-model="value7"
    filterable
    remote
    reserve-keyword
    placeholder="城市/酒店"
    :remote-method="remoteMethod"
    :loading="loading" >

    <el-option
      v-for="item in cityList"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>

  </el-select>
</template>

<script>
export default {
  name: '',
  data() {
    return {
      loading: false,
      cityList: [{
          value: 'Shanghai',
          label: '上海'
      }],
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
        this.loading = true;

        let param = {
          type: this.$props.cityType,
          key: keyword
        };

        let result = await this.$api.hotelList.syncGetCity(param)
        this.loading = false;

        if(result.returnCode === 1 && result.dataList){
          return result.dataList.map(n => {
            return {
              value: n.cityid,
              label: n.aname
            }
          })
        }else{
          return []
        }
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