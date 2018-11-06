<template>
    <div class="progress">
        <div class="progress-bar progress-bar-info progress-bar-striped"
        role="progressbar"

        style="width:50%">
    </div>

    {{ maxPressao }}
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";

export default {
  name: "PressureBar",
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
  computed: {
    ...mapGetters(['maxPressao'])
    }
};
</script>

