<template>
  <div class="graphic">
    <div :id="`${casa}-${id}`">
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import TemperatureGraphicModel from './TemperatureGraphicModel.js'
import moment from 'moment'

export default {
  name: 'TemperatureGraphic',
  data () {
    return {
      semanas: 12
    }
  },
  props: {
    id: Number,
    casa: String,
    date: Date,
    cardWidth: Number
  },
  async mounted () {
    this.getTemperaturaRecente({ params: {
      id: this.id,
      casa: this.casa,
      semanas: this.semanas,
      date: this.formattedDate
    } })

    setTimeout(() => this.mountGraphic(
      this.id,
      this.casa,
      this.semanas,
      this.formattedDate
    ), 5000)
  },
  computed: mapState({
    listaTemperaturas: state => state.temperaturas.temperaturas,
    maxTemperatura: state => state.temperaturas.maxTemperatura,
    listaCoeficientes: state => state.temperaturas.coeficiente,

    temperaturas () {
      if (this.listaTemperaturas[this.id]) {
        return this.listaTemperaturas[this.id]
      }
    },
    coeficiente () {
      return this.listaCoeficientes[this.id] || 0
    },
    formattedDate () {
      return moment(this.date).format('YYYY-MM-DD')
    },
    tendenciaColor () {
      if (this.temperaturas.length > 1) {
        if (this.coeficiente <= 0) {
          return '#60C7DC'
        }
      }
      return '#dc6060'
    },
    compoundWatch () {
      return [this.date, this.id, this.casa].join()
    }
  }),
  methods: {
    ...mapActions(['getTemperaturaRecente']),
    async mountGraphic (id, casa, semanas, date) {
      if (this.temperaturas.length > 0) {
        this.temperaturas[0].temperatura_dia = this.temperaturas[0].temperatura_recente
      }

      let model = new TemperatureGraphicModel(
        this.temperaturas, this.maxTemperatura, this.tendenciaColor, this.cardWidth)

      // eslint-disable-next-line
      vegaEmbed(`#${casa}-${id}`, model.vsSpec).then(res => {
        res.view /* eslint-disable */
          .change('temperatura', vega.changeset().remove('temperatura', d => true))
          .insert('temperatura', this.temperaturas)
          .run()
      })
    }
  },
  watch: {
    compoundWatch: {
      handler: function (val, oldVal) {
        this.getTemperaturaRecente({ params: {
          id: this.id,
          casa: this.casa,
          semanas: this.semanas,
          date: this.formattedDate
        }}).then(() => {
          this.mountGraphic(
            this.id,
            this.casa,
            this.semanas,
            this.formattedDate
        )})
      },
      deep: true
    },
    cardWidth () {
      setTimeout(() => this.mountGraphic(
        this.id,
        this.casa,
        this.semanas,
        this.formattedDate
      ), 2000)
    }
  }
}
</script>

<style>
.vega-actions {
  display: none;
}
.graphic {
  text-align: center;
}
</style>
