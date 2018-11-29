<template>
  <div class="fasesBlock">
    <div v-for="(fase,i) in sortedFases" :key="i">
      <el-tooltip :content="fase.local + '-' + fase.fase_global">
        <div class="fase" :class="geraEstilo(fase)">
          <div v-if="isAtualFase(fase)" class="arrow-down"/>
        </div>
      </el-tooltip>
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
      return fase.data_inicio != null &&
        (fase.data_fim == null || new Date(fase.data_fim) >= now)
    }
  },
  computed: {
    sortedFases () {
      let sortOrder = { 'Comissões - Construção': '1',
        'Plenário - Construção': '2',
        'Comissões - Revisão I': '3',
        'Plenário - Revisão I': '4',
        'Comissões - Revisão II': '5',
        'Plenário - Revisão II': '6',
        'Presidência da República - Sansão/Veto': '7',
        'Congresso - Avaliação dos Vetos': '8' }
      return this.fases.slice().sort((a, b) => {
        let indexA = a.local + ' - ' + a.fase_global
        let indexB = b.local + ' - ' + b.fase_global
        return (sortOrder[indexA] - sortOrder[indexB])
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.fasesBlock {
    display: flex;
    padding: 3px;
}
.fase {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background-color: #808080;
    margin-right: 3px;
    position: relative;
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
.arrow-down {
  position: absolute;
  top: -15px;
  margin-left: 10px;
  border: solid rgb(211, 83, 83);
  border-width: 0 2px 2px 0;
  display: inline-block;
  padding: 3px;
  transform: rotate(45deg);
}
</style>
