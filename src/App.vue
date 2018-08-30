<template>
  <div id="app">
    <el-menu
      @select="handleSelect"
      mode="horizontal"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">
      <el-menu-item index="home">Home</el-menu-item>
      <el-menu-item index="proposicoes">Proposições</el-menu-item>
      <el-menu-item index="about">About</el-menu-item>
    </el-menu>

    <el-container>
      <el-header>
      </el-header>
      <el-main class="main-view">
        <search-bar/>
      </el-main>
    </el-container>

    <router-view/>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import SearchBar from './components/SearchBar'

export default {
  name: 'app',
  components: {
    HelloWorld,
    SearchBar
  },
  methods: {
    handleSelect(key) {
      this.$router.push(key)
    }
  }
}
</script>

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
    max-width: 1000px;
}

</style>
