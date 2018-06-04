<template>
  <el-select class="hotel-key-word-select" size="small" 
    v-model="value7"
    filterable
    remote
    reserve-keyword
    placeholder="城市/酒店"
    :remote-method="remoteMethod"
    :loading="loading" >
    <el-option-group
      v-for="group in options3"
      :key="group.label"
      :label="group.label">
      <el-option
        v-for="item in group.options"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-option-group>
  </el-select>
</template>

<script>
export default {
  name: '',
  data() {
    return {
      loading: false,
      options3: [{
        label: '热门城市',
        options: [{
          value: 'Shanghai',
          label: '上海'
        }, {
          value: 'Beijing',
          label: '北京'
        }]
      }, {
        label: '城市名',
        options: [{
          value: 'Chengdu',
          label: '成都'
        }, {
          value: 'Shenzhen',
          label: '深圳'
        }, {
          value: 'Guangzhou',
          label: '广州'
        }, {
          value: 'Dalian',
          label: '大连'
        }]
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

        console.log(result)

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