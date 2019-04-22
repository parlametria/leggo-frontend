<template>
  <div>
    <span>Top-{{ emendas.length }} Emendas cujas propostas de mudança do texto original são <span style="color:#dc6060">Mais {{categoria}}</span>.</span>
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
        {{ corrigePartidoAutor(scope.row.autor) }}
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

export default {
  name: 'EmendasTabContent',
  props: {
    emendas: Array,
    categoria: String
  },
  methods: {
    corrigePartidoAutor (autor) {
      return autor.replace('/NA', '')
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
</style>
