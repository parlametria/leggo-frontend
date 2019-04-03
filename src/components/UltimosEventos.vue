<template>
  <div v-if="procEventos.length">
    <h3 @click="show = !show">Últimos Eventos +</h3>
    <div v-if="show" class="eventos-tram" v-for="(tema, i) in Object.keys(temasProposicoes)" :key="i">
      <span class="titulo">{{ tema }}</span>
      <table>
        <tr v-for="(evento, index) in procEventos" :key="index" v-if="isInArray(temasProposicoes[tema], evento.propId)">
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
  </div>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex'
import _ from 'lodash'

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
      this.ultimosEventos.forEach(evento => {
        const tema = this.proposicoes[evento.proposicao_id - 1].tema
        if (temas[tema] === undefined) {
          temas[tema] = []
        }
        temas[tema].push(evento.proposicao_id)
      })
      return temas
    }
  },
  methods: {
    ...mapActions(['getUltimosEventos']),
    isInArray(array, element) {
      return _.indexOf(array, element) !== -1
    }
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
  margin: 10px 0 30px 0;
  display: flex;
  align-content: stretch;
  justify-content: center;
  flex-direction: column;

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
.titulo {
  text-transform: capitalize;
  font-weight: bold;
  font-size: 1.5em;
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
