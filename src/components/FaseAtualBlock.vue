<template>
  <el-tag color="pink">
   A
  </el-tag>
</template>

<script>
export default {
  name: 'FaseAtualBlock',
  props: {
    fases: Array
  },
  computed: {
    isAtualFase (fase) {
      return fase.data_inicio != null && fase.data_fim == null
    },
    atualFase (fases) {
      let atualFase = 'A'
      fases.forEach(fase => {
        // if (isAtualFase(fase)) {

        // }
        
      })
      return atualFase
    }
  }
}
</script>

<style lang="scss" scopped>
.fase_atual_bock{
  background-color: red;
}

</style>
