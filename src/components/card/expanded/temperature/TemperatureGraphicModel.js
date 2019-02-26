export default class TemperatureGraphicModel {
  constructor (temperaturas, maxTemperatura, width) {

    this.vsSpec = {
      description: 'Últimos 30 dias',
      $schema: 'https://vega.github.io/schema/vega-lite/v2.json',
      height: 50,
      width: width * 0.8,
      title: '',
      data: {
        name: 'temperatura'
      },
      mark: {
        type: 'bar',
        color: '#dc6060',
        fillOpacity: 0.5
      },
      encoding: {
        x: {
          field: 'periodo',
          type: 'ordinal',
          format: '%Y-%m-%d',
          scale: {
            type: 'band'
          },
          axis: {
            title: '',
            grid: false,
            ticks: false,
            labels: false
          }
        },
        y: {
          field: 'temperatura_recente',
          type: 'quantitative',
          axis: {
            title: '',
            grid: false,
            labels: false,
            ticks: false
          },
          scale: {
            domain: [0, maxTemperatura]
          }
        },
        tooltip: [
          { 'field': 'temperatura_periodo', 'type': 'Number', 'title': 'Temperatura da Semana' },
          { 'field': 'temperatura_recente', 'type': 'Number', 'title': 'Temperatura Acumulada' },
          { 'field': 'periodo', 'type': 'temporal', format: '%d/%m/%Y', scale: { type: 'band' }, 'title': 'Semana' }
        ]
      },
      config: {
        view: {
          stroke: 'transparent'
        },
        axisY: {
          minExtent: 0,
          domain: false
        }
      }
    }
  }

  get getModel () {
    return this.vsSpec
  }
}
