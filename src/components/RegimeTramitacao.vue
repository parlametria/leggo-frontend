<template>
    <div>
        <el-tag v-if="options.includes(regime.toLowerCase())" type="info" size="mini">{{regime}}</el-tag>
    </div>

</template>

<script>
export default {
  name: 'RegimeTramitacao',
  data () {
    return {
      options: ['urgencia', 'urgência', 'prioridade', 'ordinaria', 'ordinária']
    }
  },
  props: ['regime']
}
</script>
