<template>
  <el-col class="graphics-container">
    <temperature-graphic
      :temp_historico="prop.temperatura_historico"
      :id="prop.id_leggo" />
    <temperature-info
      :id="prop.id_leggo"
      :texto="'Temperatura dos últimos 3 meses'"
      :mostra-tooltip="true"
      class="graphic-info"
    />
    <pressure-graphic
      :id="prop.id_leggo" />
  </el-col>
</template>

<script>
import TemperatureGraphic from './temperature/TemperatureGraphic'
import TemperatureInfo from './temperature/TemperatureInfo'
import PressureGraphic from './pressao/PressureGraphic'

export default {
  name: 'Graphics',
  props: {
    prop: {
      type: Object,
      default: undefined
    }
  },
  components: {
    TemperatureGraphic,
    TemperatureInfo,
    PressureGraphic
  }
}
</script>

<style lang="scss" scoped>
.graphic-info {
  font-size: 12px;
}

.graphics-container {
  padding-bottom: 3rem;
}
</style>
