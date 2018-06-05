<!-- 酒店选择面板 -->
<template>
    <section>
        <!-- 酒店关键字模板城市部分 -->
        <div v-if="cityList.length > 0">
            <div class="kwh-block-title">城市</div>
            <ul class="kwh-block-content-list city">
                <% for(var i = 0; i < dataList.length; i++){ var o = dataList[i]; %>
                <li class="kwh-block-content-item city" data-cityname="<%= o.aname %>" data-citytype="<%= o.type %>" data-cityid="<%= o.cityid %>" data-track="公共_关键字_酒店面板_城市项">     
                    <%= o.cityStr %>
                    <span class="area"><%= o.countryName %></span>
                    <span class="area"><%= o.provinceName %></span>
                </li>
                <% } %>
            </ul>
        </div>

        <!-- 酒店关键字模板酒店名称部分 -->
        <div>
            <div class="kwh-block-title">酒店</div>
            <ul class="kwh-block-content-list hotel">
                <% for(var i = 0; i < dataList.length; i++){ var o = dataList[i]; %>
                <li class="kwh-block-content-item hotel">
                    <a href="<%= o.link %>" target="_blank" data-hotelid="<%= o.id %>">
                        <span class="kwh-hotel-name"><%= o.hotelStr %></span>
                        <span class="area"><%= o.countryName %></span>
                        <span class="area"><%= o.provinceName %></span>
                        <span class="area"><%= o.cityName %></span>
                    </a>
                </li>
                <% } %>
            </ul>
        </div>
    </section>
</template>

<script>

export default {
  name: 'HotelSelectPanel',
  data(){
    return {
    }
  },
  props: {
    hotelList: {},
    cityList: {},
  },
  computed: {
    
  },
  components: {
  }
}
</script>

<!-- 覆盖 element 原有样式，注意这里不能用 scoped 限定作用域 -->
<style lang="scss">

</style>

<style lang="scss">

// 城市关键字选择面板
.key-word-hotel-wrap{
    position: absolute;
    font-size: 14px;
    color: #333333;
    background: white;
    box-shadow: 0 1px 5px #ababab;
    overflow: hidden;
    z-index: 9999;

    @at-root .kwh-inner{
        min-width: 350px;
        margin: 20px;

        @at-root .kwh-no-content{
            color: red;
            font-size: 16px;
            text-align: center;
        }

        @at-root .kwh-block{

            @at-root .kwh-block-title{
                color: #339afc;
                font-size: 15px;
                border-bottom: solid 1px #339afc;
                font-weight: bold;
            }
    
            @at-root .kwh-block-content-list{
                font-size: 14px;
                margin: 10px 0;

                @at-root .kwh-block-content-item{
                    line-height: 25px;
                    cursor: context-menu;

                    a{
                        display: block;
                        text-decoration: none;
                        color: #333;
                    }

                    &:hover{
                        background: #cce3ff;
                    }

                    .key{
                        color: orange;
                    }

                    .area{
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