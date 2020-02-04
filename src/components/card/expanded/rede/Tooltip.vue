<template>
  <text
    v-if="isActive"
    :class="classObj"
    :y="20"
    :x="0"
  > {{ nome }}
  </text>
</template>

<script>
export default {
  name: 'Tooltip',
  props: {
    node: {
      type: Object,
      default: null
    }
  },
  computed: {
    isActive () {
      return this.node !== null
    },
    classObj () {
      return {
        tooltip: true,
        active: this.isActive
      }
    },
    nome () {
      const { node } = this
      return `${node.nome} (${node.partido}/${node.uf === "nan" ? "-": node.uf})`
    }
  }
}
</script>

<style lang="scss" scoped>
.tooltip {
  color: #bbb;
  position: relative;
  text-align: center;
  width: auto;
  height: auto;
  font-size: 10px;
  font-family: 'Ubuntu', sans-serif;
  visibility: hidden;
}
@media (min-width: 414px) {
  .tooltip {
    font-size: 6px;
  }
}
.active {
  opacity: 1;
  visibility: visible;
}
</style>
