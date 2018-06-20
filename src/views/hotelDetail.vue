<template>
  <div class="hotelDetail">
    <Breadcrumb :hotelName="hotelName" />
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
  },

  created(){
    let state = sessionStorage.getItem('jlfzg_hotelDetail_state')
    
    if(state){
      this.$store.commit('hotelDetail/initState', window.JSON.parse(state))
      sessionStorage.removeItem('jlfzg_hotelDetail_state')
    }
  },

}
</script>

<style scoped lang="scss">
</style>
