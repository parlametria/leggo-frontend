<template>
  <el-container>
    <el-header>
      <h1>Proposições</h1>
      <el-input placeholder="Pesquisar Projeto de Lei" prefix-icon="el-icon-search" v-model="text_searched"></el-input>
    </el-header>
    <el-main class="el-main">
      <el-row :key="i" v-for="(prop, i) in filteredProps">
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
      proposicoes: [],
      text_searched : ''
    }
  },
  async mounted () {
    var url = 'http://localhost:8000/proposicoes'
    this.proposicoes = await (await fetch(url)).json()
  },
  computed:{
    filteredProps: function() {
      if (!this.text_searched){
        return this.proposicoes;
      }
      return this.proposicoes.filter((prop) => {
        return prop.sigla.toLowerCase().match(this.text_searched.toLowerCase());
      });
    }
  }
}
</script>

<style lang="scss" scoped>
.el-main {
  margin: auto;
  align-items: center;
}
.el-row {
  margin: 5px;
}
</style>
