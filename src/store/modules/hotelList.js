export default {
  namespaced: true,
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