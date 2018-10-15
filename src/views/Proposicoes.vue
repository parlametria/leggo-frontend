<template>
  <el-row :gutter="20">
    <el-col :sm="10" :md="8" :lg="6">
      <nav-menu></nav-menu>
    </el-col>
    <el-col :sm="14" :md="16" :lg="18">
      <p v-if="pending.proposicoes">loading posts...</p>
      <p v-if="error.proposicoes">loading failed</p>
      <h2>{{ tema }}</h2>
      <div class="flex flex-center">
        <proposicao-item
          class="proposicao-item"
          :key="j"
          v-for="(prop,j) in filteredProps"
          :prop="prop.lastEtapa" :visId= "`vis-${j}`"/>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import ProposicaoItem from '@/components/ProposicaoItem'
import NavMenu from '@/components/NavMenu'
import { mapState, mapActions } from 'vuex'

export default {
  name: 'proposicoes',
  components: {
    ProposicaoItem,
    NavMenu
  },
  mounted () {
    this.listProposicoes()
  },
  computed: {
    tema () { return this.$route.params.tema },
    filteredProps () {
      return this.proposicoes.filter(prop => {
        // por enquanto usa apenas a última etapa
        let [etapa] = prop.etapas.slice(-1)
        prop.lastEtapa = etapa
        return this.processProps(etapa)
      }).filter((prop) => prop.tema === this.tema).sort((a, b) => {
        if (this.energyOrder === 'desc') {
          return b.lastEtapa.energia - a.lastEtapa.energia
        } else {
          return a.lastEtapa.energia - b.lastEtapa.energia
        }
      })
    },
    ...mapState({
      proposicoes: state => state.proposicoes.proposicoes,
      pending: state => state.proposicoes.pending,
      error: state => state.proposicoes.error,
      apreciacaoFilter: state => state.filter.apreciacaoFilter,
      regimeFilter: state => state.filter.regimeFilter,
      casaFilter: state => state.filter.casaFilter,
      emPautaFilter: state => state.filter.emPautaFilter,
      nomeProposicaoFilter: state => state.filter.nomeProposicaoFilter,
      energyOrder: state => state.filter.energyOrder,
      energias: state => state.filter.energias
    })
  },
  methods: {
    ...mapActions(['listProposicoes']),
    processProps (prop) {
      return (
        this.apreciacaoFilter.some(
          options => options.tipo === prop.forma_apreciacao && options.status
        ) &&
        this.regimeFilter.some(
          options => options.tipo === prop.regime_tramitacao && options.status
        ) &&
        this.casaFilter.some(
          options => options.tipo === prop.casa && options.status
        ) &&
        this.emPautaFilter.some(
          options =>
            ((options.tipo === 'Sim' && prop.em_pauta) ||
              (options.tipo === 'Não' && !prop.em_pauta)) &&
            options.status
        ) &&
          prop.apelido.toLowerCase().match(
            this.nomeProposicaoFilter.nomeProposicao.toLowerCase())
      )
    }
  }
}
</script>

<style lang="scss" scoped>
.proposicao-item {
  min-width: 350px;
}
.flex {
    display: flex;
    flex-wrap: wrap;
}
</style>
