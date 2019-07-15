<template>
  <el-tag
    v-if="options.includes(regime.toLowerCase())"
    type="info">
    {{ regime }}
  </el-tag>
</template>

<script>
export default {
  name: 'RegimeTramitacao',
  props: {
    regime: {
      type: String,
      default: 'ordinária'
    }
  },
  data () {
    return {
      // TODO: isso está ruim, deveria vir padronizado do backend
      options: ['urgencia', 'urgência', 'prioridade', 'ordinaria', 'ordinária']
    }
  }
}
</script>
