<template>
  <div style="overflow-y: hidden;height: 100%;">
    <el-scrollbar class="body-scroll">
      <!-- 页首 -->
      <router-view name="header" />

      <main>
        <!-- 页面主体 -->
        <router-view />
      </main>

      <!-- 页尾 -->
      <router-view name="footer" />
    </el-scrollbar>
  </div>
</template>

<style lang="scss">
.body-scroll{
  height: 100%;

  > .el-scrollbar__wrap{
    overflow: auto;

    > .el-scrollbar__view{
      overflow-x: hidden;
    }
  }
}
</style>
