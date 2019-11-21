<template>
  <div>
    <el-tabs>
      <el-tab-pane
        :label="index | formataLocal"
        v-for="(atores_comissoes, index) in atoresLocaisImportantes"
        :key="index">
        <atores-graphic :atores="atores_comissoes" />
      </el-tab-pane>
    </el-tabs>
    <router-link :to="linkAtores">
      <el-button class="btn" >Veja mais</el-button>
    </router-link>
  </div>
</template>

<script>
import AtoresGraphic from './AtoresGraphic.vue'

export default {
  name: 'TabAtoresGraphic',
  props: {
    top_atores: {
      type: Array,
      default: undefined
    },
    top_important_atores: {
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
      if (this.top_atores) {
        return this.top_atores
      }
    },
    linkAtores () {
      return {
        name: 'atores',
        params: {
          id_leggo: this.id_leggo,
          apelido: this.apelido
        }
      }
    },
    atoresLocaisImportantes () {
      let atoresLocais = {}
      if (this.top_important_atores) {
        for (let ator of this.top_important_atores) {
          if (Object.keys(atoresLocais).includes(ator.sigla_local_formatada)) {
            atoresLocais[ator.sigla_local_formatada].push(ator)
          } else {
            atoresLocais[ator.sigla_local_formatada] = []
            atoresLocais[ator.sigla_local_formatada].push(ator)
          }
        }
      }
      return atoresLocais
    }
  }
}
</script>
