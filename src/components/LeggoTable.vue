<template>
  <div style="overflow-x:auto;">
    <table>
      <thead>
        <tr>
          <th
            v-for="key in columns"
            @click="sortBy(key)"
            :class="{ active: sortKey == key }"
            :key="key"
          >
            {{ key | formatColumTitle }}
            <span
              class="arrow"
              :class="sortOrders[key] > 0 ? 'asc' : 'dsc'"/>
          </th>
        </tr>
      </thead>
      <tbody v-if="isEmendaTable">
        <tr
          v-for="(entry, indexData) in filteredData"
          :key="indexData">

          <td
            v-for="(key, index) in columns"
            :key="index"
            v-show="verificaSeEmenda(entry)">
            <a
              v-if="key === 'titulo'"
              :href="entry['inteiro_teor']+'&disposition=inline'"
              target="_blank"
            >{{ entry[key] }}</a>
            <div
              v-else-if="key === 'autor'"
              :class="{clickable: entry[key].length > MAX_TEXT_LENGTH}"
              @click="toggleCollapseDescription(indexData)"
            >
              {{ corrigePartidoAutor(
                entry[key],
                indexData) }}
              <span
                v-if="isShowExpandIcon(entry[key], MAX_TEXT_LENGTH, indexData)"
                class="el-icon-circle-plus-outline"
              />
            </div>

            <p v-else>{{ entry[key] }}</p>
          </td>
        </tr>
      </tbody>
      <tbody v-else>
        <tr
          v-for="(entry, indexData) in filteredData"
          :key="indexData">
          <td
            v-for="(key, index) in columns"
            :key="index">
            <a
              v-if="key === 'descricao_tipo_documento'"
              :href="getUrl(entry)"
              target="_blank"
            >{{ entry[key] }}</a>
            <p v-else>{{ entry[key] }}</p>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="paginationbar">
      <pagination-bar
        :size="pageCount"
        :limit="getLimitPages"
        @change="(number) => updatePageNumber(number)"/>
    </div>
  </div>
</template>

<script>
import mixin from '@/mixins/ExpandedTexts.js'
import PaginationBar from '@/components/utils/PaginationBar'

export default {
  name: 'LeggoTable',
  props: {
    data: {
      type: Array,
      default () { return [] }
    },
    columns: {
      type: Array,
      default () { return [] }
    },
    size: {
      type: Number,
      required: false,
      default: 10
    },
    isEmendaTable: {
      type: Boolean,
      default: true
    },
    filterKey: {
      type: String,
      default: undefined
    }
  },
  components: {
    PaginationBar
  },
  data () {
    let sortOrders = {}
    this.columns.forEach((key) => {
      sortOrders[key] = 1
    })
    return {
      pageNumber: 0,
      MAX_TEXT_LENGTH: 100,
      TEXT_TO_BE_SHOWED_LENGTH: 30,
      sortKey: '',
      sortOrders: sortOrders
    }
  },
  mixins: [mixin],
  computed: {
    filteredData () {      
      let sortKey = this.sortKey
      let filterKey = this.filterKey && this.filterKey.toLowerCase()
      filterKey = filterKey.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
      let order = this.sortOrders[sortKey] || 1
      let data = this.paginatedData
      if (filterKey) {
        data = data.filter(function (row) {
          return Object.keys(row).some(function (key) {
            return (
              String(row[key])
                .toLowerCase()
                .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
                .indexOf(filterKey) > -1
            )
          })
        })
      }
      if (sortKey) {
        data = data.slice().sort(function (a, b) {
          a = a[sortKey]
          b = b[sortKey]
          return (a === b ? 0 : a > b ? 1 : -1) * order
        })
      }
      return data
    },
    pageCount () {
      let l = this.data.length
      let s = this.size
      return Math.ceil(l / s)
    },
    paginatedData () {
      const start = this.pageNumber * this.size
      const end = start + this.size
      return this.data.slice(start, end)
    },
    getLimitPages () {
      return Math.floor(window.innerWidth / 150)
    }
  },
  filters: {
    capitalize (str) {
      return str.charAt(0).toUpperCase() + str.slice(1)
    },
    formatColumTitle (str) {
      return str.charAt(0).toUpperCase() + str.slice(1).replace(new RegExp('_', 'g'), ' ')
    }
  },
  methods: {
    sortBy (key) {
      this.sortKey = key
      this.sortOrders[key] = this.sortOrders[key] * -1
    },
    verificaSeEmenda (dadosEmendas) {
      return !dadosEmendas['titulo'].includes('nan')
    },
    updatePageNumber (pageCount) {
      this.pageNumber = pageCount
    },
    corrigePartidoAutor (autor, key) {
      return this.formatTextoTramitacao(
        autor.replace('/NA', ''),
        key,
        this.MAX_TEXT_LENGTH,
        this.TEXT_TO_BE_SHOWED_LENGTH
      )
    },
    getUrl (entry) {
      return entry['url_inteiro_teor'] + '&disposition=inline'
    }
  }
}
</script>

<style scoped lang='scss'>
@import "@/base.scss";
body {
  font-family: Helvetica Neue, Arial, sans-serif;
  font-size: 14px;
  color: #444;
}

table {
  border: 2px solid $--color-primary;
  border-radius: 3px;
  background-color: #fff;
  width: 100%;
}

thead {
  font-size: 1rem;
}

tr {
  font-size: 0.8rem;
}

th {
  background-color: $--color-primary;
  color: #f9f9f9;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  padding: 10px;
}

td {
  background-color: #f9f9f9;
  padding: 10px;
  color: #303133;
}

th.active {
  color: #fff;
}

th.active .arrow {
  opacity: 1;
}

.arrow {
  display: inline-block;
  vertical-align: middle;
  width: 0;
  height: 0;
  margin-left: 5px;
  opacity: 0.66;
}

.arrow.asc {
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-bottom: 4px solid #fff;
}

.arrow.dsc {
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-top: 4px solid #fff;
}

.el-icon-circle-plus-outline {
  color: $--color-primary;
}

.paginationbar {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px 0;
}
</style>
