<template>
  <CityListTmpl :cityList="cityList" />
</template>

<script>
import CityListTmpl from './commonTemplate/CityListTmpl'
import cityList from './data/gatCity.js'

export default {
  name: 'GATCity',
  data(){
    return {
      cityList: cityList
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