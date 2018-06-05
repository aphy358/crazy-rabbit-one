<template>
  <CityListTmpl :cityList="cityList" :blockKey="blockKey" />
</template>

<script>
import CityListTmpl from './commonTemplate/CityListTmpl'
import cityList from './data/externalCity.js'

export default {
  name: 'ExternalCity',
  data(){
    return {
      cityList: cityList,
      blockKey: '热门'
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