<template>
  <div class="fasesBlock">
    <div v-for="(fase,i) in sortedFases" :key="i">
      <div v-if="isAtualFase(fase)" class="arrow-down"></div>
      <div v-else class="padding"></div>
      <div class="fase" :class="geraEstilo(fase)">
        <div class="tooltip">
        <h5>{{ fase.local }} - {{ fase.fase_global }}</h5>
        <div class="tooltiptriangulo"></div>
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
      return fase.data_inicio != null && fase.data_fim == null
    }
  },
  computed: {
    sortedFases () {
      let sortOrder = {'Comissões - Construção': '1',
        'Plenário - Construção': '2',
        'Comissões - Revisão I': '3',
        'Plenário - Revisão I': '4',
        'Comissões - Revisão II': '5',
        'Plenário - Revisão II': '6',
        'Presidência da República - Sansão/Veto': '7',
        'Presidência da República - Avaliação dos Vetos': '8'}

      return this.fases.sort((a, b) => {
        let indexA = a.local + ' - ' + a.fase_global
        let indexB = b.local + ' - ' + b.fase_global
        return (sortOrder[indexA] - sortOrder[indexB])
      })
    }
  }
}
</script>

<style lang="scss" scopped>
.fasesBlock {
    display: flex;
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
