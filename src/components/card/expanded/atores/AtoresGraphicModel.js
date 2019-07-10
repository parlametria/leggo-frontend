export default class AtoresGraphicModel {
  constructor (width) {
    this.vsSpec = {
      description: 'Últimos 30 dias',
      $schema: 'https://vega.github.io/schema/vega-lite/v3.3.0.json',
      width: width * 0.8,
      title: 'Quantidade de documentos',
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
          field: 'qtd_de_documentos',
          type: 'quantitative',
          axis: {
            title: ''
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
            title: 'Tipo de Documento'
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
              '#DF8C6C',
              '#87C6CD',
              '#A9A5AD',
              '#A5C882',
              '#F7DD72',
              '#FF7F9D'
            ]
          }
        },
        tooltip: [
          {'field': 'qtd_de_documentos', 'type': 'quantitative', 'title': 'Num de documentos'},
          {'field': 'descricao_tipo', 'type': 'nominal', 'title': 'Tipo de documento'}
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
