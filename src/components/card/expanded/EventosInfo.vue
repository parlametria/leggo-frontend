<template>
    <div v-if="propEventosTram && propEventosTram.length">
        <h4 class="descricao">Últimos eventos</h4>
        <table class="eventos_tram">
            <tr v-for="(evento_tram, key) in propEventosTram" :key="key">
                <td><p>{{formatDate(evento_tram.data)}}</p></td>
                <td><p>{{evento_tram.local}}</p></td>
                <td><p>{{evento_tram.evento}}</p></td>
                <td><p>{{evento_tram.texto_tramitacao}}</p></td>
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
    casa: String,
    date: {
      type: Date,
      default: function () {
        return new Date()
      }
    }
  },
  mounted () {
    this.getEventosTramitacao(this.query)
  },
  computed: {
    propEventosTram () {
      return this.eventos_tramitacao[this.id]
    },
    ...mapState({
      eventos_tramitacao: state => state.eventos_tramitacao.eventosDict
    }),
    formattedDate () {
      return moment(this.date).format('YYYY-MM-DD')
    },
    query () {
      return {
        casa: this.casa,
        id: this.id,
        data_fim: this.formattedDate,
        ultimos_n: 3
      }
    }
  },
  methods: {
    ...mapActions(['getEventosTramitacao']),
    formatDate (date) {
      return moment(date).format('DD/MM/YYYY')
    }
  },
  watch: {
    date () {
      this.getEventosTramitacao(this.query)
    }
  }
}
</script>

<style scoped>
.eventos_tram {
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
