<template>
  <div class="container">
    <div class="em-pauta-tag">
      <pauta-tag :id="prop.lastEtapa.id"/>
      <arquivada-tag :status="prop.lastEtapa.status"/>
    </div>
    <div class="tema"><span class="tag">{{prop.tema}}</span></div>
    <div>
      <span class="prop-apelido">{{prop .apelido}}</span>
      <i class="arrow" :class="{'arrow-down': clicked}" :style="arrowStyle"></i>
    </div>
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
import ArquivadaTag from './collapsed/ArquivadaTag'

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
    PautaTag,
    ArquivadaTag
  }
}
</script>

<style lang="scss" scoped>
.container {
  display: grid;
  grid-template-columns: auto 41px;
  grid-template-rows: auto 16px auto 16px 16px;
  color: #222;
  border: 3px solid #dadada;
  padding: 1rem;
  grid-column-gap: 3rem;
  grid-row-gap: .5rem;
}
.temperatura {
  grid-column: 2/3;
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
  grid-row: 3/4;
  font-size: 14pt;
  margin: .2rem 0;
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
</style>
