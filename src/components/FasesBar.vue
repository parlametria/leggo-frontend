<template>
  <div class="fasesBlock">
    <div v-for="(fase,i) in fases" :key="i" class="fase" :class="geraEstilo(fase)">
      <div v-if="isAtualFase(fase)" class="triangulo"></div>
      {{ fase.nome }}
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
        'faseSenado': fase.casa === 'senado',
        'faseCamara': fase.casa === 'camara'
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
<style lang="scss" scoped>
.fasesBlock {
    display: inline-flex;
    padding: 3px;
}
.fase {
    width: 50px;
    height: 30px;
    border: 1px #000 solid;
    border-right: 0px;
    background-color: #EEE;
}
.fase:last-child {
    border-right: 1px #000 solid;
}
.cerrilhado {
    background: repeating-linear-gradient(-45deg, white, white 2px, tomato 0, tomato 4px);
    display: block;
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
.triangulo{
    width: 0;
    height: 0;
    margin-top: -8px;
    margin-left: 20px;
    border-left: 3px solid transparent;
    border-right: 3px solid transparent;
    border-top: 6px solid rgb(255, 20, 20);
}

</style>
