<template>
  <div>
    <el-tabs>
      <el-tab-pane label="Geral">
        <atores-graphic
          :atores="atores"
          :casa="casa"
          :sigla="sigla"/>
          <influencia-graph :id_leggo="id_leggo"/>
      </el-tab-pane>
      <el-tab-pane
        :label="index | formataLocal"
        v-for="(atores_comissoes, index) in atoresLocaisImportantes"
        :key="index">
        <atores-graphic :atores="atores_comissoes"/>
      </el-tab-pane>
    </el-tabs>
    <router-link :to="linkAtores">
      <el-button class="btn" >Veja mais</el-button>
    </router-link>
  </div>
</template>

<script>
import AtoresGraphic from './AtoresGraphic.vue'
import InfluenciaGraph from '@/components/card/expanded/rede/InfluenciaGraph.vue'
import axios from "@/stores/axios"

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
    AtoresGraphic,
    InfluenciaGraph

  },
  methods: {
    setEdges({ data }) {
      this.edges = data
        .map(edge => ({
          ...edge,
          source: parseInt(edge.source, 10),
          target: parseInt(edge.target, 10)
        }));
    },
    setNodes({ data }) {
      this.nodes = data
        .map(node => ({
          ...node,
          node_size: parseInt(node.node_size, 10),
          x: 0,
          y: 0,
          id: parseInt(node.id_autor, 10),
        }))
    },
    async fetchData() {
      this.setNodes(
        await axios.get(`/coautorias_node/${this.id_leggo}`)
      );
      this.setEdges(
        await axios.get(`/coautorias_edge/${this.id_leggo}`)
      );
    }
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
    },
    influenciaLocaisImportantes () {
      let coautoresLocais = {}
    }

  }
}
</script>
