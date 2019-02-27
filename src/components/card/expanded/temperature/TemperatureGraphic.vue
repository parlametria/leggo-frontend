<template>
  <div class="graphic">
    <div ref="anchor">
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import TemperatureGraphicModel from './TemperatureGraphicModel.js'

export default {
  name: 'TemperatureGraphic',
  props: {
    id: Number,
    cardWidth: Number
  },
  computed: {
    ...mapState({
      listaTemperaturas: state => state.temperaturas.temperaturas,
      listaCoeficientes: state => state.temperaturas.coeficiente
    }),
    ...mapGetters(['maxTemperatura']),
    temperaturas () {
      if (this.listaTemperaturas[this.id]) {
        return this.listaTemperaturas[this.id]
      }
    },
    coeficiente () {
      return this.listaCoeficientes[this.id] || 0
    }
  },
  methods: {
    async mountGraphic () {
      if (this.temperaturas && this.temperaturas.length) {
        let model = new TemperatureGraphicModel(
          this.temperaturas, this.maxTemperatura, this.cardWidth)
        await (
          // eslint-disable-next-line
          (await vegaEmbed(this.$refs.anchor, model.vsSpec))
            .view
            // eslint-disable-next-line
            .change('temperatura', vega.changeset().remove('temperatura', d => true))
            .insert('temperatura', this.temperaturas.map(
              (temperatura) => ({ ...temperatura, temperatura_recente: temperatura.temperatura_recente + 2 })))
            .run())
      }
    }
  },
  mounted () {
    this.$watch('temperaturas', this.mountGraphic, { immediate: true, deep: true })
    this.$watch('cardWidth', this.mountGraphic)
  }
}
</script>

<style lang="scss">
.graphic {
  details {
    display: none;
  }
}
.graphic {
  text-align: center;
}
</style>
