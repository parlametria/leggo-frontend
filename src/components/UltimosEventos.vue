<template>
  <div v-if="procEventos.length">
    <h3 @click="show = !show">Últimos Eventos +</h3>
    <ul v-if="show">
      <li v-for="(evento, i) of procEventos" :key="i">
        {{ evento.data }} -
        <a :href="`#${ evento.propId }`">{{ evento.propName }}</a>
        <br/>
        {{ evento.texto }}
      </li>
    </ul>
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
      this.getUltimosEventos({ params: { nivel: 1, ultimosN: 10 } })
    }
  }
}
</script>
