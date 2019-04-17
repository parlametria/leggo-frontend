<template>
  <div class="proposicao-card">
    <div @click="dropShow = !dropShow" class="card-header">
      <proposicao-header :prop="prop" :clicked="dropShow"/>
    </div>
    <el-collapse-transition>
      <div v-if="dropShow" class="card-body">
        <div class="prop-item">

          <div class="links">
            <p class="small-text-field" v-for="(etapa,i) in prop.etapas" :key="i">
              <a class="sigla" :href="etapa.url" target="_blank">{{ etapa.sigla }}</a>
              - {{ $t(etapa.casa) }}
            </p>
          </div>

          <h4>Progresso da Tramitação</h4>
          <fases-progress class="fases-progress" :class="{'visible': dropShow}" :fases="prop.resumo_progresso" :etapas="prop.etapas"/>
          <composicao-link :dataLocalAtual="dataLocalAtual" :siglaComissao="localAtual" :casaComissao="prop.lastEtapa.casa"></composicao-link>

          <el-row>
            <el-col :span="12">
              <p class="small-text-field small-margin-top">Autor(es)</p>
              <author-name :author="prop.lastEtapa.autores" :casa="casa"/>
              <p class="small-text-field small-margin-top">Relator(a)</p>
              <p class="medium-text-field">{{ prop.lastEtapa.relator_nome }}</p>
            </el-col>
            <el-col :span="12">
              <temperature-graphic :id="prop.lastEtapa.id" />
              <temperature-info :id="prop.lastEtapa.id_ext" class="temperature-info"/>
            </el-col>
          </el-row>

          <eventos-info :id="prop.lastEtapa.id_ext" :casa="prop.lastEtapa.casa" :date="dateRef"/>

          <emendas-info :id="prop.lastEtapa.id_ext" :casa="prop.lastEtapa.casa" :date="dateRef"/>
          <pautas-info :id="prop.lastEtapa.id_ext" :casa="prop.lastEtapa.casa" :date="dateRef"/>

        </div>
      </div>
    </el-collapse-transition>
  </div>
</template>

<script>
import ProposicaoHeader from './ProposicaoHeader'
import RegimeTramitacao from './collapsed/RegimeTramitacao.vue'
import FormaApreciacao from './collapsed/FormaApreciacao.vue'
import TemperatureGraphic from './expanded/temperature/TemperatureGraphic'
import FasesProgress from './expanded/FasesProgress'
import PautasInfo from './expanded/PautasInfo'
import TemperatureBar from './collapsed/TemperatureBar'
import TemperatureInfo from './expanded/temperature/TemperatureInfo'
import AuthorName from './expanded/AuthorName'
import EventosInfo from './expanded/EventosInfo'
import EmendasInfo from './expanded/EmendasInfo'
import ComposicaoLink from './expanded/ComposicaoLink'
import { mapState } from 'vuex'
import moment from 'moment'

export default {
  name: 'proposicaoitem',
  data () {
    return {
      dropShow: false
    }
  },
  components: {
    RegimeTramitacao,
    FormaApreciacao,
    TemperatureGraphic,
    ProposicaoHeader,
    PautasInfo,
    FasesProgress,
    TemperatureBar,
    TemperatureInfo,
    EventosInfo,
    EmendasInfo,
    AuthorName,
    ComposicaoLink
  },
  methods: {
    hasNumber: function (myString) {
      return /\d/.test(myString)
    }
  },
  computed: {
    emPauta () {
      return this.prop.lastEtapa.emPauta
    },
    dataLocalAtual () {
      const data = this.prop.lastEtapa.resumo_tramitacao.slice(-1)[0].data
      return moment(data).format('DD/MM/YYYY')
    },
    localAtual () {
      let locais = this.prop.lastEtapa.resumo_tramitacao
      let localAtual = locais[locais.length - 1].local
      if (this.hasNumber(localAtual)) {
        localAtual = 'Comissão Especial - ' + localAtual
      }
      return localAtual
    },
    casa () {
      let autores = (this.prop.lastEtapa.autores)
      let casaOrigem = (this.prop.lastEtapa.casa_origem)
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
    ...mapState({
      dateRef: state => state.filter.dateRef,
      pautas: state => state.pautas.pautas
    })
  },
  props: {
    prop: Object
  }
}
</script>

<style lang="scss" scoped>
.sigla {
    font-size: 14px;
}
.flex-between {
    display: flex;
    justify-content: space-between;
}
.prop-item {
    padding: 1.5rem;
}
.el-badge {
    margin: 10px;
}
.proposicao-card {
    position: relative;
    margin-bottom: 0.5rem;
    padding-top: 0.5rem;
    .card-header {
        cursor: pointer;
    }
}
.card-body {
  border: 1px solid #dadada;
  border-top: none;
}
.flex {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
}
.small-text-field {
    font-size: 10pt;
    color: gray;
    margin: 0;
}
.big-text-field{
    margin-top: 0px;
    font-size: 22px;
    margin-bottom: 0px;
}
.medium-text-field{
    font-size: 12pt;
    margin: 0;
}

.temperature-info {
  font-size: 12px;
}

.temperature-area {
  margin-bottom: 20px;
}

.fases-progress {
  visibility: hidden;
  opacity: 0;
}
.small-margin-top {
    margin-top: 10px;
}
.visible {
  visibility: visible;
  opacity: 1;
  transition: opacity 1s linear;
}
.status-bar {
  padding-top: 1rem;
}
</style>
