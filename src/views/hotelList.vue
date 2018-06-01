<template>
  <div class="hotelList">
    <Breadcrumb :cityType="cityType" />
  </div>
</template>

<script>
import Breadcrumb from '../components/Breadcrumb'

export default {
  name: 'hotelList',
  data: function() {
    return {
      cityType: '3'
    }
  },
  props: {
    
  },
  components: {
    Breadcrumb,
  }
}
</script>

<style scoped lang="scss">
</style>
