// 将被点击的城市设置到历史记录里
const _queryPriceList = ({
  commit,
  state,
  dispatch
}, payload) => {
  let hotel = payload.hotel
  let timer1, timer2, timer3
  let percentage = 1
  let c1 = 255,
    c2 = 45,
    c3 = 0

  commit('setHotelExtraAttr', {
    hotel: hotel,
    percentage: percentage,
    color: `rgba(${c1}, ${c2}, ${c3}, 0.7)`
  })

  // 前面 80% 的部分，每一个百分比耗时 35 毫秒
  timer1 = setInterval(() => {
    percentage = hotel.percentage + 1
    c1 = parseInt(255 - percentage * 2.2)
    c2 = parseInt(45 + percentage * 1.38)
    c3 = parseInt(percentage * 0.35)

    commit('setHotelExtraAttr', {
      hotel: hotel,
      percentage: percentage,
      color: `rgba(${c1}, ${c2}, ${c3}, 0.7)`
    })

    if (percentage >= 80) {
      clearInterval(timer1)

      // 80% ~ 95% 的部分，每一个百分比耗时 333 毫秒
      timer2 = setInterval(() => {
        percentage = hotel.percentage + 1
        c1 = parseInt(255 - percentage * 2.2)
        c2 = parseInt(45 + percentage * 1.38)
        c3 = parseInt(percentage * 0.35)

        commit('setHotelExtraAttr', {
          hotel: hotel,
          percentage: percentage,
          color: `rgba(${c1}, ${c2}, ${c3}, 0.7)`
        })

        if (percentage >= 95) {
          clearInterval(timer2)

          // 95% ~ 99% 的部分，每一个百分比耗时 1250 毫秒
          timer3 = setInterval(() => {
            percentage = hotel.percentage + 1
            c1 = parseInt(255 - percentage * 2.2)
            c2 = parseInt(45 + percentage * 1.38)
            c3 = parseInt(percentage * 0.35)

            commit('setHotelExtraAttr', {
              hotel: hotel,
              percentage: percentage,
              color: `rgba(${c1}, ${c2}, ${c3}, 0.7)`
            })

            if (percentage >= 99) {
              clearInterval(timer3)
            }
          }, 1250)
        }
      }, 333)
    }
  }, 35)

  payload.api.hotelList.syncGetHotelPriceList(payload.params).then(res => {
    commit('setHotelExtraAttr', {
      hotel: hotel,
      data: res
    })

    clearInterval(timer1)
    clearInterval(timer2)
    clearInterval(timer3)

    commit('setHotelExtraAttr', {
      hotel: hotel,
      percentage: 100,
      color: `rgba(35, 183, 35, 0.7)`
    })

    setTimeout(() => {
      commit('setHotelExtraAttr', {
        hotel: hotel,
        percentage: 0,
        color: `rgba(35, 183, 35, 0.7)`
      })
    }, 100)
  })
}

const _queryPriceListInStock = ({ commit, state, dispatch }, payload) => {
  payload.api.hotelList.syncGetHotelPriceListInStock(payload.params).then(res => {
    // 如果实查的价格比缓存的价格更早返回前端，则不再将缓存的价格赋值给相关变量
    if(!payload.hotel.priceList){
      commit('setHotelExtraAttr', {hotel: payload.hotel, data: res})
    }
  })
}

const _queryHotelPriceList = ({ commit, state, dispatch }, payload, hotel) => {
  let params = {
    hotelId: hotel.infoId,
    checkInDate: payload.startDate,
    checkOutDate: payload.endDate,
    roomNum: payload.selRoomNum,
    adultNum: payload.adultNum,
    childrenNum: payload.childrenNum,
    childrenAgesStr: payload.childrenAgesStr,
    isSearchSurcharge: 0
  }

  dispatch('queryPriceListInStock', {params: params, hotel: hotel, api: payload.api})
  dispatch('queryPriceList', {params: params, hotel: hotel, api: payload.api})
}


module.exports = {
  _queryHotelPriceList,
  _queryPriceList,
  _queryPriceListInStock,
}