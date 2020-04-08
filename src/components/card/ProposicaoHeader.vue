<template>
  <div class="container">

    <div class="header-tags">
      <pauta-tag
        v-for="(pauta, i) in filteredPautas"
        :key="i"
        :pauta="pauta"
        :date-ref="dateRef"/>
      <text-tag
        class="tag"
        :etapas="prop.etapas" />
    </div>
    <temas :temas="prop.temas"/>

    <div>
      <span
        v-if="prop.apelido !== 'nan'"
        class="prop-apelido">{{ prop.lastEtapa.sigla }} - {{ prop.apelido }}</span>
      <span
        v-else
        class="prop-apelido">{{ prop.lastEtapa.sigla }}</span>
    </div>
    <fases
      class="fases"
      :class="{'hidden': clicked, 'visible': !clicked}"
      :fases="prop.resumo_progresso"/>
    <div class="tags">
      <span class="tag">{{ prop.lastEtapa.regime_tramitacao }}</span>
      <span class="tag">{{ prop.lastEtapa.forma_apreciacao }}</span>
      <a
        v-if="prop.advocacy_link !== 'nan' && prop.advocacy_link !== null"
        class="advocacy-box bx bx-box"/>
    </div>
    <bar
      class="temperatura"
      :ultimo_valor="prop.ultima_temperatura"
      :cor="'#9b5498'"
      :max_valor="maxTemperatura"
      :tooltip-texto="'Temperatura da Semana'"
    />
    <bar
      class="pressao"
      :ultimo_valor="prop.ultima_pressao*100"
      :cor="'#FFAB0F'"
      :max_valor="100"
      :tooltip-texto="'Pressão da Semana'"/>
  </div>
</template>

<script>
import RegimeTramitacao from './collapsed/RegimeTramitacao.vue'
import FormaApreciacao from './collapsed/FormaApreciacao.vue'
import Fases from './collapsed/Fases.vue'
import Bar from './collapsed/Bar.vue'
import PautaTag from './collapsed/PautaTag'
import TextTag from './collapsed/TextTag'
import Temas from './collapsed/Temas.vue'

import { mapState, mapActions, mapGetters } from 'vuex'

export default {
  name: 'Proposicaoheader',
  props: {
    prop: {
      type: Object,
      default: undefined
    },
    clicked: {
      type: Boolean,
      default: false
    }
  },
  components: {
    RegimeTramitacao,
    FormaApreciacao,
    Fases,
    Bar,
    PautaTag,
    TextTag,
    Temas
  },
  methods: {
    ...mapActions(['getPautas'])
  },
  computed: {
    ...mapState({
      dateRef: state => state.filter.dateRef,
      pautas: state => state.pautas.pautas
    }),
    ...mapGetters(['maxTemperatura']),
    filteredPautas () {
      const id = this.prop.lastEtapa.id
      if (this.pautas && this.pautas[id] && this.pautas[id].length > 0) {
        const result = this.pautas[id]
        return result.reverse()
      }
      return []
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  display: grid;
  grid-template-columns: auto 41px 41px;
  grid-template-rows: auto 16px auto 16px 16px;
  color: #222;
  border: 3px solid #dadada;
  padding: 1rem;
  grid-column-gap: 1.5rem;
  grid-row-gap: .5rem;
}
.temperatura {
  grid-column: 2/3;
  grid-row: 1/6;
  border: 2px solid #dadada;
}
.pressao {
  grid-column: 3/3;
  grid-row: 1/6;
  border: 2px solid #dadada;
}
.tags {
  grid-column: 1/2;
  grid-row: 5/6;
  margin-top: -6px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  .tag {
    font-size: 9pt;
    user-select: none;
    color: #222;
    border-color: #222;
    width: auto;
    text-align: start;
    margin-right: 1rem;
  }
}
.fases {
  grid-column: 1/2;
  grid-row: 4/5;
}
.prop-apelido {
  grid-column: 1/2;
  grid-row: 2/3;
  font-size: 14pt;
  margin: .2rem 0;
}
.header-tags {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: baseline;
}
@media (min-width: 768px) {
  .prop-apelido {
    font-size: 17pt;
  }
}

.tema {
  grid-column: 1/2;
  grid-row: 2/3;
  font-size: 9pt;
}
 .arrow {
  position: absolute;
  margin-left: 1rem;
  margin-top: 0.3rem;
  margin-bottom: auto;
  height: 10px;
  width: 10px;
  border: solid #222;
  border-width: 0px 2px 2px 0;
  transform: rotate(45deg);
}
 .arrow-down {
  margin-top: 0.6rem;
  border-width: 2px 0px 0px 2px;
}

.tag {
  font-size: 9pt;
}

.advocacy-box {
  justify-content: center;
  color: rgb(84, 84, 84);
}
</style>
