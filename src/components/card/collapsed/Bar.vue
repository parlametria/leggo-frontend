<template>
  <div
    class="bar"
    :style="backgroundStyle">
    <div
      :style="barStyle"
    />
  </div>
</template>

<script>

export default {
  name: 'Bar',
  props: {
    ultimo_valor: {
      type: Number,
      default: -1
    },
    cor: {
      type: String,
      default: ''
    },
    max_valor: {
      type: Number,
      default: 100
    }
  },
  computed: {
    barStyle () {
      return {
        height: `${this.porcentagem > 3 ? this.porcentagem : 3}%`,
        background: `${this.ultimo_valor === -1 ? '#dadada' : this.cor}`
      }
    },
    backgroundStyle () {
      return {
        background: `${this.ultimo_valor === -1 ? '#dadada' : '#ffffff'}`
      }
    },
    porcentagem () {
      return (this.ultimo_valor * 100) / this.max_valor
    }
  }
}
</script>

<style lang="scss" scoped>
.bar {
  position: relative;
  min-width: 41px;
  display: flex;
  flex-direction: column-reverse;
  box-sizing: border-box;

}

</style>
