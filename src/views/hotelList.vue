<template>
    <div class="hotelList">
        <Breadcrumb />
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
    }
  },

  methods: {
    async login(){
      await this.$api.hotelList.syncCheckcode()

      let params = {
          accountCode : 'sz2747',
          username    : 'ch',
          password    : '1',
          checkcode   : '8998',
          rememberMe  : false
      }

      let res_login = await this.$api.hotelList.syncLogin(params)
      sessionStorage.setItem('login__login', +new Date)
      window.location.reload(true);
    },

    async logout(){
      let res_logout = await this.$api.hotelList.syncLogout()
      sessionStorage.removeItem('login__login')
      this.login()
    },
  },

  created(){
    let state = sessionStorage.getItem('jlfzg__state')
    
    if(state){
      this.$store.commit('hotelList/initState', window.JSON.parse(state))
      sessionStorage.removeItem('jlfzg__state')
    }

    let timeStamp = +sessionStorage.getItem('login__login')
    if(!timeStamp){
      this.login()
    }else{
      if(+new Date > timeStamp + 1000){   // 60 * 60 * 
        this.logout()
      }
    }
  },
  
}
</script>

<style lang="scss">
body{
  background: #f6f6f6!important;
}
</style>
