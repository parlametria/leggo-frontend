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
    ultima_pressao: {
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
      if (this.ultima_pressao) {
        return this.ultima_pressao
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
