<template>
  <div v-if="pauta">
    <span class="pauta">{{day}} - {{pauta.local}}</span>
  </div>
</template>

<script>
import moment from 'moment'
import { mapState, mapActions } from 'vuex'

export default {
  name: 'PautaTag',
  props: {
    id: Number,
    casa: String,
    date_reference: Date
  },
  methods: {
    ...mapActions(['getPautas'])
  },
  computed: {
    ...mapState({
      pautas: state => state.pautas.pautas
    }),
    pauta() {
      if(this.pautas && this.pautas[this.id] && this.pautas[this.id].length > 0)
        return this.pautas[this.id].slice(-1).pop()

      return null
    },
    day () {
      moment.locale('pt-BR');
      return moment(this.pauta.data).format('dddd')
    }
  }
}
</script>

<style lang="scss" scoped>
.pauta {
  color: #dbd936;
  font-size: .8rem;
  background: #3b3b3b;
  height: 26px;
  line-height: 26px;
  position: relative;
  padding-left: 7px;
  padding-right: 13px;
  text-transform: uppercase;
}
</style>
