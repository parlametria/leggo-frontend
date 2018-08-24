<template>
  <div id="app">
    <el-container>
      <el-header>
      </el-header>
      <el-main class="main-view">
        <search-bar/>
      </el-main>
    </el-container>
    <div id="nav">
      <router-link :to="{name: 'home'}">Home</router-link> |
      <router-link :to="{name: 'about'}">About</router-link> |
      <router-link :to="{name: 'proposicoes'}">Proposições</router-link>
    </div>
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
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

.main-view {
    margin: auto;
    display: block;
    max-width: 1000px;
}

</style>
