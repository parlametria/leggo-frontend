<template>
  <!-- Container for the visualization -->
  <div :id= "vis"></div>
</template>

<script>
export default {
  name: 'EnergyGraphic',
  data () {
    return {
      vlSpec: {
        description: 'últimos 30 dias',
        $schema: 'https://vega.github.io/schema/vega-lite/v2.json',
        height: 30,
        width: 100,
        title: 'Energia Recente',
        data: {
          values: [
            { periodo: '2018-03-19', energia_recente: 0.001 },
            { periodo: '2018-03-26', energia_recente: 0.001 },
            { periodo: '2018-04-02', energia_recente: 0.001 },
            { periodo: '2018-04-09', energia_recente: 1.001 },
            { periodo: '2018-04-16', energia_recente: 0.951 },
            { periodo: '2018-04-23', energia_recente: 0.903 },
            { periodo: '2018-04-30', energia_recente: 0.858 },
            { periodo: '2018-05-07', energia_recente: 1.815 },
            { periodo: '2018-05-14', energia_recente: 1.724 },
            { periodo: '2018-05-21', energia_recente: 3.638 },
            { periodo: '2018-05-28', energia_recente: 3.456 },
            { periodo: '2018-06-04', energia_recente: 3.283 },
            { periodo: '2018-06-11', energia_recente: 4.119 }
          ]
        },
        mark: {
          type: 'line',
          line: true,
          color: '#db5448'
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
    }
  },
  props: {
    vis: String
  },
  mounted () {
    // eslint-disable-next-line no-undef
    vegaEmbed('#' + this.vis, this.vlSpec)
  }
}
</script>

<style>
.vega-actions {
  display: none;
}
</style>
