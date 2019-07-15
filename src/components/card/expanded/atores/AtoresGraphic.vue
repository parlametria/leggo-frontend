<template>
  <div >
    <div
      v-if="verificaSeMostraAtores"
      class="graphic"
      id="grafico">
      <div ref="anchor"/>
    </div>
    <div v-else>
      <p class="sem-atores">Não foi possível analisar a atividade parlamentar para esta proposição</p>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import AtoresGraphicModel from './AtoresGraphicModel.js'

export default {
  name: 'AtoresGraphic',
  props: {
    id: {
      type: Number,
      default: undefined
    }
  },
  computed: {
    atores () {
      if (this.listaAtores[this.id]) {
        return this.listaAtores[this.id]
      }
    },
    ...mapState({
      listaAtores: state => state.atores.atores
    }),
    tamanhoGrafico () {
      return document.getElementById('grafico').offsetWidth
    },
    verificaSeMostraAtores () {
      return this.atores && this.atores.length
    }
  },
  methods: {
    ...mapActions(['getAtores']),
    async mountGraphic () {
      if (this.atores && this.atores.length) {
        let model = new AtoresGraphicModel(this.tamanhoGrafico)
        await (
          // eslint-disable-next-line
          (await vegaEmbed(this.$refs.anchor, model.vsSpec))
            .view
            // eslint-disable-next-line
            .change('ator', vega.changeset().remove('ator', d => true))
            .insert(
              'ator',
              this.atores
            ).run())
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
