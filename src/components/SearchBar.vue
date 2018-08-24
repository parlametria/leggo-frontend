<template>
  <div>
    <el-row>
      <el-col :span="24">
        <div>
          <el-input placeholder="Pesquisar Projeto de Lei" prefix-icon="el-icon-search" v-model="text_searched"></el-input>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'SearchBar',
  data() {
    return {
      text_searched: ''
    }
  }
}
</script>

<style scoped>
</style>
