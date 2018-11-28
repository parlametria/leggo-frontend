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
      if (fase.pulou) {
        return 'pulou'
      }
      if (fase.data_inicio !== null) {
        if (fase.local_casa === 'camara' || fase.local_casa === 'senado') {
          return fase.local_casa
        } else {
          return 'plenario'
        }
      } else {
        return 'naoRealizada'
      }
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

.camara {
    background-color: #4EB65F;
}

.senado {
    background-color: #4E8CB6;
}

.plenario {
  background-color: #B6AF4E;
}

.naoRealizada {
  background-color: #a1a2a3;
}

.pulou {
  width: 11px;
  height: 11px;
  background-color: transparent;
  border:1px solid white;
}

</style>
