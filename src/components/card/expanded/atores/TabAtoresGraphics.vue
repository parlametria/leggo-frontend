<template>
  <div>
    <el-tabs v-model="activeTab">
      <el-tab-pane
        :label="index | formataLocal"
        v-for="(atores_comissoes, index) in atoresLocais"
        :key="index"
        :name="index"
        :lazy="true"
      >
        <div v-if="index === activeTab">
          <atores-graphic :atores="atores_comissoes" />
          <router-link :to="linkAtores">
            <el-button class="btn">Veja mais</el-button>
          </router-link>
          <influencia-graph
            v-if="nodes.length !== 0 && edges.length !== 0 && influencia.length !== 0"
            :id-leggo="id_leggo"
            :all-nodes="nodesLocais[index]"
            :all-edges="edgesLocais[index]"
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
    },
    createDataTabFromList (list) {
      let object = { 'Geral - Senado': [], 'Geral - Câmara': [] }
      for (let item of list || []) {
        if (!Object.keys(object).includes(item.sigla_local_formatada)) {
          object[item.sigla_local_formatada] = []
        }
        object[item.sigla_local_formatada].push(item)
        object[`Geral - ${item.casa && item.casa === 'camara' ? 'Câmara' : 'Senado'}`].push(item)
      }
      return object
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
      let atoresLocais = { 'Geral - Senado': [], 'Geral - Câmara': [] }

      for (let ator of this.top_important_atores || []) {
        if (ator.sigla_local_formatada) {
          if (!Object.keys(atoresLocais).includes(ator.sigla_local_formatada)) {
            atoresLocais[ator.sigla_local_formatada] = []
          }
          atoresLocais[ator.sigla_local_formatada].push(ator)
        }
        if (Object.keys(atoresLocais).includes(ator.sigla_geral_formatada)) {
        }
        if (ator.sigla_geral_formatada) {
          if (!Object.keys(atoresLocais).includes(ator.sigla_geral_formatada)) {
            atoresLocais[ator.sigla_geral_formatada] = []
          }
          atoresLocais[ator.sigla_geral_formatada].push(ator)
        }
        atoresLocais[`Geral - ${ator.casa && ator.casa === 'camara' ? 'Câmara' : 'Senado'}`].push(ator)
      }
      if (atoresLocais['Geral - Senado'].length === 0) delete atoresLocais['Geral - Senado']
      if (atoresLocais['Geral - Câmara'].length === 0) delete atoresLocais['Geral - Câmara']
      return atoresLocais
    },
    nodesLocaisImportantes () {
      return this.createDataTabFromList(this.nodes)
    },
    edgesLocaisImportantes () {
      return this.createDataTabFromList(this.edges)
    },
    atoresLocais () {
      return {
        'Geral': this.top_atores,
        ...this.atoresLocaisImportantes
      }
    },
    nodesLocais () {
      return {
        'Geral': this.nodes,
        ...this.nodesLocaisImportantes
      }
    },
    edgesLocais () {
      return {
        'Geral': this.edges,
        ...this.edgesLocaisImportantes
      }
    }
  }
}
</script>
