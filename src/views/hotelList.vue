<template>
    <div class="hotelList">
        <Breadcrumb />
        <SearchLine />
        <AdvancedSearch />
        <SubSearchLine />
        <NoHotels v-if="pageRecordCount == 0" />
        <HotelList />
        <Pagination />

        <input 
          v-model="checkcode"
          style="position: absolute;top: 180px;left: 50px;height: 30px;border: 1px solid;padding-left: 10px;"/>

        <img class="yzm-img" 
          @click="login"
          style="position: absolute;top: 100px;left: 50px;"
          src="/user/getCheckcodeImg.do?time=" alt="">

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
      checkcode: '',
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
      let params = {
          accountCode : 'sz2747',
          username    : 'ch',
          password    : '1',
          checkcode   : this.checkcode,
          rememberMe  : false
      }

      let res_login = await this.$api.hotelList.syncLogin(params)
      console.log(res_login);
    },
  },

  created(){
    let state = sessionStorage.getItem('jlfzg__state')
    
    if(state){
      this.$store.commit('hotelList/initState', window.JSON.parse(state))
      sessionStorage.removeItem('jlfzg__state')
    }
  },
  
}
</script>

<style lang="scss">
body{
  background: #f6f6f6!important;
}
</style>
