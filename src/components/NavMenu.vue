<template>
<div>
  <el-menu default-active="2" class="el-menu-vertical-demo">
  <el-submenu index="1">
    <template slot="title">
      <span slot="title">Apreciação</span>
    </template>
  </el-submenu>

  <el-submenu index="2">
    <template slot="title">
      <span slot="title">Regime de tramitação</span>
    </template>
  </el-submenu>

   <el-submenu index="3">
    <template slot="title">
      <span slot="title">Casa</span>
    </template>
  </el-submenu>

  <el-submenu index="4">
    <template slot="title">
      <span slot="title">Finalizada</span>
    </template>
  </el-submenu>
</el-menu>
</div>
</template>

<script>
export default {
  name: 'navMenu'
}
</script>

<style scoped>
.el-menu-vertical-demo{
    height:100%,
}

.el-submenu{
  text-align: left;
}
</style>
