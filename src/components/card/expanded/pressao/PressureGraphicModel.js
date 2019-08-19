export default class PressureGraphicModel {
  constructor () {
    this.vsSpec = {
      $schema: 'https://vega.github.io/schema/vega-lite/v3.json',
      data: {
        name: 'pressoes'
      },
      vconcat: [{
        width: 480,
        mark: 'area',
        encoding: {
          x: {
            field: 'date',
            type: 'temporal',
            axis: { 'title': '' }
          },
          y: { 'field': 'maximo_geral', 'type': 'quantitative' }
        }
      },
      {
        width: 480,
        mark: {
          type: 'bar',
          fillOpacity: 0.5
        },
        encoding: {
          x: {
            field: 'date',
            type: 'temporal',
            axis: { 'title': '' }
          },
          y: { 'field': 'maximo_geral', 'type': 'quantitative' }
        }
      }

      ]
    }
  }

  get getModel () {
    return this.vsSpec
  }
}
