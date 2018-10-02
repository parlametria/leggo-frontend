<template>
  <div class="fasesBlock">
    <div v-for="(fase,i) in fases" :key="i" class="fase" :class="geraEstilo(fase)" >
      <div v-if="isAtualFase(fase)" class="triangulo"></div>
      <div class="tooltip">
        <h5>{{ fase.local }} - {{ fase.fase_global }}</h5>
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
    margin-right: 2px;
}
.fase:hover{
  .tooltip{
    visibility: visible;
  }
}
.fase:last-child {
    border: none;
    box-shadow: 3px 3px 10px #9b9b9b;
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
</style>