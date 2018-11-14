<template>
  <div class="content">
    <div class="middle">
      <img src="../assets/logoweb.png" class="logo" />
    <p v-if="pending.proposicoes">loading posts...</p>
    <p v-if="error.proposicoes">loading failed</p>
    <transition name="el-fade-in" mode="out-in">
      <div v-if="filteredProps.length">
        <transition-group name="el-fade-in" tag="div">
          <proposicao-item :key="prop.apelido" v-for="prop in filteredProps" :prop="prop"/>
        </transition-group>
      </div>
      <p v-else>Nenhuma proposição para mostrar...</p>
    </transition>
    </div>
  </div>
</template>

<script>
import ProposicaoItem from '@/components/card/ProposicaoItem'
import { mapState, mapActions, mapGetters, mapMutations } from 'vuex'
export default {
  name: 'proposicoes',
  components: {
    ProposicaoItem
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
      return this.filter.filters.every(
        filter => this.filter.current[filter].includes(prop[filter])) &&
        this.filter.emPautaFilter.some(
          // TODO: usar nova estrutura do emPauta
          options =>
            ((options.tipo === 'Sim' && prop.em_pauta) ||
              (options.tipo === 'Não' && !prop.em_pauta)) && options.status
        ) &&
        prop.apelido.toLowerCase().match(
          this.filter.nomeProposicaoFilter.nomeProposicao.toLowerCase())
    }
  }
}
</script>

<style lang="scss" scoped>
.flex {
    display: flex;
    flex-wrap: wrap;
}
.content {
   display: block;
   margin:auto;
}

.logo{
  max-width: 100%;
  height: auto;
}
</style>
