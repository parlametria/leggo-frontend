<template>
  <div class="content">
    <el-row type="flex" justify="space-around" class="logo-container">
      <el-col :xs="24" :sm="18" :md="12" :lg="12" :xl="8">
        <h1><span>Á</span>gora <span>D</span>igital</h1>
      </el-col>
    </el-row>
    <el-row type="flex" justify="space-around">
      <el-col :xs="24" :sm="18" :md="12" :lg="12" :xl="8">
      <p v-if="pending.proposicoes">Carregando projetos...</p>
      <p v-if="error.proposicoes">Falha no carregamento</p>
      <transition name="el-fade-in" mode="out-in">
        <div v-if="filteredProps.length">
          <transition-group name="el-fade-in" tag="div">
            <proposicao-item :key="prop.apelido" v-for="prop in filteredProps" :prop="prop"/>
          </transition-group>
        </div>
        <p v-else>Nenhuma proposição para mostrar...</p>
      </transition>
      </el-col>
    </el-row>
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
          let idA = a.lastEtapa.id_ext
          let idB = b.lastEtapa.id_ext
          let pautaA = this.pautas && this.pautas[idA] !== undefined && this.pautas[idA].length > 0
          let pautaB = this.pautas && this.pautas[idB] !== undefined && this.pautas[idB].length > 0
          let n = pautaB - pautaA
          if (n !== 0) {
            return n
          }
          if (this.filter.temperatureOrder === 'desc') {
            return b.lastEtapa.temperatura - a.lastEtapa.temperatura
          } else {
            return a.lastEtapa.temperatura - b.lastEtapa.temperatura
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
      filter: state => state.filter,
      temperaturas: state => state.proposicoes.temperaturas,
      pautas: state => state.pautas.pautasDic
    }),
    ...mapGetters(['perFilterOptions'])
  },
  methods: {
    ...mapActions(['listProposicoes']),
    ...mapMutations(['setFilter']),
    checkCategoricalFilters (prop) {
      return this.filter.filters.every(
        filter => this.filter.current[filter].includes(prop[filter])
      )
    },
    checkPautaFilter (prop) {
      return this.filter.emPautaFilter.some(options => {
        const propId = prop.id_ext
        const emPauta = this.pautas && this.pautas[propId] && this.pautas[propId].length > 0

        return options.status &&
               ((options.tipo === 'Sim' && emPauta) || (options.tipo === 'Não' && !emPauta))
      })
    },
    checkApelidoFilter (prop) {
      const apelido = prop.apelido.toLowerCase()
      const filtro = this.filter.nomeProposicaoFilter.nomeProposicao.toLowerCase()

      return apelido.match(filtro)
    },
    checkPropMatchesFilter (prop) {
      return this.checkCategoricalFilters(prop) &&
             this.checkPautaFilter(prop) &&
             this.checkApelidoFilter(prop)
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
.logo-container {
    /* background-color: #000000; */
    margin-bottom: 2rem;
    h1 {
        font-family: 'Rajdhani', sans-serif;
        border-bottom: solid 2px #dc6060;
        line-height: 50pt;
        font-size: 50pt;
        text-align: center;
        font-weight: normal;

        /* border-left: solid 20px #dc6060; */
        /* line-height: 70pt; */
        /* font-size: 50pt; */
        /* background-color: #444; */
        /* color: white; */
    }
}
 .logo {
  max-width: 100%;
  height: auto;
}
</style>
