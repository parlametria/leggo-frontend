<template>
  <span color="pink">
   {{ atualFase }}
  </span>
</template>

<script>
export default {
  name: 'FaseAtualBlock',
  props: {
    fases: Array
  },
  computed: {
    atualFase () {
      let atualFase = 'Doida'
      return atualFase
    }
  }
}
</script>

<style lang="scss" scopped>
.fase_atual_bock{
  background-color: red;
  padding: 6px;
}

</style>
