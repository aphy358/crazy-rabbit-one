<!-- 顶部面包屑 -->
<template>
  <div class="top-nav-wrap">
    <div class="top-nav-inner">
        {{cityTypeText}}酒店
        <template v-if="hotelName">
           > <span class="hotel-name">{{hotelName}}</span>
        </template>
    </div>
  </div>
</template>

<script>
export default {
  name: 'breadcrumb',
  props: ['hotelName', 'cityTypeText'],
}
</script>

<style scoped lang="scss">
.top-nav-wrap{
    position: relative;
    font-size: 14px;
    background: white;
    height: 30px;
    line-height: 30px;
    box-shadow: 0 0 5px #ddd;

    @at-root .top-nav-inner{
        color: #666666;
        width: 1200px;
        margin: auto;

        @at-root .fzg-blue{
            color: #339afc;
        }

        @at-root .hotel-name{
            color: #339afc;
        }
    }
}
</style>
