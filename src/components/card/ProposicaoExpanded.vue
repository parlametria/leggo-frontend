<template>
  <div
    class="prop-item"
    autofocus>
    <text-tag
      class="tag"
      :etapas="prop.etapas" />
    <div class="container">
      <div class="portal">
        <p
          class="small-text-field"
          v-for="(etapa,i) in prop.etapas"
          :key="i">
          <a
            class="sigla"
            :href="etapa.url"
            target="_blank">{{ etapa.sigla }}</a>
          - {{ $t(etapa.casa) }}
        </p>
      </div>
      <a
        v-if="prop.advocacy_link !== 'nan' && prop.advocacy_link !== null"
        :href="prop.advocacy_link"
        target="_blank"
        class="advocacy-box bx bx-box"/>
    </div>
    <graphics :prop="prop"/>
    <h5>Progresso da Tramitação</h5>
    <fases-progress
      class="fases-progress"
      :class="{'visible': true}"
      :fases="prop.resumo_progresso"
      :etapas="prop.etapas"
    />
    <div>
      <composicao-link
        :data-local-atual="dataLocalAtual"
        :sigla-comissao-link="siglaParaLink"
        :sigla-comissao-front="siglaFormatada"
        :casa-comissao="prop.lastEtapa.casa"
      />
      <el-row>
        <el-col :span="12">
          <author-name
            class="small-margin-top"
            :author="prop.lastEtapa.autores"
            :casa="casaAutores" />
          <p class="small-text-field small-margin-top">{{ getNomeAutor() }}</p>
          <p class="medium-text-field small-margin-top">{{ prop.lastEtapa.relator_nome }}</p>
          <p class="small-text-field small-margin-top">Relator(a)</p>
        </el-col>
      </el-row>
      <h4>Últimos Eventos</h4>
      <eventos-info
        :id="prop.lastEtapa.id_ext"
        :casa="prop.lastEtapa.casa"
        :date="dateRef" />
    </div>
    <h4>Atividade Parlamentar</h4>
    <h5>Os 15 Parlamentares mais ativos</h5>
    <tab-atores-graphics
      :casa="prop.lastEtapa.casa"
      :sigla="prop.lastEtapa.sigla"
      :top_important_atores="prop.top_important_atores"
      :top_atores="prop.top_atores"
      :id_leggo="prop.id_leggo"
      :apelido="prop.lastEtapa.apelido"/>
    <h5>Rede de Influência</h5>
    <peso-politico-graph :id_leggo="prop.id_leggo"/>
    <h4>Análise das Emendas</h4>
    <div
      v-for="(etapa,i) in revChronSortedEtapas"
      :key="i">
      <etapa-proposicao
        :id_leggo="prop.id_leggo"
        :etapa="etapa"
        :id-last-etapa="prop.lastEtapa.id"
        :casa="getCasa(etapa)"
        :date="dateRef"/>
    </div>
    <div>
      <pautas-info
        :id="prop.lastEtapa.id_ext"
        :casa="prop.lastEtapa.casa"
        :date="dateRef" />
    </div>
  </div>

</template>

<script>
import RegimeTramitacao from './collapsed/RegimeTramitacao.vue'
import FormaApreciacao from './collapsed/FormaApreciacao.vue'
import FasesProgress from './expanded/FasesProgress'
import EtapaProposicao from './EtapaProposicao'
import TextTag from './collapsed/TextTag'
import Graphics from './expanded/Graphics'
import PesoPoliticoGraph from '@/components/card/expanded/rede/PesoPoliticoGraph.vue'
import TabAtoresGraphics from './expanded/atores/TabAtoresGraphics'
import EventosInfo from './expanded/EventosInfo'
import ComposicaoLink from './expanded/ComposicaoLink'
import PautasInfo from './expanded/PautasInfo'
import AuthorName from './expanded/AuthorName'
import { mapState } from 'vuex'
import moment from 'moment'

export default {
  name: 'Proposicaoitem',
  data () {
    return {
      dropShow: false
    }
  },
  props: {
    prop: {
      type: Object,
      default: undefined
    }
  },
  components: {
    RegimeTramitacao,
    FormaApreciacao,
    FasesProgress,
    EtapaProposicao,
    TextTag,
    Graphics,
    PesoPoliticoGraph,
    TabAtoresGraphics,
    EventosInfo,
    ComposicaoLink,
    PautasInfo,
    AuthorName
  },
  methods: {
    hasNumber (myString) {
      return /\d/.test(myString)
    },
    getNomeAutor () {
      return this.prop.lastEtapa.autores.length > 1 ? 'Autores' : 'Autor'
    },
    capitalizeFirstLetter (str) {
      return str.charAt(0).toUpperCase() + str.slice(1)
    },
    getCasa (etapa) {
      if (this.prop.etapas[0].sigla_tipo === 'MPV') {
        if (this.prop.etapas.length === 1 || (this.prop.lastEtapa.casa === 'senado' && etapa.casa === 'senado')) {
          return 'Congresso'
        }
      }

      return etapa.casa
    }
  },
  computed: {
    revChronSortedEtapas () {
      function dataApresCasa (a, b) {
        if (a.sigla_tipo === 'MPV' & b.sigla_tipo === 'MPV') {
          if (a.casa < b.casa) return 1
          if (a.casa > b.casa) return -1
        } else {
          if (a.data_apresentacao < b.data_apresentacao) return 1
          if (a.data_apresentacao > b.data_apresentacao) return -1
        }
      }
      return [...this.prop.etapas].sort(dataApresCasa)
    },
    casaAutores () {
      let autores = this.prop.lastEtapa.autores
      let casaOrigem = this.prop.casa_origem
      let casa = ''
      if (autores === 'Poder Executivo') {
        casa = ''
      } else if (casaOrigem === 'senado' || casaOrigem === 'Senado Federal') {
        casa = 'Senado Federal'
      } else {
        casa = 'Câmara dos Deputados'
      }

      return casa
    },
    siglaParaLink () {
      let siglaParaLink = this.localAtual
      if (
        this.localAtual === 'Comissão Especial' ||
        this.localAtual === 'Plenário' ||
        this.localAtual === 'Presidência da República'
      ) {
        siglaParaLink = this.siglaLocalAtual
      }
      if (this.hasNumber(siglaParaLink)) {
        siglaParaLink = siglaParaLink.replace(/\s/g, '').split('/')
        siglaParaLink = siglaParaLink[0]
      }
      return siglaParaLink.replace(/\(|\)/g, '')
    },
    localAtual () {
      const locais = this.prop.lastEtapa.resumo_tramitacao
      const localAtual = locais[locais.length - 1].local
      return localAtual
    },
    siglaLocalAtual () {
      const locais = this.prop.lastEtapa.resumo_tramitacao
      const siglaLocalAtual = locais[locais.length - 1].sigla_local
      return siglaLocalAtual
    },
    siglaFormatada () {
      let siglaFormatada = this.localAtual
      if (this.localAtual === 'Comissão Especial') {
        siglaFormatada = this.siglaLocalAtual
      }
      if (this.hasNumber(siglaFormatada)) {
        siglaFormatada = 'Comissão Especial - ' + siglaFormatada
      }
      return siglaFormatada
    },
    dataLocalAtual () {
      const data = this.prop.lastEtapa.resumo_tramitacao.slice(-1)[0].data
      return moment(data).format('DD/MM/YYYY')
    },
    emPauta () {
      return this.etapa.emPauta
    },
    ...mapState({
      dateRef: state => state.filter.dateRef,
      pautas: state => state.pautas.pautas
    })
  }
}
</script>

<style lang="scss" scoped>
@import "@/base.scss";
@import url('https://unpkg.com/boxicons@2.0.3/css/boxicons.min.css');
.sigla {
  font-size: 14px;
}
.prop-item {
  padding: 1.5rem 1rem;
}
.small-text-field {
  font-size: 10pt;
  color: gray;
  margin: 10px 10px 10px 0;
}
.fases-progress {
  visibility: hidden;
  opacity: 0;
}
.visible {
  visibility: visible;
  opacity: 1;
  transition: opacity 1s linear;
}
.tag {
  padding-bottom: 5px;
  font-size: 11pt;
}
.container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-right: 10px;
}
.portal {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-evenly;
}
.advocacy-box {
  justify-content: center;
  color: $--color-primary;
  font-size: 2rem;
}
</style>
