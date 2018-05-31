<template>
  <el-container>
    <Aside />
    <el-container style="flex-direction: column;">
      <Header />
      <Main />
    </el-container>
  </el-container>
</template>

<script>
import Aside from "./aside"
import Header from "./header"
import Main from "./main"

export default {
  components: {
    Aside,
    Header,
    Main
  }
}
</script>

<style>
</style>