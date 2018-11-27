<template>
    <div class="info">
      A Temperatura nos últimos 3 meses
      <span v-if="this.pressureInfo === 'subiu'" style="color: #dc6060; font-weight: bold">{{this.pressureInfo}}</span>
      <span v-else style="color: #60C7DC; font-weight: bold">{{this.pressureInfo}}</span>
    </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'PressureInfo',
  props: ['id'],
  computed: mapState({
    coefficients: state => state.proposicoes.coeficiente,
    coefficient () {
      return this.coefficients[this.id] || 0
    },
    pressureInfo () {
      if (this.coefficient < 0) { return 'desceu' } else if (this.coefficient >= 0) { return 'subiu' } else { return 'se manteve constante' }
    }
  })
}
</script>

<style>
.info {
  color: #555;
  text-align: center;
}
</style>
