<template>
  <el-collapse
    v-if="formattedEventos.length"
    v-model="activeNames">
    <el-collapse-item name="1">
      <template slot="title">
        <span class="title">Últimos Eventos</span>
      </template>
      <table class="eventos-tram">
        <div
          v-for="(eventos, key) in groupEventos"
          :key="key">
          <td class="date-field">
            <el-tooltip
              :content="eventos['evento'][0].data"
              placement="bottom">
              <div>{{ eventos['evento'][0].dataDiff }}</div>
            </el-tooltip>
            <tr class="sigla-local">{{ eventos['evento'][0].sigla }}</tr>
          </td>
          <td>
            <tr
              v-if="eventos['evento'].length > 1"
              class="evento-title"
            >{{ eventos['evento'].length }} eventos de {{ eventos['evento'][0].title }}</tr>
            <tr
              v-else
              class="evento-title">{{ eventos['evento'][0].title }}</tr>
            <tr
              :class="{clickable: eventos['evento'][0].collapsible}"
              @click="toggleCollapseDescription(key)"
            >{{ eventos['evento'][0].texto }}</tr>
            <span
              v-if="!isExpanded(key) && eventos.collapsible"
              class="el-icon-circle-plus-outline"/>
          </td>
        </div>
      </table>
    </el-collapse-item>
  </el-collapse>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import moment from 'moment'
import mixin from '@/mixins/ExpandedTexts.js'

export default {
  name: 'EventosInfo',
  data () {
    return {
      MAX_TEXT_LENGTH: 200,
      TEXT_TO_BE_SHOWED_LENGTH: 50,
      activeNames: ['1']
    }
  },
  mixins: [mixin],
  props: {
    id: {
      type: Number,
      default: undefined
    },
    casa: {
      type: String,
      default: ''
    },
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
              index, this.MAX_TEXT_LENGTH, this.TEXT_TO_BE_SHOWED_LENGTH
            ),
            collapsible:
              eventoTram.texto_tramitacao.length > this.MAX_TEXT_LENGTH
          }
        }
      )
    },
    groupEventos () {
      let groups = {}
      let groupName
      this.formattedEventos.forEach(event => {
        groupName = event.data.concat(
          event.title,
          event.texto
        )
        if (!groups[groupName]) {
          groups[groupName] = []
        }
        groups[groupName].push(event)
      })
      let myArray = []
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

<style scoped lang='scss'>
@import "@/base.scss";
.el-collapse {
  margin-top: 1rem;
}
.title {
  font-size: 0.97rem;
}
.eventos-tram {
  font-size: 10pt;
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
  width: 100px;
  white-space: nowrap;
  padding-right: 2rem;
}
.evento-title {
  width: 100%;
  font-weight: bold;
  text-transform: capitalize;
}
.sigla-local {
  color: #999;
}
.el-icon-circle-plus-outline{
  color: $--color-primary;
}
</style>
