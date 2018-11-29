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
  name: 'PressureSort',
  data () {
    return {
      options: [
        {
          value: 'asc',
          label: 'Pressão Baixa'
        },
        {
          value: 'desc',
          label: 'Pressão Alta'
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
