<template>
    <span>A pressão nos últimos 3 meses <span v-if="this.pressureInfo === 'subiu'" style="color: #E55C61">{{this.pressureInfo}}</span>
      <span v-else style="color: #44C8DA">{{this.pressureInfo}}</span>.
    </span>
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
