<template>
  <div>
    <ultimos-eventos/>
    <p v-if="pending.proposicoes">Carregando proposições <i class="el-icon-loading"></i></p>
    <p v-else-if="error.proposicoes">Falha no carregamento</p>
    <transition v-else name="el-fade-in" mode="out-in">
      <div v-if="filteredProps.length">
        <div class="session">
          <header ref="emPautaHeader">
            <h2 :class="{disabled: emPauta.length === 0}">Na pauta</h2>
          </header>
          <div ref="emPautaSession">
            <proposicao-item :id="prop.id" :key="prop.apelido" v-for="prop in emPauta" :prop="prop"/>
          </div>
        </div>
        <div class="session">
          <header ref="notEmPautaHeader">
            <h2 :class="{disabled: notEmPauta.length === 0}">Fora da pauta da semana</h2>
          </header>
          <div ref="notEmPautaSession">
            <proposicao-item :id="prop.id" :key="prop.apelido" v-for="prop in notEmPauta" :prop="prop"/>
          </div>
        </div>
      </div>
      <p v-else>Nenhuma proposição para mostrar...</p>
    </transition>
  </div>
</template>

<script>
import ProposicaoItem from '@/components/card/ProposicaoItem'
import UltimosEventos from '@/components/UltimosEventos'
import { mapState, mapActions, mapGetters, mapMutations } from 'vuex'
import { removeAcentos } from '@/utils'

export default {
  name: 'proposicoes',
  components: {
    ProposicaoItem,
    UltimosEventos
  },
  data () {
    return {
      activeNames: []
    }
  },
  methods: {
    ...mapActions(['listProposicoes']),
    ...mapMutations(['setFilter']),
    checkCategoricalFilters (prop) {
      return this.filter.filters.every(
        filter => this.filter.current[filter].length === 0 || this.filter.current[filter].includes(prop[filter])
      )
    },
    checkPautaFilter (prop) {
      const propId = prop.id
      const emPauta = this.pautas && this.pautas[propId] && this.pautas[propId].length > 0

      return (!this.filter.emPautaFilter.some(options => options.status) ? true : emPauta)
    },
    checkApelidoFilter (prop) {
      const apelido = removeAcentos(prop.sigla.toLowerCase() + prop.apelido.toLowerCase())
      const filtro = removeAcentos(this.filter.nomeProposicaoFilter.nomeProposicao.toLowerCase())
      return apelido.match(filtro)
    },
    checkPropMatchesFilter (prop) {
      return this.checkCategoricalFilters(prop) &&
        this.checkPautaFilter(prop) &&
        this.checkApelidoFilter(prop)
    },
    updateSticky (refHeader, refSession) {
      if (!refSession || !refHeader) return

      // Faz com que o tamanho da barra seja redimensionado conforme o tamanho da janela
      refHeader.style.width = `${refSession.getBoundingClientRect().width}px`

      if (refSession.getBoundingClientRect().top > 0) {
        refSession.style.paddingTop = '0px'
        refHeader.classList.remove('sticky')
      }
      if (refHeader.getBoundingClientRect().top <= 0) {
        refSession.style.paddingTop = `${refHeader.getBoundingClientRect().height}px`
        refHeader.classList.add('sticky')
      }
    },
    sticky () {
      this.updateSticky(this.$refs.emPautaHeader, this.$refs.emPautaSession)
      this.updateSticky(this.$refs.notEmPautaHeader, this.$refs.notEmPautaSession)
    }
  },
  computed: {
    filteredProps () {
      // Teste para ver se o obj com os filtros já foi inicializado
      if (Object.keys(this.filter.current).length) {
        return this.proposicoes.filter(prop => {
          return this.checkPropMatchesFilter(prop.lastEtapa)
        }).sort((a, b) => {
          let idA = a.lastEtapa.id
          let idB = b.lastEtapa.id
          let pautaA = this.pautas && this.pautas[idA] !== undefined && this.pautas[idA].length > 0
          let pautaB = this.pautas && this.pautas[idB] !== undefined && this.pautas[idB].length > 0
          let n = pautaB - pautaA
          if (n !== 0) {
            return n
          }
          if (this.temperaturas && this.temperaturas[idA] && this.temperaturas[idA][0] &&
              this.temperaturas[idB] && this.temperaturas[idB][0]) {
            if (this.filter.temperatureOrder === 'desc') {
              return this.temperaturas[idB][0].temperatura_recente - this.temperaturas[idA][0].temperatura_recente
            } else {
              return this.temperaturas[idA][0].temperatura_recente - this.temperaturas[idB][0].temperatura_recente
            }
          } else {
            return 0
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
      temperaturas: state => state.temperaturas.temperaturas,
      pautas: state => state.pautas.pautas
    }),
    ...mapGetters(['perFilterOptions', 'formattedDateRef', 'createfilterOptionObjectEmpty']),
    emPauta () {
      return this.filteredProps.filter(prop => {
        const propId = prop.lastEtapa.id
        return this.pautas && this.pautas[propId] && this.pautas[propId].length > 0
      })
    },
    notEmPauta () {
      return this.filteredProps.filter(prop => {
        const propId = prop.lastEtapa.id
        return !(this.pautas && this.pautas[propId] && this.pautas[propId].length > 0)
      })
    },
    compoundWatch () {
      return [this.formattedDateRef, this.filter.semanas].join()
    }
  },
  watch: {
    compoundWatch: {
      async handler (newValue, oldValue) {
        await this.listProposicoes({
          params: {
            semanas: this.filter.semanas,
            date: this.formattedDateRef
          }
        })
        if (!oldValue) {
          // Deep clone o obj para que não seja modificado quando só os filtros forem.
          this.setFilter(JSON.parse(JSON.stringify(this.createfilterOptionObjectEmpty)))
        }
      },
      immediate: true
    }
  },
  async mounted () {
    window.addEventListener('scroll', this.sticky)
    window.addEventListener('resize', this.sticky)
  }
}
</script>

<style lang="scss" scoped>
@import "@/base.scss";

.flex {
    display: flex;
    flex-wrap: wrap;
}
.session {
  position: relative;
  padding-top: 4rem;
  &:first-child {
    padding-top: 0;
  }
  header {
    padding-top: 1rem;
    padding-bottom: 1rem;
  }
  h2 {
    font-weight: normal;
    font-size: 1.6rem;
    margin: 0;
    padding: 0;
    color: #656565;
  }
  .disabled {
    color: #bbb;
  }
  @media (max-width: $nav-menu-break-width) {
    div {
      margin: 0 4px;
    }
  }
}
.sticky {
  display: block;
  position: fixed;
  top: 0;
  z-index: 20;
  background: #fff;
  border-bottom: solid 3px #dadada;
}
</style>
