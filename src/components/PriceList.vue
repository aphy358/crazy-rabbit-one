
<!-- 价格列表组件 -->
<template>
    <table class="hotel-price-table" v-if="newPriceList.combinedRows">
      <thead class="hotel-price-thead">
        <tr>
          <th width="65"></th>
          <th width="260"><span>房型</span></th>
          <th><span>价格类型</span></th>
          <th width="110" class="align-center"><span>床型/早餐</span></th>
          <th><span>预订规则</span></th>
          <th><span>取消规则</span></th>
          <th><span>剩余数量</span></th>
          <th width="150"><span>均价/总价</span></th>
          <th width="100"></th>
        </tr>
      </thead>

      <tbody class="hotel-price-tbody">
        <tr class="hotel-price-tr" v-for="(priceRow, i) in newPriceList.combinedRows" :key="i" :rowspan="priceRow.rowSpan">
          <td v-if="priceRow.rowSpan" class="first-td" :rowspan="priceRow.rowSpan">{{i === 0 ? '推荐' : '其他'}}</td>
          <td :class="priceRow.tdBindClass">
            <span class="hp-roomName" :class="priceRow.roomNameHide">
              {{priceRow.roomName}}
            </span>
          </td>
          <td>
            <span>{{priceRow.rateTypeName || ''}}</span>
            <i v-if="priceRow.isHasMarketing" class="marketing-icon"></i>
            <i v-if="priceRow.packageRequest" class="pagekage-icon"></i>
          </td>
          <td class="align-center">
            <p v-if="priceRow.bedTypeName"><span>{{ priceRow.bedTypeName.split('[')[0] }}</span></p>
            <p><span>{{ priceRow.breakFastName || '' }}</span></p>
          </td>
          <td><span class="hp-order-clause">预定条款</span></td>
          <td><span class="hp-cancel-clause">{{ priceRow.cancellationText }}</span></td>
          <td><span class="hp-store-status" v-html="priceRow.roomStatusText"></span></td>
          <td>
            <span class="hp-currency">均 ￥<span class="hp-average-price-num">{{ priceRow.averagePriceRMB.toFixed(2).replace(/(\.0+|0+)$/, '') }}</span></span>
            <br>
            <span class="hp-total-price">总 ￥<span class="hp-total-price-num">{{ priceRow.totalPriceRMB }}</span></span>
          </td>
          <td >
              <a v-if="priceRow.isBook" href="javascript:;" class="hp-order-btn" target="_blank">
                预订
              </a>
              <a v-if="!priceRow.isBook" href="javascript:;" class="hp-order-btn disabled"><span class="hidden hotelPriceStrs">{{ priceRow.hotelPriceStrs }}</span>不可订</a>
          </td>
        </tr>
      </tbody>
    </table>
</template>

<script>
export default {
  name: '',

  data(){
    return {
    }
  },

  props: ['priceList'],

  components: {

  },

  computed: {
    newPriceList(){
      this.setNewAttrForPriceData(this.priceList, 'roomTypeBasesRecommend');
      this.setNewAttrForPriceData(this.priceList, 'roomTypeBases');
      
      return this.priceList
    },

    selRoomNum(){
      return this.$store.state.hotelList.roomNum
    }
    
  },
  
  methods: {
    // 为价格数据设置新的属性，使之适合模板
    setNewAttrForPriceData(res, type){
      
      if(res[type]){
        var rowSpan = 0;
        
        for (var i = 0; i < res[type].length; i++) {
          var o = res[type][i];

          rowSpan += o.roomTypePrices.length;

          for (var j = 0; j < o.roomTypePrices.length; j++) {
            var p = o.roomTypePrices[j];

            p.cancellationText = p.cancellationType ? '可取消' : '不可取消';

            // 设置房态显示    0：剩余库存  1畅订  2：待查  3：满房 5不可超售
            if( p.roomStatus === 3 ){
              p.roomStatusText = '<span class="red">满房</span>';
            }else if( p.roomStatus === 2 ){
              p.roomStatusText = '<span class="purple">待查</span>';
            }else if( p.roomStatus === 0 || p.roomStatus === 5 ){
              p.roomStatusText = 
                p.isTimeLimitConfirSupplier === 1
                  ? '<span class="blue">60秒确认</span>'
                  : '剩余库存';
            }else if( p.roomStatus === 1 ){
              p.roomStatusText = 
                p.isTimeLimitConfirSupplier === 1
                  ? '<span class="blue">60秒确认</span>'
                  : '<span class="green">畅订</span>';
            }
            
            if( p.roomStatusText === '剩余库存' ){
              var stockArr = [];
              for (var k = 0; k < p.nightlyPriceList.length; k++) {
                var q = p.nightlyPriceList[k];
                if( q.status === 1 ){ q.stock = 999; }	// 畅订情况下库存为 0 ！
                stockArr.push(q.stock - q.sellStock);
              }
              
              var minStock = Math.min.apply(this, stockArr);
              p.roomStatusText = 
                minStock < 1
                  ? '<span class="red">满房</span>'
                  : '<span class="green">剩余 [' + Math.min.apply(this, stockArr) + ']</span>';
            }
            
            if(!p.isHasMarketing) p.isHasMarketing = 0;
            j = this.setMarketing(o, p, j);
          }
        }

        res[type].rowSpan = rowSpan;

        this.combinePriceRows(res, type)
      }
    },

    // 设置小礼包
    setMarketing(o, p, j){
      var copy = Object.assign({}, p);

      // 将裸房的小礼包信息置空
      p.isHasMarketing = 0;
      p.marketing = null;
      p.marketingStr = 'isHasMarketing=0';
      
      if(copy.marketing){
        var giftStartTime = copy.marketing.startTime.slice(0, 11) + '00:00:00',
          giftEndTime = copy.marketing.endTime.slice(0, 11) + '23:59:59',
          marketingPrice = copy.marketing.marketingPrice || 0,
          totalPrice = 0;
        
        if(copy.marketing.pricingMethod){
          // 将小礼包价格加到每一天的单价里
          for (var k = 0; k < copy.nightlyPriceList.length; k++) {
            totalPrice += copy.nightlyPriceList[k].salePrice;
          }

          // 重新计算总价
          copy.totalPriceRMB = totalPrice * parseInt(this.selRoomNum) + marketingPrice;
        }else{
          // 将小礼包价格加到每一天的单价里
          for (var k = 0; k < copy.nightlyPriceList.length; k++) {
            var q = copy.nightlyPriceList[k];
            
            if( new Date(giftStartTime) < new Date(q.date) && new Date(q.date) < new Date(giftEndTime) ){
              q.salePrice += marketingPrice;
            }
            
            totalPrice += q.salePrice;
          }

          // 重新计算总价
          copy.totalPriceRMB = totalPrice * parseInt(this.selRoomNum);
        }

        copy.marketingStr = 
          'isHasMarketing=1&marketingPrice=' + copy.marketing.marketingPrice + 
          '&startTime=' + copy.marketing.startTime + 
          '&endTime=' + copy.marketing.endTime;

        // 如果 isPack = 0，则不显示裸房价格
        copy.marketing.isPack
          ? o.roomTypePrices.splice((j++ + 1), 0, copy)
          : o.roomTypePrices.splice(j, 1, copy);
      }
      
      return j;
    },

    // 将 '推荐' 和 '其他' 两个数组合并为一个数组，并作为一个新的属性添加到酒店下，一边后续渲染页面
    combinePriceRows(res, type){
      for (let i = 0; i < res[type].length; i++) {
        const o = res[type][i]

        console.log(o);

        for (let j = 0; j < o.roomTypePrices.length; j++) {
          const p = o.roomTypePrices[j];

          if(i === 0 && j === 0){
            p.rowSpan = res[type].rowSpan
          }

          p.tdBindClass = 
            (j === 0 && o.roomTypePrices.length > 1)    ? 'no-border-bottom-td' :
            (j > 0 && j == o.roomTypePrices.length - 1) ? 'no-border-top-td' :
            (j > 0 && j < o.roomTypePrices.length - 1)  ? 'no-border-td' : ''

          if(j > 0){
            p.roomNameHide = 'hidden'
          }

          res.combinedRows
            ? res.combinedRows.push(p)
            : res.combinedRows = [p]
        }
      }
    }

  }
}
</script>

<style  lang="scss">
@import "../assets/jl_sprites.scss";

.hl-item{
  .el-collapse-item__content{
      padding-bottom: 0;
      line-height: inherit;
  }
}

.hotel-price-table{
    width: 100%;
    border: 1px solid #E3E3E3;
    border-top: none;
    margin-bottom: 20px;

    @at-root .hotel-price-thead{
        th{
            span{
                display: none;
            }
        }
    }
    
    @at-root .hotel-price-tbody{
        
        @at-root .hotel-price-tr{

            td{
                position: relative;
                font-size: 14px;
                height: 50px;
                border: 1px solid #E3E3E3;
                padding: 0 15px;
                
                &.first-td{
                    font-size: 16px;
                }
                
                &.no-border-td{
                    border: none;
                }

                &.no-border-bottom-td{
                    border-bottom: none;
                }

                &.no-border-top-td{
                    border-top: none;
                }

                &.force-border{
                    border-bottom: 1px solid #E3E3E3;
                }

                &.align-center{
                    text-align: center;

                    p{
                        line-height: 15px;
                    }
                }

                @at-root .marketing-icon{
                    @include jl_sprites;
                    @include gift;
                    
                    display: inline-block;
                    margin-bottom: -2px;
                }

                @at-root .pagekage-icon{
                    @include jl_sprites;
                    @include package;
                    position: absolute;
                    top: 0;
                    left: 0;
                }

                @at-root .hp-roomName{
                    position: relative;
                    text-decoration: underline;
                    cursor: context-menu;

                    &:hover{
                        color: #339afc;
                    }

                    @at-root .room-type-icon{
                        @include jl_sprites;
                        position: absolute;
                        right: -15px;
                        top: 50%;
                        margin-top: -3px;

                        &.drag-down{
                            @include triangle_blue_down;
                        }

                        &.drag-up{
                            @include triangle_blue_up;
                        }
                    }
                }
                
                @at-root .hp-order-clause,
                .hp-cancel-clause{
                    border-bottom: dashed 1px;
                    cursor: context-menu;
                    
                    &:hover{
                        color: #339afc;
                    }
                }
                
                @at-root .hp-store-status{
                    cursor: context-menu;
                    
                    span{
                        border-bottom: dashed 1px;
                    }

                    .red{
                        color: #ff6666 ;
                        
                        &:hover{
                            color: darken(#ff6666, 20%);
                        }
                    }

                    .purple{
                        color: #ffa825;

                        &:hover{
                            color: darken(#ffa825, 20%);
                        }
                    }

                    .orange{
                        color: orange;

                        &:hover{
                            color: darken(orange, 20%);
                        }
                    }

                    .blue{
                        color: #3366cc;

                        &:hover{
                            color: darken(#3366cc , 20%);
                        }
                    }

                    .green{
                        color: #4cba92;

                        &:hover{
                            color: darken(#4cba92, 20%);
                        }
                    }
                }
                
                @at-root .hp-currency{
                    color: #ffa825;
                    border-bottom: dashed 1px;
                    cursor: context-menu;
                    
                    @at-root .hp-average-price-num{
                        font-size: 20px;
                    }

                    &:hover{
                        color: orangered;
                    }
                }

                @at-root .hp-total-price{
                    font-size: 12px;
                    color: #4cba92;

                    @at-root .hp-total-price-num{
                        font-size: 14px;
                    }
                }
                
                @at-root a.hp-order-btn{
                    display: inline-block;
                    width: 60px;
                    text-align: center;
                    padding: 4px 5px;
                    background: #fea925;
                    border-radius: 5px;
                    color: white;
                    text-decoration: none;
                    transition: all 0.2s linear;
                    
                    &:hover{
                        background: #cc8607;
                    }
                    
                    &.disabled{
                        background: #CCCCCC;
                        cursor: not-allowed;
                    }
                }
            }
        }
    }
}
</style>