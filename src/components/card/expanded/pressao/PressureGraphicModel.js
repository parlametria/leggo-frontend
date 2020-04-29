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
        color: '#FFAB0F',
        fillOpacity: 0.5
      },
      transform: [
        { 'calculate': 'datum.trends_max_popularity > 0 ? datum.trends_max_popularity : 0', 'as': 'trends_max_popularity' }],

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
          field: 'trends_max_popularity',
          type: 'quantitative',
          axis: {
            format: '%',
            title: '',
            grid: false,
            ticks: false,
            labels: false
          },
          scale: { domain: [0, 1] }
        },
        tooltip: [
          { 'field': 'trends_max_popularity', 'type': 'quantitative', 'title': 'Pressão da Semana', axis: { format: '.0%' } },
          { 'field': 'dateTooltip', 'type': 'nominal', 'title': 'Semana' }
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
