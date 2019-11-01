<template>
  <text
    v-if="isActive"
    :class="classObj"
    :y="node.y" :x="node.x"
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
  padding: 5px 20px;
  font: 12px sans-serif;
  font-family: 'Ubuntu', sans-serif;
  background: rgba(51,51,51,0.9);
  border-radius: 8px;
  z-index: 1000;
  visibility: hidden;
}
.active {
  opacity: 1;
  visibility: visible;
}
</style>
