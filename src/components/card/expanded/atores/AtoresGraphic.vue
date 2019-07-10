<template>
  <el-collapse v-if="verificaSeMostraAtores">
    <el-collapse-item>
      <template slot="title">
        <h4 class="title">Análise dos atores mais ativos da proposição</h4>
      </template>
      <div class="graphic" id="grafico">
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
        await
        (await vegaEmbed(this.$refs.anchor, model.vsSpec)).view.insert(
          'ator',
          this.atores
        )
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
  overflow-x:auto;
}
.title {
   line-height: 15px;
}
</style>
