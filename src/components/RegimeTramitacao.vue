<template>
    <div>
        <el-tag v-if="urgencia.includes(regime.toLowerCase())" type="danger">{{regime}}</el-tag>
        <el-tag v-else-if="prioridade.includes(regime.toLowerCase())" type="warning">{{regime}}</el-tag>
        <el-tag v-else-if="ordinaria.includes(regime.toLowerCase())">{{regime}}</el-tag>
    </div>

</template>

<script>
export default {
  name: 'RegimeTramitacao',
  data () {
    return {
      urgencia: ['urgencia', 'urgência'],
      prioridade: ['prioridade'],
      ordinaria: ['ordinaria', 'ordinária']
    }
  },
  props: ['regime']
}
</script>
<style scoped>
.el-tag:hover {
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
}
</style>
