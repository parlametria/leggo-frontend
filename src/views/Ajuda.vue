<template>
  <div class="ajuda">
    <h1>Ajuda</h1>
    <img :src="require(`@/assets/explicacao_card.png`)" class="responsive" alt="">
  </div>
</template>

<script>
export default {
  name: 'Ajuda'
}
</script>

<style lang="scss" scoped>
@import "@/base.scss";
.responsive {
  width: 100%;
  height: auto;
}
.ajuda {
  margin: 0 15rem;
}
.center {
  text-align: center;
}
h1 {
  font-family: 'Rajdhani', sans-serif;
  border-bottom: solid 2px #dc6060;
  line-height: 50pt;
  font-size: 50pt;
  text-align: center;
  font-weight: normal;
  margin-bottom: 2rem;
}
@media screen and (max-width: 1270px) {
  .ajuda {
    margin: 0 1rem;
  }
}
</style>
