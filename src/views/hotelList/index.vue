<template>
    <div class="hotelList">
        <Breadcrumb :cityTypeText="cityTypeText" />
        <SearchLine />
        <AdvancedSearch />
        <SubSearchLine />
        <NoHotels v-if="pageRecordCount == 0" />
        <HotelList />
        <Pagination @changePage="changePage" :pageNow="pageNowFake" :pageTotal="pageTotal" />
        <Sidebar/>
    </div>
</template>

<script>
import Breadcrumb from '../../components/Breadcrumb'
import SearchLine from './SearchLine'
import AdvancedSearch from './AdvancedSearch'
import SubSearchLine from './SubSearchLine'
import NoHotels from './NoHotels'
import HotelList from './HotelList'
import Pagination from '../../components/Pagination'
import Sidebar from '../../components/Sidebar'

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
    Sidebar,
  },

  computed: {
    pageNowFake() {
      return +this.$store.state.hotelList.pageNowFake
    },

    pageTotal() {
      return +this.$store.state.hotelList.pageTotal
    },

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
    changePage($event){
      this.$store.dispatch("hotelList/actionHotelList", {t: 'pageNowFake', v: $event});
      this.$store.dispatch("hotelList/actionHotelList", {t: 'pageNow', v: $event, api: this.$api});
    }
  },

  created(){
    let initialHotelListParams = sessionStorage.getItem("initialHotelListParams")
    if(initialHotelListParams){
      initialHotelListParams = window.JSON.parse(initialHotelListParams)

      this.$store.commit('setCommonState', {t: 'checkin', v: initialHotelListParams.checkin})
      this.$store.commit('setCommonState', {t: 'checkout', v: initialHotelListParams.checkout})
      this.$store.commit('setCommonState', {t: 'adultNum', v: initialHotelListParams.adultNum})
      this.$store.commit('setCommonState', {t: 'childrenNum', v: initialHotelListParams.childrenNum})
      this.$store.commit('setCommonState', {t: 'childrenStr', v: initialHotelListParams.childrenStr})
      this.$store.commit('setCommonState', {t: 'roomNum', v: initialHotelListParams.roomNum})
      this.$store.commit('setCommonState', {t: 'cityType', v: initialHotelListParams.cityType})
      
      this.$store.commit('hotelList/setCommonState', {t: 'keyword', v: initialHotelListParams.keyword})
      this.$store.commit('hotelList/setCommonState', {t: 'cityId', v: initialHotelListParams.cityId})
      this.$store.commit('hotelList/setCommonState', {t: 'checkedConfirmType', v: initialHotelListParams.checkedConfirmType})
      this.$store.commit('hotelList/setCommonState', {t: 'checkedPriceRange', v: initialHotelListParams.checkedPriceRange})
      this.$store.commit('hotelList/setCommonState', {t: 'checkedStar', v: initialHotelListParams.checkedStar})
    }
  }
  
}
</script>

<style lang="scss">
body{
  background: #f6f6f6!important;
}
</style>
