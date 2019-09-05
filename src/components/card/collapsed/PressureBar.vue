<template>
  <div
    class="pressure-bar"
    :style="pressureStyle">
    <div
      :style="barStyle"
    />
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
  name: 'PressureBar',
  props: {
    ultima_pressao: {
      type: Number,
      default: -1
    }
  },
  computed: {
    ...mapState({
      listaPressoes: state => state.pressao.pressao
    }),
    ...mapGetters(['maxTemperatura']),

    barStyle () {
      return {
        height: `${this.ultima_pressao > 3 ? this.ultima_pressao : 3}%`,
        background: `${this.ultima_pressao === -1 ? '#dadada' : '#feb24c'}`
      }
    },
    pressureStyle () {
      return {
        background: `${this.ultima_pressao === -1 ? '#dadada' : '#ffffff'}`
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

</style>
