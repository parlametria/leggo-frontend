<template>
  <div>
    <br>
    <h3> Etapa {{ isLastEtapa? 'Mais Recente' : 'Anterior' }}: {{ etapa.sigla }} - {{ capitalizeFirstLetter(casa) }}</h3>
    <br>
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
            :casa="casaAutores" />
          <p class="small-text-field small-margin-top">{{ getNomeAutor() }}</p>
          <p class="medium-text-field small-margin-top">{{ etapa.relator_nome }}</p>
          <p class="small-text-field small-margin-top">Relator(a)</p>
        </el-col>
      </el-row>
      <h4>Últimos Eventos</h4>
      <eventos-info
        :id="etapa.id_ext"
        :casa="etapa.casa"
        :date="date" />
      <h4>Rede de Influência - Coautorias</h4>
      <influencia-graph :id_leggo = "id_leggo"/>
    </div>
    <h4>Atividade Parlamentar</h4>
    <tab-atores-graphics
      :casa="etapa.casa"
      :sigla="etapa.sigla"
      :top_important_atores="etapa.top_important_atores"
      :top_atores="etapa.top_atores"
      :id_leggo="id_leggo"
      :apelido="etapa.apelido"/>
    <h4>Análise das Emendas</h4>
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
import PautasInfo from './expanded/PautasInfo'
import TabAtoresGraphics from './expanded/atores/TabAtoresGraphics'
import AuthorName from './expanded/AuthorName'
import EventosInfo from './expanded/EventosInfo'
import EmendasInfo from './expanded/EmendasInfo'
import ComposicaoLink from './expanded/ComposicaoLink'
import InfluenciaGraph from '@/components/card/expanded/rede/InfluenciaGraph.vue'
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
    id_leggo: {
      type: Number,
      default: -1
    },
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
    },
    casa: {
      type: String,
      default: ''
    }
  },
  components: {
    PautasInfo,
    EventosInfo,
    EmendasInfo,
    AuthorName,
    ComposicaoLink,
    TabAtoresGraphics,
    InfluenciaGraph
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
      if (this.etapa.sigla_tipo === 'MPV') {
        return this.etapa.id !== this.idLastEtapa
      }
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
    casaAutores () {
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
.small-margin-top {
  padding-top: 5px;
}
</style>
