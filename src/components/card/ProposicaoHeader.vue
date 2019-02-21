<template>
  <div class="container">
    <div class="head">
      <pauta-tag class="tag-pauta" :id="prop.lastEtapa.id"/>
      <fases class="fases" :class="{'hidden': clicked, 'visible': !clicked}" :fases="prop.resumo_progresso"/>
    </div>
    <temperature-bar class="temperatura" :id="prop.lastEtapa.id"/>
    <span class="prop-apelido">{{prop .apelido}}</span>
    <div class="tags">
        <span class="tag">{{prop.lastEtapa.regime_tramitacao}}</span>
        <span class="tag">{{prop.lastEtapa.forma_apreciacao}}</span>
    </div>
    <div class="selector">
      <span class="arrow" :class="{'arrow-down': clicked}"/>
    </div>
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
  grid-template-columns: 41px auto 30px;
  grid-template-rows: auto auto auto;
  background: #444444;
  color: #fff;
  grid-row-gap: 1.5rem;
}

.head {
  grid-column: 2/3;
  grid-row: 1/2;
  padding-left: .5rem;
  padding-top: .4rem;
  display: grid;
  justify-content: space-between;
  flex-wrap: wrap-reverse;

  .pauta-tag {
    grid-column: 1;
  }

  .fases {
    grid-column: 2;
  }
}

.temperatura {
  grid-column: 1/2;
  grid-row: 1/4;
}

.prop-apelido {
  grid-column: 2/3;
  grid-row: 2/3;
  margin-left: .6rem;
  font-size: 16pt;
}

.tags {
  grid-column: 2/3;
  grid-row: 3/4;
  margin-bottom: .9rem;
  margin-left: .5rem;
}

.tag {
  font-size: 8pt;
  user-select: none;
  text-transform: uppercase;
  margin: 0 3px;
  color: #FFF;
  border-color: #FFF;
  width: 85px;
  margin-bottom: 20px;
  margin-right: 20px;
  text-align: center;
}
.selector {
  grid-column: 3/4;
  grid-row: 1/4;
  display: flex;
  align-items: center;
}
.arrow {
  height: 10px;
  width: 10px;
  border: solid #fff;
  border-width: 0px 4px 4px 0;
  transform: rotate(45deg);
  transition: transform .5s;
  border-radius: 1px;
}
.arrow-down {
  transform: rotate(225deg);
}

@keyframes float {
    0% {
        box-shadow: 0 5px 15px 0px rgba(0,0,0,0.6);
        transform: translatey(0px);
    }
    50% {
        box-shadow: 0 25px 15px 0px rgba(0,0,0,0.2);
        transform: translatey(-3px);
    }
    100% {
        box-shadow: 0 5px 15px 0px rgba(0,0,0,0.6);
        transform: translatey(0px);
    }
}
</style>
