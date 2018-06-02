<template>
  <div class="hotelList">
    <Breadcrumb />
    <SearchLine :cityType="cityType" />
  </div>
</template>

<script>
import Breadcrumb from '../components/Breadcrumb'
import SearchLine from '../components/SearchLine'

export default {
  name: 'hotelList',
  data: function() {
    return {
      cityType: this.$store.state.hotelList.cityType
    }
  },
  computed: {
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
