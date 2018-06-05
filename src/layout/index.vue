<template>

  <div>

    <!-- 页首 -->
    <router-view name="header" />

    <main>
      <!-- 页面主体 -->
      <router-view />
    </main>

    <!-- 页尾 -->
    <router-view name="footer" />

  </div>

</template>
