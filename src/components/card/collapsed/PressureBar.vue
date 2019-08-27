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

export default {
  name: 'PressureBar',
  props: {
    ultima_pressao: {
      type: Number,
      default: undefined
    }
  },
  computed: {
    pressao () {
      if (this.ultima_pressao) {
        return this.ultima_pressao
      } else {
        return 0
      }
    },
    barStyle () {
      return {
        height: `${this.pressao > 3 ? this.pressao : 3}%`,
        background: `${this.pressao === 0 ? '#dadada' : '#feb24c'}`
      }
    },
    pressureStyle () {
      return {
        background: `${this.pressao === 0 ? '#dadada' : '#ffffff'}`
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
