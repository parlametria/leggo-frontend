<template>
  <el-select v-model="temperatureOrder" clearable placeholder="Ordenar por" size="large">
    <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value">
    </el-option>
  </el-select>
</template>
<script>
export default {
  name: 'TemperatureSort',
  data () {
    return {
      options: [
        {
          value: 'asc',
          label: 'Temperatura Baixa'
        },
        {
          value: 'desc',
          label: 'Temperatura Alta'
        }
      ]
    }
  },
  computed: {
    temperatureOrder: {
      get () {
        return this.$store.state.filter.temperatureOrder
      },
      set (value) {
        this.$store.commit('updateTemperatureOrder', value)
      }
    }
  }
}
</script>
 <style scoped>
.el-select {
  width: 150px;
  font-size: 30px;
}
</style>
