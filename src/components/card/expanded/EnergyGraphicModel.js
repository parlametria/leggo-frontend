export default class EnergyGraphicModel {
  constructor (energias, maxEnergia, color) {
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
          domain: [0, maxEnergia]
        }
      }
    }

    this.vsSpec = {
      description: 'Últimos 30 dias',
      $schema: 'https://vega.github.io/schema/vega-lite/v2.json',
      height: 50,
      width: 150,
      title: '',
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
      }
    }
  }

  get getModel () {
    return this.vsSpec
  }
}
