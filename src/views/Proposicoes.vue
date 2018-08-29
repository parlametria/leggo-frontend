<template>
  <el-container>
    <el-header>
      <h1>Proposições</h1>
    </el-header>
    <el-main class="el-main">
      <el-row :key="i" v-for="(prop, i) in proposicoes">
        <proposicao-item :prop= prop />
      </el-row>
    </el-main>
  </el-container>
</template>

<script>
import ProposicaoItem from '@/components/ProposicaoItem'

export default {
  name: 'proposicoes',
  components: {
    ProposicaoItem
  },
  data () {
    return {
      proposicoes: []
    }
  },
  async mounted () {
    var url = 'http://localhost:8000/proposicoes'
    this.proposicoes = await (await fetch(url)).json()
  }
}
</script>

<style lang="scss" scoped>
.el-main {
  margin: auto;
  align-items: center;
}
</style>
