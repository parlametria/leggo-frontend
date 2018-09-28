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
      energia: [],
      tendenciaColor: '',
      semanas: 12
    }
  },
  props: {
    visId: String,
    id: Number,
    casa: String
  },
  async mounted () {
    const response = await axios.get(
      `${process.env.VUE_APP_API_URL}energia/${this.casa}/${this.id}?semanas_anteriores=${this.semanas}`
    )

    this.energia = response.data
    this.energia[0].energia_dia = this.energia[0].energia_recente

    this.tendenciaColor = this.getTendeciaColor(this.energia)

    const vlSpec = {
      description: 'Últimos 30 dias',
      $schema: 'https://vega.github.io/schema/vega-lite/v2.json',
      height: 50,
      width: 150,
      title: 'Energia Acumulada',
      data: {
        values: this.energia
      },
      layer: [
        {
          mark: {
            type: 'line',
            line: true,
            color: this.tendenciaColor
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
          }
        },
        {
          mark: {
            type: 'circle',
            color: this.tendenciaColor
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
              field: 'energia_dia',
              type: 'quantitative',
              axis: {
                title: '',
                grid: false,
                labels: false,
                ticks: false
              }
            },
            size: {'value': 80}
          }
        }
      ],
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

    // eslint-disable-next-line no-undef
    vegaEmbed(`#${this.visId}`, vlSpec)
  },
  methods: {
    getTendeciaColor: energia => {
      if (energia.length > 1) {
        const ultima = energia[0].energia_recente
        const penultima = energia[1].energia_recente

        if (ultima - penultima <= 0) {
          return '#ef8a62'
        }
      }

      return '#67a9cf'
    }
  }
}
</script>

<style>
.vega-actions {
  display: none;
}
</style>
