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
import Breadcrumb from '../components/common/Breadcrumb'
import SearchLine from '../components/__HotelList/SearchLine'
import AdvancedSearch from '../components/__HotelList/AdvancedSearch'
import SubSearchLine from '../components/__HotelList/SubSearchLine'
import NoHotels from '../components/__HotelList/NoHotels'
import HotelList from '../components/__HotelList/HotelList'
import Pagination from '../components/common/Pagination'

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
      let cityType = this.$store.state.cityType
      return cityType == '2' ? '港澳台' :
             cityType == '3' ? '国外'   : '国内'
    }
  },

  methods: {
    login(){
      this.$api.hotelList.syncCheckcode().then(() => {
        let params = {
          accountCode : 'sz2747',
          username    : 'ch',
          password    : '1',
          checkcode   : '8998',
          rememberMe  : false
        }

        this.$api.hotelList.syncLogin(params)
      })
    },

    logout(){
      this.$api.hotelList.syncLogout()
    },
  },

  created(){
    this.login()
  },
  
}
</script>

<style lang="scss">
body{
  background: #f6f6f6!important;
}
</style>
