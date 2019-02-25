<template>
  <div class="temperature-bar">
    <div :style="barStyle" class="filled-bar"></div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
  name: 'TemperatureBar',
  props: ['id'],
  computed: {
    ...mapState({
      listaTemperaturas: state => state.temperaturas.temperaturas,
      listaCoeficientes: state => state.temperaturas.coeficiente
    }),
    ...mapGetters(['maxTemperatura']),
    temperatura () {
      if (this.listaTemperaturas[this.id] && this.listaTemperaturas[this.id][0]) {
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
        height: `${this.porcentagem > 3 ? this.porcentagem : 3}%`
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.temperature-bar {
  background: #ffffff;
  position: relative;
  min-width: 41px;
  display: flex;
  flex-direction: column-reverse;
  box-sizing: border-box;
}

.filled-bar {
  background: #dc6060;
}
</style>
