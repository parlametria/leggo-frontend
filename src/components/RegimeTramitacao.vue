<template>
  <el-tag v-if="options.includes(regime.toLowerCase())" type="info" style="width:70px">{{regime}}</el-tag>

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
