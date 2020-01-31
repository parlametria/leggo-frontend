<template>
  <div>
    <div
      class="graphic"
      id="grafico2">
      <div ref="anchor" />
      <div class="graphic-info">
        <p v-if="verificaSeMostraPressao">Pressão dos últimos 3 meses</p>
        <p v-else>Não houve buscas para esta proposição nos últimos 3 meses</p>
        <el-tooltip
          placement="bottom"
          effect="light">
          <div
            class="tooltip-content"
            slot="content">
            O cálculo da pressão utiliza o
            <a
              target="_blank"
              href="https://trends.google.com.br/trends/?geo=BR">
              <b>Google Trends</b>
            </a> para analisar o quanto usuários estão pesquisando pela proposição.
            <a
              class="link"
              @click="goToSobre()">Mais detalhes</a>
          </div>
          <span
            target="_blank"
            class="link icon-info">
            <i class="bx bx-info-circle"/>
          </span>
        </el-tooltip>
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
    },
    goToSobre () {
      this.$router.push({ path: '/sobre' })
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
  justify-content: center;
  display: flex;
}
.graphic {
  details {
    display: none;
  }
}
.graphic {
  text-align: center;
}
.tooltip-content {
  max-width: 200px;
}
.link {
  cursor: pointer;
  color: #AA67AE;
}
.icon-info {
  margin: 12px 4px 10px 8px;
  font-size: 1rem;
}
</style>
