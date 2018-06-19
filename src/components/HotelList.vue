
<!-- 酒店列表页，酒店列表 -->
<template>
  <div class="hotel-list-outer">
    <ul class="hl-list">
      <li class="hl-item" v-for="o in hotelList" :key="o.infoId">
        <div class="hli-info-wrap">
          <div class="hli-img">
            <a href="#"  target="_blank">
              <img :src="o.picSrc" :style="o.extraStyle" />
            </a>
          </div>
          
          <div class="hli-info">
            <div class="hli-hotel-name-wrap">
              <a href="#"
                target="_blank">
                <h1 class="hli-hotel-name1">
                  {{o.infoName}}
                  <i class="hli-icon0 icon-star">
                    {{
                      ~('50,55'.indexOf( o.star )) ? '豪华型' :
                      ~('40,45'.indexOf( o.star )) ? '高档型' :
                      ~('30,35'.indexOf( o.star )) ? '舒适型' : '经济型'
                    }} 
                  </i>
                  <i class="hli-icon" :class="o.displayFlag === '1' ? ' icon-jinpai' : o.displayFlag === '2' ? ' icon-tuiguang' : ''"></i>
                </h1>
                <br>
                <h2 class="hli-hotel-name2">{{o.enName || ''}}</h2>
              </a>
            </div>
            
            <div class="hli-location">
              <label>位置：</label>
              <a title="map" class="hli-open-map" href="javascript:;" >
                <span class="hli-location-text">{{o.address.replace(/[： 。，！、:.!,]+$/g,'') || ''}}</span>
                <i class="hli-icon icon-location2"></i>
              </a>
            </div>
            
            <div class="hli-notice-wrap">
              <i class="hli-icon icon-notice"></i>
              <label>特别提示：</label>
              <el-popover placement="top-start"  width="300" trigger="hover" popper-class="price-table-tip">
                  <span class="hli-tip-style">{{o.indicate || '无'}}</span>
                  <span slot="reference" class="hli-notice-text" >{{o.indicate || '无'}}</span>
              </el-popover>
            </div>
          </div>
          
          <div class="hli-check-detail">
            <i class="hli-check-gz-icon" :class="o.isMyFavorite == 1 ? 'icon-gz-on' : 'icon-gz-off'"></i>
            <span class="hli-lowest-price-wrap" v-html="o.minPriceText"></span>
            <a target="_blank" href="#" style="position: absolute;right: 0;top: 75px;">
              <el-button type="primary" class="hli-check-detail-btn" size="small" plain style="font-size: 16px;padding: 9px;" icon="el-icon-document">
                查看详情
              </el-button>
            </a>
          </div>
        </div>

        <el-collapse >
            <el-collapse-item>
                <template slot="title">
                  <el-button type="text" class="hli-expand-wrap" size="small" style="font-size: 16px;padding: 9px;" 
                    :class="hotelsExpanded[o.infoId] && hotelsExpanded[o.infoId].fixTop && hotelsExpanded[o.infoId].expanded ? 'fix-top' : ''"
                    @click="clickExpand($event, o.infoId)">
                    {{hotelsExpanded[o.infoId] && hotelsExpanded[o.infoId].fixTop ? '收起全部房型' : '展开全部房型'}}
                  </el-button>
                </template>
                <div class="hli-price-list-outer">
                  <div class="progress-outer" v-if="o.percentage > 0">
                    <el-progress :text-inside="true" :stroke-width="18" :show-text=false
                      :percentage="o.percentage" 
                      :color="o.color"
                      ></el-progress>
                    <div style="position: absolute;top: 0;width: 100%;text-align: center;color: rgb(21, 169, 94);line-height: 18px;">正在查询最低价，请稍候...</div>
                  </div>
              
                  <div class="hli-price-list-wrap">
                    <div class="fzg-loading-wrap" v-if="!o.priceList">
                      <img src="https://qnb.oss-cn-shenzhen.aliyuncs.com/real_1514022140288.gif"/>
                    </div>

                    <PriceList v-if="o.priceList" :priceList="o.priceList" />
                  </div>
                </div>
            </el-collapse-item>
        </el-collapse>
      </li>
    </ul>
  </div>
</template>

<script>
import PriceList from "./PriceList";

export default {
  name: "",

  data() {
    return {
      hotelsExpanded: {}
    };
  },

  props: {},

  components: {
    PriceList
  },

  computed: {
    hotelList() {
      return this.$store.getters["hotelList/getHotelList"];
    }
  },

  methods: {
    // 点击 '展开全部房型'，并将被点击的按钮、被点击按钮最近的酒店所在元素、该酒店房价被展开状态存储到局部对象 hotelsExpanded 中
    clickExpand(e, hotelId) {
      let thatHotel = this.hotelsExpanded[hotelId];

      if (thatHotel) {
        // 如果数组 hotelsExpanded 中已经保存了该酒店相关的状态，则只要切换其展开状态即可
        thatHotel.expanded = !thatHotel.expanded;
        
        if(thatHotel.expanded){
          let top = thatHotel.hotelWrapper.getBoundingClientRect().top;
          if(top < 100){
            thatHotel.hotelWrapper.scrollIntoView(200)
          }
        }
      } else {
        // 如果数组 hotelsExpanded 中没有该酒店的数据，则新创建一条记录，存入该酒店最外围的 DOM、该酒店下 '展开全部房型' 按钮的 DOM ，
        // 初始状态设置为已经展开：expanded: true，初始固定顶部状态：fixTop: false
        let closestHotelItem;
        for (let i = 0; i < e.path.length; i++) {
          const o = e.path[i];
          if (
            ~Array.prototype.slice
              .call(o.classList)
              .join(",")
              .indexOf("hl-item")
          ) {
            closestHotelItem = o;
            break;
          }
        }

        this.hotelsExpanded[hotelId] = {
          expanded: true,
          elem: e.target,
          hotelWrapper: closestHotelItem,
          fixTop: false
        };
      }
    },

    onScroll() {
      for (const key in this.hotelsExpanded) {
        const o = this.hotelsExpanded[key]
        
        if(o.expanded){
          let hotelWrapper = o.hotelWrapper
          let rect = hotelWrapper.getBoundingClientRect();

          (rect.top < -150 && rect.bottom > 200)
            ? o.fixTop = true
            : o.fixTop = false;

          this.hotelsExpanded = Object.assign({}, this.hotelsExpanded)
        }
      }
    },

  },

  created() {
    // 根据页面滚动，将搜索栏固定在页面顶部
    window.addEventListener("scroll", this.onScroll);
  }
};
</script>


<style lang="scss">
.hotel-list-outer {
  .el-collapse {
    position: relative;
    border-top: none;
    border-bottom: none;
  }

  .el-collapse-item__header {
    height: 35px;
    line-height: 35px;
    position: absolute;
    right: 18px;
    top: -58px;
    border-bottom: none;
  }

  .el-collapse-item__arrow {
    position: relative;
    line-height: 35px;
    margin-right: 0;
    margin-left: -8px;
    color: #409eff;
  }

  .el-button [class*="el-icon-"] + span {
    margin-left: 0;
  }

  .el-collapse-item:last-child {
    margin-bottom: 0px;
  }
}
</style>

<style scoped lang="scss">
@import "../assets/jl_sprites.scss";

.hotel-list-outer {
  min-height: 200px;

  @at-root .hl-list {
    width: 1200px;
    margin: auto;

    @at-root .hl-item {
      background: white;
      margin: 20px 0;
      box-sizing: border-box;
      box-shadow: 0 0 5px #e8e8e8;

      @at-root .hli-info-wrap {
        font-size: 15px;
        padding: 20px;

        > * {
          float: left;
          height: 160px;
        }

        &:after {
          content: "";
          display: block;
          clear: both;
        }

        @at-root .hli-img {
          width: 280px;
          overflow: hidden;

          img {
            float: left;
            width: 100%;
            min-height: 100%;
          }
        }

        @at-root .hli-info {
          width: 700px;
          margin: 0 20px;

          @at-root .hli-hotel-name-wrap {
            a {
              text-decoration: none;
            }

            @at-root .hli-hotel-name1 {
              display: inline-block;
              font-weight: normal;
              font-size: 20px;
              color: #339afc;
            }

            @at-root .hli-hotel-name2 {
              display: inline-block;
              color: #666666;
              font-weight: normal;
            }
          }

          @at-root .hli-location {
            margin: 30px 0 20px;

            label {
            }

            @at-root .hli-location-text {
              color: #333333;
              text-decoration: underline;
              margin-right: 5px;
            }
          }

          @at-root .hli-notice-wrap {
            > * {
              float: left;
            }

            &:after {
              content: "";
              display: block;
              clear: both;
            }

            label {
              color: black;
              font-weight: bold;
              margin-left: 5px;
            }

            @at-root .hli-notice-text {
              display: inline-block;
              width: 590px;
              height: 22px;
              cursor: context-menu;

              text-overflow: ellipsis;
              white-space: nowrap;
              overflow: hidden;
            }
          }
        }

        @at-root .hli-check-detail {
          float: right;
          position: relative;
          width: 130px;

          @at-root .hli-check-gz-icon {
            position: absolute;
            top: 0;
            right: 0;
          }

          @at-root .hli-lowest-price-wrap {
            position: absolute;
            top: 30px;
            right: 0;
            width: 280px;
            color: red;
            font-size: 16px;
            text-align: right;

            @at-root .hli-lowest-price {
              font-size: 26px;
              margin: 0 2px;
            }
          }

          @at-root .hli-check-detail-btn {
          }

          .icon-gz-off {
            @include jl_sprites;
            @include gz4;
          }

          .icon-gz-on {
            @include jl_sprites;
            @include gz3;
          }
        }
      }

      @at-root .progress-outer {
        position: relative;
        box-shadow: 0 0 5px #e8e8e8;
        border: solid 1px #e8e8e8;
        margin: 0 20px 10px;
        border-radius: 10px;
        overflow: hidden;
      }

      @at-root .hli-price-list-outer {
        @at-root .hli-price-list-wrap {
          margin: 0 20px;
          overflow: hidden;

          @at-root .fzg-loading-wrap {
            max-width: 1200px;
            margin: auto;
            padding: 15px 0;
            border-top: solid 1px #ddd;
            background: white;

            img {
              display: block;
              margin: auto;
            }
          }
        }
      }

      @at-root .hli-expand-wrap {
        transition: 0s;

        &.fix-top{
          position: fixed;
          top: 80px;
          color: #fff;
          background-color: #409EFF;
          left: 50%;
          margin-left: 620px;

          &:hover{
            background: #66b1ff;
          }
        }
      }
    }
  }

  @at-root .hli-icon0 {
    margin-right: 5px;
  }

  @at-root .hli-icon {
    @include jl_sprites;
    display: inline-block;
    position: relative;

    @at-root .icon-star {
      position: relative;
      top: -2px;
      display: inline-block;
      font-size: 12px;
      font-style: normal;
      background: #7eb6ec;
      color: white;
      width: 50px;
      height: 18px;
      line-height: 18px;
      text-align: center;
      border-radius: 3px;
    }

    &.icon-jinpai {
      @include jinpai;
      top: 3px;
    }

    &.icon-tuiguang {
      @include tuiguang;
      top: 3px;
    }

    &.icon-location2 {
      @include location2;
      top: 3px;
    }

    &.icon-notice {
      @include specialNotice;
      top: 1px;
    }
  }
}
</style>