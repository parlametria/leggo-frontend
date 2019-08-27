<template>
  <div
    class="prop-item"
    autofocus>
    <text-tag
      class="tag"
      :etapas="prop.etapas" />
    <div class="links">
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
    <h4>Progresso da Tramitação</h4>
    <fases-progress
      class="fases-progress"
      :class="{'visible': true}"
      :fases="prop.resumo_progresso"
      :etapas="prop.etapas"
    />
    <div
      v-for="(etapa,i) in revChronSortedEtapas"
      :key="i">
      <etapa-proposicao
        :etapa="etapa"
        :id-last-etapa="prop.lastEtapa.id"
        :date="dateRef"/>
    </div>
  </div>
</template>

<script>
import RegimeTramitacao from './collapsed/RegimeTramitacao.vue'
import FormaApreciacao from './collapsed/FormaApreciacao.vue'
import FasesProgress from './expanded/FasesProgress'
import EtapaProposicao from './EtapaProposicao'
import TextTag from './collapsed/TextTag'
import { mapState } from 'vuex'

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
    TextTag
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
    }
  },
  computed: {
    revChronSortedEtapas () {
      function dataApresCasa (a, b) {
        if (a.data_apresentacao < b.data_apresentacao) return 1
        if (a.data_apresentacao > b.data_apresentacao) return -1
        if (a.casa < b.casa) return -1
        if (a.casa > b.casa) return 1
        return 0
      }
      return [...this.prop.etapas].sort(dataApresCasa)
    },
    ...mapState({
      dateRef: state => state.filter.dateRef
    })
  }
}
</script>

<style lang="scss" scoped>
.sigla {
  font-size: 14px;
}
.prop-item {
  padding: 1.5rem 1rem;
}
.small-text-field {
  font-size: 10pt;
  color: gray;
  margin: 0;
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
</style>
