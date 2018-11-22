<template>
  <div>
    <div :id="`${casa}-${id}`"></div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import EnergyGraphicModel from './EnergyGraphicModel.js'
import moment from 'moment'

export default {
  name: 'EnergyGraphic',
  data () {
    return {
      semanas: 12
    }
  },
  props: {
    id: Number,
    casa: String,
    date: Date
  },
  async mounted () {
    this.getEnergiaRecente({ params: {
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
    ), 2000)
  },
  computed: mapState({
    listaEnergias: state => state.proposicoes.energias,
    maxEnergia: state => state.proposicoes.maxEnergia,
    listaCoeficientes: state => state.proposicoes.coeficiente,

    energias () {
      return this.listaEnergias[this.id]
    },
    coeficiente () {
      return this.listaCoeficientes[this.id] || 0
    },
    formattedDate () {
      return moment(this.date).format('YYYY-MM-DD')
    },  
    tendenciaColor () {
      if (this.energias.length > 1) {
        if (this.coeficiente <= 0) {
          return '#67a9cf'
        }
      }
      return '#ef8a62'
    },
    compoundWatch () {
      return [this.date, this.id, this.casa].join()
    }
  }),
  methods: {
    ...mapActions(['getEnergiaRecente']),
    async mountGraphic (id, casa, semanas, date) {
      if (this.energias.length > 0) {
        this.energias[0].energia_dia = this.energias[0].energia_recente
      }

      let model = new EnergyGraphicModel(this.energias, this.maxEnergia, this.tendenciaColor)

      // eslint-disable-next-line
      vegaEmbed(`#${casa}-${id}`, model.vsSpec).then(res => {
        res.view /* eslint-disable */
          .change('energia', vega.changeset().remove('energia', d => true))
          .insert('energia', this.energias)
          .run()
      })
    }
  },
  watch: {
    compoundWatch: {
      handler: function (val, oldVal) {
        this.getEnergiaRecente({ params: {
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
    }
  }
}
</script>

<style>
.vega-actions {
  display: none;
}
</style>
