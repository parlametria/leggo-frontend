<template>
  <div id="app">
    <el-menu
      :router="true"
      mode="horizontal"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">
      <el-menu-item index="/proposicoes">Proposições</el-menu-item>
      <el-menu-item index="/sobre">Sobre</el-menu-item>
    </el-menu>
    <el-container>
      <el-main class="main-view">
        <router-view/>
      </el-main>
    </el-container>
  </div>
</template>

<style lang="scss">
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
</style>
