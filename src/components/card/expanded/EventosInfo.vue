<template>
    <div v-if="propEventos && propEventos.length">
        <h4 class="descricao">Últimos eventos</h4>
        <table class="pautas">
            <tr v-for="(evento, key) in propEventos" :key="key">
                <td><p>{{formatDate(evento.data)}}</p></td>
                <td><p>{{evento.local}}</p></td>
                <td><p>{{evento.evento}}</p></td>
                <td><p>{{evento.texto_tramitacao}}</p></td>
            </tr>
        </table>
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import moment from 'moment'

export default {
  name: 'EventosInfo',
  props: {
    id: Number,
    date: {
      type: Date,
      default: function () {
        return new Date()
      }
    }
  },
  mounted () {
    this.getPautas(this.query)
  },
  computed: {
    propPautas () {
      return this.pautas[this.id]
    },
    ...mapState({
      pautas: state => state.pautas.pautasDic
    }),
    formattedDate () {
      return moment(this.date).format('YYYY-MM-DD')
    },
    query () {
      return {
        casa: this.casa,
        id: this.id,
        date: this.formattedDate
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
