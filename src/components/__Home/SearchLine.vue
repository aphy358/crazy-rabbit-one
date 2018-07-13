<template>

</template>

<script>
import CityTypeSelect from '../common/CityTypeSelect'
import RoomNumSelect from '../common/RoomNumSelect'
import DateRange from '../common/DateRange'
import KerywordSuggest from '../common/KerywordSuggest'
import AdultChildrenSelect from '../common/AdultChildrenSelect'

export default {
  name: 'SearchLine',

  data() {
    return {
    }
  },

  props: [],

  computed: {
    // 获取城市类型，如：'国内'、'港澳台'、'国外'
    getCityType() {
      return this.$store.state.cityType
    }
  },

  components: {
    CityTypeSelect,
    RoomNumSelect,
    DateRange,
    KerywordSuggest,
    AdultChildrenSelect
  },

  methods: {
    
  },

  created() {
  },

  mounted() {}
}
</script>

<!-- 覆盖 element 原有样式，注意这里不能用 scoped 限定作用域 -->
<style lang="scss">

</style>