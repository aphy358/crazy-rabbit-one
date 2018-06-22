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
    let state = sessionStorage.getItem('jlfzg__state')
    
    if(state){
      this.$store.commit('hotelList/copyState', window.JSON.parse(state))
      sessionStorage.removeItem('jlfzg__state')
    }

    sessionStorage.removeItem('login__login')

    this.login()
  },
  
}
</script>

<style lang="scss">
body{
  background: #f6f6f6!important;
}
</style>
