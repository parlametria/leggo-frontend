<template>
  <div>
    <h4>Etapa {{ isLastEtapa? 'Mais Recente' : 'Anterior' }}: {{ etapa.sigla }} - {{ capitalizeFirstLetter(etapa.casa) }}</h4>
    <div v-if="isLastEtapa">
      <composicao-link
        :data-local-atual="dataLocalAtual"
        :sigla-comissao-link="siglaParaLink"
        :sigla-comissao-front="siglaFormatada"
        :casa-comissao="etapa.casa"
      />
      <el-row>
        <el-col :span="12">
          <author-name
            class="small-margin-top"
            :author="etapa.autores"
            :casa="casa" />
          <p class="small-text-field small-margin-top">{{ getNomeAutor() }}</p>
          <p class="medium-text-field small-margin-top">{{ etapa.relator_nome }}</p>
          <p class="small-text-field small-margin-top">Relator(a)</p>
        </el-col>
        <el-col
          :span="12"
          :xs="24"
          class="temperaturas-container">
          <temperature-graphic :id="etapa.id" />
          <temperature-info
            :id="etapa.id_ext"
            class="temperature-info" />
        </el-col>
      </el-row>
      <eventos-info
        :id="etapa.id_ext"
        :casa="etapa.casa"
        :date="date" />
    </div>
    <h5>Atividade Parlamentar</h5>
    <tab-atores-graphics
      :id="etapa.id"
      :casa="etapa.casa"
      :sigla="etapa.sigla" />
    <h5>Análise das Emendas</h5>
    <emendas-info
      :id="etapa.id_ext"
      :casa="etapa.casa"
      :date="date"
      :prop-name="etapa.sigla" />
    <div v-if="isLastEtapa">
      <pautas-info
        :id="etapa.id_ext"
        :casa="etapa.casa"
        :date="date" />
    </div>
  </div>
</template>

<script>
import TemperatureGraphic from './expanded/temperature/TemperatureGraphic'
import PautasInfo from './expanded/PautasInfo'
import TemperatureBar from './collapsed/TemperatureBar'
import TemperatureInfo from './expanded/temperature/TemperatureInfo'
import TabAtoresGraphics from './expanded/atores/TabAtoresGraphics'
import AuthorName from './expanded/AuthorName'
import EventosInfo from './expanded/EventosInfo'
import EmendasInfo from './expanded/EmendasInfo'
import ComposicaoLink from './expanded/ComposicaoLink'
import { mapState } from 'vuex'
import moment from 'moment'

export default {
  name: 'Etapaproposicao',
  data () {
    return {
      dropShow: false
    }
  },
  props: {
    etapa: {
      type: Object,
      default: undefined
    },
    idLastEtapa: {
      type: Number,
      default: -1
    },
    date: {
      type: Date,
      default: function () {
        return moment()
      }
    }
  },
  components: {
    TemperatureGraphic,
    PautasInfo,
    TemperatureBar,
    TemperatureInfo,
    EventosInfo,
    EmendasInfo,
    AuthorName,
    ComposicaoLink,
    TabAtoresGraphics
  },
  methods: {
    hasNumber (myString) {
      return /\d/.test(myString)
    },
    getNomeAutor () {
      return this.etapa.autores.length > 1 ? 'Autores' : 'Autor'
    },
    capitalizeFirstLetter (str) {
      return str.charAt(0).toUpperCase() + str.slice(1)
    }
  },
  computed: {
    emPauta () {
      return this.etapa.emPauta
    },
    isLastEtapa () {
      return this.etapa.id === this.idLastEtapa
    },
    dataLocalAtual () {
      const data = this.etapa.resumo_tramitacao.slice(-1)[0].data
      return moment(data).format('DD/MM/YYYY')
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
      const locais = this.etapa.resumo_tramitacao
      const localAtual = locais[locais.length - 1].local
      return localAtual
    },
    siglaLocalAtual () {
      const locais = this.etapa.resumo_tramitacao
      const siglaLocalAtual = locais[locais.length - 1].sigla_local
      return siglaLocalAtual
    },
    casa () {
      let autores = this.etapa.autores
      let casaOrigem = this.etapa.casa_origem
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
      pautas: state => state.pautas.pautas
    })
  }
}
</script>

<style lang="scss" scoped>
.small-text-field {
  font-size: 10pt;
  color: gray;
  margin: 0;
}
.big-text-field {
  margin-top: 0px;
  font-size: 22px;
  margin-bottom: 0px;
}
.medium-text-field {
  font-size: 12pt;
  margin: 0;
}
.temperature-info {
  font-size: 12px;
}
.temperature-area {
  margin-bottom: 20px;
}
.temperaturas-container {
  padding-top: 15px;
}
.small-margin-top {
  padding-top: 5px;
}
</style>
