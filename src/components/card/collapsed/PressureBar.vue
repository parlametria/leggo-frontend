<template>
  <div class="progress-outer">
    <div class="progress-inner" role="progressbar" :style="retornaEstilo()"/>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
  name: 'PressureBar',
  props: ['id'],
  methods: {
    pegaPorcentagem () {
      return (this.energia * 100) / this.maxPressao
    },
    retornaEstilo () {
      // up
      let color = '#337ab7'
      let arrows = `
        linear-gradient(225deg, ${color} 60%, transparent 0%),
        linear-gradient(-45deg, ${color} 60%, transparent 0%),
        linear-gradient(90deg, #0005 50%, ${color} 50%)`
      let direction = 'normal'
      // down
      if (this.coeficiente < 0) {
        color = '#ef8a62'
        arrows = `
          linear-gradient(135deg, ${color} 29.4%, transparent 29.4%),
          linear-gradient(45deg, ${color} 29.4%, transparent 29.4%),
          linear-gradient(90deg, #0005 50%, ${color} 50%)`
        direction = 'reverse'
      }
      return {
        width: `${this.pegaPorcentagem()}%`,
        'background-image': arrows,
        'background-color': color,
        'animation-direction': direction
      }
    }
  },
  computed: {
    energia () {
      if (this.listaEnergias[this.id]) {
        return this.listaEnergias[this.id][0].energia_recente
      } else {
        return 0
      }
    },
    coeficiente () {
      return this.listaCoeficientes[this.id] || 0
    },
    ...mapState({
      listaEnergias: state => state.proposicoes.energias,
      listaCoeficientes: state => state.proposicoes.coeficiente
    }),
    ...mapGetters(['maxPressao'])
  }
}
</script>

<style lang="scss" scoped>
@keyframes movingBackground {
    from {
        background-position: 0 0;
    }
    to {
        background-position: 14px 0;
    }
}
.progress-outer {
    height: 7px;
    margin-bottom: 20px;
    overflow: hidden;
    border-radius: 4px;
    box-shadow: inset 0 1px 2px rgba(0,0,0,.1)
}
.progress-inner {
    float: left;
    width: 0;
    height: 100%;
    box-shadow: inset 0 -1px 0 rgba(0,0,0,.15);
    transition: width .6s ease;
    border-radius: 4px;
    background-size: 14px 100%;
    background-repeat: repeat-x;
    background-position: center;
    animation: movingBackground 1s linear infinite;
}
</style>
