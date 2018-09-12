<template>
    <div>
        <el-tag :type="regimeCor(regime)" size="small">{{regime}}</el-tag>
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
  methods: {
    regimeCor (regime) {
      if (this.urgencia.includes(regime.toLowerCase())) {
        return 'danger'
      }

      if (this.prioridade.includes(regime.toLowerCase())) {
        return 'warning'
      }

      if (this.ordinaria.includes(regime.toLowerCase())) {
        return ''
      }
    }
  },
  props: ['regime']
}
</script>
<style scoped>
