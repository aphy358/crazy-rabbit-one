<template>
  <CityListTmpl :cityList="cityList" :blockKey="blockKey" />
</template>

<script>
import CityListTmpl from './commonTemplate/CityListTmpl'
import cityList from './data/gatCity.js'

export default {
  name: 'GATCity',
  data(){
    return {
      cityList: cityList,
      blockKey: '港澳台'
    }
  },
  props: {
    
  },
  computed: {
    
  },
  components: {
    CityListTmpl
  }
}
</script>

<style scoped lang="scss">
</style>