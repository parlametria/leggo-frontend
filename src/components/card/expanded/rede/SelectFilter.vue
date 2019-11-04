<template>
  <el-select
    v-model="value"
    @change="submitChange"
    :clearable="false">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value"/>
  </el-select>
</template>

<script>
export default {
  name: 'SelectFilter',
  data () {
    return {
      options: [{
        value: 'bancada',
        label: 'Bancada'
      }, {
        value: 'aderencia',
        label: 'Aderência'
      }],
      value: 'bancada'
    }
  },
  methods: {
    submitChange () {
      this.$emit('filterChange', this.value)
    }
  }
}
</script>
