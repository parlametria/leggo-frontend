<template>
  <div>
    <div :id= "visId"></div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'EnergyGraphic',
  data () {
    return {
      energia: {},
      semanas: 12
    }
  },
  props: {
    visId: String,
    id: Number,
    casa: String,
    date: Date
  },
  async mounted () {
    this.mountGraphic(
      this.visId,
      this.id,
      this.casa,
      this.semanas,
      this.formatDate(this.date)
    )
  },
  methods: {
    formatDate: date => {
      let month = '' + (date.getMonth() + 1)
      let day = '' + date.getDate()
      let year = date.getFullYear()

      if (month.length < 2) month = '0' + month
      if (day.length < 2) day = '0' + day

      return [year, month, day].join('-')
    },
    mountGraphic: async (visId, id, casa, semanas, date) => {
      function getTendeciaColor (energia) {
        if (energia.length > 1) {
          const ultima = energia[0].energia_recente
          const penultima = energia[1].energia_recente

          if (ultima - penultima <= 0) {
            return '#ef8a62'
          }
        }

        return '#67a9cf'
      }

      const response = await axios.get(
        `${
          process.env.VUE_APP_API_URL
        }energia/${casa}/${id}?semanas_anteriores=${semanas}&data_referencia=${date}`
      )

      const energia = response.data
      const color = getTendeciaColor(energia)

      const vlSpec = {
        description: 'Últimos 30 dias',
        $schema: 'https://vega.github.io/schema/vega-lite/v2.json',
        height: 50,
        width: 150,
        title: 'Energia Acumulada',
        data: {
          name: 'energia'
        },
        mark: {
          type: 'line',
          line: true,
          color: color
        },
        encoding: {
          x: {
            field: 'periodo',
            type: 'temporal',
            axis: {
              title: '',
              grid: false,
              ticks: false,
              labels: false
            }
          },
          y: {
            field: 'energia_recente',
            type: 'quantitative',
            axis: {
              title: '',
              grid: false,
              labels: false,
              ticks: false
            }
          }
        },
        config: {
          view: {
            stroke: 'transparent'
          },
          axisY: {
            minExtent: 0
          },
          axis: {
            domain: false
          }
        }
      }

      // eslint-disable-next-line
      vegaEmbed(`#${visId}`, vlSpec).then(res => {
        res.view /* eslint-disable */
          .change('energia', vega.changeset().remove('energia', d => true))
          .insert('energia', energia)
          .run()
      })
    }
  },
  watch: {
    date: {
      handler: function (val, oldVal) {
        this.mountGraphic(
          this.visId,
          this.id,
          this.casa,
          this.semanas,
          this.formatDate(this.date)
        )
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
