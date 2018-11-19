<template>
  <div class="container">
      <span v-if="prop.lastEtapa.em_pauta" class="emPautaTag">em pauta</span>
      <fases :fases="prop.resumo_progresso"/>
      <div>
        <span>{{prop.apelido}}</span>
      </div>
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
import FasesProgress from './collapsed/FasesProgress.vue'
import FaseAtualBlock from './collapsed/FaseAtualBlock.vue'
import Fases from './collapsed/Fases.vue'

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
    Fases
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
    justify-content: space-between;
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

.content  * {
    margin: 3px 0;
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
    margin-left: 1rem;
}

.arrow {
    position: absolute;
    right: 1rem;
    top: 0;
    bottom: 0;
    margin-top: auto;
    margin-bottom: auto;
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
