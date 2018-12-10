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
          <div class="session" ref="emPautaSession">
            <header ref="emPautaHeader"><h2 :class="{disabled: emPauta.length === 0}">Em pauta</h2></header>
            <proposicao-item :key="prop.apelido" v-for="prop in emPauta" :prop="prop"/>
          </div>
          <div class="session" ref="notEmPautaSession">
            <header ref="notEmPautaHeader"><h2 :class="{disabled: notEmPauta.length === 0}">Fora da pauta</h2></header>
            <proposicao-item :key="prop.apelido" v-for="prop in notEmPauta" :prop="prop"/>
          </div>
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
    window.addEventListener('scroll', this.sticky)
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
    ...mapGetters(['perFilterOptions']),
    emPauta () {
      return this.filteredProps.filter(prop => {
        const propId = prop.lastEtapa.id_ext
        return this.pautas && this.pautas[propId] && this.pautas[propId].length > 0
      })
    },
    notEmPauta () {
      return this.filteredProps.filter(prop => {
        const propId = prop.lastEtapa.id_ext
        return !(this.pautas && this.pautas[propId] && this.pautas[propId].length > 0)
      })
    }
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
    },
    sticky () {
      const emPautaHeader = this.$refs.emPautaHeader
      const emPautaSession = this.$refs.emPautaSession
      emPautaHeader.style.width = `${emPautaSession.getBoundingClientRect().width}px`

      if (emPautaSession.getBoundingClientRect().top <= 0) emPautaHeader.classList.add('sticky')
      else emPautaHeader.classList.remove('sticky')

      const notEmPautaheader = this.$refs.notEmPautaHeader
      const notEmPautaSession = this.$refs.notEmPautaSession
      notEmPautaheader.style.width = `${notEmPautaSession.getBoundingClientRect().width}px`

      if (notEmPautaSession.getBoundingClientRect().top - 60 <= 0) notEmPautaheader.classList.add('sticky')
      else notEmPautaheader.classList.remove('sticky')
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
    margin-bottom: 2rem;
    h1 {
        font-family: 'Rajdhani', sans-serif;
        border-bottom: solid 2px #dc6060;
        line-height: 50pt;
        font-size: 50pt;
        text-align: center;
        font-weight: normal;
    }
}
 .logo {
  max-width: 100%;
  height: auto;
}
.session {
  position: relative;
  padding-top: 4rem;
  &:first-child {
    padding-top: 0;
  }
  header {
    box-shadow: 0 2px 5px #999;
    padding: 1.5rem 0;
  }
  h2 {
    font-weight: normal;
    font-size: 1.6rem;
    margin: 0;
    padding-left: 1rem;
    color: #656565;
  }
  .disabled {
    color: #bbb;
  }
}
.sticky {
  display: block;
  position: fixed;
  top: 0;
  z-index: 1;
  background: #fff;
}
</style>
