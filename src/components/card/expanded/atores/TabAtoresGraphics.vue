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
    important_atores: {
      type: Array,
      default: undefined
    },
    casa: {
      type: String,
      default: ''
    },
    sigla: {
      type: String,
      default: ''
    },
    id_leggo: {
      type: Number,
      default: -1
    },
    apelido: {
      type: String,
      default: ''
    }
  },
  filters: {
    formataLocal (value) {
      if (value.toLowerCase().includes('plen')) {
        return value.replace('PLEN', 'Plenário')
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
      if (this.important_atores) {
        return this.important_atores
      }
    },
    atoresLocaisImportantes () {
      let atoresLocais = {}
      if (this.important_atores) {
        for (let ator of this.important_atores) {
          if (ator.is_important) {
            const cargo = ator.casa_autor === "camara" ? "Dep." : "Sen."
            const is_oposicao = ator.bancada === "oposição" ? "*" : ""
            ator.nome_partido_uf = is_oposicao + " " + cargo + " " + ator.autor_nome + " (" + ator.autor_partido + "/" + ator.autor_uf + ")"
            if (!Object.keys(atoresLocais).includes(ator.sigla_local)) {
              atoresLocais[ator.sigla_local] = []
            }
            atoresLocais[ator.sigla_local].push(ator)
          }
        }
      }
      return atoresLocais
    }
  }
}
</script>
