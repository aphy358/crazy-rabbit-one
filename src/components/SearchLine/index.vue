<!-- 酒店列表页和酒店详情页的搜索栏 -->
<template>
    <div class="search-line-outer">
        <div class="search-line-wrap">
						<CityTypeSelect :cityType="cityType" />

            <!-- <div class="search-item-wrap siw-hotel-list">
                <label class="s-i-label" for="s-i-keyword-input">城市/酒店</label>
                <input type="text" class="s-i-keyword-input" id="s-i-keyword-input" placeholder="" >
            </div>
        
            <div class="search-item-wrap">
                <label class="s-i-label" for="s-i-dates-input">入离日期</label>
                <input type="text" class="s-i-dates-input my-calendar-input" id="s-i-dates-input" placeholder="入住离店日期" title="入住离店日期" unselectable="on" readonly="readonly">            
            </div>
        
            <div class="drag-down-wrap">
                <div class="s-i-room-num" unselectable="on" data-value="1">1间</div>
                <i class="drag-down"></i>
            </div>
        
            <div class="drag-down-wrap s-i-adult-children-wrap">
                <input type="text" class="s-i-adult-children" value="2成人，0小孩" unselectable="on" readonly="readonly">
                <i class="drag-down"></i>
            </div>
        
            <button class="search-line-btn" >搜索</button> -->
        </div>
    </div>
</template>

<script>
import CityTypeSelect from './modules/CityTypeSelect';

export default {
  name: 'SearchLine',
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
		CityTypeSelect,
  }
}
</script>

<style scoped lang="scss">

.search-line-outer{

    &.fix-top{
        position: fixed;
        top: 0;
        width: 100%;
        min-width: 1400px;
        background: white;
        box-shadow: 0 0 10px #999;
        z-index: 9999;

        .search-line-wrap{
            margin: 10px auto;
            box-shadow: none;
        }
    }

    @at-root .search-line-wrap{
        width: 1200px;
        font-size: 15px;
        padding: 10px;
        margin: 20px auto;
        box-shadow: 0 0 5px #dadada;
        box-sizing: border-box;
        background: white;
    
        &:after{
            content: '';
            display: block;
            clear: both;
        }
    
        @at-root .search-item-wrap{
            height: 35px;
            line-height: 35px;
            float: left;
            margin-right: 20px;
            border: solid 1px #a9c2da;
            box-sizing: border-box;
            background: white;
            transition: all 0.2s linear 0s;
    
            &:hover,
            &:active,
            &:focus{
                border-color: rgb(100, 191, 224);
                box-shadow: 0 0 5px rgb(100, 191, 224);
            }
    
            @at-root .s-i-label{
                float: left;
                color: #999;
                line-height: 35px;
                padding-left: 10px;
                padding-right: 10px;
            }
    
            input{
                float: left;
                height: 33px;
                line-height: 35px;
                border: none;
                padding-left: 10px;
            }
    
            @at-root .s-i-keyword-input{
    
            }
    
            @at-root .s-i-dates-input{
                min-width: 190px;
            }
    
            &.error{
                border: 1px solid #f16f6f;
                box-shadow: 0 0 5px #f16f6f;
            }
        }
    
        .drag-down-wrap{
            float: left;
            margin-right: 20px;
    
            @at-root .s-i-room-num,
            input.s-i-adult-children,
            .s-i-city-type{
                width: 60px;
                height: 35px;
                line-height: 35px;
                font-size: 15px;
                border: solid 1px #a9c2da;
                border-radius: 0;
                transition: all 0.2s linear 0s;
    
                &:hover,
                &:active,
                &:focus{
                    border-color: rgb(100, 191, 224);
                    box-shadow: 0 0 5px rgb(100, 191, 224);
                }
            }
    
            @at-root .s-i-city-type{
                width: 75px;
            }
    
            @at-root input.s-i-adult-children{
                width: 130px;
            }
        }
    
        @at-root .search-line-btn{
            float: right;
            width: 80px;
            height: 35px;
            font-size: 16px;
            color: white;
            background: #339afc;
            border: none;
            border-radius: 5px;
            letter-spacing: 2px;
            margin-right: 10px;
            padding-left: 2px;
            transition: all 0.2s linear 0s;
    
            &:hover{
                background: #216baf;
            }
        }
    }
}
</style>