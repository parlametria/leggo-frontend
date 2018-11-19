<template>
  <div class="container">
    <pressure-bar :id="prop.lastEtapa.id_ext"/>
    <div class="content">
      <span v-if="emPauta" class="emPautaTag">em pauta</span>
      <fases :fases="prop.resumo_progresso"/>
      <div>
        <span>{{prop.apelido}}</span>
      </div>
      <div class="tags">
        <div class="tag">{{prop.lastEtapa.regime_tramitacao}}</div>
        <div class="tag">{{prop.lastEtapa.forma_apreciacao}}</div>
      </div>
    </div>
    <div class="selector">
      <span class="arrow" :class="{'arrow-down': clicked}"/>
    </div>
  </div>
</template>

<script>
import RegimeTramitacao from './collapsed/RegimeTramitacao.vue'
import FormaApreciacao from './collapsed/FormaApreciacao.vue'
import FasesProgress from './collapsed/FasesProgress.vue'
import FaseAtualBlock from './collapsed/FaseAtualBlock.vue'
import Fases from './collapsed/Fases.vue'
import PressureBar from './collapsed/PressureBar.vue'

export default {
  name: 'proposicaoheader',
  props: {
    prop: Object,
    emPauta: Boolean,
    clicked: Boolean
  },
  components: {
    RegimeTramitacao,
    FormaApreciacao,
    FasesProgress,
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
    display: flex;
    background: #000;
}

.content {
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    padding: 0.5rem 1rem;
    margin: 0px;
    color: white;
    font-size: 16pt;
}

.content > * {
    margin: 3px 0;
}

.content .tags * {
  margin-bottom: 3px;
}

.emPautaTag {
    background-color: white;
    color:black;
    text-decoration: underline;
    font-style: italic;
    font-size: 9pt;
    padding: 2px;
    user-select: none;
    width: 55px;
}

.tag {
    font-size: 8pt;
    user-select: none;
    text-transform: uppercase;
}

.tags {
    margin-top: 5px;
    color: #ffdf
}

.selector {
    position: relative;
    display: flex;
    align-items: center;
    margin-left: auto;
}

.arrow {
    margin: auto 1rem;
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
