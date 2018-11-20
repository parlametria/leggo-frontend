<template>
  <div class="fasesBlock">
    <div v-for="(fase,i) in sortedFases" :key="i">
      <el-tooltip :content="fase.local + '-' + fase.fase_global">
        <div class="fase" :class="geraEstilo(fase)"/>
      </el-tooltip>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Fases',
  props: {
    fases: Array
  },

  methods: {
    geraEstilo (fase) {
      return {
        'faseConcluida': this.isFaseConcluida(fase),
        'jumpedFase': this.isJumpedFase(fase)
      }
    },
    isFaseConcluida (fase) {
      return fase.data_fim
    },

    isJumpedFase (fase) {
      return fase.pulou
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
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background-color: #723234;
    margin-right: 3px;
    position: relative;
}

.jumpedFase {
  background: none;
  border-style: solid;
  border-width: 1px;
  border-color: #DC6060;
  width: 10px;
  height: 10px;
}

.faseConcluida {
    background-color: #DC6060;
}

</style>
