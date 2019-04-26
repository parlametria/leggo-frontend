<template>
  <div v-if="pauta">
    <span class="pauta">{{day}} {{this.hora}} - {{pauta.local}}</span>
  </div>
</template>

<script>
import moment from 'moment'
import { mapState, mapActions } from 'vuex'

export default {
  name: 'PautaTag',
  props: {
    id: Number
  },
  methods: {
    ...mapActions(['getPautas'])
  },
  computed: {
    ...mapState({
      pautas: state => state.pautas.pautas
    }),
    pauta () {
      if (this.pautas && this.pautas[this.id] && this.pautas[this.id].length > 0) {
        return this.pautas[this.id].slice(-1).pop()
      }
      return null
    },
    day () {
      moment.locale('pt-BR')
      return moment(this.pauta.data).format('dddd')
    },
    hora () {
      return this.pauta.data !== '' ? moment(this.pauta.data).format('LT') : ''
    }
  }
}
</script>

<style lang="scss" scoped>
.pauta {
  font-size: 9pt;
}
</style>
