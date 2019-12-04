<template>
  <div>
    <el-tabs v-model="activeTab">
      <el-tab-pane
        label="Geral"
        :lazy="true"
        :name="'Geral'"
      >
        <div v-if="'Geral' === activeTab">
          <atores-graphic
            :atores="atores"
            :casa="casa"
            :sigla="sigla"/>
          <influencia-graph
            v-if="nodes.length !== 0 && edges.length !== 0 && influencia.length !== 0"
            :id_leggo="id_leggo"
            :nodes="nodes"
            :edges="edges"
            :influencia="influencia"
          />
        </div>
      </el-tab-pane>
      <el-tab-pane
        :label="index | formataLocal"
        v-for="(atores_comissoes, index) in atoresLocaisImportantes.atoresLocais"
        :key="index"
        :name="index"
        :lazy="true"
      >
        <div v-if="index === activeTab">
          <atores-graphic :atores="atores_comissoes"/>
          <router-link :to="linkAtores">
            <el-button class="btn">Veja mais</el-button>
          </router-link>
          <influencia-graph
            v-if="nodes.length !== 0 && edges.length !== 0 && influencia.length !== 0"
            :id_leggo="id_leggo"
            :nodes="nodesLocaisImportantes[index]"
            :edges="edgesLocaisImportantes[index]"
            :influencia="influencia"
          />
        </div>
      </el-tab-pane>
    </el-tabs>

  </div>
</template>

<script>
import AtoresGraphic from './AtoresGraphic.vue'
import InfluenciaGraph from '@/components/card/expanded/rede/InfluenciaGraph.vue'
import axios from '@/stores/axios'
import { vaxios } from '../rede/mocks/vaxios'

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
  data () {
    return {
      nodes: [],
      edges: [],
      influencia: [],
      activeTab: 'Geral'
    }
  },
  mounted () {
    this.fetchData()
  },
  methods: {
    setEdges ({ data }) {
      this.edges = data.map(edge => ({
        ...edge,
        source: parseInt(edge.source, 10),
        target: parseInt(edge.target, 10)
      }))
    },
    setNodes ({ data }) {
      this.nodes = data.map(node => ({
        ...node,
        node_size: parseInt(node.node_size, 10),
        x: 0,
        y: 0,
        id: parseInt(node.id_autor, 10)
      }))
    },
    setInfluencia ({ data }) {
      this.influencia = data
      this.nodes.forEach(node => {
        node['influencia'] = 0
        this.influencia.forEach(parlamentar => {
          if (parlamentar.id === node.id) {
            node['influencia'] = parlamentar.indice_influencia_parlamentar
          }
        })
      })
    },
    async fetchData () {
      this.setNodes(await axios.get(`/coautorias_node/${this.id_leggo}`))
      this.setEdges(await axios.get(`/coautorias_edge/${this.id_leggo}`))
      this.setInfluencia(await vaxios.post(`/api/aderencia/parlamentar`, {}))
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
      let count = 1
      let dictLocalIndex = {}
      if (this.top_important_atores) {
        for (let ator of this.top_important_atores) {
          if (Object.keys(atoresLocais).includes(ator.sigla_local_formatada)) {
            atoresLocais[ator.sigla_local_formatada].push(ator)
          } else {
            atoresLocais[ator.sigla_local_formatada] = []
            dictLocalIndex[ator.sigla_local_formatada] = count
            atoresLocais[ator.sigla_local_formatada].push(ator)
            count++
          }
        }
      }
      return { atoresLocais, dictLocalIndex }
    },
    nodesLocaisImportantes () {
      let nodesLocais = {}
      if (this.nodes) {
        for (let node of this.nodes) {
          if (Object.keys(nodesLocais).includes(node.sigla_local_formatada)) {
            nodesLocais[node.sigla_local_formatada].push(node)
          } else {
            nodesLocais[node.sigla_local_formatada] = []
            nodesLocais[node.sigla_local_formatada].push(node)
          }
        }
      }

      return nodesLocais
    },

    edgesLocaisImportantes () {
      let edgesLocais = {}
      if (this.edges) {
        for (let edge of this.edges) {
          if (Object.keys(edgesLocais).includes(edge.sigla_local_formatada)) {
            edgesLocais[edge.sigla_local_formatada].push(edge)
          } else {
            edgesLocais[edge.sigla_local_formatada] = []
            edgesLocais[edge.sigla_local_formatada].push(edge)
          }
        }
      }

      return edgesLocais
    }
  }
}
</script>
