<template>
  <div v-if="procEventos.length">
    <h3 @click="show = !show">Últimos Eventos +</h3>
    <table v-if="show" class="eventos-tram">
      <tr v-for="(evento, index) in procEventos" :key="index">
        <td class="date-field">
          <div>{{evento.data}}</div>
          <div class="sigla-local">{{evento.local}}</div>
        </td>
        <td>
          <div class="evento-title">
            <a :href="`#${ evento.propId }`">{{ evento.propName }}</a>
          </div>
          <div>
            {{evento.texto}}
          </div>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex'
export default {
  name: 'ultimosEventos',
  components: {
  },
  data () {
    return {
      show: false
    }
  },
  computed: {
    ...mapState({
      ultimosEventos: state => state.eventosTramitacao.ultimosEventos,
      proposicoes: state => state.proposicoes.proposicoes
    }),
    ...mapGetters([
      'getPropById'
    ]),
    procEventos () {
      if (this.ultimosEventos) {
        return this.ultimosEventos.map(evento => {
          var prop = this.getPropById(evento.proposicao_id)
          var propName = prop ? prop.apelido : ''
          return {
            data: evento.data,
            propId: evento.proposicao_id,
            texto: evento.texto_tramitacao,
            local: evento.sigla_local,
            propName
          }
        })
      } else {
        return []
      }
    },
    temasProposicoes () {
      let temas = {}
      this.proposicoes.forEach(proposicao => {
        if (temas[proposicao.tema] === undefined) {
          temas[proposicao.tema] = []
        }
        temas[proposicao.tema].push(proposicao.id)
      })
      return temas
    }
  },
  methods: {
    ...mapActions(['getUltimosEventos'])
  },
  mounted () {
    if (!this.ultimosEventos || !this.ultimosEventos.length) {
      this.getUltimosEventos({ params: { nivel: 1, ultimosN: 10 } })
    }
  }
}
</script>

<style scoped>
.eventos-tram {
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
}
.sigla-local {
  color: #999;
}
</style>
