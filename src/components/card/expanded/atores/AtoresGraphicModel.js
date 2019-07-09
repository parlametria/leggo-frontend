export default class AtoresGraphicModel {
    constructor () {
      this.vsSpec = {
        description: 'Últimos 30 dias',
        $schema: 'https://vega.github.io/schema/vega-lite/v3.3.0.json',
        title: '',
        data: {
          name: 'ator'
        },
        mark: {
          type: 'bar',
          cornerRadius: 5,
          stroke: 'white', 
          strokeWidth : 2
        },
        encoding: {
          x: {
            aggregate: 'sum',
            field: 'qtd_de_documentos',
            type: 'quantitative',
            axis: {
              title: 'Quantidade de documentos'
            }
          },
          y: {
            field: 'nome_autor',
            type: 'nominal',
            axis: {
              title: 'Autor'
            },
            sort: {
              encoding: 'x'
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
                'Proposição',
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
          }
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
  