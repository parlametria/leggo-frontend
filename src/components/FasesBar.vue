<template>
  <div class="fasesBlock">
    <div v-for="(fase,i) in fases" :key="i" class="fase" :class="geraEstilo(fase)">
      <div v-if="isAtualFase(fase)" class="triangulo"></div>
      <div class="tooltip">
        <h5>{{ fase.local }} - {{ fase.fase_global }}</h5>
        <div class="tooltiptriangulo"></div>
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
      return new Date(fase.data_inicio) < now && new Date(fase.data_fim) < now
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
    border: 1px #000 solid;
    border-right: 0px;
    background-color: #EEE;
}
.fase:hover{
  .tooltip{
    visibility: visible;
  }
}
.fase:last-child {
    border-right: 1px #000 solid;
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
.triangulo {
    width: 0;
    height: 0;
    margin-top: -8px;
    margin-left: 20px;
    border-left: 3px solid transparent;
    border-right: 3px solid transparent;
    border-top: 6px solid rgb(255, 20, 20);
}
.tooltiptriangulo{
    width: 0;
    height: 0;
    position: inherit;
    margin-top: -35px;
    margin-left: -10px;
    border-right: 5px solid rgba(77, 76, 128, 0.7);
    border-bottom: 5px solid transparent;
    border-top: 5px solid transparent;
}
.tooltip {
  border-radius: 6px;
  position: absolute;
  text-align: center;
  width: auto;
  height: auto;
  background-color: rgba(77, 76, 128, 0.7);
  color: #FFF;
  pointer-events: none;
  padding: 5px;
  z-index: 1000;
  float: right;
  margin-top: -20px;
  margin-left: 40px;
  
 }
</style>
