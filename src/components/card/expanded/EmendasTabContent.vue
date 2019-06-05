<template>
  <div>
    <span class="explicacao_emendas">Essas são as {{ emendas.length }} emendas que propõem mudanças mais {{categoria}}.</span>
    <el-table
      :data="emendas"
      stripe
      style="width: 100%">
      <el-table-column
        label="Emenda">
        <template slot-scope="scope">
          <a :href="scope.row.inteiro_teor+'&disposition=inline'" target="_blank">{{ scope.row.titulo }}</a>
        </template>
      </el-table-column>
      <el-table-column
        label="Autor">
        <template slot-scope="scope">
          <div :class="{clickable: scope.row.autor.length > MAX_TEXT_LENGTH}"
             @click="toggleCollapseDescription(scope.$index)">
        {{ corrigePartidoAutor(
          scope.row.autor,
          scope.$index) }}
       </div>
        </template>
      </el-table-column>
      <el-table-column
        prop="local"
        label="Local">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import mixin from '@/mixins/ExpandedTexts.js'

export default {
  name: 'EmendasTabContent',
  data () {
    return {
      MAX_TEXT_LENGTH: 100,
      TEXT_TO_BE_SHOWED_LENGTH: 30,
      expandedDescriptions: []
    }
  },
  mixins: [mixin],
  props: {
    emendas: Array,
    categoria: String
  },
  methods: {
    corrigePartidoAutor (autor, key) {
      return this.formatTextoTramitacao(autor.replace('/NA', ''), key, this.MAX_TEXT_LENGTH, this.TEXT_TO_BE_SHOWED_LENGTH)
    }
  }
}
</script>

<style scoped>
.emendas {
    font-size: 10pt;
    text-align: center;
}
table {
    border-collapse: collapse;
    width: 100%;
}
th, td {
    padding: .5rem;
    text-align: left;
}
.explicacao_emendas {
    color: #999;
}
</style>
