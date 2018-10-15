<template>
  <div id="app">
    <el-menu
      :router="true"
      mode="horizontal"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">
      <el-menu-item index="/temas">Temas</el-menu-item>
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
#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}
.main-view {
    margin: auto;
    display: block;
    max-width: 100%;
}

body {
    margin: 0;
}
.el-tag {
  margin-left: 10px;
}
</style>
