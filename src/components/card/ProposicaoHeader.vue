<template>
  <div class="container">
    <fases class="fases" :fases="prop.resumo_progresso"/>
    <pressure-bar class="pressao" :id="prop.lastEtapa.id_ext"/>
    <span class="prop-apelido">{{prop.apelido}}</span>
    <div class="tags">
      <div class="tag">{{prop.lastEtapa.regime_tramitacao}}</div>
      <div class="tag">{{prop.lastEtapa.forma_apreciacao}}</div>
    </div>
    <div class="selector">
      <span class="arrow" :class="{'arrow-down': clicked}"/>
    </div>
  </div>
</template>

<script>
import RegimeTramitacao from './collapsed/RegimeTramitacao.vue'
import FormaApreciacao from './collapsed/FormaApreciacao.vue'
import FaseAtualBlock from './collapsed/FaseAtualBlock.vue'
import Fases from './collapsed/Fases.vue'
import PressureBar from './collapsed/PressureBar.vue'

export default {
  name: 'proposicaoheader',
  props: {
    prop: Object,
    emPauta: Array,
    clicked: Boolean
  },
  components: {
    RegimeTramitacao,
    FormaApreciacao,
    FaseAtualBlock,
    Fases,
    PressureBar
  },
  computed: {
    eventos () {
      return [
        { data: '10-10-2010', evento: 'Audiência pública', local: 'CCJ' },
        { data: '12-10-2010', evento: 'Outro evento', local: 'CAPADR' }
      ]
    }
  }
}
</script>

<style scoped>
.container {
  display: grid;
  grid-template-columns: 41px auto 30px;
  grid-template-rows: 25px auto auto;
  background: #000;
  color: #fff;
  grid-row-gap: .3rem;
}
.fases {
  justify-self: end;
  margin: .3rem 1rem;
}
.pressao {
  grid-column: 1/2;
  grid-row: 1/4;
}
.prop-apelido {
  grid-column: 2/3;
  grid-row: 2/3;
  margin: 0 .5rem;
}
.tags {
  grid-column: 2/3;
  grid-row: 3/4;
  margin: .5rem;
}
.tag {
  font-size: 8pt;
  user-select: none;
  text-transform: uppercase;
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
  transform: rotate(-45deg);
  transition: transform .5s;
  border-radius: 1px;
}
.arrow-down {
  transform: rotate(45deg);
}
</style>
