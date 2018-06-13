<template>
    <div class="hotelList">
        <Breadcrumb />
        <SearchLine />
        <AdvancedSearch />
        <SubSearchLine />
        <NoHotels v-if="pageRecordCount == 0" />
        <HotelList />
        <Pagination />


        <div v-if="!user" style="    position: absolute;
    overflow: hidden;
    background: white;
    top: 100px;
    left: 50%;
    width: 400px;
    height: 260px;
    z-index: 9999;
    border: 1px solid;
    margin-left: -150px;
    padding-top: 100px;
    padding-left: 100px;">
          
          <img class="yzm-img" 
            style=""
            src="/user/getCheckcodeImg.do?time=" alt="">

          <input 
            v-model="checkcode"
            placeholder="输入验证码"
            style="height: 30px;border: 1px solid;padding-left: 10px;width:70px;margin: 20px;"/>

          <el-button type="primary" size="small" style="" @click="login" >
            登录
          </el-button>
        </div>

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
      user: null,
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

      this.user = res_login

      sessionStorage.setItem('user__user', JSON.stringify(res_login))
    },
  },

  created(){
    let state = sessionStorage.getItem('jlfzg__state')
    
    if(state){
      this.$store.commit('hotelList/initState', window.JSON.parse(state))
      sessionStorage.removeItem('jlfzg__state')
    }

    this.user = sessionStorage.getItem('user__user')
  },
  
}
</script>

<style lang="scss">
body{
  background: #f6f6f6!important;
}
</style>
