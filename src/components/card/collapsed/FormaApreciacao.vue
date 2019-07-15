<template>
  <el-tag
    v-if="options.includes(apreciacao.toLowerCase())"
    type="info">
    {{ apreciacao }}
  </el-tag>
</template>

<script>
export default {
  name: 'FormaApreciacao',
  data () {
    return {
      options: ['conclusiva', 'plenário']
    }
  },
  props: {
    apreciacao: {
      type: String,
      default: 'plenário'
    }
  }
}
</script>
