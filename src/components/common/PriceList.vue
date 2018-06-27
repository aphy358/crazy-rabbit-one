
<!-- 价格列表组件 -->
<template>
    <div class="hotel-price-table-wrapper">
        <table class="hotel-price-table" v-if="combinedRows.length">
          <thead class="hotel-price-thead">
            <tr>
              <th width="55"></th>
              <th width="220"><span>房型</span></th>
              <th><span>价格类型</span></th>
              <th width="150" class="align-center"><span>床型/早餐</span></th>
              <th width="100"><span>预订规则</span></th>
              <th width="100"><span>取消规则</span></th>
              <th width="90"><span>剩余数量</span></th>
              <th width="150"><span>均价/总价</span></th>
              <th width="85"></th>
            </tr>
          </thead>

          <tbody class="hotel-price-tbody">
            <transition name="slide-price-row" v-for="(priceRow, i) in combinedRows" :key="i" v-if="priceRow.isShow"
              appear
              v-on:before-enter="beforeaAniEnter"
              v-on:enter="aniEnter"
              v-on:after-enter="afterEnter"
              v-on:leave="aniLeave"
              v-on:after-leave="afterLeave"
              v-bind:css="false">

            <tr class="hotel-price-tr" >
              <td v-if="priceRow.rowSpan" class="first-td" :rowspan="priceRow.rowSpan"><div>{{priceRow.rowSpanText}}</div></td>
              <td :class="priceRow.tdBindClass" @click="toggleSlideRow(priceRow)">
                <div class="hotel-price-room-name" :class="priceRow.roomNameBindClass" >
                  <el-popover placement="top-start"  width="245" trigger="hover" popper-class="price-table-tip">
                    <div class="hli-tip-style" v-html="currentRoomInfo"></div>
                    <span slot="reference" class="hp-roomName"
                      @mouseover="getRoomInfo(priceRow.hotelId, priceRow.supplierId, priceRow.roomId)" >
                      {{priceRow.roomName}}
                    </span>
                  </el-popover>
                  <span v-if="priceRow.rowsDropDown" class="room-type-icon-outer" :class="priceRow.roomNameBindClass">
                    <i class="room-type-icon" :class="priceRow.relativeShow ? 'slide-up' : 'slide-down'"></i>
                  </span>
                </div>
              </td>
              <td>
                <div>
                  <span>{{priceRow.rateTypeName || ''}}</span>
                  <el-popover  v-if="priceRow.isHasMarketing" placement="top-start" width="200" trigger="hover" popper-class="price-table-tip">
                    <span class="hli-tip-style">{{priceRow.marketingInfo}}</span>
                    <i slot="reference" class="marketing-icon"></i>
                  </el-popover>
                  <i v-if="priceRow.packageRequest" class="pagekage-icon"></i>
                </div>
              </td>
              <td class="align-center">
                <div>
                  <p v-if="priceRow.bedTypeName"><span :title="priceRow.bedTypeNameText">{{ priceRow.bedTypeNameText }}</span></p>
                  <p><span :title="priceRow.breakFastName || ''">{{ priceRow.breakFastName || '' }}</span></p>
                </div>
              </td>
              <td>
                <div>
                  <el-popover  v-if="priceRow.orderClauseText !== '无预订条款'"  placement="top-start" width="200" trigger="hover" popper-class="price-table-tip">
                    <div v-html="priceRow.orderClauseTip"></div>
                    <span slot="reference" class="hp-order-clause">{{priceRow.orderClauseText}}</span>
                  </el-popover>
                  <span v-if="priceRow.orderClauseText === '无预订条款'">{{priceRow.orderClauseText}}</span>
                </div>
              </td>
              <td>
                <div>
                  <el-popover placement="top-start"  width="200" trigger="hover" popper-class="price-table-tip">
                    <span class="hli-tip-style">{{priceRow.cancellationDesc}}</span>
                    <span slot="reference" class="hp-cancel-clause">{{ priceRow.cancellationText }}</span>
                  </el-popover>
                </div>
              </td>
              <td>
                <div>
                  <el-popover placement="top-start"  width="300" trigger="hover" popper-class="price-table-tip">
                    <span class="hli-tip-style" v-html="priceRow.priceDetailTip"></span>
                    <span slot="reference" class="hp-store-status" v-html="priceRow.roomStatusText"></span>
                  </el-popover>
                </div>
              </td>
              <td>
                <div>
                  <el-popover placement="top-start"  width="300" trigger="hover" popper-class="price-table-tip">
                    <span class="hli-tip-style" v-html="priceRow.priceDetailTip"></span>
                    <p slot="reference" class="hp-currency">均 ￥<span class="hp-average-price-num">{{ priceRow.averagePriceRMB.toFixed(2).replace(/(\.0+|0+)$/, '') }}</span></p>
                  </el-popover>
                  <p class="hp-total-price-wrap"><span class="hp-total-price">总 ￥<span class="hp-total-price-num">{{ priceRow.totalPriceRMB }}</span></span></p>
                </div>
              </td>
              <td>
                <div>
                  <a v-if="priceRow.isBook" href="javascript:;" target="_blank">
                    <el-button type="warning" size="mini" class="hp-order-btn">预订</el-button>
                  </a>
                  <el-button type="info" size="mini" disabled v-if="!priceRow.isBook" class="hp-order-btn">不可订</el-button>
                </div>
              </td>
            </tr>

            </transition>
          </tbody>

        </table>
        <div class="hli-error-msg" v-if="!combinedRows.length">无相关价格！</div>
    </div>
</template>

<script>
import loadingGif from "../../assets/loading.gif";
import { deepCopy } from "../../util.js";
import Velocity from 'velocity-animate'

export default {
  name: '',

  data(){
    return {
      roomInfoArr: {},
      currentRoomInfo: '',
      combinedRows: [],
    }
  },

  props: ['priceList', 'page'],

  watch: {
    // 实时监听由父组件传过来的 prop，如果不这么做的话，那么有可能当该 prop 改变之后，页面不能马上响应并重新渲染
    priceList(newV){
      this.newPriceList()
    },

    // 列表页取消条款
    filterCancelType(){
      this.newPriceList()
    },

    // 详情页取消条款
    filterCancelType2(){
      this.newPriceList()
    },

    // 列表页确认时间
    filterConfirmType(){
      this.newPriceList()
    },

    // 详情页确认时间
    filterConfirmType2(){
      this.newPriceList()
    },

    // 详情页，勾选 '只显示可订'
    onlyCanBook(){
      this.newPriceList()
    },

    // 详情页，价格区间
    filterPriceRange2(){
      this.newPriceList()
    }
  },

  created(){
    this.newPriceList()
  },

  computed: {
    selRoomNum(){
      return this.$store.state.roomNum
    },

    // 列表页取消条款
    filterCancelType(){
      return this.$store.state.hotelList.checkedCancelType.join(',')
    },

    // 详情页取消条款
    filterCancelType2(){
      let checkedCancelType = this.$store.state.hotelDetail.checkedCancelType
      return checkedCancelType ? 'canceltype-0' : ''
    },

    // 列表页确认时间
    filterConfirmType(){
      return this.$store.state.hotelList.checkedConfirmType.join(',')
    },

    // 详情页确认时间
    filterConfirmType2(){
      return this.$store.state.hotelDetail.checkedConfirmType.join(',')
    },

    filterPriceRange(){
      return this.$store.state.hotelList.checkedPriceRange
    },

    // 详情页，价格区间
    filterPriceRange2(){
      let priceRange1 = this.$store.state.hotelDetail.priceRange1 || 0
      let priceRange2 = this.$store.state.hotelDetail.priceRange2 || 29999
      return priceRange1 + '-' + priceRange2
    },

    // 详情页，勾选 '只显示可订'
    onlyCanBook(){
      return this.$store.state.hotelDetail.onlyCanBook
    }
    
  },
  
  methods: {
    // 对父组件穿过来的价格列表进行数据处理，设置新属性、筛选等
    newPriceList(){
      if(this.priceList){
        let tmpPriceList = deepCopy(this.priceList)
        tmpPriceList.combinedRows = []
  
        this.setNewAttrForPriceData(tmpPriceList, 'roomTypeBasesRecommend');
        this.setNewAttrForPriceData(tmpPriceList, 'roomTypeBases');
        this.combinedRows = tmpPriceList.combinedRows
  
        if(this.page === 'hotelDetail'){
          this.$store.commit('hotelDetail/setCommonState', {t: 'combinedRows', v: this.combinedRows})
        }
      }
    },

    // 设置床型名称的显示
    setBedTypeNameText(p){
      if(p.bedTypeList){
        let tmpArr = []
        
        for (let k = 0; k < p.bedTypeList.length; k++) {
          const q = p.bedTypeList[k].bedTypeName;
          tmpArr.push(q.split('[')[0])
        }
  
        p.bedTypeNameText = tmpArr.join('/')
      }else{
        p.bedTypeNameText = ''
      }
    },

    // 为价格数据设置新的属性，使之适合模板
    setNewAttrForPriceData(res, type){
      if(res[type]){
        let rowSpan = 0;
        
        for (let i = 0; i < res[type].length; i++) {
          // o 指每个房型
          let o = res[type][i];

          for (let j = 0; j < o.roomTypePrices.length; j++) {
            // o 指每个价格类型，真正用于渲染一行的数据
            let p = o.roomTypePrices[j];

            this.setBedTypeNameText(p)

            // 根据前端条件过滤价格
            let isShow = this.getIsShowBoolean(p)

            if( !isShow ){
              o.roomTypePrices.splice(j--, 1);
            }else{
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

          rowSpan += o.roomTypePrices.length;
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
            <li class="hli-tip-style">
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
      // 计算该类型价格下所有价格记录条数
      let typeRowCount = 0

      for (let i = 0; i < res[type].length; i++) {
        const o = res[type][i]

        for (let j = 0; j < o.roomTypePrices.length; j++) {
          const p = o.roomTypePrices[j];

          // 初始状态下，每一行都默认显示
          p.isShow = true

          // 价格类型：'推荐'、'其他'
          p.priceType = type

          if(typeRowCount++ === 0){
            p.rowSpan = res[type].rowSpan
            p.rowSpanText = type === 'roomTypeBasesRecommend' ? '推荐' : '其他'
          }

          p.tdBindClass = 
            (j === 0 && o.roomTypePrices.length > 1)    ? 'no-border-bottom-td' :
            (j > 0 && j == o.roomTypePrices.length - 1) ? 'no-border-top-td' :
            (j > 0 && j < o.roomTypePrices.length - 1)  ? 'no-border-td' : ''

          if(j > 0){
            p.roomNameBindClass = 'hidden'
          }

          if(o.roomTypePrices.length > 1){
            j === 0 ? p.rowsDropDown = '多行下拉' : ''

            // 如果是同一个房型下多个价格类型，则第一个价格类型的数据将关联其他价格类型，便于同一房型的收缩操作
            if(j === 0){
              p.relativeIndexArr = []
              p.relativeShow = true
              let index = res.combinedRows.length
              for (let _i = 1; _i < o.roomTypePrices.length; _i++) {
                p.relativeIndexArr.push(index + _i)
              }
            }
          }

          res.combinedRows.push(p)
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
        // 先清空当前显示的房型信息 tip
        this.currentRoomInfo = `<div class="hotel-info-wrap"><img src="${loadingGif}"/></div>`

        // 否则发起请求
        this.queryRoomInfo(hotelId, suppId, roomId)
      }
    },

    // 查询房型信息
    queryRoomInfo(hotelId, suppId, roomId){
      this.$api.hotelList.syncGetRoomInfo({hotelId, suppId, roomId}).then(res => {
        if(res.success){
          let c = res.content
          let tipStr = 
            `<div class="hotel-info-wrap">
              <ul class="hotel-info-list">
                ${c.roomName ? '<li class="hotel-info-item"><i class="iconfont icon-home"></i><h1 class="roomName">' + c.roomName + '</h1></li>' : ''}
                ${c.floor ? '<li class="hotel-info-item"><label>楼层：</label><span>' + c.floor + '层</span></li>' : ''}
                ${c.acreage ? '<li class="hotel-info-item"><label>面积：</label><span>' + c.acreage + 'm²</span></li>' : ''}
                ${c.bedName ? '<li class="hotel-info-item"><label>床型：</label><span>' + c.bedName + '</span></li>' : ''}
                ${c.bedWidth ? '<li class="hotel-info-item"><label>床型大小：</label><span>' + c.bedWidth + '</span></li>' : ''}
                ${c.maximize ? '<li class="hotel-info-item"><label>最大入住人数：</label><span>' + c.maximize + '</span></li>' : ''}
                ${c.facilities ? '<li class="hotel-info-item"><label>房间设施：</label><span>' + c.facilities + '</span></li>' : ''}
                ${c.comment ? '<li class="hotel-info-item"><label>房型备注：</label><span>' + c.comment + '</span></li>' : ''}
              </ul>
            </div>`
  
          this.roomInfoArr[`${hotelId}_${suppId}_${roomId}`] = tipStr
          this.currentRoomInfo = tipStr
        }else{
          this.roomInfoArr[`${hotelId}_${suppId}_${roomId}`] = `<div class="hotel-info-wrap">暂无房型信息！</div>`
          this.currentRoomInfo = `<div class="hotel-info-wrap">暂无房型信息！</div>`
        }
      })
    },

    // 根据前端条件过滤价格
    getIsShowBoolean(priceObj){
      let subIsShow1 = true
      let subIsShow2 = true
      let subIsShow3 = true
      let subIsShow4 = true
      let avePrice = priceObj.averagePriceRMB
        
      // 确认时间，由于列表页和详情页的确认时间不会共存，所以这里共用 subIsShow1
      if(this.filterConfirmType || this.filterConfirmType2){
        let tmpFilterConfirmType = this.filterConfirmType || this.filterConfirmType2
        subIsShow1 = false;
        
        if( ~tmpFilterConfirmType.indexOf('XS-0') ){
          subIsShow1 |= (priceObj.roomStatus === 2);
        }
        
        if( ~tmpFilterConfirmType.indexOf('XS-1') ){
          subIsShow1 |= (priceObj.isTimeLimitConfirSupplier === 0 && priceObj.confirm === true && priceObj.roomStatus != 3);
        }
        
        if( ~tmpFilterConfirmType.indexOf('XS-2') ){
          subIsShow1 |= (priceObj.isTimeLimitConfirSupplier === 1);
        }
      }
      
      // 可否取消，由于列表页和详情页的取消条款不会共存，所以这里共用 subIsShow2
      if(this.filterCancelType || this.filterCancelType2){
        let tmpFilterCancelType = this.filterCancelType || this.filterCancelType2
        subIsShow2 = false;
        
        if( ~tmpFilterCancelType.indexOf('canceltype-0') ){
          subIsShow2 |= (priceObj.cancellationType === 1);
        }
        
        if( ~tmpFilterCancelType.indexOf('canceltype-1') ){
          subIsShow2 |= (priceObj.cancellationType !== 1);
        }
      }

      // 价格区间，由于列表页和详情页的价格区间不会共存，所以这里共用 subIsShow3
      if(this.filterPriceRange || this.filterPriceRange2 !== '0-29999'){
        subIsShow3 = false;

        var priceRangeArr = this.filterPriceRange
          ? (this.filterPriceRange.split('_')[0]).split('-')
          : this.filterPriceRange2.split('-')

        let p1 = +priceRangeArr[0] || 0     // 避免价格为0的被选上
        let p2 = +priceRangeArr[1] || 0     // 避免价格为0的被选上

        subIsShow3 |= ( p1 <= avePrice && avePrice <= p2 );
      }

      // 只显示可订
      if(this.onlyCanBook){
        subIsShow4 = false;
			  subIsShow4 |= priceObj.isBook;
      }
      
      return subIsShow1 && subIsShow2 && subIsShow3 && subIsShow4
    },

    // 收缩同一房型下的表格行
    toggleSlideRow(priceRow){
      // 如果有相关关联行，则执行行收缩动画
      if(priceRow.relativeIndexArr){
        let isShow = priceRow.relativeShow
        let type = priceRow.priceType
        priceRow.relativeShow = !isShow

        for (let i = 0; i < priceRow.relativeIndexArr.length; i++) {
          const index = priceRow.relativeIndexArr[i]
          this.combinedRows[index].isShow = !isShow
        }

        // 随着行折叠，需要动态改变第一个 TD 的 rowspan
        let thefirstRow =  this.combinedRows.filter(n => n.priceType == type)[0]

        if(isShow){
          thefirstRow.tmprowSpan = thefirstRow.rowSpan - priceRow.relativeIndexArr.length 
        }else{
          thefirstRow.tmprowSpan = thefirstRow.rowSpan + priceRow.relativeIndexArr.length 
          thefirstRow.rowSpan = thefirstRow.rowSpan + priceRow.relativeIndexArr.length 
          this.$emit('expandPriceRow')
        }
      }
    },

    beforeaAniEnter(el){
      el.querySelectorAll('td').forEach(element => {
        element.style.height = 0
      });

      el.querySelectorAll('td>div').forEach(element => {
        element.style.height = 0
        element.style.opacity = 0
      });
    },

    aniEnter(el, done){
      Velocity(el.querySelectorAll('td'), {height: '51px'}, {duration: 300, complete: done})
      Velocity(el.querySelectorAll('td>div'), {height: '51px', opacity: 1}, {duration: 300, complete: done})
    },

    afterEnter(el){
      // 价格行插入页面之后要删除行内样式，不然会影响价格 tip 的样式
      el.querySelectorAll('td').forEach(element => {
        element.removeAttribute('style')
      });

      el.querySelectorAll('td>div').forEach(element => {
        element.removeAttribute('style')
      });
    },

    aniLeave(el, done){
      Velocity(el.querySelectorAll('td'), {height: 0}, {duration: 300, complete: done})
      Velocity(el.querySelectorAll('td>div'), {height: 0, opacity: 0}, {duration: 300, complete: done})
    },

    afterLeave(el){
      for (let i = 0; i < this.combinedRows.length; i++) {
        const o = this.combinedRows[i]
        if(o.tmprowSpan){
          o.rowSpan = o.tmprowSpan
        }
      }
    },
    
  },
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

  .hli-tip-style{
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

  .hotel-info-wrap{
    
    @at-root .hotel-info-list{
      padding: 5px;
      
      @at-root .hotel-info-item{
        margin: 5px 0;

        &:first-child,
        &:last-child{
          margin: 0;
        }
        
        .roomName{
            font-size: 14px;
        }
        
        label{
            color: #999;
        }
      }
    }

    img{
      display: block;
      margin: 20px auto;
    }
  }
}
</style>

<style  lang="scss">
@import "../../assets/jl_sprites.scss";

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
                padding: 0 10px;

                >div{
                  height: 51px;
                  line-height: 51px;

                  &.hotel-price-room-name{
                    height: auto!important;
                    line-height: initial!important;
                  }
                }
                
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
                    padding: 0 5px;

                    p{
                        line-height: 37px;
                        margin-bottom: -10px;
                        overflow: hidden;
                        height: 26px;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                        max-width: 149px;
                    }
                }

                @at-root .marketing-icon{
                    @include jl_sprites;
                    @include gift;
                    
                    display: inline-block;
                    margin-bottom: -2px;
                    margin-left: 2px;
                }

                @at-root .pagekage-icon{
                    @include jl_sprites;
                    @include package;
                    position: absolute;
                    top: 0;
                    left: 0;
                }

                @at-root .hp-roomName{
                    text-decoration: underline;
                    cursor: context-menu;

                    &:hover{
                        color: #339afc;
                    }

                    @at-root .room-type-icon-outer{
                      display: inline-block;
                      width: 16px;
                      height: 16px;

                      @at-root .room-type-icon{
                          @include jl_sprites;
                          float: left;
                          margin-top: 8px;
                          margin-left: 5px;
  
                          &.slide-down{
                              @include triangle_blue_down;
                          }
  
                          &.slide-up{
                              @include triangle_blue_up;
                          }
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
                    line-height: 16px;
                    display: inline-block;
                    position: relative;
                    top: -6px;
                    
                    @at-root .hp-average-price-num{
                        font-size: 20px;
                    }

                    &:hover{
                        color: orangered;
                    }
                }

                @at-root .hp-total-price-wrap{
                    line-height: 20px;
                    margin-top: -22px;
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