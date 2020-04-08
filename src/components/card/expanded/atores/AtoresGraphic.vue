<template>
  <div>
    <div
      v-if="verificaSeMostraAtores"
      class="graphic"
      id="grafico">
      <div ref="anchor" />
      <p style="font-size: 10pt">* Oposição</p>
    </div>
    <div v-else>
      <p class="sem-atores">Não foi possível analisar a atividade parlamentar para esta proposição</p>
    </div>
    <el-button
      class="btn"
      v-if="filteredAutores.length > ATORES_VISIBLE_MAX"
      @click="isCollapsed = !isCollapsed"
    >
      Veja {{ isCollapsed? "mais": "menos" }}
    </el-button>
  </div>
</template>

<script>
import AtoresGraphicModel from './AtoresGraphicModel.js'
import _ from 'lodash'

export default {
  name: 'AtoresGraphic',
  props: {
    atores: {
      type: Array,
      default () {
        return []
      }
    },
    casa: {
      type: String,
      default: ''
    },
    sigla: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      ATORES_VISIBLE_MAX: 15,
      isCollapsed: true
    }
  },
  computed: {
    larguraGrafico () {
      return document.getElementById('grafico').offsetWidth
    },
    verificaSeMostraAtores () {
      return this.atores && this.atores.length
    },
    atoresAgregados () {
      const atores = {}
      this.atores.forEach(element => {
        if (atores[element.id_autor] === undefined) { atores[element.id_autor] = 0 }
        atores[element.id_autor] += element.peso_total_documentos
      })
      return atores
    },
    contribuidoresVisiveis () {
      return this.isCollapsed ? this.ATORES_VISIBLE_MAX : Object.keys(this.atoresAgregados).length
    },
    maioresContribuidores () {
      const sortable = []
      const atoresAgregados = this.atoresAgregados
      for (let idAutor in atoresAgregados) {
        sortable.push([idAutor, atoresAgregados[idAutor]])
      }
      const top = _.take(
        sortable.sort((a, b) => {
          return b[1] - a[1]
        }),
        this.contribuidoresVisiveis
      ).map(e => parseInt(e[0]))

      return top
    },
    filteredAutores () {
      const maioresContribuidores = this.maioresContribuidores
      return this.atores.filter(e =>
        maioresContribuidores.includes(e.id_autor)
      )
    }
  },
  methods: {
    async mountGraphic () {
      if (this.filteredAutores && this.filteredAutores.length) {
        let model = new AtoresGraphicModel(this.larguraGrafico)
        await // eslint-disable-next-line
        (await vegaEmbed(this.$refs.anchor, model.vsSpec)).view
          // eslint-disable-next-line
          .change("ator", vega.changeset().remove("ator", d => true))
          .insert('ator', this.filteredAutores)
          .run()
      }
    }
  },
  mounted () {
    this.$watch('filteredAutores', this.mountGraphic, { immediate: true, deep: true })
  }
}
</script>

<style lang="scss" scoped>
.graphic {
  details {
    display: none;
  }
}
.graphic {
  text-align: left;
  overflow: auto;
  max-height: 472px;
  margin-bottom: 15px;
}
.title {
  line-height: 15px;
}
.sem-atores {
  color: #969696;
  font-size: 0.8em;
}
</style>
