<template>
<!-- demo root element -->
<div>
  <div class="search">
    Pesquisa <input name="query" v-model="searchQuery">
  </div>
  <demo-grid
    :data="emendas"
    :columns="['titulo', 'autor', 'local']"
    :filter-key="query">
  </demo-grid>
</div>
</template>

<script>
import DemoGrid from '@/components/DemoGrid.vue'

export default {
  name: 'EmendasTabContent',
  data () {
    return {
      searchQuery: '',
      query: ''
    }
  },
  components: {
    DemoGrid
  },
  props: {
    emendas: Array,
    categoria: String
  },
  watch: {
    searchQuery (newValue, oldValue) {
      _.debounce(() => this.query = newValue, 500)()
    }
  }
}
</script>

<style scoped lang='scss'>
@import "@/base.scss";
.emendas {
  font-size: 10pt;
  text-align: center;
}
table {
  border-collapse: collapse;
  width: 100%;
}
th,
td {
  padding: 0.5rem;
  text-align: left;
}
.explicacao_emendas {
  color: #999;
}
.search {
  padding-bottom: 10px;
}
</style>
