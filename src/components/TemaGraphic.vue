<template>
  <div id="temaGrafico" ref="grafico"/>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'TemaGraphic',
  props: {
    proposicoes: Array
  },
  data () {
    return {
      windowWidth: window.innerWidth
    }
  },
  async mounted () {
    this.criaGrafico()
    window.onresize = () => {
      this.windowWidth = window.innerWidth
    }
  },
  methods: {
    criaGrafico () {
      // eslint-disable-next-line
      vegaEmbed('#temaGrafico', this.graphJson)
    }
  },
  computed: {
    graphJson () {
      return {
        $schema: 'https://vega.github.io/schema/vega-lite/v2.json',
        description: 'Area chart showing weight of cars over time.',
        width: this.width * 0.8,
        height: 300,
        data: { values: this.formatTemperaturas },
        mark: 'area',
        config: {
          autosize: {
            type: 'fit',
            contains: 'padding'
          },
          legend: {
            orient: this.width <= 990 ? 'bottom' : 'right'
          }
        },
        encoding: {
          x: {
            field: 'periodo',
            type: 'temporal',
            axis: { title: 'Dia' }
          },
          y: {
            aggregate: 'sum',
            field: 'temperatura_recente',
            type: 'quantitative',
            axis: { title: 'Temperatura', 'titlePadding': -7 }
          },
          color: {
            field: 'apelido',
            type: 'nominal',
            axis: { title: 'Apelido' },
            scale: {
              scheme: 'accent'
            }
          }
        }
      }
    },
    width () {
      let result = this.windowWidth
      if (result >= 1920) {
        result -= 200
      } else if (result >= 990) {
        result -= 300
      } else if (result >= 768) {
        result -= 280
      } else {
        result -= 0
      }
      return result
    },
    formatTemperaturas () {
      let result = []
      this.proposicoes.forEach((prop) => {
        const temperaturas = this.temperaturas[prop.lastEtapa.id_ext]
        if (temperaturas) {
          temperaturas.forEach((temperatura) => {
            result.push({ ...temperatura, apelido: prop.lastEtapa.apelido })
          })
        }
      })
      return result
    },
    ...mapState({
      temperaturas: state => state.proposicoes.temperaturas
    })
  },
  watch: {
    temperaturas: {
      handler (val, oldVal) {
        this.criaGrafico()
      },
      deep: true
    },
    proposicoes: {
      handler (val, oldVal) {
        this.criaGrafico()
      },
      deep: true
    },
    windowWidth: {
      handler (val, oldVal) {
        this.criaGrafico()
      },
      deep: true
    }
  }
}
</script>

<style>
</style>
