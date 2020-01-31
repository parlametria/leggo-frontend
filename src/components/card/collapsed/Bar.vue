<template>
  <el-tooltip
    placement="bottom"
    effect="light"
    :content="tooltipTexto">
    <div
      class="bar"
      :style="backgroundStyle">
      <div
        :style="barStyle"
      />
    </div>
  </el-tooltip>
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
    },
    tooltipTexto: {
      type: String,
      default: ''
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
      return (Math.min((this.ultimo_valor * 100) / this.max_valor, 100))
      
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
  opacity: 0.75;

}

</style>
