<template>
  <el-collapse v-if="verificaSeMostraAtores">
    <el-collapse-item>
      <template slot="title">
        <h4>Análise dos atores mais ativos da proposição</h4>
      </template>
      <div class="graphic2" id="grafico">
        <div ref="anchor"></div>
      </div>
    </el-collapse-item>
  </el-collapse>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import AtoresGraphicModel from './AtoresGraphicModel.js'

export default {
  name: 'AtoresGraphic',
  props: {
    id: Number
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
        await // eslint-disable-next-line
        (await vegaEmbed(this.$refs.anchor, model.vsSpec)).view.insert(
          'ator',
          this.atores
        )
        // eslint-disable-next-line
        //   .change("ator", vega.changeset().remove("ator", d => true))
        //   .insert(
        //     "ator",
        //     this.ator.map(ator => ({
        //       ...ator,
        //       qnt_documentos: ator.qtd_de_documentos
        //     }))
        //   )
        //   .run();
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
.graphic2 {
  text-align: left;
}
</style>
