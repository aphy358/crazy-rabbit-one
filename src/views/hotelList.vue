<template>
    <div class="hotelList">
        <Breadcrumb :cityTypeText="cityTypeText" />
        <SearchLine />
        <AdvancedSearch />
        <SubSearchLine />
        <NoHotels v-if="pageRecordCount == 0" />
        <HotelList />
        <Pagination @changePage="changePage" :pageNow="pageNowFake" :pageTotal="pageTotal" />
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
  }
  
}
</script>

<style lang="scss">
body{
  background: #f6f6f6!important;
}
</style>
