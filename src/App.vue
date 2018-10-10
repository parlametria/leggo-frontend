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

<style lang="scss" scoped>
.main-view {
  padding: 0;
  margin: auto;
  display: block;
  max-width: 100%;
}
</style>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
body {
  margin: 0;
}
</style>
