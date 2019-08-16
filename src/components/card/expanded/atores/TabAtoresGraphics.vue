<template>
  <div>
    <el-tabs>
      <el-tab-pane label="Geral">
        <atores-graphic
          :atores="atores"
          :casa="casa"
          :sigla="sigla"/>
      </el-tab-pane>
      <el-tab-pane
        :label="index | formataLocal"
        v-for="(atores_comissoes, index) in atoresLocaisImportantes"
        :key="index">
        <atores-graphic :atores="atores_comissoes" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import AtoresGraphic from './AtoresGraphic.vue'

export default {
  name: 'TabAtoresGraphic',
  props: {
    etapa: {
      type: Number,
      default: undefined
    }
  },
  filters: {
    formataLocal (value) {
      if (value.toLowerCase() === 'plen') {
        return 'Plenário'
      } else if (/\d/.test(value)) {
        return value.concat(' - ', 'Com. Especial')
      } else {
        return value
      }
    }
  },
  components: {
    AtoresGraphic
  },
  computed: {
    atores () {
      if (this.etapa.top_atores) {
        return this.etapa.top_atores
      }
    },
    atoresLocaisImportantes () {
      let atoresLocais = {}
      if (this.etapa.top_important_atores) {
        for (let ator of this.etapa.top_important_atores) {
          if (Object.keys(atoresLocais).includes(ator.sigla_local)) {
            atoresLocais[ator.sigla_local].push(ator)
          } else {
            atoresLocais[ator.sigla_local] = []
            atoresLocais[ator.sigla_local].push(ator)
          }
        }
      }
      return atoresLocais
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
