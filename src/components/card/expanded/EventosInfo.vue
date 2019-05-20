<template>
  <el-collapse v-if="formattedEventos.length" v-model="activeNames">
    <el-collapse-item name="1">
      <template slot="title">
        <span class="title">Últimos Eventos</span>
      </template>
      <table class="eventos-tram">
        <div v-for="(eventos, key) in groupEventos" :key="key">
          <td class="date-field">
            <el-tooltip :content="eventos['evento'][0].data" placement="bottom">
              <div>{{eventos['evento'][0].dataDiff}}</div>
            </el-tooltip>
            <div class="sigla-local">{{eventos['evento'][0].sigla}}</div>
          </td>
          <td>
            <div
              v-if="eventos['evento'].length > 1"
              class="evento-title"
            >{{eventos['evento'].length}} eventos de {{eventos['evento'][0].title}}</div>
            <div v-else class="evento-title">{{eventos['evento'][0].title}}</div>
            <div
              :class="{clickable: eventos['evento'][0].collapsible}"
              @click="toggleCollapseDescription(key)"
            >{{eventos['evento'][0].texto}}</div>
          </td>
        </div>
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
      MAX_TEXT_LENGTH: 200,
      activeNames: ['1'],
      expandedDescriptions: []
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
    if (!this.formattedEventos.length) {
      this.getEventosTramitacao(this.query)
    }
  },
  computed: {
    formattedEventos () {
      return (this.eventosTramitacao[this.id] || []).map(
        (eventoTram, index) => {
          return {
            data: this.formatDate(eventoTram.data),
            dataDiff: this.formatDateDifference(eventoTram.data),
            sigla:
              eventoTram.sigla_local === 'nan' ? '' : eventoTram.sigla_local,
            title: eventoTram.titulo_evento,
            texto: this.formatTextoTramitacao(
              eventoTram.texto_tramitacao,
              index
            ),
            collapsible:
              eventoTram.texto_tramitacao.length > this.MAX_TEXT_LENGTH
          }
        }
      )
    },
    groupEventos () {
      var groups = {}
      for (var i = 0; i < this.formattedEventos.length; i++) {
        var groupName = this.formattedEventos[i].data.concat(
          this.formattedEventos[i].title
        )
        if (!groups[groupName]) {
          groups[groupName] = []
        }
        groups[groupName].push(this.formattedEventos[i])
      }
      var myArray = []
      for (groupName in groups) {
        myArray.push({ group: groupName, evento: groups[groupName] })
      }
      return myArray
    },
    ...mapState({
      eventosTramitacao: state => state.eventosTramitacao.eventosDict
    }),
    query () {
      return {
        params: {
          casa: this.casa,
          id: this.id,
          dataFim: moment(this.date).format('YYYY-MM-DD'),
          nivel: 1,
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
        dateInTextFormat =
          differenceInYears === 1
            ? 'Há ± 1 ano'
            : `Há ± ${differenceInYears} anos`
      } else if (differenceInDays > 30) {
        const differenceInMonths = Math.floor(differenceInDays / 30)
        dateInTextFormat =
          differenceInMonths === 1
            ? 'Há ± 1 mês'
            : `Há ± ${differenceInMonths} meses`
      } else if (differenceInDays === 0) {
        dateInTextFormat = 'Hoje'
      } else if (differenceInDays === 1) {
        dateInTextFormat = 'Ontem'
      }

      return dateInTextFormat
    },
    testa (evento) {
      console.log(evento)
    },
    formatDate (date) {
      return moment(date).format('DD/MM/YYYY')
    },
    formatTextoTramitacao (textoTramitacao, key) {
      return textoTramitacao.length > this.MAX_TEXT_LENGTH &&
        !this.isExpanded(key)
        ? `${textoTramitacao.substring(0, this.MAX_TEXT_LENGTH - 50)}... (+)`
        : textoTramitacao
    },
    toggleCollapseDescription (key) {
      if (!this.isExpanded(key)) {
        this.expandedDescriptions.push(key)
      } else {
        this.expandedDescriptions = this.expandedDescriptions.filter(
          currentKey => key !== currentKey
        )
      }
    },
    isExpanded (key) {
      return (
        this.expandedDescriptions.findIndex(
          currentKey => currentKey === key
        ) !== -1
      )
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
  margin-top: 1rem;
}
.title {
  font-size: 0.97rem;
}
.eventos-tram {
  font-size: 10pt;
  text-align: center;
}
table {
  border-collapse: collapse;
  width: 100%;
}
th,
td {
  padding: 0.5rem;
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
