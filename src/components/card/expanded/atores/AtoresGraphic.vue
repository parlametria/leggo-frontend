<template>
  <div>
    <div v-if="sigla.substring(0,3) === 'MPV' && casa !== 'senado'">
      <p class="sem-atores">Nas MPVs, atualmente, temos dados de atores apenas para emendas</p>
      <div ref="anchor" />
    </div>
    <div
      v-else-if="verificaSeMostraAtores"
      class="graphic"
      id="grafico">
      <div ref="anchor" />
    </div>
    <div v-else-if="casa === 'senado'">
      <p class="sem-atores">Não estamos capturando atores em Senado</p>
    </div>
    <div v-else>
      <p class="sem-atores">Não foi possível analisar a atividade parlamentar para esta proposição</p>
    </div>
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
  computed: {
    tamanhoGrafico () {
      return document.getElementById('grafico').offsetWidth
    },
    verificaSeMostraAtores () {
      return this.atores && this.atores.length
    },
    atoresAgregados () {
      const atores = {}
      this.atores.forEach(element => {
        if (atores[element.id_autor] === undefined) { atores[element.id_autor] = 0 }
        atores[element.id_autor] += element.qtd_de_documentos
      })
      return atores
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
        15
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
        let model = new AtoresGraphicModel(this.tamanhoGrafico)
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
    this.$watch('atores', this.mountGraphic, { immediate: true, deep: true })
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
  overflow-x: auto;
}
.title {
  line-height: 15px;
}
.sem-atores {
  color: #969696;
  font-size: 0.8em;
}
</style>
