<template>
  <div>
    <span class="explicacao_emendas"> {{ getTextoExplicacao }}</span>
    <div class="search-input">
      <input
        type="text"
        v-model="searchQuery" >
      <span class="highlight"/>
      <span class="bar"/>
      <label>Pesquise aqui</label>
      <span class="el-icon-search"/>
      <span
        class="loader"
        v-show="loading"/>
    </div>
    <leggo-table
      :data="emendas"
      :columns="['titulo', 'autor', 'local']"/>    
  </div>
</template>

<script>
import LeggoTable from '@/components/LeggoTable.vue'
import _ from 'lodash'

export default {
  name: 'EmendasTabContent',
  data () {
    return {
      searchQuery: '',
      query: '',
      loading: false
    }
  },
  components: {
    LeggoTable
  },
  props: {
    emendas: {
      type: Array,
      default () { return [] }
    },
    categoria: {
      type: String,
      default: ''
    },
    showTextoExplicacao: {
      type: Boolean,
      default: false
    }
  },
  created () {
    this.delay = _.debounce(() => {
      this.query = this.searchQuery
      this.loading = false
    }, 500)
  },
  watch: {
    searchQuery (newValue, oldValue) {
      this.loading = true
      this.delay()
    }
  },
  computed: {
    getTextoExplicacao () {
      return this.categoria === 'todas'
        ? 'Essas são as '.concat(
          this.emendas.length,
          ' emendas da proposição.'
        )
        : 'Essas são as '.concat(
          this.emendas.length,
          ' emendas que propõem mudanças mais ',
          this.categoria,
          '.'
        )
    }
  }
}
</script>

<style scoped lang='scss'>
@import "@/base.scss";
$primary-color: rgba(0, 0, 0, 1);
$hint-color: rgba(0, 0, 0, 0.3);

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

.search-input {
  position: relative;
  padding: 1rem 0 0.5rem 0;
  width: 95%;
}

.search-input input {
  border: none;
  border-bottom: 1px solid $--color-primary;
  display: block;
  font-size: 1rem;
  line-height: 1rem;
  margin: 0;
  padding: 0.6rem 0;
  width: 100%;
  text-align: left;
  background-color: transparent;
  color: $--color-primary;
}

.search-input input:focus {
  outline: none;
}

.search-input label {
  position: absolute;
  left: 0;
  top: 1.625rem;
  width: 100%;
  color: $hint-color;
  font-size: 1rem;
  line-height: 1rem;
  font-weight: normal;
  pointer-events: none;
  transition: 0.2s ease all;
  -moz-transition: 0.2s ease all;
  -webkit-transition: 0.2s ease all;
}

.search-input input:focus ~ label {
  top: 0;
  font-size: 0.75rem;
  color: $--color-primary;
}

.search-input label.not-empty {
  top: 0;
  font-size: 0.75rem;
}

.search-input span:nth-of-type(3) {
  position: absolute;
  color: $--color-primary;
  left: 100%;
  top: 1.625rem;
  font-size: 1rem;
  transition: 0.2s ease all;
  -moz-transition: 0.2s ease all;
  -webkit-transition: 0.2s ease all;
}

.search-input input:focus ~ span:nth-of-type(3) {
  left: -1.625rem;
  top: 1.625rem;
  color: $--color-primary;
}

.search-input span:nth-of-type(3).not-empty {
  left: -1.625rem !important;
  top: 1.625rem !important;
}

.search-input span:nth-of-type(4) {
  position: absolute;
  color: $--color-primary;
  right: 0;
  top: 1.625rem;
  font-size: 1rem;
  opacity: 0;
  transition: 0.2s ease all;
  -moz-transition: 0.2s ease all;
  -webkit-transition: 0.2s ease all;
}

.search-input input:focus ~ span:nth-of-type(4) {
  color: $--color-primary;
  opacity: 1;
  cursor: pointer;
}

.search-input span:nth-of-type(4).not-empty {
  opacity: 1 !important;
}

.search-input .bar {
  display: block;
  width: 0;
  margin-left: 50%;
  height: 1px;
  background: $--color-primary;
  opacity: 0;
  transition: 0.2s ease all;
  -moz-transition: 0.2s ease all;
  -webkit-transition: 0.2s ease all;
}

.search-input input:focus ~ .bar {
  opacity: 1;
  width: 100%;
  margin-left: 0;
}

.loader {
  border: 3px solid #f3f3f3;
  border-radius: 50%;
  border-top: 3px solid $--color-primary;
  width: 20px;
  height: 20px;
  -webkit-animation: spin 1s linear infinite; /* Safari */
  animation: spin 1s linear infinite;
}

/* Safari */
@-webkit-keyframes spin {
  0% {
    -webkit-transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
  }
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
