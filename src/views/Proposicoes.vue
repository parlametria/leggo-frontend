<template>
  <el-row :gutter="20">
    <el-col :sm="10" :md="8" :lg="6">
      <nav-menu/>
    </el-col>
    <el-col :sm="14" :md="16" :lg="18">
      <p v-if="pending.proposicoes">loading posts...</p>
      <p v-if="error.proposicoes">loading failed</p>
      <tema-graphic v-if="filteredProps.length" :proposicoes="filteredProps"/>
      <div :key="j" v-for="(prop,j) in filteredProps" :name="prop.apelido">
        <proposicao-item
          class="proposicao-item"
          :prop="prop"/>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import ProposicaoItem from '@/components/ProposicaoItem'
import NavMenu from '@/components/NavMenu'
import TemaGraphic from '@/components/TemaGraphic'
import { mapState, mapActions, mapGetters, mapMutations } from 'vuex'
export default {
  name: 'proposicoes',
  components: {
    ProposicaoItem,
    NavMenu,
    TemaGraphic
  },
  data () {
    return {
      activeNames: []
    }
  },
  async mounted () {
    await this.listProposicoes()
    // Deep clone o obj para que não seja modificado quando so filtros forem.
    this.setFilter(JSON.parse(JSON.stringify(this.perFilterOptions)))
  },
  computed: {
    filteredProps () {
      // Teste para ver se o obj com os filtros já foi inicializado
      if (Object.keys(this.filter.current).length) {
        return this.proposicoes.filter(prop => {
          return this.checkPropMatchesFilter(prop.lastEtapa)
        }).sort((a, b) => {
          if (this.filter.energyOrder === 'desc') {
            return b.lastEtapa.energia - a.lastEtapa.energia
          } else {
            return a.lastEtapa.energia - b.lastEtapa.energia
          }
        })
      } else {
        return this.proposicoes
      }
    },
    ...mapState({
      proposicoes: state => state.proposicoes.proposicoes,
      pending: state => state.proposicoes.pending,
      error: state => state.proposicoes.error,
      filter: state => state.filter
    }),
    ...mapGetters(['perFilterOptions'])
  },
  methods: {
    ...mapActions(['listProposicoes']),
    ...mapMutations(['setFilter']),
    checkPropMatchesFilter (prop) {
      // return this.filter.filters.every(filter => {
      //   let filterSetup = this.filter.current[filter]
      //   if (filterSetup) return filterSetup.includes(prop[filter])
      //   else true
      return this.filter.filters.every(
        filter => this.filter.current[filter].includes(prop[filter])) &&
        this.filter.emPautaFilter.some(
          // TODO: usar nova estrutura do emPauta
          options =>
            ((options.tipo === 'Sim' && prop.em_pauta) ||
              (options.tipo === 'Não' && !prop.em_pauta)) &&
            options.status
        ) &&
          prop.apelido.toLowerCase().match(
            this.filter.nomeProposicaoFilter.nomeProposicao.toLowerCase())
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
