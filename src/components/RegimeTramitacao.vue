<template>
  <el-tag v-if="options.includes(regime.toLowerCase())" type="info">
    {{regime}}
  </el-tag>
</template>

<script>
export default {
  name: 'RegimeTramitacao',
  data () {
    return {
      // TODO: isso está ruim, deveria vir padronizado do backend
      options: ['urgencia', 'urgência', 'prioridade', 'ordinaria', 'ordinária']
    }
  },
  props: ['regime']
}
</script>
