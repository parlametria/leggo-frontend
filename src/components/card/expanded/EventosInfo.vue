<template>
    <el-collapse v-if="propEventosTram && propEventosTram.length" v-model="activeNames">
      <el-collapse-item name="1">
        <template slot="title">
          <span class="title">Últimos Eventos</span>
        </template>
        <table class="eventos_tram">
          <tr v-for="(eventoTram, key) in propEventosTram" :key="key">
            <td class="date-field">
              <el-tooltip :content="formatDate(eventoTram.data)" placement="bottom">
                <div>{{formatDateDifference(eventoTram.data)}}</div>
              </el-tooltip>
              <div class="sigla-local">{{eventoTram.sigla_local === 'nan' ? '' : eventoTram.sigla_local}}</div>
            </td>
            <td>
              <div class="evento-title">{{formatEventoTitle(eventoTram.evento)}}</div>
              <div>{{formatTextoTramitacao(eventoTram.texto_tramitacao)}}</div>
            </td>
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
  data () {
    return {
      activeNames: ['1']
    }
  },
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
    if (!this.propEventosTram) {
      this.getEventosTramitacao(this.query)
    }
  },
  computed: {
    propEventosTram () {
      let events = this.eventosTramitacao[this.id]
      if (events) events = events.filter(e => e.evento !== 'nan')
      return events
    },
    ...mapState({
      eventosTramitacao: state => state.eventosTramitacao.eventosDict
    }),
    query () {
      return { params: {
        casa: this.casa,
        id: this.id,
        dataFim: moment(this.date).format('YYYY-MM-DD'),
        ultimosN: 3
      }
      }
    }
  },
  methods: {
    ...mapActions(['getEventosTramitacao']),
    formatDateDifference (date) {
      const differenceInDays = moment().diff(moment(date), 'days')
      let dateInTextFormat = `Há ${differenceInDays} dias`

      if (differenceInDays > 365) {
        const differenceInYears = Math.floor(differenceInDays / 365)
        dateInTextFormat = differenceInYears === 1 ? 'Há ± 1 ano' : `Há ± ${differenceInYears} anos`
      } else if (differenceInDays > 30) {
        const differenceInMonths = Math.floor(differenceInDays / 30)
        dateInTextFormat = differenceInMonths === 1 ? 'Há ± 1 mês' : `Há ± ${differenceInMonths} meses`
      } else if (differenceInDays === 0) {
        dateInTextFormat = 'Hoje'
      } else if (differenceInDays === 1) {
        dateInTextFormat = 'Ontem'
      }

      return dateInTextFormat
    },
    formatDate (date) {
      return moment(date).format('DD/MM/YYYY')
    },
    formatTextoTramitacao (textoTramitacao) {
      const MAX_TEXT_LENGTH = 120
      return textoTramitacao.length > MAX_TEXT_LENGTH ? `${textoTramitacao.substring(0, MAX_TEXT_LENGTH)}...` : textoTramitacao
    },
    formatEventoTitle (evento) {
      let formattedEvento = evento.split('_').join(' ')
      return formattedEvento === 'nan' ? '' : formattedEvento
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
  padding: .5rem;
  text-align: left;
  vertical-align: top;
}
.date-field {
  white-space: nowrap;
  padding-right: 2rem;
}
.evento-title {
  font-weight: bold;
  text-transform: capitalize;
}
.sigla-local {
  color: #999;
}
</style>
