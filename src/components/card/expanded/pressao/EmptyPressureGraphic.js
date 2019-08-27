export default class EmptyPressureGraphicModel {
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
        values: {}
      },
      mark: {
        type: 'bar',
        color: '#feb24c',
        fillOpacity: 0.5
      },
      encoding: {
        x: {
          field: 'date',
          type: 'quantitative',
          axis: {
            title: '',
            grid: false,
            ticks: false,
            labels: false
          }
        }
      },
      config: {
        view: {
          stroke: 'transparent'
        }
      }
    }
  }

  get getModel () {
    return this.vsSpec
  }
}
