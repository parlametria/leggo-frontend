<template>
  <div id="container">
    <!--<select-filter @filterChange="(payload) => filter = payload"/>-->
    <svg id="graph" v-if="nodes.length != 0" vi>
      <g class="everything"></g>
      <tooltip :node="activeNode"></tooltip>
    </svg>
    <h5 v-else>Não houve documentos com coautoria de pelo menos de 10 autores nos últimos 3 meses!</h5>
  </div>
</template>

<script>
/* eslint-disable */
import * as d3 from "d3";
import axios from "@/stores/axios";
import config from "./InfluenciaGraphConfig.js";
import { vaxios } from "./mocks/vaxios";
// "@/stores/voz_ativa_axios";
import Tooltip from "./Tooltip";
import SelectFilter from "./SelectFilter";

export default {
  name: "InfluenciaGraph",
  components: {
    Tooltip,
    SelectFilter
  },
  props: {
    id_leggo: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      width: 300,
      height: 150,
      nodes: [],
      influencia: [],
      edges: [],
      activeNode: null,
      filter: "",
      padding_right: window.innerWidth <= 414 ? 50 : 30,
      font_size: window.innerWidth <= 414 ? 10 : 6
    };
  },
  computed: {
    drag() {
      const { simulation } = this;
      function dragstarted(d) {
        if (!d3.event.active) simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
      }
      function dragged(d) {
        d.fx = d3.event.x;
        d.fy = d3.event.y;
      }
      function dragended(d) {
        if (!d3.event.active) simulation.alphaTarget(0);
        d.fx = null;
        d.fy = null;
      }
      return d3
        .drag()
        .on("start", dragstarted)
        .on("end", dragended)
        .on("drag", dragged);
    },
    group() {
      return this.svg.select(".everything");
    },
    links() {
      return this.group
        .append("g")
        .attr("class", "link")
        .selectAll("line")
        .data(this.edges)
        .enter()
        .append("line")
        .attr("stroke", "#AAA")
        .attr("stroke-width", d => this.scaleLinkSize(d.value));
    },
    maxNodeSize() {
      let max = -Infinity;
      this.nodes.forEach(node => {
        if (max < node.node_size) {
          max = node.node_size;
        }
      });
      return max;
    },
    minNodeSize() {
      let min = Infinity;
      this.nodes.forEach(node => {
        if (min > node.node_size) {
          min = node.node_size;
        }
      });
      return min;
    },
    maxLinkValue() {
      let max = -Infinity;
      this.edges.forEach(edge => {
        if (max < edge.value) {
          max = edge.value;
        }
      });
      return max;
    },
    minLinkValue() {
      let min = Infinity;
      this.edges.forEach(edge => {
        if (min > edge.value) {
          min = edge.value;
        }
      });
      return min;
    },
    simulation() {
      return d3
        .forceSimulation(this.nodes)
        .force(
          "link",
          d3
            .forceLink()
            .id(d => d.id)
            .links(this.edges)
            .distance(
              d =>
                this.scaleNodeSize(
                  Math.min(d.source.node_size, d.target.node_size)
                ) * 10
            )
        )
        .force("charge", d3.forceManyBody().strength(-18))
        .force(
          "collision",
          d3
            .forceCollide()
            .radius(d => this.scaleNodeSize(d.node_size) * config.nodeRepulsion)
        )
        .force(
          "x",
          d3.forceX(d => (d.bancada === "governo" ? 200 : 100)).strength(0.6)
        )
        .force("y", d3.forceY(75).strength(0.5));
    },
    scaleColor() {
      return d3.scaleOrdinal().range(d3.schemePastel1);
    },
    scaleNodeSize() {
      return d3
        .scaleLinear()
        .domain([this.minNodeSize, this.maxNodeSize])
        .range([config.minNodeSize, config.maxNodeSize]);
    },
    scaleLinkSize() {
      return d3
        .scaleLinear()
        .domain([this.minLinkValue, this.maxLinkValue])
        .range([config.minLinkSize, config.maxLinkSize]);
    },
    svg() {
      return d3
        .select("#graph")
        .attr("viewBox", `0 0 ${this.width} ${this.height}`);
    },
    title() {
      return this.group
        .append("g")
        .attr("class", "title")
        .selectAll("circle")
        .data(this.nodes)
        .enter()
        .append("g")
        .append("text")
        .attr("font-size", "8px")
        .attr("x", d => 5);
    },
    vertex() {
      const vertex = this.group
        .append("g")
        .attr("class", "nodes")
        .selectAll("circle")
        .data(this.nodes)
        .enter()
        .append("g")
        .call(this.drag);
      vertex
        .append("circle")
        .attr("fill", d => this.color(d))
        .attr("stroke-width", d => 0.1)
        .attr("stroke", "purple")
        .attr("r", d => d.r)
        .on("mouseover", d => {
          this.activeNode = d;
        })
        .on("mouseout", () => {
          this.activeNode = null;
        });

      return vertex;
    }
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    buildGraphic() {
      const {
        group,
        links,
        vertex,
        title,
        width,
        font_size,
        padding_right,
        height
      } = this;

      const { svg } = this;
      svg
        .select(".everything")
        .append("text")
        .style("fill", "gray")
        .text("Governo")
        .attr("font-family", "sans-serif")
        .attr("font-size", font_size)
        .attr("x", width - padding_right)
        .attr("y", height - 10);

      svg
        .append("text")
        .style("fill", "gray")
        .text("Oposição")
        .attr("font-family", "sans-serif")
        .attr("font-size", font_size)
        .attr("y", height - 10);

      const g = svg
        .append("g")
        .attr("transform", "translate(" + (width - 30) + "," + 10 + ")");

      var gradient = svg
        .append("defs")
        .append("linearGradient")
        .attr("id", "gradient")
        .attr("x1", "0%")
        .attr("y1", "50%")
        .attr("x2", "100%")
        .attr("y2", "50%")

      gradient
        .append("stop")
        .attr("offset", "0%")
        .attr("stop-color", "#D9DCEB")
        .attr("stop-opacity", 1);

      gradient
        .append("stop")
        .attr("offset", "100%")
        .attr("stop-color", "#3E1D7E")
        .attr("stop-opacity", 1);

      g.append("rect")
        .attr("height", 4)
        .attr("x", -15)
        .attr("y", 2)
        .attr("width", 40)
        .attr("fill", "url(#gradient)");

      g.append("text")
        .attr("class", "caption")
        .attr("y", 1)
        .attr("x", -15)
        .attr("fill", "#000")
        .attr("font-size", 3)
        .attr("text-anchor", "start")
        .attr("font-weight", "bold")
        .attr("font-family", "sans-serif")
        .text("Índice de Influência Política");

      g.append("text")
         .attr("x", -15)
         .attr("y", 9)
         .attr("font-size", 3) 
         .attr("font-family", "sans-serif")
         .text("0%")

      g.append("text")
         .attr("x", 20)
         .attr("y", 9)
         .attr("font-size", 3) 
         .attr("font-family", "sans-serif")
         .text("100%")

      this.simulation.on("tick", function(d) {
        // position links
        links
          .attr("x1", d => d.source.x)
          .attr("x2", d => d.target.x)
          .attr("y1", d => d.source.y)
          .attr("y2", d => d.target.y);

        // position nodes
        vertex.attr("transform", d => `translate(${d.x} , ${d.y})`);
        title.attr("transform", d => `translate(${d.x} , ${d.y})`);
      });
    },
    onResize() {
      this.width = this.$el.offsetWidth;
      this.height = this.$el.offsetHeight;
    },
    getForceByLength(length) {
      return 1 - length / (length + 20);
    },
    color(data) {
      if (data.influencia === undefined) {
        data.influencia = 0;
      }
      const { influencia } = data;
      const scaleAux = d3
        .scaleLinear()
        .domain([
          d3.min(this.influencia, d => d.indice_influencia_parlamentar),
          d3.max(this.influencia, d => d.indice_influencia_parlamentar)
        ])
        .range([0.3, 1]);
      return d3.interpolatePurples(scaleAux(influencia));
    },
    setEdges({ data }) {
      this.edges = data.map(edge => ({
        ...edge,
        source: parseInt(edge.source, 10),
        target: parseInt(edge.target, 10)
      }));
      this.simulation
        .nodes(this.nodes)
        .force("link")
        .links(this.edges);
    },
    setNodes({ data }) {
      this.nodes = data.map(node => ({
        ...node,
        node_size: parseInt(node.node_size, 10),
        x: 0,
        y: 0,
        id: parseInt(node.id_autor, 10)
      }));
      // Primeiro é gerado o node_size convertido para int
      // de todos para conseguir calcular o raio do maior
      // e do menor e só então gerar os raios de todos.
      this.nodes = this.nodes.map(node => ({
        ...node,
        r: this.scaleNodeSize(node.node_size)
      }));
    },
    setInfluencia({ data }) {
      this.influencia = data;
      this.nodes.forEach(node => {
        this.influencia.forEach(parlamentar => {
          if (parlamentar.id == node.id) {
            node["influencia"] = parlamentar.indice_influencia_parlamentar;
          }
        });
      });
    },
    ticked(link, node) {
      link
        .attr("x1", d => {
          d.source.x = Math.max(d.source.x, 0);
          return d.source.x;
        })
        .attr("y1", d => {
          d.source.y = Math.max(d.source.y, 0);
          return Math.max(d.source.y, 0);
        })
        .attr("x2", d => {
          d.target.x = Math.max(d.target.x, 0);
          return Math.max(d.target.x, 0);
        })
        .attr("y2", d => {
          d.target.y = Math.max(d.target.y, 0);
          return Math.max(d.target.y, 0);
        });
      node
        .attr("cx", d => {
          d.x = Math.max(d.x, 0);
          return Math.max(d.x, 0);
        })
        .attr("cy", d => {
          d.y = Math.max(d.y, 0);
          return Math.max(d.y, 0);
        });
    },
    async fetchData() {
      this.setNodes(await axios.get(`/coautorias_node/${this.id_leggo}`));
      this.setEdges(await axios.get(`/coautorias_edge/${this.id_leggo}`));
      this.setInfluencia(await vaxios.post(`/api/aderencia/parlamentar`, {}));
      this.buildGraphic();
    }
  }
};
</script>

<style lang="scss" scoped>
.graph {
  width: 50vw;
  height: 50vh;
}
.line {
  z-index: 0;
}
.circle {
  z-index: 1;
}
</style>
