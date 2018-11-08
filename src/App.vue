<template>
  <el-container id="app">
    <el-aside class="aside-menu">
      <nav-menu>
        <el-collapse-transition mode="out-in">
          <router-view name="menu"/>
        </el-collapse-transition>
      </nav-menu>
    </el-aside>
    <el-main>
      <transition name="el-fade-in" mode="out-in">
        <router-view/>
      </transition>
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
.aside-menu {
    width: 300px !important;
    @media (max-width: $nav-menu-break-width) {
        width: 0px !important;
    }
}
a {
    color: #098484;
    text-decoration: none;
}
</style>
