<template>
  <div>
    <div :id="`${casa}-${id}`"></div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import EnergyGraphicModel from './EnergyGraphicModel.js'

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
    }})

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
      if (this.listaCoeficientes[this.id]) { return this.listaCoeficientes[this.id] }
      return 0
    },
    formattedDate () {
      let month = '' + (this.date.getMonth() + 1)
      let day = '' + this.date.getDate()
      let year = this.date.getFullYear()
      if (month.length < 2) month = '0' + month
      if (day.length < 2) day = '0' + day
      return [year, month, day].join('-')
    },
    tendenciaColor () {
      if (this.energias.length > 1) {
        const ultima = this.energias[0].energia_recente
        const penultima = this.energias[1].energia_recente
        if (this.coeficiente <= 0) {
          return '#ef8a62'
        }
      }
      return '#67a9cf'
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
