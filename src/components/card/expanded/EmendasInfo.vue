<template>
    <el-collapse v-if="propEmendas && propEmendas.length">
      <el-collapse-item>
        <template slot="title">
          <span class="title">Últimas Emendas</span>
        </template>
        <table class="emendas">
            <tr v-for="(emenda, key) in propEmendas.slice(0, 3)" :key="key">
              <td><p>{{formatDate(emenda.data_apresentacao)}}</p></td>
              <td><p>{{emenda.local}}</p></td>
              <td><p>{{emenda.autor}}</p></td>
            </tr>
        </table>
      </el-collapse-item>
    </el-collapse>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import moment from 'moment'

export default {
  name: 'EmendasInfo',
  props: {
    id: Number,
    casa: String,
    date: {
      type: Date,
      default: function () {
        return moment()
      }
    }
  },
  mounted () {
    this.getEmendas(this.query)
  },
  computed: {
    propEmendas () {
      return this.emendas[this.id]
    },
    ...mapState({
      emendas: state => state.emendas.emendasDict
    }),
    formattedDate () {
      return moment(this.date).format('YYYY-MM-DD')
    },
    query () {
      return {
        params: {
          casa: this.casa,
          id: this.id,
          dataFim: this.formattedDate
        }
      }
    }
  },
  methods: {
    ...mapActions(['getEmendas']),
    formatDate (date) {
      return moment(date).format('DD/MM/YYYY')
    }
  },
  watch: {
    date () {
      this.getEmendas(this.query)
    }
  }
}
</script>

<style scoped>
.title {
  font-size: .97rem;
}
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
