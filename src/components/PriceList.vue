
<!-- 价格列表组件 -->
<template>
    <div>
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
                <span class="hp-roomName" :class="priceRow.roomNameBindClass" @mouseover="getRoomInfo(priceRow.hotelId, priceRow.supplierId, priceRow.roomId)">
                  {{priceRow.roomName}}
                </span>
                <i v-if="priceRow.rowsDropDown" class="room-type-icon drag-up"></i>
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
              <td>
                  <el-popover  v-if="priceRow.orderClauseText !== '无预订条款'"  placement="top-start" width="200" trigger="hover" popper-class="price-table-tip">
                    <div v-html="priceRow.orderClauseTip"></div>
                    <span slot="reference" class="hp-order-clause">{{priceRow.orderClauseText}}</span>
                  </el-popover>
                  <span v-if="priceRow.orderClauseText === '无预订条款'">{{priceRow.orderClauseText}}</span>
              </td>
              <td>
                <el-popover placement="top-start"  width="200" trigger="hover" popper-class="price-table-tip">
                  <span class="hli-cancellation-desc">{{priceRow.cancellationDesc}}</span>
                  <span slot="reference" class="hp-cancel-clause">{{ priceRow.cancellationText }}</span>
                </el-popover>
              </td>
              <td>
                <el-popover placement="top-start"  width="300" trigger="hover" popper-class="price-table-tip">
                  <span class="hli-cancellation-desc" v-html="priceRow.priceDetailTip"></span>
                  <span slot="reference" class="hp-store-status" v-html="priceRow.roomStatusText"></span>
                </el-popover>
              </td>
              <td>
                <el-popover placement="top-start"  width="300" trigger="hover" popper-class="price-table-tip">
                  <span class="hli-cancellation-desc" v-html="priceRow.priceDetailTip"></span>
                  <span slot="reference" class="hp-currency">均 ￥<span class="hp-average-price-num">{{ priceRow.averagePriceRMB.toFixed(2).replace(/(\.0+|0+)$/, '') }}</span></span>
                </el-popover>
                <br>
                <span class="hp-total-price">总 ￥<span class="hp-total-price-num">{{ priceRow.totalPriceRMB }}</span></span>
              </td>
              <td >
                  <a v-if="priceRow.isBook" href="javascript:;" target="_blank">
                    <el-button type="warning" size="mini" class="hp-order-btn">预订</el-button>
                  </a>
                  <el-button type="info" size="mini" disabled v-if="!priceRow.isBook" class="hp-order-btn">不可订</el-button>
              </td>
            </tr>
          </tbody>
        </table>

        <div class="hli-error-msg" v-if="!newPriceList.combinedRows">无相关价格！</div>
    </div>
</template>

<script>
export default {
  name: '',

  data(){
    return {
      roomInfoArr: {},
      currentRoomInfo: null,
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
        let rowSpan = 0;
        
        for (let i = 0; i < res[type].length; i++) {
          // o 指每个房型
          let o = res[type][i];

          rowSpan += o.roomTypePrices.length;

          for (let j = 0; j < o.roomTypePrices.length; j++) {
            // o 指每个价格类型，真正用于渲染一行的数据
            let p = o.roomTypePrices[j];

            // 为预定条款 td 设置 tip
            this.setOrderClauseTip(p)

            // 设置取消款的显示字样
            p.cancellationText = p.cancellationType ? '可取消' : '不可取消';

            // 设置房态的显示，如：'60秒确认'、'满房'、'畅订' 等...
            this.setRoomStatusText(p)

            // 初始化价格的 tips
            this.setHotelPriceTip(p)
            
            // 设置小礼包
            if(!p.isHasMarketing) p.isHasMarketing = 0;
            j = this.setMarketing(o, p, j);
          }
        }

        res[type].rowSpan = rowSpan

        // 将 '推荐' 和 '其他' 两个数组合并为一个数组，并作为一个新的属性添加到酒店下，一边后续渲染页面
        this.combinePriceRows(res, type)
      }
    },

    // 设置房态的显示，如：'60秒确认'、'满房'、'畅订' 等...
    setRoomStatusText(p){
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
        let stockArr = [];
        for (var k = 0; k < p.nightlyPriceList.length; k++) {
          var q = p.nightlyPriceList[k];
          if( q.status === 1 ){ q.stock = 999; }	// 畅订情况下库存为 0 ！
          stockArr.push(q.stock - q.sellStock);
        }
        
        let minStock = Math.min.apply(this, stockArr);
        p.roomStatusText = 
          minStock < 1
            ? '<span class="red">满房</span>'
            : '<span class="green">剩余 [' + Math.min.apply(this, stockArr) + ']</span>';
      }
    },

    // 为预定条款 td 设置 pop 数据
    setOrderClauseTip(roomTypePrice){
      // 预定条款不区分每一天，所有只拿第一天的数据进行计算
      let reserveShowArr = roomTypePrice.nightlyPriceList[0].reserveShow.split(/[|;]/)
      let	clauses = []
      let getOrderClauseInnerStr = clauses => {
        let finnalStr = ''

        for (let i = 0; i < clauses.length; i++) {
          finnalStr += `
            <li class="hli-order-clause-item">
                <h2>${clauses[i].name}</h2>
                <p>${clauses[i].tip}</p>
            </li>`
        }

        return finnalStr
      }
  
      for (var j = 0; j < reserveShowArr.length; j++) {
        var o = reserveShowArr[j];
        ~o.indexOf('限住') ? clauses.push({name: '限制晚数', tip: o}) :
        ~o.indexOf('提前') ? clauses.push({name: '提前预订', tip: o}) :
        ~o.indexOf('连住') ? clauses.push({name: '连住多晚', tip: o}) :
        ~o.indexOf('时间') ? clauses.push({name: '限时预订', tip: o}) :
        ~o.indexOf('间数') ? clauses.push({name: '限制间数', tip: o}) :
        ~o.indexOf('没有') ? clauses.push({name: '无预订条款', tip: o}) : ''
      }

      roomTypePrice.orderClauseTip = `
        <div class="hli-order-clause-wrap">
            <ul class="hli-order-clause-list">
                ${getOrderClauseInnerStr(clauses)}
            </ul>
        </div>`
      
      roomTypePrice.orderClauseText = 
        clauses.length === 0 ? '无预订条款' :
        clauses.length === 1 ? clauses[0].name 
                              : '复合条款'		
    },

    // 设置小礼包
    setMarketing(o, p, j){
      let copy = Object.assign({}, p);

      // 将裸房的小礼包信息置空
      p.isHasMarketing = 0;
      p.marketing = null;
      p.marketingStr = 'isHasMarketing=0';
      
      if(copy.marketing){
        let giftStartTime = copy.marketing.startTime.slice(0, 11) + '00:00:00'
        let giftEndTime = copy.marketing.endTime.slice(0, 11) + '23:59:59'
        let marketingPrice = copy.marketing.marketingPrice || 0
        let totalPrice = 0
        
        if(copy.marketing.pricingMethod){
          // 将小礼包价格加到每一天的单价里
          for (let k = 0; k < copy.nightlyPriceList.length; k++) {
            totalPrice += copy.nightlyPriceList[k].salePrice;
          }

          // 重新计算总价
          copy.totalPriceRMB = totalPrice * parseInt(this.selRoomNum) + marketingPrice;
        }else{
          // 将小礼包价格加到每一天的单价里
          for (let k = 0; k < copy.nightlyPriceList.length; k++) {
            let q = copy.nightlyPriceList[k];
            
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
            p.roomNameBindClass = 'hidden'
          }

          if(o.roomTypePrices.length > 1){
            p.rowsDropDown = '多行下拉'
          }

          res.combinedRows
            ? res.combinedRows.push(p)
            : res.combinedRows = [p]
        }
      }
    },

    // 初始化价格的 tips
    setHotelPriceTip(p){
      for (var i = 0; i < p.nightlyPriceList.length; i++) {
        var o = p.nightlyPriceList[i];

				// 设置房态显示    0：剩余库存  1畅订  2：待查  3：满房 5不可超售
				if( o.status === 3 ){
					o.statusText = '<span class="red">满房</span>';
				}else if( o.status === 2 ){
					o.statusText = '<span class="purple">待查</span>';
				}else if( o.status === 0 || o.status === 5 ){
					o.statusText = 
						p.isTimeLimitConfirSupplier
							? '<span class="blue">60秒确认</span>'
							: ( (o.stock - o.sellStock < 1) ? '<span class="red">满房</span>' : '<span class="green">剩' + (o.stock - o.sellStock) + '</span>' );
				}else if( o.status === 1 ){
					o.statusText = 
						p.isTimeLimitConfirSupplier
							? '<span class="blue">60秒确认</span>'
							: '<span class="green">畅订</span>';
				}
      }
      
      let getPriceTrStr = list => {
        let finalStr = ''

        for (let i = 0; i < list.length; i++) {
          const q = list[i];
          finalStr += `
            <tr>
              <td>${q.date}</td>
              <td>￥${q.salePrice} /间 【${q.statusText}】</td>
              <td>${q.occupancyStock}间</td>
            </tr>`
        }

        return finalStr
      }

      p.priceDetailTip = `
        <div class="hli-price-detail-wrap">
          <table>
            <thead>
              <tr>
                <th>日期</th>
                <th>价格【房态】</th>
                <th>预订间数</th>
              </tr>
            </thead>
            <tbody>
              ${getPriceTrStr(p.nightlyPriceList)}
            </tbody>
          </table>
        </div>`
    },

    // 获取房型信息，先从 state 里拿，如果拿不到，则发起请求，并将返回的数据设置到 state 里。
    getRoomInfo(hotelId, suppId, roomId){
      let roomInfo = this.roomInfoArr[`${hotelId}_${suppId}_${roomId}`]

      if(roomInfo){
        // 如果 state 里面已经存有该房型信息，则直接显示
        this.currentRoomInfo = roomInfo
      }else{
        // 否则发起请求
        this.queryRoomInfo(hotelId, suppId, roomId)
      }
    },

    async queryRoomInfo(hotelId, suppId, roomId){
      let res = await this.$api.hotelList.syncGetRoomInfo({hotelId, suppId, roomId})
      
      if(res.success){
        this.roomInfoArr[`${hotelId}_${suppId}_${roomId}`] = res.content
        this.currentRoomInfo = res.content
      }else{
        this.currentRoomInfo = null
      }
    },

  }
}
</script>

<style lang="scss">
.price-table-tip{
  font-size: 12px!important;

  &.el-popover{
    background: #ecf5ff!important;
    box-shadow: 0 0px 5px 0px rgba(0,0,0,.1);
  }
  &.el-popper[x-placement^=top] .popper__arrow::after{
    border-top-color: #ecf5ff!important;
  }
  &.el-popper[x-placement^=bottom] .popper__arrow::after{
    border-bottom-color: #ecf5ff!important;
  }
  &.el-popper[x-placement^=left] .popper__arrow::after{
    border-left-color: #ecf5ff!important;
  }
  &.el-popper[x-placement^=right] .popper__arrow::after{
    border-right-color: #ecf5ff!important;
  }
  &.el-popper[x-placement^=bottom]{
    padding: 12px;
  }

  .hli-order-clause-item,
  .hli-cancellation-desc{
    color: #3f39d4;
    margin-top: 10px;
          
    &:first-child{
        margin-top: 0;
    }

    h2{
      font-weight: bold;
      margin-bottom: 5px;
    }
  }

  .hli-price-detail-wrap{
    table{
        width: 100%;
        
        tr{
            
            th,
            td{
                height: 30px;
                text-align: center;
                background: #ecf5ff;
                border: solid 1px #9ac5ed;

                .red{
                    color: #ff6666;
                }

                .purple{
                    color: #ffa825;
                }

                .orange{
                    color: orange;
                }

                .blue{
                    color: #3366cc;
                }

                .green{
                    color: #4cba92;
                }
            }
    
            th{
                font-weight: normal;
            }
        }
    }
  }
}
</style>

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
                
                @at-root .hp-order-btn{
                    &.el-button.el-button--mini{
                      min-width: 64px;
                      font-size: 14px;
                      padding: 6px 10px;
                    }
                }
            }
        }
    }
}

.hli-error-msg{
    text-align: center;
    color: red;
    font-size: 16px;
    padding: 15px;
    border-top: solid 1px #ddd;
}
</style>