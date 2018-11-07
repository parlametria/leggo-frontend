<template>
  <el-container id="app">
    <el-aside class="aside-menu">
      <nav-menu>
        <router-view name="menu"/>
      </nav-menu>
    </el-aside>
    <el-main>
      <router-view/>
    </el-main>
  </el-container>
</template>

<script>
import NavMenu from '@/components/NavMenu.vue'
export default {
  components: {
    NavMenu
  }
}
</script>

<style lang="scss">
@import "@/vars.scss";
body {
    margin: 0;
}
.flex-center {
    justify-content: center;
}
.el-tag {
    width: 4rem;
    text-align: center;
}
.aside-menu {
    width: 300px !important;
    @media (max-width: $nav-menu-break-width) {
        width: 0px !important;
    }
}
</style>
