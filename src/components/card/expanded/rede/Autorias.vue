<template>
  <div v-if="isActive">
    <h5>Documentos - {{ nome }}</h5>
    <leggo-table
      :data="autorias"
      :columns="['data', 'descricao_tipo_documento', 'autores']"
      :is-emenda-table="false"/>
  </div>
</template>

<script>
import axios from '@/stores/axios'
import LeggoTable from '@/components/LeggoTable.vue'

export default {
  name: 'Autorias',
  components: {
    LeggoTable
  },
  props: {
    node: {
      type: Object,
      default: null
    },
    id_leggo: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      autorias: []
    }
  },
  computed: {
    isActive () {
      this.fetchData()
      return this.node !== null
    },
    nome () {
      const { node } = this
      return `${node.nome} (${node.partido === 'nan' ? '-' : node.partido}/${node.uf === 'nan' ? '-' : node.uf})`
    }
  },
  methods: {
    async fetchData () {
      this.setAutorias(await axios.get(`/autorias/${this.id_leggo}`))
    },
    setAutorias ({ data }) {
      if (this.node !== null) {
        this.autorias = data.filter(
          autoria => autoria.id_autor === this.node.id_autor
        )
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
