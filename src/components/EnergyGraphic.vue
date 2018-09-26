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
      energia: {}
    }
  },
  props: {
    visId: String,
    id: Number,
    casa: String
  },
  async mounted () {
    const response = await axios.get(
      `${process.env.VUE_APP_API_URL}/energia/${this.casa}/${this.id}`
    )

    this.energia = response.data

    const vlSpec = {
      description: 'Últimos 30 dias',
      $schema: 'https://vega.github.io/schema/vega-lite/v2.json',
      height: 50,
      width: 150,
      title: 'Energia Recente',
      data: {
        values: this.energia
      },
      mark: {
        type: 'line',
        line: true,
        color: '#888'
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

    // eslint-disable-next-line no-undef
    vegaEmbed(`#${this.visId}`, vlSpec)
  }
}
</script>

<style>
.vega-actions {
  display: none;
}
</style>
