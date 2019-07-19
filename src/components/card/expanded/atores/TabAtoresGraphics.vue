<template>
  <div>
    <el-tabs>
      <el-tab-pane label="Top Geral">
        <atores-graphic :atores="atores" />
      </el-tab-pane>
      <div
        v-for="(atores_comissoes, index) in atoresImportants"
        :key="index">
        <el-tab-pane :label="index">
          <atores-graphic :atores="getFirstN(atores_comissoes, 16)" />
        </el-tab-pane>
      </div>
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
    atoresImportants () {
      let atoresLocais = {}
      if (this.listaAtoresImportants[this.id]) {
        for (let ator of this.listaAtoresImportants[this.id]) {
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
      listaAtoresImportants: state => state.atores.atoresImportant
    })
  },
  methods: {
    getFirstN (atores, n) {
      return atores.slice(0, n)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
