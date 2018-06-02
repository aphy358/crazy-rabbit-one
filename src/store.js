import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {

  },
  actions: {

  },
  modules: {
    hotelList: {
      // namespaced: true,
      state: {
        cityType: '0',
      },
      mutations: {
        changeCityType(state, newCityType){
          state.cityType = newCityType
        },
      },
      actions: {
    
      },
    }
  },
})
