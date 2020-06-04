<template>
  <div v-if="procEventos.length">
    <div
      class="title"
      @click="show = !show">
      <h2>Últimos Eventos
        <span
          v-if="!show"
          class="el-icon-circle-plus-outline"/>
        <span
          v-else
          class="el-icon-remove-outline"/>
      </h2>
    </div>
    <table
      v-if="show"
      class="eventos-tram">
      <tr
        v-for="(evento, index) in procEventos"
        :key="index">
        <td class="date-field">
          <div>{{ evento.data }}</div>
          <div class="sigla-local">{{ evento.local }}</div>
        </td>
        <td>
          <div class="evento-title">
            <span>{{ evento.titulo }}</span> - <router-link :to="{ name: 'proposicao', params: { id_leggo: evento.propId, slug_interesse: evento.interesse }}">{{ evento.propName }}</router-link>
          </div>
          <div>
            {{ evento.texto }}
          </div>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex'
export default {
  name: 'UltimosEventos',
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
      'getPropById',
      'getInteresse'
    ]),
    procEventos () {
      if (this.ultimosEventos) {
        return this.ultimosEventos.map(evento => {
          var prop = this.getPropById(evento.proposicao_id)
          let propName = ''
          if (prop) {
            propName = prop.apelido !== 'nan' ? prop.apelido : prop.lastEtapa.sigla
          }
          return {
            data: evento.data,
            propId: evento.proposicao_id,
            texto: evento.texto_tramitacao,
            local: evento.sigla_local,
            titulo: evento.titulo_evento,
            interesse: prop.interesse[0].interesse,
            propName
          }
        })
      } else {
        return []
      }
    }
  },
  methods: {
    ...mapActions(['getUltimosEventos'])
  },
  mounted () {
    if (!this.ultimosEventos || !this.ultimosEventos.length) {
      this.getUltimosEventos({ params: { nivel: 1, ultimosN: 10, interesse: this.getInteresse } })
    }
  }
}
</script>

<style scoped lang='scss'>
@import "@/base.scss";
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
.el-icon-circle-plus-outline{
  color: $--color-primary;
}
.title {
  cursor: pointer;
}
</style>
