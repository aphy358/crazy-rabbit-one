<!-- 城市选择面板 -->
<template>
    <!-- 城市关键字模板 -->
    <section class="key-word-city-wrap">
        <div class="kwc-inner">
            <div class="kwc-history">
                <div class="kwc-history-title">
                    <span>历史搜索</span>
                    <button class="kwc-history-clear">清空</button>
                </div>
                <ul class="kwc-city-block"></ul>
            </div>

            <!-- 港澳台城市 -->
            <div v-if="cityType == 2" class="kwc-block-outer"><GATCity /></div>
            
            <!-- 国外城市 -->
            <div v-else-if="cityType == 3" class="kwc-block-outer"><ExternalCity /></div>

            <!-- 国内城市 -->
            <div v-else class="kwc-block-outer"><InternalCity /></div>
        </div>
    </section>
</template>

<script>
import InternalCity from './modules/InternalCity'
import ExternalCity from './modules/ExternalCity'
import GATCity from './modules/GATCity'

export default {
  name: 'CitySelectPanel',
  data(){
    return {
    }
  },
  props: {
    cityType: {
      default: 0,
    },
  },
  computed: {
    
  },
  components: {
    InternalCity,
    ExternalCity,
    GATCity
  }
}
</script>

<!-- 覆盖 element 原有样式，注意这里不能用 scoped 限定作用域 -->
<style lang="scss">

</style>

<style lang="scss">
.key-word-city-wrap{
    position: absolute;
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
            
            @at-root .kwc-block-title-list{
                border-bottom: solid 1px #339afc;
                margin-bottom: 10px;
                overflow: hidden;

                @at-root .kwc-block-title-item{
                    float: left;
                    color: #999;
                    font-size: 14px;
                    height: 25px;
                    line-height: 25px;
                    padding: 0 10px;
                    margin-right: 5px;
                    border-top-left-radius: 3px;
                    border-top-right-radius: 3px;
                    cursor: context-menu;

                    &:hover{
                        color: #339afc;
                    }

                    &[checked]{
                        color: white;
                        background: #339afc;
                    }
                }
            }

            @at-root .kwc-city-block-list{

                @at-root .kwc-city-block-item{
                    display: none;

                    &[checked]{
                        display: block;
                    }

                    @at-root .kwc-city-block-label{
                        position: relative;
                        top: 2px;
                        float: left;
                        color: #999;
                    }

                    @at-root .kwc-city-list{
                        margin-left: 20px;
                        overflow: hidden;

                        @at-root .kwc-city-item{

                            &:hover{
                                color: #339afc;
                            }
                        }
                    }
                }
            }
                   
        }
    }
}
</style>