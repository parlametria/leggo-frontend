<template>
  <span  class="pauta">{{day}} - {{proximaPauta.local === "Local não informado" ? "não informado" : proximaPauta.local }}</span>
</template>

<script>
import moment from 'moment'

export default {
  name: 'PautaTag',
  props: {
    proximaPauta: Object
  },
  computed: {
    day () {
      const days = ['domingo', 'segunda-feira', 'terça-feira', 'quarta-feira', 'quinta-feira', 'sexta-feira', 'sábado']
      const dayNumber = moment(this.proximaPauta.data).day()
      return days[dayNumber]
    }
  }
}
</script>

<style lang="scss" scoped>
.pauta {
  grid-column: 2/3;
  grid-row: 1/2;
  margin-left: .6rem;
  margin-top: .8rem;
  color: #dbd936;
  font-size: .8rem;
  width: 230px;
  background: #3b3b3b;
  height: 26px;
  line-height: 26px;
  position: relative;
  padding-left: 7px;
  text-transform: uppercase;
}
.pauta::after {
  background: #444;
  border-bottom: 13px solid transparent;
  border-left: 10px solid #3b3b3b;
  border-top: 13px solid transparent;
  content: '';
  position: absolute;
  right: 0;
  top: 0;
}
</style>
