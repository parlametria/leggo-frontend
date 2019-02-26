<template>
  <div class="fasesBlock">
    <div v-for="(fase,i) in fasesResumidas" :key="i">
      <el-tooltip :content="fase.local + '-' + fase.fase_global">
        <div class="fase" :class="geraEstilo(fase)"/>
      </el-tooltip>
    </div>
  </div>
</template>

<script>
import { resumirFases } from '@/utils'
export default {
  name: 'Fases',
  props: {
    fases: Array
  },
  computed: {
    fasesResumidas () {
      return resumirFases(this.fases)
    }
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
  }
}
</script>

<style lang="scss" scoped>
.fasesBlock {
  display: flex;
}
.fase {
  width: 9px;
  height: 9px;
  border-radius: 50%;
  background-color: #723234;
  margin-right: 3px;
  border: 2px solid #dadada;
  position: relative;
}

.camara {
  background-color: #4EB65F;
  border-color: #4EB65F;
}

.senado {
  background-color: #4E8CB6;
  border-color: #4E8CB6;
}

.plenario {
  background-color: #B6AF4E;
  border-color: #B6AF4E;
}

.naoRealizada {
  background-color: transparent;
}

.pulou {
  background-color: #dadada;
  border-color: #dadada;
}

</style>
