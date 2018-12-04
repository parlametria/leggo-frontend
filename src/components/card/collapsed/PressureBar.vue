<template>
  <div class="pressure-bar">
    <div :style="barStyle"></div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
  name: 'PressureBar',
  props: ['id'],
  computed: {
    ...mapState({
      listaEnergias: state => state.temperaturas.temperaturaDic,
      listaCoeficientes: state => state.temperaturas.coeficienteDic
    }),
    ...mapGetters(['maxTemperatura']),
    energia () {
      if (this.listaEnergias[this.id]) {
        return this.listaEnergias[this.id][0].energia_recente
      } else {
        return 0
      }
    },
    coeficiente () {
      return this.listaCoeficientes[this.id] || 0
    },
    porcentagem () {
      return (this.energia * 100) / this.maxTemperatura
    },
    barStyle () {
      return {
        background: (this.coeficiente >= 0 ? '#dc6060' : '#60C7DC'),
        height: `${this.porcentagem}%`
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.pressure-bar {
  background: #4e4e4e;
  position: relative;
  min-width: 41px;
  display: flex;
  flex-direction: column-reverse;
}
</style>
