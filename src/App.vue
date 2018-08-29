<template>
  <el-container class="main-view app">
    <el-header>
      <div id="nav">
        <router-link :to="{name: 'home'}">Home</router-link> |
        <router-link :to="{name: 'about'}">About</router-link> |
        <router-link :to="{name: 'proposicoes'}">Proposições</router-link>
      </div>
    </el-header>
    <el-main>
      <router-view/>
    </el-main>
  </el-container>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'app',
  components: {
    HelloWorld
  }
}
</script>

<style lang="scss">
.app {
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
