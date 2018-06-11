
<!-- 关键字搜索栏 -->
<template>
    <div class="sub-search-line-wrap">
        <span>共搜索到<span class="ssl-hotel-num">0</span>家酒店符合条件</span>
        <div class="ssl-search-wrap">
            <el-input placeholder="请输入关键词" v-model="input5" size="small" clearable style="width:350px"
              @input="queryHotels">
              <el-button slot="append" icon="el-icon-search"></el-button>
            </el-input>
        </div>
    </div>
</template>

<script>
export default {
  name: '',

  data(){
    return {
      input5: '',
      hotelList: [],
    }
  },

  props: {
    
  },

  components: {

  },

  computed: {
    
  },
  
  methods: {
    async queryHotels(){
      let params = {
        cityId: this.$store.state.hotelList.cityId,
        type: this.$store.state.hotelList.cityType,
        keyWords: this.$store.state.hotelList.keyword,
        startDate: this.$store.state.hotelList.checkin,
        endDate: this.$store.state.hotelList.checkout,
        selRoomNum: this.$store.state.hotelList.roomNum,
        adultNum: this.$store.state.hotelList.adultNum,
        childrenNum: this.$store.state.hotelList.childrenNum,
        childrenAgesStr: this.$store.state.hotelList.childrenStr,
        pageNow: this.$store.state.hotelList.pageNow,
      }

      let res_HotelList = await this.$api.hotelList.syncGetHotelList(params);

      console.log(res_HotelList);
      

    }
  }
}
</script>

<style lang="scss">
.sub-search-line-wrap{
  .el-icon-search{
    font-size: 16px;
  }

  .el-input-group--append .el-input__inner,
  .el-input-group__prepend{
    border-radius: 0;
  }

  .el-input-group--prepend .el-input__inner,
  .el-input-group__append{
    border-radius: 0;
  }
}
</style>

<style scoped lang="scss">
@import "../assets/jl_sprites.scss";

.sub-search-line-wrap{
    font-size: 14px;
    width: 1200px;
    height: 50px;
    line-height: 30px;
    background: white;
    margin: 10px auto;
    padding: 10px 20px;
    box-sizing: border-box;
    box-shadow: 0 0 5px #dadada;
    font-size: 14px;

    @at-root .ssl-hotel-num{
        font-size: 20px;
        color: #fea925;
        margin: 0 2px;
    }

    @at-root .ssl-search-wrap{
        float: right;
    }
}
</style>