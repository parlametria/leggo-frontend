<template>
  <div class="graphic2" id="grafico">
    <div ref="anchor"></div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import AtoresGraphicModel from "./AtoresGraphicModel.js";

export default {
  name: "AtoresGraphic",
  props: {},
  computed: {
    atores() {
      if (this.listaAtores[this.id]) {
        return this.listaAtores[this.id];
      }
    },
    ...mapState({
      listaAtores: state => state.atores.atores
    }),
    tamanhoGrafico() {
      return document.getElementById("grafico").offsetWidth;
    }
  },
  methods: {
    ...mapActions(["getAtores"]),
    async mountGraphic() {
      if (this.atores && this.atores.length) {
        let model = new AtoresGraphicModel(tamanhoGrafico);
        await // eslint-disable-next-line
        (await vegaEmbed(this.$refs.anchor, model.vsSpec)).view
          // eslint-disable-next-line
          .change("ator", vega.changeset().remove("ator", d => true))
          .insert(
            "ator",
            this.ator.map(ator => ({
              ...ator,
              qnt_documentos: ator.qtd_de_documentos
            }))
          )
          .run();
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.graphic {
  details {
    display: none;
  }
}
.graphic2 {
  text-align: left;
}
</style>