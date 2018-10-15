<template>
  <el-select v-model="energyOrder" clearable placeholder="Ordenar por" size="large">
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
  name: 'EnergySort',
  data () {
    return {
      options: [
        {
          value: 'asc',
          label: 'Menos energia'
        },
        {
          value: 'desc',
          label: 'Mais energia'
        }
      ]
    }
  },
  computed: {
    energyOrder: {
      get () {
        return this.$store.state.filter.energyOrder
      },
      set (value) {
        this.$store.commit('updateEnergyOrder', value)
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
