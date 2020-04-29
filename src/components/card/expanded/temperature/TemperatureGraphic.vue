<template>
  <div
    class="graphic"
    id="grafico">
    <div ref="anchor"/>
    <temperature-info
      :id="id"
      :mostra-tooltip="true"
      :tem-temperatura="verificaSeMostraTemperatura"
      class="graphic-info"
    />
  </div>
</template>

<script>
import TemperatureGraphicModel from './TemperatureGraphicModel.js'
import TemperatureInfo from './TemperatureInfo'
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
      default () {
        return []
      }
    }
  },
  computed: {
    temperaturas () {
      if (this.temp_historico) {
        return this.temp_historico.filter(
          e =>
            moment(e.periodo).isAfter(
              moment(new Date()).subtract(3, 'months')
            ) &&
            moment(e.periodo).isBefore(moment(new Date()).subtract(1, 'week'))
        ).map(
          e => {
            const dataInicial = moment(e.periodo).format('DD/MM/YYYY')
            const dataFinal = moment(e.periodo).add(7, 'days').format('DD/MM/YYYY')
            e.periodoTooltip = dataInicial.toString() + ' - ' + dataFinal.toString()
            return e
          }
        )
      }
    },
    verificaSeMostraTemperatura () {
      if (this.temperaturas) {
        return this.temperaturas.filter(
          temperatura =>
            temperatura.temperatura_recente >= 1).length !== 0
      }
      return false
    },
    tamanhoGrafico () {
      return document.getElementById('grafico').offsetWidth
    }
  },
  methods: {
    async mountGraphic () {
      if (this.verificaSeMostraTemperatura && this.temperaturas && this.temperaturas.length) {
        let model = new TemperatureGraphicModel(this.tamanhoGrafico)
        await // eslint-disable-next-line
        (await vegaEmbed(this.$refs.anchor, model.vsSpec)).view
          .change(
            'temperatura',
            // eslint-disable-next-line
            vega.changeset().remove('temperatura', d => true)
          )
          .insert(
            'temperatura',
            this.temperaturas.map(temperatura => ({
              ...temperatura,
              temperatura_recente: temperatura.temperatura_recente
            }))
          )
          .run()
      }
    }
  },
  mounted () {
    this.$watch('temperaturas', this.mountGraphic, {
      immediate: true,
      deep: true
    })
    this.$watch('tamanhoGrafico', this.mountGraphic)
  },
  components: {
    TemperatureInfo
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

.graphic-info {
  font-size: 12px;
}
</style>
