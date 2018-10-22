<template>
  <div id="temaGrafico" ref="grafico">
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'TemaGraphic',
  props: {
      tema: String
  },
  data() {
    return {
        windowWidth: window.innerWidth
    }
  },
  async mounted(){
      this.criaGrafico()
      window.onresize = () => {
        this.windowWidth = window.innerWidth
      }
  },
  methods: {
    criaGrafico() {
        vegaEmbed(`#temaGrafico`, this.graphJson)
    }
  },
  computed: {
    graphJson() {
        return {
            $schema: "https://vega.github.io/schema/vega-lite/v2.json",
            description: "Area chart showing weight of cars over time.",
            width: this.width * 0.8, 
            height: 300,
            data: { values: this.formatEnergias },
            mark: "area",
            config: {
                autosize: {
                    type: "fit",
                    contains: "padding"
                },
                legend: {
                    orient: this.width <= 990 ? "bottom": "right"
                }
            },
            encoding: {
                x: {
                    field: "periodo",
                    type: "temporal",
                    axis: { title: "Dia" }
                    },
                y: {
                    aggregate: "sum", 
                    field: "energia_recente",
                    type: "quantitative",
                    axis: { title: "Energia", "titlePadding": -7  }
                    },
                color: {
                    field: "apelido",
                    type: "nominal",
                    axis: { title: "Apelido" },
                    scale: {
                        scheme: "accent"
                    }
                }
            }
        }
    },
    width() {
        let result = this.windowWidth
        if(result >= 1920){
            result -= 200
        } else if (result >= 990){
            result -= 300 
        } else if (result >= 768){
            result -= 280 
        }else {
            result -= 0
        }
        return result
    },
    formatEnergias() {
        let result = []
        this.proposicoes.filter((prop) => prop.tema === this.tema).forEach((prop) => {
            const energias = this.energias[prop.lastEtapa.id_ext]
            if(energias){
                energias.forEach((energia)=> {
                    result.push({ ...energia, apelido: prop.lastEtapa.apelido })
                })
            }   
        })
        return result
    },
    ...mapState({
        energias: state => state.proposicoes.energias,
        proposicoes: state => state.proposicoes.proposicoes
    })
  },
  watch: {
    energias: {
      handler(val, oldVal) {
        this.criaGrafico()
      },
      deep: true
    },
    proposicoes: {
      handler(val, oldVal) {
        this.criaGrafico()
      },
      deep: true
    },
    windowWidth: {
      handler(val, oldVal) {
        this.criaGrafico()
      },
      deep: true
    }
  }
}
</script>

<style>
</style>
