<template>
    <div :class="geraEstilo(true)">
        <div class="progress-bar"
        role="progressbar"
        :style="retornaEstilo()">
        <i class="right"></i>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'PressureBar',
  props: ['energia'],
  methods: {
    pegaPorcentagem () {
      return (this.energia * 100) / this.maxPressao
    },
    retornaEstilo () {
      return `width:${this.pegaPorcentagem()}%`
    },
    geraEstilo (tendencia) {
      return {
        'progress-down after': true,
        'progress-up after': true
      }
    }
  },
  computed: {
    ...mapGetters(['maxPressao'])
  }
}
</script>

<style scoped>
.progress-down{height:10px;margin-bottom:20px;overflow:hidden;background-color:#f5f5f5;border-radius:4px;-webkit-box-shadow:inset 0 1px 2px rgba(0,0,0,.1);box-shadow:inset 0 1px 2px rgba(0,0,0,.1)}
.progress-up{height:10px;margin-bottom:20px;overflow:hidden;background-color:#f5f5f5;border-radius:4px;-webkit-box-shadow:inset 0 1px 2px rgba(0,0,0,.1);box-shadow:inset 0 1px 2px rgba(0,0,0,.1)}
.progress-bar{float:left;width:0;height:100%;font-size:12px;line-height:20px;color:#fff;text-align:center;background-color:#337ab7;-webkit-box-shadow:inset 0 -1px 0 rgba(0,0,0,.15);box-shadow:inset 0 -1px 0 rgba(0,0,0,.15);-webkit-transition:width .6s ease;-o-transition:width .6s ease;transition:width .6s ease}
.progress-up::after{
    width: 0;
    height: 0;
    border-top: 5px inset transparent;
    border-bottom: 5px inset transparent;
    border-left: 5px solid #337ab7;  
    position: absolute;
    content: "";
}
.progress-down::after{
    width: 0;
    height: 0;
    border-top: 5px inset transparent;
    border-bottom: 5px inset transparent;
    position: absolute;
    content: "";
    border-left: 5px solid #f5f5f5; 
    transform: rotate(180deg);
    margin-left: -5px;
}

</style>
