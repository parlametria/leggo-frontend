<template>
  <div>
    <div :id="`${casa}-${id}`"></div>
    {{maxEnergia}}
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'

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
    }}
    ).then(() => {
      this.mountGraphic(
        this.id,
        this.casa,
        this.semanas,
        this.formattedDate
      )
    })
  },
  computed: mapState({
    listaEnergias: state => state.proposicoes.energias,
    maxEnergia: state => state.proposicoes.maxEnergia,
    energias () { 
      return this.listaEnergias[this.id]
    },
    formattedDate () {
      let month = '' + (this.date.getMonth() + 1)
      let day = '' + this.date.getDate()
      let year = this.date.getFullYear()
      if (month.length < 2) month = '0' + month
      if (day.length < 2) day = '0' + day
      return [year, month, day].join('-')
    },
    tendeciaColor () {
      if (this.energias.length > 1) {
        const ultima = this.energias[0].energia_recente
        const penultima = this.energias[1].energia_recente
        if (ultima - penultima <= 0) {
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
    ...mapMutations(['updateEnergias']),
    ...mapActions(['getEnergiaRecente']),
    async mountGraphic (id, casa, semanas, date) {
      if (this.energias.length > 0) {
        this.energias[0].energia_dia = this.energias[0].energia_recente
        this.updateEnergias({
          'energia': this.energias[0].energia_recente,
          'id': id
        })
      } else {
        this.updateEnergias({
          'energia': -1,
          'id': id
        })
      }
      
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
            domain: [0, this.maxEnergia]
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
              color: this.tendeciaColor,
              fillOpacity: 0.5
            },
            encoding: encoding
          },
          {
            mark: {
              type: 'circle',
              color: this.tendeciaColor
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
              color: this.tendeciaColor
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
        }
      }
      // eslint-disable-next-line
      vegaEmbed(`#${casa}-${id}`, vlSpec).then(res => {
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
      }}
      ).then(() => {
        this.mountGraphic(
          this.id,
          this.casa,
          this.semanas,
          this.formattedDate
        )
      })
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