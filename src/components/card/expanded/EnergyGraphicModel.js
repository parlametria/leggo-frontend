export default class EnergyGraphicModel {
  constructor (energias, maxEnergia, color, width) {
    const encoding = {
      x: {
        field: 'periodo',
        type: 'ordinal',
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
      },
      tooltip: [
        { 'field': 'energia_periodo', 'type': 'Number', 'title': 'pressao_semana' },
        { 'field': 'energia_recente', 'type': 'Number', 'title': 'pressao_acumulada' },
        { 'field': 'periodo', 'type': 'temporal', format: '%d-%m-%Y', scale: { type: 'utc' }, 'title': 'semana' }
      ]
    }

    this.vsSpec = {
      description: 'Últimos 30 dias',
      $schema: 'https://vega.github.io/schema/vega-lite/v2.json',
      height: 50,
      width: width * 0.8,
      title: '',
      data: {
        name: 'energia'
      },
      layer: [
        {
          mark: {
            type: 'bar',
            color: color,
            fillOpacity: 0.5
          },
          encoding: encoding
        }
      ],
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
