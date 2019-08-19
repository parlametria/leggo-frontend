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
import _ from 'lodash'
import { mapState } from 'vuex'

export default {
  name: 'PressureGraphic',
  props: {
    id: {
      type: String,
      default: ''
    },
    casa: {
      type: String,
      default: ''
    }
  },
  computed: {
    ...mapState({
      pressoes: state => state.pressao
    }),
    verificaSeMostraPressao () {
      return this.pressao && this.pressao.length
    }
  },
  methods: {
    ...mapActions(['getPressao']),
    async mountGraphic () {
        console.log(this.pressoes)
      if (verificaSeMostraPressao) {
        let model = new PressaoGraphicModel(this.tamanhoGrafico)
        await // eslint-disable-next-line
        (await vegaEmbed(this.$refs.anchor, model.vsSpec)).view
          // eslint-disable-next-line
          .change("pressao", vega.changeset().remove("pressao", d => true))
          .insert('pressao', this.pressao)
          .run()
      }
    }
  },
  mounted () {
    this.$watch('pressao', this.mountGraphic, { immediate: true, deep: true })
  },
    async mounted () {
    try {
      await this.getPressao({
        params: { id: this.id, casa: this.casa }
      })

    } catch (exc) {
      this.composicao = undefined
    }
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
