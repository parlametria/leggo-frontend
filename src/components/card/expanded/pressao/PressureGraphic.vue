<template>
  <div>
    <div
      class="graphic"
      id="grafico">
      <div ref="anchor" />
    </div>
  </div>
</template>

<script>
import PressureGraphicModel from './PressureGraphicModel.js'
import { mapState, mapActions } from 'vuex'

export default {
  name: 'PressureGraphic',
  props: {
    id: {
      type: Number,
      default: 0
    },
    casa: {
      type: String,
      default: ''
    }
  },
  computed: {
    ...mapState({
      pressoes: state => state.pressao.pressao
    }),
    verificaSeMostraPressao () {
      return this.pressoes && this.pressoes[this.id] !== undefined
    }
  },
  methods: {
    ...mapActions(['getPressao']),
    async mountGraphic () {
      if (this.verificaSeMostraPressao) {
        let model = new PressureGraphicModel(this.tamanhoGrafico)
        await // eslint-disable-next-line
        (await vegaEmbed(this.$refs.anchor, model.vsSpec)).view
          // eslint-disable-next-line
          .change("pressoes", vega.changeset().remove("pressoes", d => true))
          .insert('pressoes', this.pressoes[this.id])
          .run()
      }
    }
  },
  async mounted () {
    try {
      await this.getPressao({
        params: { id: this.id, casa: this.casa }
      })
    } catch (exc) {
      this.composicao = undefined
    }
    this.$watch('pressoes', this.mountGraphic, { immediate: true, deep: true })
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
</style>
