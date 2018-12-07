<template>
    <el-tooltip
    placement="bottom"
        effect="light">
      <div class="tooltip-content" slot="content">
        <p v-if="this.temperatureInfo === 'subiu'">A temperatura subiu por causa dos eventos ocorridos nas últimas semanas.</p>
        <p v-else>A temperatura  desceu porque não houveram (muitos) eventos nas últimas semanas.</p>
      </div>
      <div class="info">
        A Temperatura nos últimos 3 meses
        <span v-if="this.temperatureInfo === 'subiu'" style="color: #dc6060; font-weight: bold">{{this.temperatureInfo}}</span>
        <span v-else style="color: #60C7DC; font-weight: bold">{{this.temperatureInfo}}</span>
      </div>
    </el-tooltip>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'TemperatureInfo',
  props: ['id'],
  computed: mapState({
    coefficients: state => state.proposicoes.coeficiente,
    coefficient () {
      return this.coefficients[this.id] || 0
    },
    temperatureInfo () {
      if (this.coefficient < 0) { return 'desceu' } else if (this.coefficient >= 0) { return 'subiu' } else { return 'se manteve constante' }
    }
  })
}
</script>

<style lang="scss" scoped>
.info {
  color: #555;
  text-align: center;
}

.tooltip-content {
    p {
        margin: 0;
        color: gray;
    }
}
</style>
