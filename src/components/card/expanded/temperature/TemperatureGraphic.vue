<template>
  <div
    class="graphic"
    id="grafico">
    <div ref="anchor"/>
  </div>
</template>

<script>
import TemperatureGraphicModel from './TemperatureGraphicModel.js'
import moment from 'moment'

export default {
  name: 'TemperatureGraphic',
  props: {
    id: {
      type: Number,
      default: undefined
    },
    temp_historico: {
      type: Array,
      default () { return [] }
    }
  },
  computed: {
    temperaturas () {
      if (this.temp_historico) {
        return this.temp_historico.filter(e =>
          moment(e.periodo).isAfter(moment(new Date()).subtract(3, 'months')))
      }
    },
    tamanhoGrafico () {
      return document.getElementById('grafico').offsetWidth
    }
  },
  methods: {
    async mountGraphic () {
      if (this.temperaturas && this.temperaturas.length) {
        let model = new TemperatureGraphicModel(this.tamanhoGrafico)
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
    this.$watch('tamanhoGrafico', this.mountGraphic)
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
