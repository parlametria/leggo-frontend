<template>
  <text
    v-if="isActive"
    :class="classObj"
    :y="node.y +5"
    :x="node.x + 10"
  >{{ node.nome_eleitoral }}
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
.active {
  opacity: 1;
  visibility: visible;
}
</style>
