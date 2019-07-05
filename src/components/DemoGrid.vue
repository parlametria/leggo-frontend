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
            {{ key | capitalize }}
            <span class="arrow" :class="sortOrders[key] > 0 ? 'asc' : 'dsc'"></span>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(entry, indexData) in filteredData" :key="indexData">
          <td v-for="(key, index) in columns" :key="index">
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
              ></span>
            </div>

            <p v-else>{{entry[key]}}</p>
          </td>
        </tr>
      </tbody>
      <button @click="prevPage" :disabled="pageNumber==0" class="btn" >Anterior</button>
      <button @click="nextPage" :disabled="pageNumber >= pageCount -1" class="btn next" >Próxima</button>
    </table>
  </div>
</template>

<script>
import mixin from '@/mixins/ExpandedTexts.js'

export default {
  name: 'DemoGrid',
  props: {
    data: Array,
    columns: Array,
    filterKey: String,
    size: {
      type: Number,
      required: false,
      default: 10
    }
  },
  data: function () {
    var sortOrders = {}
    this.columns.forEach(function (key) {
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
    filteredData: function () {
      var sortKey = this.sortKey
      var filterKey = this.filterKey && this.filterKey.toLowerCase()
      var order = this.sortOrders[sortKey] || 1
      var data = this.paginatedData
      if (filterKey) {
        data = data.filter(function (row) {
          return Object.keys(row).some(function (key) {
            return (
              String(row[key])
                .toLowerCase()
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
    }
  },
  filters: {
    capitalize: function (str) {
      return str.charAt(0).toUpperCase() + str.slice(1)
    }
  },
  methods: {
    sortBy: function (key) {
      this.sortKey = key
      this.sortOrders[key] = this.sortOrders[key] * -1
    },
    corrigePartidoAutor (autor, key) {
      return this.formatTextoTramitacao(
        autor.replace('/NA', ''),
        key,
        this.MAX_TEXT_LENGTH,
        this.TEXT_TO_BE_SHOWED_LENGTH
      )
    },
    nextPage () {
      this.pageNumber++
    },
    prevPage () {
      this.pageNumber--
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

th {
  background-color: $--color-primary;
  color: #f9f9f9;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

td {
  background-color: #f9f9f9;
}

th,
td {
  min-width: 120px;
  padding: 10px 20px;
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

.btn {
  position: relative;

  overflow: hidden;
  padding: 2px;

  border-width: 0;
  outline: none;
  border-radius: 2px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, .6);

  background-color: $--color-primary;
  color: #ecf0f1;

  transition: background-color .3s;
}

.btn:hover, .btn:focus, .btn:disabled {
  background-color: #a03a3a;
}

.btn:before {
  content: "";

  position: absolute;
  top: 50%;
  left: 50%;

  display: block;
  width: 0;
  padding-top: 0;

  border-radius: 100%;

  background-color: rgba(236, 240, 241, .3);

  -webkit-transform: translate(-50%, -50%);
  -moz-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  -o-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}

.btn:active:before {
  width: 120%;
  padding-top: 120%;

  transition: width .2s ease-out, padding-top .2s ease-out;
}

.next {
    margin-left: 10px;
}
</style>
