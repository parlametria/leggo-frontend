<template>
  <div class="container">
    <el-input
      placeholder="Pesquisar Projeto"
      v-model="searchField"
      prefix-icon="el-icon-search"
      @keyup.enter="this.focus = false"
    />
    <el-button
      @click="outerVisible = true">Filtros</el-button>
    <el-dialog
      title="Filtros"
      :visible.sync="outerVisible"
      :width="widthDialog">
      <span>
        <filter-menu />
      </span>
    </el-dialog>
  </div>
</template>

<script>
import FilterMenu from '@/components/menu/FilterMenu'
import { mapActions } from 'vuex'
export default {
  name: 'FilterButton',
  components: {
    FilterMenu
  },
  data () {
    return {
      isCollapse: true,
      searchField: '',
      outerVisible: false
    }
  },
  computed: {
    widthScreen () {
      return screen.width
    },
    widthDialog () {
      return this.widthScreen > 500 ? '400px' : '90vw'
    }
  },
  methods: {
    ...mapActions(['filtraNomeProposicao'])
  },
  watch: {
    searchField: {
      immediate: true,
      deep: true,
      handler (newValue, oldValue) {
        this.filtraNomeProposicao(newValue)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  display: grid;
  grid-template-columns: 4fr 1fr;
  grid-template-rows: 1fr;
  grid-gap: 10px 20px;
  padding: 0 0 5vh 0;
}
</style>
