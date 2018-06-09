
<!-- 酒店列表页高级搜索 -->
<template>
    <div>
        <div class="advanced-search-wrap">
            <div class="a-s-inner">
                <div class="a-s-row">
                    <label class="a-s-label">位置区域</label>
                    <el-button type="primary" size="mini" class="no-limit">不限</el-button>
                    <el-collapse accordion :value="collapseValue1" @change="collapseChange($event, 'collapseValue1')">
                        <el-collapse-item>
                            <template slot="title">
                                <span class="a-s-item-wrap">行政区</span>
                            </template>
                            <el-checkbox-group class="a-s-zone-biz-list" v-model="checkedZone">
                                <el-checkbox v-for="zone in zoneList" :label="zone.zoneid" :key="zone.zoneid" class="a-s-item">{{zone.name}}</el-checkbox>
                            </el-checkbox-group>
                        </el-collapse-item>
                        <el-collapse-item>
                            <template slot="title">
                                <span class="a-s-item-wrap">商业圈</span>
                            </template>
                            <el-checkbox-group class="a-s-zone-biz-list" v-model="checkedBizzone">
                                <el-checkbox v-for="bizzone in bizzoneList" :label="bizzone.bizzoneid" :key="bizzone.bizzoneid" class="a-s-item">{{bizzone.description}}</el-checkbox>
                            </el-checkbox-group>
                        </el-collapse-item>
                    </el-collapse>
                </div>
            
                <div class="a-s-row">
                    <label class="a-s-label">价格区间</label>
                    <el-button type="primary" size="mini" class="no-limit">不限</el-button>
                    <el-radio-group v-model="checkedPriceRange">
                        <el-radio label="0-199_200元以下">200元以下</el-radio>
                        <el-radio label="200-299_200-300元">200-300元</el-radio>
                        <el-radio label="300-499_300-500元">300-500元</el-radio>
                        <el-radio label="500-799_500-800元">500-800元</el-radio>
                        <el-radio label="800-1499_800-1500元">800-1500元</el-radio>
                        <el-radio label="1500-2999_1500-3000元">1500-3000元</el-radio>
                        <el-radio label="3000-29999_3000元以上">3000元以上</el-radio>
                    </el-radio-group>

                    <div class="search-item-price-wrap">
                        <input class="search-line-price" id="slp_1" value="" placeholder="最低价" title="最低价">
                        <i class="search-line-seperator"></i>
                        <input class="search-line-price" id="slp_2" value="" placeholder="最高价" title="最高价">
                    </div>

                    <span class="search-line-price-btn">确定</span>
                </div>
            
                <div class="a-s-row">
                    <label class="a-s-label">酒店等级</label>
                    <el-button type="primary" size="mini" class="no-limit">不限</el-button>
                    <el-checkbox-group v-model="checkedStar" :max="3">
                        <el-checkbox label="10,15,20,25_二星级及以下/经济" key="10,15,20,25">二星级及以下/经济</el-checkbox>
                        <el-checkbox label="30,35_三星级/舒适" key="30,35">三星级/舒适</el-checkbox>
                        <el-checkbox label="40,45_四星级/高档" key="40,45">四星级/高档</el-checkbox>
                        <el-checkbox label="50,55_五星级/豪华" key="50,55">五星级/豪华</el-checkbox>
                    </el-checkbox-group>
                </div>

                <el-collapse :value="collapseValue2" @change="collapseChange($event, 'collapseValue2')">
                    <el-collapse-item class="advanced-big-collapse">
                        <template slot="title">
                            <div class="a-s-expand-btn">
                                <div class="mask"></div>
                                高级搜索条件
                                <i class="slide-bar" :class="bigCollapseIcon"></i>
                            </div>
                        </template>

                        <div class="a-s-row">
                            <label class="a-s-label">确认时间</label>
                            <el-button type="primary" size="mini" class="no-limit">不限</el-button>
                            <!-- 该条件不用传到后台，是用作在前端筛选数据用的 -->
                            <el-checkbox-group v-model="checkedConfirmType" :max="2">
                                <el-checkbox label="XS-1_立即确认" key="XS-1">立即确认</el-checkbox>
                                <el-checkbox label="XS-2_60秒确认" key="XS-2">60秒确认</el-checkbox>
                                <el-checkbox label="XS-0_待查" key="XS-0">待查</el-checkbox>
                            </el-checkbox-group>
                        </div>

                        <div class="a-s-row">
                            <label class="a-s-label">可否取消</label>
                            <el-button type="primary" size="mini" class="no-limit">不限</el-button>
                            <!-- 该条件不用传到后台，是用作在前端筛选数据用的 -->
                            <el-checkbox-group v-model="checkedCancelType">
                                <el-checkbox label="canceltype-0_可取消" key="canceltype-0">可取消</el-checkbox>
                                <el-checkbox label="canceltype-1_不可取消" key="canceltype-1">不可取消</el-checkbox>
                            </el-checkbox-group>
                        </div>
                        
                        <div class="a-s-row">
                            <label class="a-s-label">酒店集团</label>
                            <el-button type="primary" size="mini" class="no-limit">不限</el-button>
                            <el-collapse :value="collapseValue3" @change="collapseChange($event, 'collapseValue3')">
                                <el-collapse-item>
                                    <template slot="title">
                                        <span class="a-s-item-wrap">酒店集团</span>
                                    </template>
                                    <el-checkbox-group class="a-s-zone-biz-list" v-model="checkedHotelGroup1">
                                        <el-checkbox v-for="n in hotelGroup1" :label="n.id + '_' + n.groupname" :key="n.id" class="a-s-item">{{n.groupname}}</el-checkbox>
                                        <el-collapse-item class="hgroup-more-collapse" :value="collapseValue4" @change="collapseChange($event, 'collapseValue4')">
                                            <template slot="title">
                                                <span class="a-s-item-wrap hgroup-more-span">更多</span>
                                            </template>
                                            <el-checkbox-group class="a-s-zone-biz-list" v-model="checkedHotelGroup2">
                                                <el-checkbox v-for="n in hotelGroup2" :label="n.id + '_' + n.groupname" :key="n.id" class="a-s-item">{{n.groupname}}</el-checkbox>
                                            </el-checkbox-group>
                                        </el-collapse-item>
                                    </el-checkbox-group>

                                </el-collapse-item>
                            </el-collapse>
                        </div>
                        
                        <div class="a-s-row">
                            <label class="a-s-label">特殊要求</label>
                            <el-button type="primary" size="mini" class="no-limit">不限</el-button>
                            <el-collapse :value="collapseValue5" @change="collapseChange($event, 'collapseValue5')">
                                <el-collapse-item>
                                    <template slot="title">
                                        <span class="a-s-item-wrap">更多要求</span>
                                    </template>
                                    <el-checkbox-group class="a-s-zone-biz-list" v-model="checkedFacilities">
                                        <el-checkbox v-for="n in facilities" :label="n.optioncode + '_' + n.optionname" :key="n.optioncode" class="a-s-item">{{n.optionname}}</el-checkbox>
                                    </el-checkbox-group>
                                </el-collapse-item>
                            </el-collapse>
                        </div>
                    </el-collapse-item>
                </el-collapse>

                <div class="a-s-inner-mask"></div>
            </div>
        </div>

        <div class="advanced-search-selected-wrap">
            <ul class="a-s-s-list">
							<el-tag size="mini" v-if="checkedPriceRange !== ''" :key="checkedPriceRange" @close="closeTag(checkedPriceRange, 'checkedPriceRange')" closable>{{checkedPriceRange.split('_')[1]}}</el-tag>
							<el-tag size="mini" v-for="n of checkedStar" :key="n" @close="closeTag(n, 'checkedStar')" closable>{{n.split('_')[1]}}</el-tag>
							<el-tag size="mini" v-for="n of checkedConfirmType" :key="n" @close="closeTag(n, 'checkedConfirmType')" closable>{{n.split('_')[1]}}</el-tag>
							<el-tag size="mini" v-for="n of checkedCancelType" :key="n" @close="closeTag(n, 'checkedCancelType')" closable>{{n.split('_')[1]}}</el-tag>
							<el-tag size="mini" v-for="n of checkedHotelGroup1" :key="n" @close="closeTag(n, 'checkedHotelGroup1')" closable>{{n.split('_')[1]}}</el-tag>
							<el-tag size="mini" v-for="n of checkedHotelGroup2" :key="n" @close="closeTag(n, 'checkedHotelGroup2')" closable>{{n.split('_')[1]}}</el-tag>
							<el-tag size="mini" v-for="n of checkedFacilities" :key="n" @close="closeTag(n, 'checkedFacilities')" closable>{{n.split('_')[1]}}</el-tag>
						</ul>
            <button class="a-s-s-btn">清空条件</button>
        </div>
    </div>
</template>

<script>
import facilities from "./data/facilities.js";
import hotelGroup from "./data/hotelGroup.js";

export default {
  name: "",

  data() {
    return {
			bigCollapseIcon: "down",

      checkedPriceRange: '',
      checkedStar: [],
      checkedConfirmType: [],
      checkedCancelType: [],
      checkedZone: [],
      checkedBizzone: [],
      checkedHotelGroup1: [],
      checkedHotelGroup2: [],
      checkedFacilities: [],

			bizzoneList: [],
			zoneList: [],

			collapseValue1: '',
			collapseValue2: '',
			collapseValue3: '',
			collapseValue4: '',
			collapseValue5: '',
			
      facilities: facilities,
      hotelGroup1: hotelGroup.filter((n, i) => i < 20),
      hotelGroup2: hotelGroup.filter((n, i) => i >= 20),
    };
  },

  watch: {
    getCityId(newId) {
      if (newId) {
        this.getZoneData({ cityid: newId })
      } else {
        this.bizzoneList = []
        this.zoneList = []
      }
		},
		
		getCityType(newValue){

			this.bigCollapseIcon = 'down'

      this.checkedPriceRange = ''
      this.checkedStar = []
      this.checkedConfirmType = []
      this.checkedCancelType = []
      this.checkedZone = []
      this.checkedBizzone = []
      this.checkedHotelGroup1 = []
      this.checkedHotelGroup2 = []
			this.checkedFacilities = []
			
			this.collapseValue1 = ''
			this.collapseValue2 = ''
			this.collapseValue3 = ''
			this.collapseValue4 = ''
			this.collapseValue5 = ''

			this.bizzoneList = []
			this.zoneList = []
		}
  },

  props: {},

  components: {},

  computed: {
    getCityId() {
      return this.$store.state.hotelList.cityId
		},
		
		getCityType(){
      return this.$store.state.hotelList.cityType
		}
  },

  methods: {
    handleStarChange() {},

    handleConfirmTypeChange() {},

    handleCancelTypeChange() {},

    // 查酒店列表
    async getZoneData(param) {
      let res_ZoneData = await this.$api.hotelList.syncGetZone(param);

      if (res_ZoneData.returnCode === 1 && res_ZoneData.data) {
        this.bizzoneList = res_ZoneData.data.bizzoneList
        this.zoneList = res_ZoneData.data.zoneList
      }
    },

		// 点击 tag 的删除按钮
		closeTag(value, type){
			let index = this[type].indexOf(value)
			if(index != -1){
				type === 'checkedPriceRange'
					? this.checkedPriceRange = ''
					: this[type].splice(index, 1)
			}
		},

		// 切换折叠面板的收缩状态
		collapseChange(value, type){
			this[type] = value

			// 切换 '高级搜索条件' 后面上下三角的状态
			if(type === 'collapseValue2'){
				this.bigCollapseIcon = this.bigCollapseIcon === "down" ? "up" : "down"
			}
		}
  }
};
</script>

<style lang="scss">
.advanced-search-wrap {
  .no-limit {
    &.el-button--mini,
    &.el-button--mini.is-round {
      letter-spacing: 2px;
      padding: 6px 10px;
      font-size: 14px;
      margin-right: 30px;
    }
  }

  .el-checkbox-group {
    display: inline-block;
    line-height: 1;
    vertical-align: middle;
    font-size: 0;

    &.a-s-zone-biz-list {
      display: block;
    }
  }

  .el-radio,
  .el-checkbox {
    min-width: 100px;
    margin-left: 0;
    margin-right: 10px;

    + .el-radio,
    + .el-checkbox {
      margin-left: 0;
    }

    .el-radio__label,
    .el-checkbox__label {
      padding-left: 4px;
    }
  }

  .el-collapse {
    border-top: none;
    border-bottom: none;
  }

  .advanced-big-collapse {
    > div[aria-controls] {
      position: absolute;
      width: 100%;
      bottom: 0;
      left: 0;

      .el-collapse-item__header {
        height: auto;
        line-height: 1;
        left: 50%;

        .el-collapse-item__arrow {
          display: none;
        }
      }
    }
  }

  .el-collapse-item__header {
    position: absolute;
    top: 0;
    left: 160px;
    line-height: 45px;
    height: 45px;
    border-bottom: none;
    padding-left: 10px;

    &.is-active {
      box-shadow: 0 0 5px #b4cefd;
      background: #f1f6ff;
      height: 45px;
    }
  }

  .hgroup-more-collapse {
    float: left;

    .el-checkbox-group.a-s-zone-biz-list {
      margin: 0;
      padding: 0;
    }

    .el-collapse-item__header {
      left: 1118px !important;
      background: transparent;
      color: #339afc;

      &.is-active {
        box-shadow: none;
      }
    }
  }

  .el-collapse-item__arrow {
    line-height: 45px;
  }

  .el-collapse-item:last-child {
    margin-bottom: 0;

    .el-collapse-item__header {
      left: 260px;
    }
  }

  .el-collapse-item:first-child {
    .el-collapse-item__header {
      left: 160px;
    }
  }

  .el-collapse-item__wrap {
    position: relative;
    border-bottom: none;
  }

  .el-collapse-item__content {
    padding-bottom: 0;
  }
}
</style>

<style scoped lang="scss">
@import "../../assets/jl_sprites.scss";

.advanced-search-wrap {
  position: relative;
  width: 1200px;
  font-size: 14px;
  margin: 20px auto 30px;
  background: white;

  @at-root .a-s-inner {
    padding: 0 10px;
    box-sizing: border-box;
    box-shadow: 0 0 5px #dadada;

    @at-root .a-s-row {
      position: relative;
      line-height: 45px;
      border-bottom: dashed 1px #e3e3e3;

      @at-root .a-s-label {
        float: left;
        color: #999;
        margin-right: 30px;
      }

      @at-root .a-s-item {
        position: relative;
        min-width: 100px;
        margin-right: 10px;
        display: inline-block;

        @at-root span.a-s-item-wrap {
          padding-right: 5px;
        }

        @at-root .a-s-zone-biz-list {
          background: #f1f6ff;
          box-shadow: 0 0 5px #b4cefd;
          padding: 10px 0 10px 10px;
          margin-left: 90px;
          margin-bottom: 10px;

          &::after {
            content: "";
            display: block;
            clear: both;
          }

          .el-checkbox {
            float: left;
            width: 206px;
            line-height: 26px;
          }
        }
      }

      @at-root .search-item-price-wrap {
        position: absolute;
        top: 5px;
        right: 20px;
        height: 35px;
        line-height: 35px;
        border: solid 1px #cae0f5;
        box-sizing: border-box;
        background: white;
        transition: all 0.2s linear 0s;

        &.move-left {
          right: 65px;
        }

        &:hover,
        &:active,
        &:focus {
          border-color: rgb(100, 191, 224);
          box-shadow: 0 0 5px rgb(100, 191, 224);
        }

        @at-root input.search-line-price {
          float: left;
          padding: 0 10px;
          width: 45px;
          height: 33px;
          line-height: 35px;
          border: none;
        }

        @at-root .search-line-seperator {
          float: left;
          display: inline-block;
          height: 20px;
          border-right: solid 1px #ccc;
          margin-top: 7px;
        }
      }

      @at-root .search-line-price-btn {
        display: none;
        float: right;
        border: none;
        padding: 0 10px;
        border-radius: 5px;
        cursor: context-menu;
        background: #339afc;
        color: white;
        line-height: 26px;
        margin-top: 10px;
        transition: all 0.2s linear;

        &:hover {
          background: #216baf;
        }
      }
    }

    @at-root .a-s-inner-mask {
      position: absolute;
      bottom: 0;
      width: 1180px;
      height: 1px;
      background: white;
    }
  }

  @at-root .a-s-expand-btn {
    position: absolute;
    width: 120px;
    left: 50%;
    margin-left: -60px;
    padding: 3px 0;
    font-size: 12px;
    color: #339afc;
    text-align: center;
    background: white;
    box-shadow: 0 0 5px #dadada;
    border-bottom-left-radius: 3px;
    border-bottom-right-radius: 3px;

    .mask {
      position: absolute;
      width: 100%;
      height: 3px;
      top: -3px;
      left: 0;
      background: white;
    }

    @at-root .slide-bar {
      @include jl_sprites;
      position: relative;
      display: inline-block;
      margin-left: 5px;
      top: -1px;

      &.down {
        @include triangle_blue_down;
      }

      &.up {
        @include triangle_blue_up;
      }
    }
  }
}

.advanced-search-selected-wrap {
  width: 1200px;
  margin: auto;
  min-height: 1px;

  &:after {
    content: "";
    display: block;
    clear: both;
  }

  @at-root .a-s-s-list {
    @at-root .a-s-s-item {
      float: left;
      margin-right: 10px;
      height: 20px;
      line-height: 19px;
      border: solid 1px #ccc;
      background: white;
      box-sizing: border-box;

      span {
        margin: 0 10px;
      }

      .delete-icon {
        @include jl_sprites;
        @include delete_r1;
        float: right;
        margin-right: 5px;
        margin-top: 2px;
      }

      &:hover {
        border: solid 1px #fea925;

        .delete-icon {
          @include delete_r2;
        }
      }
    }
  }

  @at-root .a-s-s-btn {
    border: none;
    line-height: 20px;
    background: none;
    color: #339afc;
    transition: all 0.2s linear 0s;

    &:hover {
      text-shadow: 0 0 1px;
    }
  }
}
</style>