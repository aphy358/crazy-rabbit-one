<template>
  <div>
    <!-- 城市模板，下面定义的 key1 表示的是如 'ABCD'、'EFGHI'、'JKLM' 这样的块... -->
    <ul class="kwc-block-title-list">
      <li v-for="(value1, key1, index1) in cityList" :key="index1" class="kwc-block-title-item" :checked="key1 === getBlockKey" @click="switchBlock(key1)" >
        {{key1}}
      </li>
    </ul>
    <ul class="kwc-city-block-list">

      <!-- 城市模板，下面定义的 block 表示的是如 'ABCD'、'EFGHI'、'JKLM' 这样的字符串所对应的块... -->
      <li v-for="(block, key2, index2) in cityList" :key="index2" class="kwc-city-block-item" :checked="key2 === getBlockKey" >

        <!-- 下面定义的 item 表示的是如 'A'、'B'、'C' 这样的字符串所对应的块...，而 item.w 则表示的是字母 'A'、'B'、'C' 本身 -->
        <div v-for="(item, index3) in block" :key="index3">
          <label class="kwc-city-block-label">{{item.w}}</label>
          <ul class="kwc-city-list">
          
            <!-- 遍历字母块 'A'、'B'、'C' 下所有的项 -->
            <li v-for="(item2, index4) in item.item" :key="index4" class="kwc-city-item" @click="checkOneCity(item2.t, item2.i, item2.n)" >
              {{item2.n}}
            </li>
          </ul>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'CityListTmpl',
  data(){
    return {
      _blockKey: this.$props.blockKey
    }
  },
  props: {
    cityList: {},
    blockKey: ''
  },
  computed: {
    getBlockKey(){
      return this.$data._blockKey
    }
  },
  methods: {
    switchBlock(key1){
      this.$data._blockKey = key1
    },
    checkOneCity(t, i, n){
      console.log(t + '  , ' + i + '  ,  ' + n)
    }
  }
}
</script>

<style scoped lang="scss">
</style>