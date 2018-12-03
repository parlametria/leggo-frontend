<template>
  <div class="temperature-bar">
    <div :style="barStyle"></div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
  name: 'TemperatureBar',
  props: ['id'],
  computed: {
    ...mapState({
      listaTemperaturas: state => state.proposicoes.temperaturas,
      listaCoeficientes: state => state.proposicoes.coeficiente
    }),
    ...mapGetters(['maxTemperatura']),
    temperatura () {
      if (this.listaTemperaturas[this.id]) {
        return this.listaTemperaturas[this.id][0].temperatura_recente
      } else {
        return 0
      }
    },
    coeficiente () {
      return this.listaCoeficientes[this.id] || 0
    },
    porcentagem () {
      return (this.temperatura * 100) / this.maxTemperatura
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
.temperature-bar {
  background: #4e4e4e;
  position: relative;
  min-width: 41px;
  display: flex;
  flex-direction: column-reverse;
}
</style>
