<template>
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
      prop="distancia"
      label="Coerência">
      <template slot-scope="scope">
      {{ formatDistancia(scope.row.distancia) }}
      </template>
    </el-table-column>
    <el-table-column
      prop="autor"
      label="Autor">
    </el-table-column>
    <el-table-column
      prop="local"
      label="Local">
    </el-table-column>
  </el-table>
</template>

<script>
import moment from 'moment'
import _ from 'lodash'

export default {
  name: 'EmendasTabContent',
  props: {
    emendas: Array
  },
  methods: {
    formatDate (date) {
      return moment(date).format('DD/MM/YYYY')
    },
    formatDistancia: (distancia) => _.ceil(distancia, 2)
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
