<template>
  <div>
    <router-link
      :class="{selected: checkPage('proposicoes')}"
      :to="{ name: 'proposicoes' }">Proposições</router-link>
    <router-link
      :class="{selected: checkPage('ajuda')}"
      :to="{ name: 'ajuda' }">Ajuda</router-link>
    <router-link
      :class="{selected: checkPage('sobre')}"
      :to="{ name: 'sobre' }">Sobre</router-link>
  </div>
</template>

<script>
export default {
  name: 'NavigationButtons',
  methods: {
    checkPage (page) {
      return this.$route.name === page
    }
  }
}
</script>

<style lang="scss" scoped>
div {
    * {
        font-family: sans-serif;
        margin-right: 1rem;
        text-transform: uppercase;
        color: grey;
    }
    &:last-child {
        margin-right: 0;
    }
}
.selected {
    font-weight: bold;
}
</style>
