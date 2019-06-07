<template>
  <div v-if="pauta" class="tag">
    <span class="pauta">{{day}} {{this.hora}} - {{pauta.local}}</span>
  </div>
</template>

<script>
import moment from 'moment'

export default {
  name: 'PautaTag',
  props: {
    pauta: Object,
    dateRef: Date
  },
  computed: {
    day () {
      moment.locale('pt-BR')
      return moment(this.pauta.data).format('MMMM Do YYYY') === moment(this.dateRef).format('MMMM Do YYYY') ? 'Hoje' : moment(this.pauta.data).format('dddd')
    },
    hora () {
      return this.pauta.data !== '' ? moment(this.pauta.data).utcOffset('+0000').format('LT') : ''
    }
  }
}
</script>

<style lang="scss" scoped>
.pauta {
  font-size: 9pt;
}
.tag {
  margin: 0 4px 4px 0;
  padding: 0 2px;
  background-color: #DCDCDC;
}
</style>
