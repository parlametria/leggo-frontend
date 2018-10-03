<template>
  <div class="fasesBlock">
    <div v-for="(fase,i) in fases" :key="i">
      <div v-if="i == fases.length -1" class="arrow-down"></div>
      <div v-else class="padding"></div>
      <div class="fase" :class="geraEstilo(fase)">
        <div class="tooltip">
        <h5>{{ fase.local }} - {{ fase.fase_global }}</h5>
      </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FasesBar',
  props: {
    fases: Array
  },
  methods: {
    geraEstilo (fase) {
      return {
        'faseConcluida': this.isFaseConcluida(fase),
        'faseAtual': this.isAtualFase(fase),
        'faseSenado': fase.local_casa === 'senado',
        'faseCamara': fase.local_casa === 'camara'
      }
    },
    isFaseConcluida (fase) {
      const now = Date.now()
      return new Date(fase.data_fim) < now
    },
    isAtualFase (fase) {
      const now = Date.now()
      return new Date(fase.data_inicio) < now && new Date(fase.data_fim) >= now
    }
  }
}
</script>

<style lang="scss" scopped>
 .fasesBlock {
    display: inline-flex;
    padding: 3px;
}
.fase {
    width: 30px;
    height: 30px;
    background-color: #EEE;
    margin-right: 3px;
}
.fase:hover{
  .tooltip{
    visibility: visible;
  }
}
.fase:last-child {

}
.cerrilhado {
    background: repeating-linear-gradient(-45deg, white, white 2px, tomato 0, tomato 4px);
    display: block;
}
.fase .tooltip {
  visibility: hidden;
}
.faseConcluida.faseSenado{
    background-color: #a6cee3;
}
.faseConcluida.faseCamara{
    background-color: #b2df8a;
}
.faseAtual.faseSenado{
    background-color: #1f78b4;
}
.faseAtual.faseCamara{
    background-color: #33a02c;
}
.tooltip {
  position: absolute;
  text-align: center;
  width: auto;
  height: auto;
  background-color: rgb(150,150,150);
  color: #FFF;
  pointer-events: none;
  padding: 5px;
  z-index: 100;
}

.arrow-down {
  margin-left: 10px;
  border: solid rgb(211, 83, 83);
  border-width: 0 2px 2px 0;
  display: inline-block;
  padding: 3px;
  transform: rotate(45deg);
  -webkit-transform: rotate(45deg);
}

.padding {
  padding-top: 18px;
}
</style>
