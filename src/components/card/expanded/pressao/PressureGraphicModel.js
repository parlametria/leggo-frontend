export default class PressureGraphicModel {
  constructor (width) {
    this.vsSpec = {
      description: 'Últimos 30 dias',
      $schema: 'https://vega.github.io/schema/vega-lite/v3.3.0.json',
      height: 100,
      width: width * 0.8,
      autosize: {
        type: 'fit',
        contains: 'padding'
      },
      title: '',
      data: {
        name: 'filteredPressoes'
      },
      mark: {
        type: 'bar',
        color: '#3ab37b',
        fillOpacity: 0.5
      },
      transform: [
        { 'calculate': 'datum.maximo_geral > 0 ? datum.maximo_geral/100 : 0.001', 'as': 'maximo_geral' }],

      encoding: {
        x: {
          field: 'date',
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
          field: 'maximo_geral',
          type: 'quantitative',
          axis: {
            format: '%',
            title: '',
            grid: false,
            ticks: false,
            labels: false
          },
          scale: { type: 'sqrt' }
        },
        tooltip: [
          { 'field': 'maximo_geral', 'type': 'quantitative', 'title': 'Pressão da Semana', axis: { format: '.0%' } },
          { 'field': 'date', 'type': 'temporal', format: '%d/%m/%Y', scale: { type: 'band' }, 'title': 'Semana' }
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
