export default class AtoresGraphicModel {
  constructor (width, title) {
    this.vsSpec = {
      description: 'Atores',
      $schema: 'https://vega.github.io/schema/vega-lite/v3.3.0.json',
      width: width * 0.8,
      title: {
        text: title,
        fontSize: 15,
        offset: 5
      },
      data: {
        name: 'ator'
      },
      mark: {
        type: 'bar',
        cornerRadius: 5,
        stroke: 'white',
        strokeWidth: 2
      },
      encoding: {
        x: {
          aggregate: 'sum',
          field: 'peso_total_documentos',
          type: 'quantitative',
          axis: {
            title: 'Peso dos documentos'
          }
        },
        y: {
          field: 'nome_partido_uf',
          type: 'nominal',
          axis: {
            title: ''
          },
          sort: {
            encoding: 'x',
            order: 'descending'
          }
        },
        color: {
          field: 'tipo_generico',
          type: 'nominal',
          legend: {
            title: 'Ação'
          },
          scale: {
            domain: [
              'Emenda',
              'Parecer',
              'Voto em Separado',
              'Requerimento',
              'Proposição Apensada',
              'Outros'
            ],
            range: [
              '#FB9A99',
              '#F9EE9D',
              '#855D7C',
              '#80B1D3',
              '#B2DF8A',
              '#587B7A'
            ]
          }
        },
        tooltip: [
          { 'field': 'peso_total_documentos', 'type': 'quantitative', 'title': 'Num. de documentos' },
          { 'field': 'tipo_generico', 'type': 'nominal', 'title': 'Tipo de documento' }
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
