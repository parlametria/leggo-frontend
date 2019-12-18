<template>
  <div>
    <div
      class="graphic"
      id="grafico2">
      <div ref="anchor" />
      <div class="graphic-info">
        <p v-if="verificaSeMostraPressao">Pressão dos últimos 3 meses</p>
        <p v-else>Não há dados de pressão para esta proposição</p>
      </div>
    </div>
  </div>
</template>

<script>
import PressureGraphicModel from './PressureGraphicModel.js'
import EmptyPressureGraphic from './EmptyPressureGraphic.js'
import { mapState, mapActions } from 'vuex'
import moment from 'moment'

export default {
  name: 'PressureGraphic',
  props: {
    id: {
      type: Number,
      default: 0
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
          .change(
            'filteredPressoes', // eslint-disable-next-line
            vega.changeset().remove('filteredPressoes', d => true)
          )
          .insert('filteredPressoes', this.filteredPressoes)
          .run()
      } else {
        let model = new EmptyPressureGraphic(this.tamanhoGrafico)
        await // eslint-disable-next-line
        (await vegaEmbed(this.$refs.anchor, model.vsSpec)).view
          .run()
      }
    }
  },
  async mounted () {
    try {
      await this.getPressao({
        params: { idLeggo: this.id }
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
