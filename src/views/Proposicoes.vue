<template>
  <el-container>
    <el-header class="el-header">
      <h1>Proposições</h1>
      <el-input id="el-input" placeholder="Pesquisar Projeto de Lei" prefix-icon="el-icon-search" v-model="text_searched"></el-input>
    </el-header>
    <el-main class="el-main">
      <p v-if="pending.proposicoes">loading posts...</p>
      <p v-if="error.proposicoes">loading failed</p>
      <el-row :key="i" v-for="(prop, i) in filteredProps">
        <proposicao-item :prop= prop />
      </el-row>
    </el-main>
  </el-container>
</template>

<script>
import ProposicaoItem from '@/components/ProposicaoItem'
import { mapState, mapActions } from 'vuex'

export default {
  name: 'proposicoes',
  components: {
    ProposicaoItem
  },
  data () {
    return {
      text_searched: ''
    }
  },
  mounted () {
    this.listProposicoes()
  },
  computed: mapState({
    proposicoes: state => state.proposicoes,
    pending: state => state.pending,
    error: state => state.error,
    filteredProps () {
      if (!this.text_searched) {
        return this.proposicoes
      }
      return this.proposicoes.filter((prop) => {
        return prop.apelido.toLowerCase().match(this.text_searched.toLowerCase())
      }
      )
    }
  }),
  methods: {
    ...mapActions([
      'listProposicoes'
    ])
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
.el-header{
  display: contents;
}
</style>
