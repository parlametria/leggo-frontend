<template>
  <el-container>
    <el-header>
      <h1>Proposições</h1>
    </el-header>
    <el-main class="el-main">
      <p v-if="pending.proposicoes">loading posts...</p>
      <p v-if="error.proposicoes">loading failed</p>
      <el-row :key="i" v-for="(prop, i) in proposicoes">
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
  mounted () {
    this.listProposicoes()
  },
  computed: mapState({
    proposicoes: state => state.proposicoes,
    pending: state => state.pending,
    error: state => state.error
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
</style>
