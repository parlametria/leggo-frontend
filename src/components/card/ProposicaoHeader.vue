<template>
  <div class="container">
    <div class="em-pauta-tag"><pauta-tag :id="prop.lastEtapa.id"/></div>
    <div class="tema"><span class="tag">{{prop.tema}}</span></div>
    <span class="prop-apelido">{{prop .apelido}}</span>
    <fases class="fases" :class="{'hidden': clicked, 'visible': !clicked}" :fases="prop.resumo_progresso"/>
    <div class="tags">
        <span class="tag">{{prop.lastEtapa.regime_tramitacao}}</span>
        <span class="tag">{{prop.lastEtapa.forma_apreciacao}}</span>
    </div>
    <temperature-bar class="temperatura" :id="prop.lastEtapa.id"/>
  </div>
</template>

<script>
import RegimeTramitacao from './collapsed/RegimeTramitacao.vue'
import FormaApreciacao from './collapsed/FormaApreciacao.vue'
import Fases from './collapsed/Fases.vue'
import TemperatureBar from './collapsed/TemperatureBar.vue'
import PautaTag from './collapsed/PautaTag'

export default {
  name: 'proposicaoheader',
  props: {
    prop: Object,
    clicked: Boolean
  },
  components: {
    RegimeTramitacao,
    FormaApreciacao,
    Fases,
    TemperatureBar,
    PautaTag
  }
}
</script>

<style lang="scss" scoped>
.container {
  display: grid;
  grid-template-columns: auto 41px;
  grid-template-rows: auto 16px auto 16px 16px;
  color: #222;
  border: 1px solid #222;
  padding-left: .5rem;
  grid-column-gap: 3rem;
  grid-row-gap: .5rem;
}
.temperatura {
  grid-column: 2/3;
  grid-row: 1/6;
  border-left: 1px solid #222;
  border-right: 1px solid #222;
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
  grid-row: 3/4;
  font-size: 14pt;
  margin: .2rem 0;
}
.tema {
  grid-column: 1/2;
  grid-row: 2/3;
  font-size: 9pt;
}
</style>
