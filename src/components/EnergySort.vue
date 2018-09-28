<template>
    <el-container>
        <el-select :value="value" @input="$emit('input', $event)" clearable placeholder="Ordenar por" size="large">
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
    value: String
  },

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
      ],
      energyOrder: ''
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
