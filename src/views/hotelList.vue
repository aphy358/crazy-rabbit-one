<template>
    <div class="hotelList">
        <Breadcrumb :cityTypeText="cityTypeText" />
        <SearchLine />
        <AdvancedSearch />
        <SubSearchLine />
        <NoHotels v-if="pageRecordCount == 0" />
        <HotelList />
        <Pagination />
    </div>
</template>

<script>
import Breadcrumb from '../components/Breadcrumb'
import SearchLine from '../components/SearchLine'
import AdvancedSearch from '../components/AdvancedSearch'
import SubSearchLine from '../components/SubSearchLine'
import NoHotels from '../components/NoHotels'
import HotelList from '../components/HotelList'
import Pagination from '../components/Pagination'

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
    SubSearchLine,
    NoHotels,
    HotelList,
    Pagination,
  },

  computed: {
    pageRecordCount(){
      return this.$store.state.hotelList.pageRecordCount
    },

    cityTypeText: function(){
      let cityType = this.$store.state.hotelList.cityType
      return cityType == '2' ? '港澳台' :
             cityType == '3' ? '国外'   : '国内'
    }
  },

  methods: {

  },

  created(){

  },
  
}
</script>

<style lang="scss">
body{
  background: #f6f6f6!important;
}
</style>
