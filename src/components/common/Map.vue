
<!-- 地图 -->
<template>
  <el-dialog :title="'地图 - ' + hotelNameMap" :visible="mapVisible" @close="$emit('close')">
  </el-dialog>
</template>

<script>
import { remoteJS } from "../util.js";

export default {
  name: '',

  data(){
    return {
      mapVisible: true
    }
  },

  props: ['hotelNameMap'],

  components: {
  },

  computed: {
    
  },

  created(){
    remoteJS('https://g.alicdn.com/dingding/dinglogin/0.0.2/ddLogin.js')
  },
  
  methods: {

  }
}
</script>

<style scoped lang="scss">
</style>