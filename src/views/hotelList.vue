<template>
  <div class="hotelList">
    <Breadcrumb />
    <SearchLine />
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

  props: {
  },

  components: {
    Breadcrumb,
    SearchLine,
  },

  computed: {
  },

  methods: {
  },

  created(){
  }
}
</script>

<style lang="scss">
body{
  background: #f6f6f6!important;
}
</style>
