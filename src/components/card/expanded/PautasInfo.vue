<template>
    <div v-if="propPautas && propPautas.length">
      <header>
        <span class="title">Próximas Pautas</span>
      </header>
      <table class="pautas">
        <tr v-for="(pauta, key) in propPautas" :key="key">
          {{propPautas}}
          <td><p>{{formatDate(pauta.data)}}</p></td>
          <td><p>{{pauta.local}}</p></td>
        </tr>
      </table>
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import moment from 'moment'

export default {
  name: 'PautasInfo',
  props: {
    id: Number,
    casa: String,
    date: {
      type: Date,
      default: function () {
        return new Date()
      }
    }
  },
  computed: {
    propPautas () {
      if (this.pautas) { return this.pautas[this.id] }
    },
    ...mapState({
      pautas: state => state.pautas.pautas
    }),
    formattedDate () {
      return moment(this.date).format('YYYY-MM-DD')
    }
  },
  methods: {
    ...mapActions(['getPautas']),
    formatDate (date) {
      return moment(date).format('DD/MM/YYYY')
    }
  }
}
</script>

<style scoped>
.el-collapse {
  margin-top: 1rem
}
.title {
  font-size: .97rem;
}
.pautas {
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
