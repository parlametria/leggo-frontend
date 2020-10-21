<template>
  <el-col class="graphics-container">
    <temperature-graphic
      :temp_historico="prop.temperatura_historico"
      :id="prop.id_leggo"
      :coeficiente_temperatura="prop.temperatura_coeficiente" />
    <pressure-graphic
      :id="prop.id_leggo"
      :interesse="prop.interesse[0].interesse" />
  </el-col>
</template>

<script>
import TemperatureGraphic from './temperature/TemperatureGraphic'
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
