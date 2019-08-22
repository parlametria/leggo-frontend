<template>
  <div>
    <div
      class="graphic"
      id="grafico2"
      v-if="verificaSeMostraPressao">
      <div ref="anchor" />
      <p class="graphic-info">Pressão dos últimos 3 meses</p>
    </div>
    <div v-else>Não há dados sobre pressão!</div>
  </div>
</template>

<script>
import PressureGraphicModel from './PressureGraphicModel.js'
import { mapState, mapActions } from 'vuex'
import moment from 'moment'

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
      return (
        this.pressoes &&
        this.pressoes[this.id] !== undefined &&
        this.pressoes[this.id].length !== 0
      )
    },
    tamanhoGrafico () {
      return document.getElementById('grafico2').offsetWidth
    },
    filteredPressoes () {
      return this.pressoes[this.id].filter(e =>
        moment(e.date).isAfter(moment(new Date()).subtract(3, 'months'))
      )
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
          .change('filteredPressoes', vega.changeset().remove('filteredPressoes', d => true))
          .insert('filteredPressoes', this.filteredPressoes)
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
.graphic-info {
  font-size: 12px;
  color: #555;
  text-align: center;
}
.graphic {
  details {
    display: none;
  }
}
.graphic {
  text-align: center;
}
</style>
