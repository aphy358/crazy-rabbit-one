<template>
  <div class="hotelDetail">
    <Breadcrumb :cityType="cityType" :hotelName="hotelName" />
  </div>
</template>

<script>
import Breadcrumb from '../components/Breadcrumb'

export default {
  name: 'hotelDetail',
  data: function() {
    return {
      cityType: '3',
      hotelName: '阳光酒店'
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
