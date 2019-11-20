export default class AtoresGraphicModel {
  constructor (width, title) {
    this.vsSpec = {
      description: 'Atores',
      $schema: 'https://vega.github.io/schema/vega-lite/v3.3.0.json',
      width: width * 0.75,
      title: {
        text: title,
        fontSize: 15,
        offset: 5
      },
      data: {
        name: 'ator'
      },
      transform: [
        {
          aggregate: [{
            op: 'sum',
            field: 'peso_total_documentos',
            as: 'sum_peso_total_documentos'
          },
          {
            op: 'sum',
            field: 'num_documentos',
            as: 'sum_num_documentos'
          }
          ],
          groupby: ['nome_partido_uf', 'tipo_generico']
        }
      ],
      mark: {
        type: 'bar',
        cornerRadius: 5,
        stroke: 'white',
        strokeWidth: 2
      },
      encoding: {
        x: {
          field: 'sum_peso_total_documentos',
          type: 'quantitative',
          axis: {
            title: 'Participação do Autor nos Documentos'
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
            title: 'Ação',
            orient: 'top'
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
              '#969696'
            ]
          }
        },
        tooltip: [
          { 'field': 'sum_num_documentos', 'type': 'quantitative', 'title': 'Número de Documentos' },
          { 'field': 'sum_peso_total_documentos', 'type': 'quantitative', 'title': 'Participação do Autor', 'format': '.1f' },
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
