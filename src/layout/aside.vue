<template>
  <el-aside>
		<el-menu :default-active="$route.path" class="el-menu-vertical-demo" :router="true" :unique-opened="true"
			background-color="#545c64"
			text-color="#fff"
			active-text-color="#ffd04b" style="height: 100vh">

      <el-menu-item index="/">
        <i class="el-icon-menu"></i>
        <span>首页</span>
      </el-menu-item>

      <el-menu-item index="/about">
        <i class="el-icon-menu"></i>
        <span>酒店数据管理</span>
      </el-menu-item>

		</el-menu>
  </el-aside>
</template>

<script>
export default {};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>