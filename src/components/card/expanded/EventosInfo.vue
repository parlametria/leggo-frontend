<template>
    <el-collapse v-if="propEventosTram && propEventosTram.length">
      <el-collapse-item>
        <template slot="title">
          <span class="title">Últimos Eventos</span>
        </template>
        <table class="eventos_tram">
          <tr v-for="(eventoTram, key) in propEventosTram" :key="key">
            <td class="nowrap">{{ formatDate(eventoTram.data) }}</td>
            <td class="nowrap">{{ eventoTram.sigla_local }}</td>
            <td class="capitalize nowrap">{{ formatEvento(eventoTram.evento) }}</td>
            <td :title="eventoTram.texto_tramitacao">{{ formatTextoTramitacao(eventoTram.texto_tramitacao) }}</td>
          </tr>
        </table>
      </el-collapse-item>
    </el-collapse>
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
    if (Object.keys(this.eventosTramitacao).length === 0) {
      this.getEventosTramitacao(this.query)
    }
  },
  computed: {
    propEventosTram () {
      return this.eventosTramitacao[this.id]
    },
    ...mapState({
      eventosTramitacao: state => state.eventosTramitacao.eventosDict
    }),
    formattedDate () {
      return moment(this.date).format('YYYY-MM-DD')
    },
    query () {
      return { params: {
        casa: this.casa,
        id: this.id,
        dataFim: this.formattedDate,
        ultimosN: 3
      }
      }
    }
  },
  methods: {
    ...mapActions(['getEventosTramitacao']),
    formatDate (date) {
      return moment(date).format('DD/MM/YYYY')
    },
    formatEvento (evento) {
      return evento === 'nan' ? '' : evento.split("_").join(" ")
    },
    formatTextoTramitacao (texto) {
      return texto.length > 61 ? `${texto.substring(0,62)}...` : texto
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
.el-collapse {
  margin-top: 1rem
}
.title {
  font-size: .97rem;
}
.eventos_tram {
    font-size: 10pt;
    text-align: center;
}
table {
    border-collapse: collapse;
    width: 100%;
}
th, td {
  padding: .5rem 1rem;
  text-align: left;
}
.capitalize {
  text-transform: capitalize;
}
.nowrap {
  width:1%;
  white-space: nowrap;
}
</style>
