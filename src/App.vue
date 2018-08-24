<template>
  <div id="app">
    <el-container>
      <el-header>
        
      </el-header>
      <el-main class="main-view">
        <search-bar/>
      </el-main>
    </el-container>
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

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.main-view {
    margin: auto;
    display: block;
    max-width: 1000px;
}

</style>
