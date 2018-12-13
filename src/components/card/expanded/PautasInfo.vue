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
  async mounted () {
    if(!this.pautas){
      const params = {
        id: this.id,
        casa: this.casa,
        date: this.formattedDate
      }
      this.getPautas({ params })
    }

  },
  computed: {
    propPautas () {
      return this.pautas[this.id]
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
    formatDate: date => moment(date).format('DD/MM/YYYY')
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
