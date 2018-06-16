<!-- 城市选择面板 -->
<template>
    <!-- 城市关键字模板 -->
    <section class="key-word-city-wrap">
        <div class="kwc-inner">
            <div v-if="historyCity" class="kwc-history">
                <div class="kwc-history-title">
                    <span>历史搜索</span>
                    <button class="kwc-history-clear" @click="clearCityHistory">清空</button>
                </div>
                <ul class="kwc-city-block">
									<li v-for="city in historyCity" :key="city.cityid" class="kwc-city-item" @click="pickvalue({t: city.citytype, i: city.cityid, n: city.cityname})">{{city.cityname}}</li>
								</ul>
            </div>

            <!-- 港澳台城市 -->
            <div v-show="getCityType == 2" class="kwc-block-outer">
              <CityListTmpl :cityList="cityList_gat" :blockKey="getKey" @pickvalue="pickvalue($event)" />
            </div>
            
            <!-- 国外城市 -->
            <div v-show="getCityType == 3" class="kwc-block-outer">
              <CityListTmpl :cityList="cityList_external" :blockKey="getKey" @pickvalue="pickvalue($event)" />
            </div>

            <!-- 国内城市 -->
            <div v-show="getCityType == 0" class="kwc-block-outer">
              <CityListTmpl :cityList="cityList_internal" :blockKey="getKey" @pickvalue="pickvalue($event)" />
            </div>
        </div>
    </section>
</template>

<script>
import CityListTmpl from './CityListTmpl'
import cityList_internal from './data/internalCity.js'
import cityList_gat from './data/gatCity.js'
import cityList_external from './data/externalCity.js'

export default {
  name: 'CitySelectPanel',

  data(){
    return {
      cityList_internal: cityList_internal,
      cityList_gat: cityList_gat,
			cityList_external: cityList_external,
			historyCity: null,
    }
  },

  props: [],

  computed: {
    getKey(){
      return this.$store.state.hotelList.cityType == 2 ? '港澳台' : '热门'
    },

    getCityType(){
			let cityType = this.$store.state.hotelList.cityType
			this.getHistoryCity(cityType)

      return cityType
		},
		
  },

  components: {
    CityListTmpl
  },

  methods: {
    pickvalue(event){
			console.log(event);
			
      this.$emit('pickvalue', event)
    },

		// 清空历史选择的城市
		clearCityHistory(){
			localStorage.removeItem('kwcHistory')
			this.historyCity = null
		},

		getHistoryCity(cityType){
			let kwcHistory = localStorage.getItem('kwcHistory')

			this.historyCity = kwcHistory
				? window.JSON.parse( kwcHistory )[cityType]
				: null
		}
		
  },

  created(){
  }
}
</script>

<!-- 覆盖 element 原有样式，注意这里不能用 scoped 限定作用域 -->
<style lang="scss">
</style>

<style lang="scss">
.key-word-city-wrap{
    font-size: 14px;
    min-width: 376px;
    min-width: 386px\9;
    background: white;
    box-shadow: 0 1px 5px #ababab;
    overflow: hidden;
    z-index: 9999;

    @at-root .kwc-inner{
        width: 530px;
        margin: 10px;

        @at-root .kwc-history{

            @at-root .kwc-history-title{
                color: #999;
                font-size: 12px;

                @at-root .kwc-history-clear{
                    border: none;
                    color: #339afc;
                    margin-left: 10px;

                    &:hover{
                        color: #1a6ab4;
                    }
                }
            }
        }

        @at-root .kwc-city-block{
            margin: 10px;
            overflow: hidden;

            @at-root .kwc-city-item{
                float: left;
                font-size: 12px;
                min-width: 60px;
                height: 25px;
                line-height: 25px;
                color: #333;
                margin-right: 5px;
                padding: 0 10px;
                cursor: context-menu;
                overflow: hidden;
            }
        }

        @at-root .kwc-block-outer{

            &[checked]{
                display: block;
            }
        }
    }
}
</style>