<template>
  <div class="container">
      <span v-if="emPauta" class="emPautaTag">em pauta</span>
      <fases :fases="prop.resumo_progresso"/>
      <div style="vertical-align: middle;">
        <span>{{prop.apelido}}</span>
        <span class="selector">></span>
      </div>
      <div class="tags">
        <div class="tag">{{prop.lastEtapa.regime_tramitacao}}</div>
        <div class="tag">{{prop.lastEtapa.forma_apreciacao}}</div>
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
    emPauta: Boolean
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
  flex-wrap: wrap;
  flex-direction: column;
  padding: 0.5rem 1rem;
  background: #000;
  margin: 0px;
  color: white;
  font-size: 16pt;
}

.container  * {
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
  position: absolute;
  right: 0;
  font-size: 60px;
  top: 30px;
}

</style>
