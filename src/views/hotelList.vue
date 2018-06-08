<template>
  <div class="hotelList">
    <Breadcrumb />
    <SearchLine />
    <AdvancedSearch />
  </div>
</template>

<script>
import Breadcrumb from '../components/Breadcrumb'
import SearchLine from '../components/SearchLine'
import AdvancedSearch from '../components/AdvancedSearch'

export default {
  name: 'hotelList',
  
  data: function() {
    return {
    }
  },

  props: {
  },

  components: {
    Breadcrumb,
    SearchLine,
    AdvancedSearch,
  },

  computed: {
  },

  methods: {
  },

  created(){
    let state = sessionStorage.getItem('jlfzg__state')
    
    if(state){
      this.$store.commit('hotelList/initState', window.JSON.parse(state))
      sessionStorage.removeItem('jlfzg__state')
    }
  }
}
</script>

<style lang="scss">
body{
  background: #f6f6f6!important;
}
</style>
