<template>
  <div class="pressure-bar">
    <img src="../../../assets/arrow.svg" alt=""
    class="arrow" :style="arrowStyle">
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
      listaEnergias: state => state.proposicoes.energias,
      listaCoeficientes: state => state.proposicoes.coeficiente
    }),
    ...mapGetters(['maxPressao']),
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
      return (this.energia * 100) / this.maxPressao
    },
    barStyle () {
      return {
        background: (this.coeficiente >= 0 ? '#dc6060' : '#6090dc'),
        height: `${this.porcentagem}%`
      }
    },
    arrowStyle () {
      return {
        transform: (this.coeficiente < 0 ? 'rotate(180deg)' : '')
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
.arrow {
  position: absolute;
  margin: auto;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}
</style>
