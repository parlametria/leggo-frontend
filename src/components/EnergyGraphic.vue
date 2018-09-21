<template>
  <!-- Container for the visualization -->
  <div id="vis"></div>
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
        data: {
          values: [
            {
              periodo: '2018-06-03',
              energia_recente: 0
            },
            {
              periodo: '2018-06-05',
              energia_recente: 0
            },
            {
              periodo: '2018-06-08',
              energia_recente: 0
            },
            {
              periodo: '2018-06-10',
              energia_recente: 0
            },
            {
              periodo: '2018-06-15',
              energia_recente: 0
            },
            {
              periodo: '2018-06-18',
              energia_recente: 0
            },
            {
              periodo: '2018-06-19',
              energia_recente: 0
            },
            {
              periodo: '2018-06-20',
              energia_recente: 1
            },
            {
              periodo: '2018-06-25',
              energia_recente: 3.9
            },
            {
              periodo: '2018-06-30',
              energia_recente: 3.7
            }
          ]
        },
        layer: [
          {
            mark: {
              type: 'area',
              color: '#f99e95'
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
                  ticks: false,
                  labelFlush: false
                }
              }
            }
          },
          {
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
    }
  },
  mounted () {
    // eslint-disable-next-line no-undef
    vegaEmbed('#vis', this.vlSpec)
  }
}
</script>

<style>
.vega-actions {
  display: none;
}
</style>
