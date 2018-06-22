<!-- 酒店选择面板 -->
<template>
    <section class="kwh-inner">
        <!-- 酒店关键字模板城市部分 -->
        <div v-if="cityList.length > 0">
            <div class="kwh-block-title">城市</div>
            <ul class="kwh-block-content-list city">
                <li v-for="city of cityList" :key="city.cityid" 
                  @click="checkOneCity(city.type, city.cityid, city.aname)"
                  class="kwh-block-content-item city" >
                    <span v-html="city.cityStr"></span>
                    <span class="area">{{city.countryName}}</span>
                    <span class="area">{{city.provinceName}}</span>
                </li>
            </ul>
        </div>

        <!-- 酒店关键字模板酒店名称部分 -->
        <div v-if="hotelList.length > 0">
            <div class="kwh-block-title">酒店</div>
            <ul class="kwh-block-content-list hotel">
                <li v-for="hotel of hotelList" :key="hotel.id"
                  class="kwh-block-content-item hotel">
                    <a href="#" target="_blank" :hotelid="hotel.id">
                        <span class="kwh-hotel-name" v-html="hotel.hotelStr"></span>
                        <span class="area">{{hotel.countryName}}</span>
                        <span class="area">{{hotel.provinceName}}</span>
                        <span class="area">{{hotel.cityName}}</span>
                    </a>
                </li>
            </ul>
        </div>

        <!-- 酒店关键字模板酒店名称部分 -->
        <div v-if="cityList.length <= 0 && hotelList.length <= 0">
            <p class="kwh-no-content" style="color: red; display: block;">无相关城市/酒店</p>
        </div>
    </section>
</template>

<script>
import { setHistory } from "../util.js";

export default {
  name: "HotelSelectPanel",

  data() {
    return {};
  },

  props: ['hotelList', 'cityList'],

  computed: {},
  
  methods: {
    checkOneCity(t, i, n){
      this.$emit('pickvalue', {t, i, n})
      setHistory(t, i, n)
    }
  }
};
</script>

<!-- 覆盖 element 原有样式，注意这里不能用 scoped 限定作用域 -->
<style lang="scss">
.key {
  color: orange;
}
</style>

<style scoped lang="scss">
// 城市关键字选择面板
.key-word-hotel-wrap {
  position: absolute;
  font-size: 14px;
  color: #333333;
  background: white;
  box-shadow: 0 1px 5px #ababab;
  overflow: hidden;
  z-index: 9999;

  @at-root .kwh-inner {
    min-width: 350px;
    margin: 20px;

    @at-root .kwh-no-content {
      color: red;
      font-size: 16px;
      text-align: center;
    }

    @at-root .kwh-block {
      @at-root .kwh-block-title {
        color: #339afc;
        font-size: 15px;
        border-bottom: solid 1px #339afc;
        font-weight: bold;
      }

      @at-root .kwh-block-content-list {
        font-size: 14px;
        margin: 10px 0;

        @at-root .kwh-block-content-item {
          line-height: 25px;
          cursor: context-menu;

          a {
            display: block;
            text-decoration: none;
            color: #333;
          }

          &:hover {
            background: #cce3ff;
          }

          .area {
            color: #aaa;
            float: right;
            margin-left: 10px;
          }
        }
      }
    }
  }
}
</style>