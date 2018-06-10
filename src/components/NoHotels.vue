
<!-- 没有查询到符合您要求的酒店 -->
<template>
    <div class="hotel-list-auto-hide">
      <div class="hotel-list-no-data">
        <i class="hlnd-icon"></i>
        <p class="hlnd-span1">很抱歉，没有查询到符合您要求的酒店</p>
        <p class="hlnd-span2">建议您适当调整已选择的条件</p>
      </div>

      <div class="pianxin-tuijian">
        <i class="pianxin-icon"></i>
        <span>您可能对如下酒店感兴趣</span>
      </div>
    </div>
</template>

<script>
export default {}
</script>

<style scoped lang="scss">
@import "../assets/jl_sprites.scss";

.hotel-list-auto-hide{

    @at-root .hotel-list-no-data{
        overflow: hidden;
        width: 405px;
        margin: 40px auto;
        color: #666;
    
        @at-root .hlnd-icon{
            @include jl_sprites;
            @include meiyoujiudian;
    
            float: left;
            margin-right: 30px;
        }
    
        @at-root .hlnd-span1{
            font-size: 16px;
            padding: 27px 0 10px;
        }
    
        @at-root .hlnd-span2{
    
        }
    }

    @at-root .pianxin-tuijian{
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
        overflow: hidden;

        @at-root .pianxin-icon{
            @include jl_sprites;
            @include pianxin;
    
            float: left;
            margin-right: 10px;
            margin-top: -3px;
        }
    }
}
</style>