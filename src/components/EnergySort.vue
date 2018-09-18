<template>
    <el-container>
        <el-select v-model="energy_order" clearable placeholder="Ordenar por" size="mini">
          <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
          </el-option>
        </el-select>
    </el-container>
</template>

<script>
export default {
  name: 'EnergySort',
  props: {
    updateEnergyOrder: Function
  },
  data () {
    return {
      options: [{
        value: 'crescent',
        label: 'Crescente'
      }, {
        value: 'decreasing',
        label: 'Decrescente'
      }],

      energy_order: ''
    }
  },
  watch: {
    energy_order (newEnergyOrder, oldEnergyOrder) {
      this.updateEnergyOrder(newEnergyOrder)
    }
  }
}
</script>

<style scoped>
.el-select{
  width: 150px;
  font-size: 30px ;
}
</style>
