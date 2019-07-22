<template>
  <div>
    <el-tabs>
      <el-tab-pane label="Top Geral">
        <atores-graphic :atores="atores" />
      </el-tab-pane>
        <el-tab-pane :label="index" v-for="(atores_comissoes, index) in atoresLocaisImportantes"
        :key="index">
          <atores-graphic :atores="atores_comissoes" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import AtoresGraphic from './AtoresGraphic.vue'

export default {
  name: 'TabAtoresGraphic',
  props: {
    id: {
      type: Number,
      default: undefined
    }
  },
  components: {
    AtoresGraphic
  },
  computed: {
    atores () {
      if (this.listaAtores[this.id]) {
        return this.listaAtores[this.id]
      }
    },
    atoresLocaisImportantes () {
      let atoresLocais = {}
      if (this.listaAtoresLocaisImportantes[this.id]) {
        for (let ator of this.listaAtoresLocaisImportantes[this.id]) {
          if (Object.keys(atoresLocais).includes(ator.sigla_local)) {
            atoresLocais[ator.sigla_local].push(ator)
          } else {
            atoresLocais[ator.sigla_local] = []
            atoresLocais[ator.sigla_local].push(ator)
          }
        }
      }

      return atoresLocais
    },
    ...mapState({
      listaAtores: state => state.atores.atores,
      listaAtoresLocaisImportantes: state => state.atores.atoresLocaisImportantes
    })
  }
}
</script>

<style lang="scss" scoped>
</style>
