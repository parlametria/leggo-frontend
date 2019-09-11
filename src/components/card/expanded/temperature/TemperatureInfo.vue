<template>
  <el-tooltip
    placement="bottom"
    effect="light"
  >
    <div
      class="tooltip-content"
      slot="content"
      v-if="mostraTooltip"
    >
      <p v-if="this.temperatureInfo === 'subiu'">
        A temperatura <strong>subiu</strong> por causa dos eventos ocorridos nas últimas semanas.
      </p>
      <p v-else>A temperatura <strong>desceu</strong> porque não houveram (muitos) eventos nas últimas semanas.</p>
    </div>
    <div class="info">
      {{ this.texto }}
    </div>
  </el-tooltip>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'TemperatureInfo',
  props: {
    id: {
      type: Number,
      default: undefined
    },
    texto: {
      type: String,
      default: ''
    },
    mostraTooltip: {
      type: Boolean,
      default: false
    }
  },
  computed: mapState({
    coefficients: state => state.temperaturas.coeficiente,
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
