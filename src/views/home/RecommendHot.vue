
<!-- 热门推荐 -->
<template>
  <section class="index-recommend-hot-outer">
    <div class="i-r-t-inner">
      <div class="i-r-title">
        <div class="i-r-title-line"><i class="i-r-title-icon right"></i></div>
        <h1>热门推荐</h1>
        <div class="i-r-title-line"><i class="i-r-title-icon left"></i></div>
      </div>

      <div id="recommendHotWrap">
        
        <ul class="i-r-t-hotel-group">
          <li v-for="(o, i) in recommendHotList" :key="i" class="i-r-h-hotel-item">
            <a :href="'#/hotelDetail?' + o.adLink.split('?')[1]" target="_blank">
              <div class="irt-img-wrap">
                <img :src="o.adImg">
                <i class="irt-gz-icon"></i>
                <div class="irh-bottom-line-mask"></div>
                <div class="irh-bottom-line">
                  <b>{{o.adTitle}}</b>
                </div>
              </div>
            </a>
          </li>
        </ul>

        <!-- <div class="i-recommend-btn">
            <a class="bottom-one" style="display:none;">查看全部<i class="i-check-more-icon"></i></a>
        </div> -->

      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: '',

  data(){
    return {
      recommendHotList: [],
    }
  },

  props: {
    
  },

  components: {

  },

  computed: {
    
  },
  
  methods: {

  },

  created(){
    this.$api.home.syncGetCarouselList({ channel: 1, block: 1, pageSize: 6, }).then(res => {
      if( res.returnCode === 1 ){
        if( res.dataList && res.dataList.length ){
          res.dataList.forEach(data => {
            if(data.adImg)  data.adImg = data.adImg.replace(/^http:\/\/image.jladmin.cn/g, 'https://qnb.oss-cn-shenzhen.aliyuncs.com')
          });
          
          this.recommendHotList = res.dataList
        }
      }else if( res.returnCode === -400001 ){
      }
    })
  }
}
</script>

<style scoped lang="scss">
// 热门推荐

.index-recommend-hot-outer{
    background: white;
    margin-bottom: -20px;

    @at-root #recommendHotWrap{
        min-height: 570px;
    }

    @at-root .i-r-h-hotel-item{
        float: left;
        width: 386px;
        height: 220px;
        margin: 0 20px 20px 0;
        transition: all .2s linear;

        &:hover{
            box-shadow: 0 0 10px rgba(82, 80, 84, .9);
            transform: translate3d(-2px, -2px, 0)
        }

        @at-root .irh-bottom-line-mask{
            position: absolute;
            bottom: 0;
            left: 0;
            height: 50px;
            width: 100%;
            background: black;
            opacity: .6;
            filter: Alpha(opacity=60);

        }

        @at-root .irh-bottom-line{
            position: absolute;
            bottom: 0;
            left: 0;
            width: 365px;
            height: 50px;
            line-height: 50px;
            margin: 0 10px;
            transform: translateZ(0);

            b{
                color: white;
                font-size: 18px;
            }

            @at-root .irh-price-wrap{
                float: right;
                font-size: 12px;
                background: orange;
                color: white;
                height: 36px;
                line-height: 36px;
                border-radius: 5px;
                width: 100px;
                text-align: center;
                margin-top: 7px;
            }

            @at-root .irh-price-num{
                font-size: 20px;
            }
        }
    }
}
</style>