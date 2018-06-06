<template>
  <CityListTmpl :cityList="cityList" :blockKey="blockKey" @pickvalue="pickvalue($event)" />
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
  components: {
    CityListTmpl
  },
  methods: {
    pickvalue(event){
      this.$emit('pickvalue', event)
    }
  }
}
</script>
