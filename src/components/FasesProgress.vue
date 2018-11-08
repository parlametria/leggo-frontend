<template>
  <div class="fases-progress">
    <div v-for="(fase, index) in fases" :key="index"
    class="barra" :class="{ concluida : index <= indexFaseAtual }" >
    </div>
    {{indexFaseAtual}}
  </div>
</template>

<script>
export default {
  name: 'FasesProgress',
  props: {
    fases: Array
  },
  computed: {
    indexFaseAtual () {
      return this.fases.findIndex(fase => {
        return fase.data_inicio && !fase.data_fim
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.fases-progress {
  display: flex;
  flex-direction: column-reverse;
}
.barra {
  width: 35px;
  height: 5px;
  margin: 1.5px 0;
  background: #999;
}
.concluida {
  background: #65e16b;
}
</style>
