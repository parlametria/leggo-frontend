<template>
  <div class="content">
    <filter-button />
    <ultimos-eventos/>
    <p v-if="pending.proposicoes">Carregando proposições <i class="el-icon-loading"/></p>
    <p v-else-if="error.proposicoes">Falha no carregamento</p>
    <transition
      v-else
      name="el-fade-in"
      mode="out-in">
      <div v-if="filteredProps.length">
        <div class="session">
          <header ref="emPautaHeader">
            <h2 :class="{disabled: emPauta.length === 0}">Na pauta oficial</h2>
          </header>
          <div ref="emPautaSession">
            <proposicao-item
              :id="prop.id_leggo"
              :key="prop.id_leggo"
              v-for="prop in emPauta"
              :prop="prop"/>
          </div>
        </div>
        <div class="session">
          <header ref="notEmPautaHeader">
            <h2 :class="{disabled: notEmPauta.length === 0}">Fora da pauta oficial da semana</h2>
          </header>
          <div
            ref="notEmPautaSession"
            class="section">
            <proposicao-item
              :id="prop.id_leggo"
              :key="prop.id_leggo"
              v-for="prop in propPaged"
              :prop="prop"/>
            <pagination-bar
              :size="Math.ceil(notEmPauta.length / quantityProp)"
              :limit="10"
              :initial="pageNumber"
              @change="(number) => updatePageNumber(number)"
            />
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
import PaginationBar from '@/components/utils/PaginationBar'
import FilterButton from '@/components/menu/FilterButton'

export default {
  name: 'Proposicoes',
  components: {
    ProposicaoItem,
    UltimosEventos,
    FilterButton,
    PaginationBar
  },
  data () {
    return {
      activeNames: [],
      quantityProp: 10
    }
  },
  methods: {
    ...mapActions(['listProposicoes']),
    ...mapMutations(['setPageNumber']),

    checkCategoricalFilters (prop) {
      return this.filter.filters.every(
        filter => this.getCurrent[filter].length === 0 || this.filter.current[filter].some(v => {
          if (prop[filter]) {
            return prop[filter].includes(v)
          }
          return prop.lastEtapa[filter].includes(v)
        })
      )
    },
    checkPautaFilter (prop) {
      const propId = prop.id
      const emPauta = this.pautas && this.pautas[propId] && this.pautas[propId].length > 0

      return (!this.filter.emPautaFilter.some(options => options.status) ? true : emPauta)
    },
    checkStatusFilter (prop) {
      return this.filter.showFinalizadas.status || prop.status === 'Ativa'
    },
    checkApelidoFilter (prop) {
      const apelido = removeAcentos(prop.sigla.toLowerCase() + prop.apelido.toLowerCase())
      const filtro = removeAcentos(this.filter.nomeProposicaoFilter.toLowerCase())
      return apelido.match(filtro)
    },
    checkPropMatchesFilter (prop) {
      return this.checkCategoricalFilters(prop) &&
        this.checkPautaFilter(prop.lastEtapa)
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
    },
    updatePageNumber (number) {
      this.setPageNumber(number)
    }
  },
  computed: {
    ...mapGetters(['perFilterOptions', 'formattedDateRef', 'getCurrent']),
    filteredProps () {
      // Teste para ver se o obj com os filtros já foi inicializado
      if (Object.keys(this.getCurrent).length) {
        return this.proposicoes.filter(prop => {
          return this.checkPropMatchesFilter(prop) &&
          this.checkStatusFilter(prop.lastEtapa) && this.checkApelidoFilter(prop)
        }).sort((a, b) => {
          let idA = a.lastEtapa.id
          let idB = b.lastEtapa.id
          let pautaA = this.pautas && this.pautas[idA] !== undefined && this.pautas[idA].length > 0
          let pautaB = this.pautas && this.pautas[idB] !== undefined && this.pautas[idB].length > 0
          let n = pautaB - pautaA
          if (n !== 0) {
            return n
          }
          if (this.temperaturas) {
            let tempA = this.temperaturas[a.id_leggo] === undefined ? 0 : this.temperaturas[a.id_leggo]
            let tempB = this.temperaturas[b.id_leggo] === undefined ? 0 : this.temperaturas[b.id_leggo]
            let pressaoA = this.pressoes[a.id_leggo] === undefined ? 0 : this.pressoes[a.id_leggo]
            let pressaoB = this.pressoes[b.id_leggo] === undefined ? 0 : this.pressoes[b.id_leggo]
            if (this.filter.temperatureOrder === 'desc') {
              return Math.abs(tempB - tempA) > 5 ? tempB - tempA : pressaoB - pressaoA
            } else {
              return Math.abs(tempA - tempB) > 5 ? tempA - tempB : pressaoA - pressaoB
            }
          } else {
            return 0
          }
        })
      } else {
        return this.proposicoes
      }
    },
    propPaged () {
      const init = this.pageNumber * this.quantityProp
      const end = (this.pageNumber + 1) * this.quantityProp
      return this.notEmPauta.slice(init, end)
    },
    ...mapState({
      proposicoes: state => state.proposicoes.proposicoes,
      pending: state => state.proposicoes.pending,
      error: state => state.proposicoes.error,
      filter: state => state.filter,
      pageNumber: state => state.filter.pageNumber,
      temperaturas: state => state.temperaturas.temperaturas,
      pautas: state => state.pautas.pautas,
      pressoes: state => state.pressao.ultimasPressoes
    }),
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
}
.content {
  padding: 0vh 0.5rem 0 0.5rem;
}
.sticky {
  display: block;
  position: fixed;
  top: 0;
  z-index: 20;
  background: #fff;
  border-bottom: solid 3px #dadada;
}
.section {
  display: flex;
  flex-direction: column;
  align-items: stretch;
}
</style>
