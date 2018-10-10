<template>
  <div>
    <div :id="visId"></div>
  </div>
</template>

<script>
import axios from 'axios'
import { mapState, mapMutations } from 'vuex'

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
  computed: mapState({
    energias: state => state.filter.energias
  }),

  methods: {
    ...mapMutations(['updateEnergias']),
    formatDate: date => {
      let month = '' + (date.getMonth() + 1)
      let day = '' + date.getDate()
      let year = date.getFullYear()

      if (month.length < 2) month = '0' + month
      if (day.length < 2) day = '0' + day

      return [year, month, day].join('-')
    },
    async mountGraphic (visId, id, casa, semanas, date) {
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
        `${process.env.VUE_APP_API_URL}energia/${casa}/${id}?semanas_anteriores=${semanas}&data_referencia=${date}`
      )
      let energia = response.data

      if (energia.length > 0) {
        energia[0].energia_dia = energia[0].energia_recente
        this.updateEnergias({
          'energia': energia[0].energia_recente,
          'id': id
        })
      } else {
        this.updateEnergias({
          'energia': -1,
          'id': id
        })
      }

      const color = getTendeciaColor(energia)

      const encoding = {
        x: {
          field: 'periodo',
          type: 'temporal',
          format: '%Y-%m-%d',
          scale: {
            type: 'utc'
          },
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
          },
          scale: {
            domain: [0, 40]
          }
        }
      }
      const vlSpec = {
        description: 'Últimos 30 dias',
        $schema: 'https://vega.github.io/schema/vega-lite/v2.json',
        height: 50,
        width: 150,
        title: 'Energia Acumulada',
        data: {
          name: 'energia'
        },
        layer: [
          {
            mark: {
              type: 'area',
              color: color,
              fillOpacity: 0.5
            },
            encoding: encoding
          },
          {
            mark: {
              type: 'circle',
              color: color
            },
            encoding: {
              x: {
                field: 'periodo',
                type: 'temporal',
                format: '%Y-%m-%d',
                scale: {
                  type: 'utc'
                },
                axis: {
                  title: '',
                  grid: false,
                  ticks: false,
                  labels: false
                }
              },
              y: {
                field: 'energia_dia',
                type: 'quantitative',
                axis: {
                  title: '',
                  grid: false,
                  labels: false,
                  ticks: false
                }
              },
              size: { 'value': 80 }
            }
          },
          {
            mark: {
              type: 'line',
              color: color
            },
            encoding: encoding
          }
        ],
        config: {
          view: {
            stroke: 'transparent'
          },
          axisY: {
            minExtent: 0
          }
          /* axis: {
            domain: false
          } */
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
    },
    id: {
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
    },
    casa: {
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
    },
    visId: {
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
