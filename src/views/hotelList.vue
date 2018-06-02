<template>
  <div class="hotelList">
    <Breadcrumb :cityType="getCityType" />
    <SearchLine :cityType="getCityType" />
  </div>
</template>

<script>
import Breadcrumb from '../components/Breadcrumb'
import SearchLine from '../components/SearchLine'

export default {
  name: 'hotelList',
  data: function() {
    return {
    }
  },
  computed: {
    getCityType(){
      return this.$store.state.hotelList.cityType
    }
  },
  props: {
  },
  components: {
    Breadcrumb,
    SearchLine,
  }
}
</script>

<style lang="scss">
body{
  background: #f6f6f6!important;
}
</style>
