<template>
  <CityListTmpl :cityList="cityList" :blockKey="blockKey" @pickvalue="pickvalue($event)" />
</template>

<script>
import CityListTmpl from './commonTemplate/CityListTmpl'
import cityList from './data/internalCity.js'

export default {
  name: 'InternalCity',
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
  },
  methods: {
    pickvalue(event){
      this.$emit('pickvalue', event)
    }
  }
}
</script>

<style scoped lang="scss">
</style>