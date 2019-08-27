<template>
  <el-col class="graphics-container">
    <temperature-graphic :id="prop.id" />
    <temperature-info
      :id="2192459"
      :texto="'Temperatura dos últimos 3 meses'"
      :mostra-tooltip="true"
      class="graphic-info"
    />
    <pressure-graphic
      :id="2192459"
      :casa="'camara'" />
  </el-col>
</template>

<script>
import TemperatureGraphic from './card/expanded/temperature/TemperatureGraphic'
import TemperatureInfo from './card/expanded/temperature/TemperatureInfo'
import PressureGraphic from './card/expanded/pressao/PressureGraphic'

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
  },
  computed: {},
  methods: {}
}
</script>

<style lang="scss" scoped>
.graphic-info {
  font-size: 12px;
}

.graphics-container {
  padding-top: 15px;
}
</style>
