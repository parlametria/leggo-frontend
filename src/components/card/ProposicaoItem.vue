<template>
  <div class="proposicao-card">
    <div @click="dropShow = !dropShow" class="card-header">
      <proposicao-header :prop="prop" :clicked="dropShow" :dateRef="dateRef"/>
    </div>
    <el-collapse-transition>
      <div v-show="dropShow" class="card-body">
        <div shadow="hover" class="prop-item">

          <p class = "medium-text-field" v-for="(etapa,i) in prop.etapas" :key="i">
            <a class="sigla medium-text-field" :href="etapa.url" target="_blank">{{ etapa.sigla }}</a>
            - {{ $t(etapa.casa) }}
          </p>

          <p class="small-text-field small-margin-top">Autor</p>
          <author-name :author="prop.lastEtapa.autor_nome"/>
          <p class="small-text-field"> {{ casa }}</p>

          <p class="small-text-field small-margin-top">Relator(a):</p>
          <p class="medium-text-field">{{ prop.lastEtapa.relator_nome }}</p>

          <h4>Temperatura</h4>
          <temperature-graphic
            :date="dateRef"
            :id="prop.lastEtapa.id_ext"
            :casa="prop.lastEtapa.casa"
            />
          <temperature-info :id="prop.lastEtapa.id_ext" class="temperature-info"/>

          <eventos-info :id="prop.lastEtapa.id_ext" :casa="prop.lastEtapa.casa" :date="dateRef"/>

          <pautas-info :id="prop.lastEtapa.id_ext" :casa="prop.lastEtapa.casa" :date="dateRef"/>

          <h4>Progresso da Tramitação</h4>
          <fases-progress class="fases-progress" :class="{'visible': dropShow}" :fases="prop.resumo_progresso"/>
          <p class="small-text-field">Desde {{ dataLocalAtual }} na(o) {{ localAtual }}</p>

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
    AuthorName
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
      if (localAtual.startsWith('PL')) {
        localAtual = 'Comissão Especial - ' + localAtual
      }
      return localAtual
    },
    casa () {
      let autores = (this.prop.lastEtapa.autor_nome).split(' - ')
      let casa = ''
      if (autores.length > 1) {
        casa = autores[0]
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
    font-size: 12px;
}
.flex-between {
    display: flex;
    justify-content: space-between;
}
.prop-item {
    padding: 1rem;
}
.el-badge {
    margin: 10px;
}
.proposicao-card {
    position: relative;
    margin-bottom: 0.5rem;
    padding-top: 0.5rem;
    border-bottom: solid 1px #e9e9e9;
    &:hover {
        box-shadow: 0 5px 5px #c6c6c6;
    }
    .card-header {
        cursor: pointer;
    }
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
</style>
