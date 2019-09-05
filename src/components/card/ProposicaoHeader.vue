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
      <span class="prop-apelido">{{ prop.lastEtapa.sigla }} - {{ prop .apelido }}</span>
    </div>
    <fases
      class="fases"
      :class="{'hidden': clicked, 'visible': !clicked}"
      :fases="prop.resumo_progresso"/>
    <div class="tags">
      <span class="tag">{{ prop.lastEtapa.regime_tramitacao }}</span>
      <span class="tag">{{ prop.lastEtapa.forma_apreciacao }}</span>
    </div>
    <temperature-bar
      class="temperatura"
      :id="prop.id"/>
    <pressure-bar
      class="pressao"
      :ultima_pressao="prop.lastEtapa.ultima_pressao"/>
  </div>
</template>

<script>
import RegimeTramitacao from './collapsed/RegimeTramitacao.vue'
import FormaApreciacao from './collapsed/FormaApreciacao.vue'
import Fases from './collapsed/Fases.vue'
import TemperatureBar from './collapsed/TemperatureBar.vue'
import PressureBar from './collapsed/PressureBar.vue'
import PautaTag from './collapsed/PautaTag'
import TextTag from './collapsed/TextTag'
import Temas from './collapsed/Temas.vue'

import { mapState, mapActions } from 'vuex'

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
    TemperatureBar,
    PressureBar,
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
  .tag {
    font-size: 9pt;
    user-select: none;
    color: #222;
    border-color: #222;
    width: 85px;
    text-align: center;
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
</style>
