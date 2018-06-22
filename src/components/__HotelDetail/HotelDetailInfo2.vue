
<!-- 酒店详情页，第二部分酒店信息 -->
<template>
  <div class="hotel-detail-outer">
    <div class="hotel-detail-inner">
      <h1 class="hotel-detail-title">酒店详情</h1>
      <ul class="hotel-detail-list" v-if="hotelInfo">
        <li class="hotel-detail-item">
          <label class="hotel-detail-label">
            <i class="hli-icon icon-tebietixing"></i>
            特别提示
          </label>
          <p class="hotel-detail-content">{{hotelInfo.indicate || '无'}}</p>
        </li>
        <li class="hotel-detail-item">
          <label class="hotel-detail-label">
            <i class="hli-icon icon-lianxifangshi"></i>
            联系方式
          </label>
          <p class="hotel-detail-content">{{hotelInfo.bookingPhone|| ''}}</p>
        </li>
        <li class="hotel-detail-item">
          <label class="hotel-detail-label">
            <i class="hli-icon icon-jiudiansheshi"></i>
            酒店设施
          </label>
          <p class="hotel-detail-content">{{hotelInfo.facilities ? hotelInfo.facilities.split('|').join('、') : ''}}</p>
        </li>
        <li class="hotel-detail-item">
          <label class="hotel-detail-label">
            <i class="hli-icon icon-jiudianjianjie"></i>
            酒店简介
          </label>
          <p class="hotel-detail-content">{{hotelInfo.infoDesc || ''}}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: '',

  data(){
    return {
    }
  },

  computed: {
    hotelInfo: function(){
      return this.$store.getters["hotelDetail/getHotelInfo"];
    }
  },
}
</script>

<style scoped lang="scss">
.hotel-detail-outer{
    padding: 20px 0;
    background: white;
    
    @at-root .hotel-detail-inner{
        width: 1200px;
        margin: auto;
        
        @at-root .hotel-detail-title{
            padding-left: 10px;
            color: #666;
            height: 20px;
            line-height: 20px;
            border-left: solid 5px orange;
            font-size: 20px;
            font-weight: bold;
        }
        
        @at-root .hotel-detail-list{
            padding: 30px;
            
            @at-root .hotel-detail-item{
                margin-bottom: 20px;
                
                @at-root .hotel-detail-label{
                    font-size: 16px;
                    float: left;
                    line-height: 26px;
                    
                    .hli-icon{
                        float: left;
                        margin-right: 10px;
                    }
                }
                
                @at-root .hotel-detail-content{
                    font-size: 14px;
                    min-height: 26px;
                    line-height: 26px;
                    margin-left: 140px;
                    padding-bottom: 5px;
                    border-bottom: dashed 1px #e3e3e3;
                }
            }
        }
    }
}
</style>