<template>
  <div class="pressure-bar">
    <div
      :style="barStyle"
      class="filled-bar"/>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
  name: 'PressureBar',
  props: {
    id: {
      type: Number,
      default: undefined
    }
  },
  computed: {
    ...mapState({
      listaPressoes: state => state.pressao.pressao
    }),
    ...mapGetters(['maxTemperatura']),
    pressao () {
      const pressoes = this.listaPressoes[this.id]
      console.log(pressoes)
      if (pressoes && pressoes[0]) {
        console.log(pressoes[pressoes.length - 1].maximo_geral)
        return pressoes[pressoes.length - 1].maximo_geral
      } else {
        return 0
      }
    },
    barStyle () {
      return {
        height: `${this.pressao > 3 ? this.pressao : 3}%`
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.pressure-bar {
  background: #ffffff;
  position: relative;
  min-width: 41px;
  display: flex;
  flex-direction: column-reverse;
  width: 100%;
  box-sizing: border-box;
}

.filled-bar {
  background: #feb24c;
}
</style>
