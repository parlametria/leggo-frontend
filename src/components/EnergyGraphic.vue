<template>
  <div>
    <div :id= "vis"></div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import axios from "axios";

export default {
  name: "EnergyGraphic",
  data() {
    return {
      energia: {}
    };
  },
  props: {
    vis: String,
    id: Number,
    casa: String
  },
  async mounted() {
    const response = await axios.get("http://127.0.0.1:8000/energia-recente" + "/" + this.casa + "/" + this.id);
    this.energia = response.data;

    const vlSpec = {
      description: "últimos 30 dias",
      $schema: "https://vega.github.io/schema/vega-lite/v2.json",
      height: 30,
      width: 100,
      title: "Energia Recente",
      data: {
        values: this.energia.energia_recente
      },
      mark: {
        type: "line",
        line: true,
        color: "#db5448"
      },
      encoding: {
        x: {
          field: "periodo",
          type: "temporal",
          axis: {
            title: "",
            grid: false,
            ticks: false,
            labels: false
          }
        },
        y: {
          field: "energia_recente",
          type: "quantitative",
          axis: {
            title: "",
            grid: false,
            labels: false,
            ticks: false
          }
        }
      },
      config: {
        view: {
          stroke: "transparent"
        },
        axisY: {
          minExtent: 0
        },
        axis: {
          domain: false
        }
      }
    };

    // eslint-disable-next-line no-undef
    vegaEmbed("#" + this.vis, vlSpec);

  }
};
</script>

<style>
.vega-actions {
  display: none;
}
</style>
