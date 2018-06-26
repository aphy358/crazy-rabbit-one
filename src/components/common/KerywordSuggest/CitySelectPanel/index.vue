<!-- 城市选择面板 -->
<template>
    <!-- 城市关键字模板 -->
    <section class="key-word-city-wrap">
        <div class="kwc-inner">
            <div v-if="historyCity" class="kwc-history">
								<el-tag v-for="city in historyCity" :key="city.cityid" size="mini" 
									class="kwc-history-tag"
									@click.native="pickvalue({t: city.citytype, i: city.cityid, n: city.cityname})">
										{{city.cityname}}
								</el-tag>
								<el-button type="text" @click="clearCityHistory" class="clear-kwc-history-tag">清空</el-button>
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
import { setHistory } from "../../../util.js";
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
      return this.$store.state.cityType == 2 ? '港澳台' : '热门'
    },

    getCityType(){
			let cityType = this.$store.state.cityType
			this.getHistoryCity(cityType)

      return cityType
		},
		
  },

  components: {
    CityListTmpl
  },

  methods: {
    pickvalue(event){
			this.$emit('pickvalue', event)
			setHistory(event.t, event.i, event.n)
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
						margin-bottom: 5px;
						margin-top: 12px;

						@at-root .kwc-history-tag{
								margin: 0 10px 10px 0;
								cursor: pointer;
						}

						@at-root .clear-kwc-history-tag{
								&.el-button--text{
									color: #f56c6c;
									padding: 0;
	
									&:hover{
										color: #f56c6c;
										text-shadow: 0 0 1px;
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