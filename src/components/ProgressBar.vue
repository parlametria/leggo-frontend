<template>
    <div class="progress">
        <div class="progress-bar progress-bar-info progress-bar-striped"
        role="progressbar"

        :style="retornaEstilo()">
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "ProgressBar",
  props: {
    id: Number
  },

  methods: {
    pegaPorcentagem() {
        if(this.energias != undefined && this.energias.length > 1){
            return (this.energias[0].energia_recente * 100) / this.maxEnergia;
        }else {
            return 0;
        }
    },
    retornaEstilo() {
      return `width:${this.pegaPorcentagem()}%`;
    }
  },
  computed: mapState({
    listaEnergias: state => state.proposicoes.energias,
    maxEnergia: state => state.proposicoes.maxEnergia,
    energias () {
      return this.listaEnergias[this.id]
    }
  })
};
</script>

