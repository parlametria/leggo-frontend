<template>
    <div v-if="propPautas && propPautas.length">
        <h4 class="descricao">Próximas pautas</h4>
        <table class="pautas">
            <tr v-for="(pauta, key) in propPautas" :key="key">
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
  mounted () {
    if (Object.keys(this.pautas).length === 0) {
      this.getPautas(this.query)
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
    },
    query () {
      return {
        params: {
          casa: this.casa,
          id: this.id,
          date: this.formattedDate
        }
      }
    }
  },
  methods: {
    ...mapActions(['getPautas']),
    formatDate (date) {
      return moment(date).format('DD/MM/YYYY')
    }
  },
  watch: {
    date () {
      this.getPautas(this.query)
    }
  }
}
</script>

<style scoped>
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
