<template>
  <div id="container">
    <p>Parlamentares conectados pelos documentos autorados em conjunto</p>
    <!--<select-filter @filterChange="(payload) => filter = payload"/>-->
    <svg
      id="graph"
      v-if="nodes.length != 0"
      vi>
      <g class="everything"/>
      <tooltip :node="nodeHover"/>
    </svg>
    <h5 v-else>Não houve documentos com coautoria de pelo menos de 10 autores nos últimos 3 meses!</h5>
  </div>
</template>

<script>
/* eslint-disable */
import * as d3 from "d3";
import axios from "@/stores/axios";
import config from "./InfluenciaGraphConfig.js";
import _ from "lodash";
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
      height: 230,
      nodes: [],
      influencia: [],
      edges: [],
      activeNode: null,
      nodeHover: null,
      filter: "",
      padding_right: window.innerWidth <= 414 ? 50 : 30,
      font_size: window.innerWidth <= 414 ? 10 : 6
    };
  },
  computed: {
    connectedNodes() {
      return _.uniq(this.nodes.filter(n =>
        this.edges.filter(edge =>
           edge.source.id == n.id || edge.target.id == n.id
          ).length != 0
        ).map(n => n.id))
    },
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
              d => 10 +this.scaleNodeSize(Math.max(d.source.influencia, d.target.influencia))*2 || 10)
        )
        .force("charge", d3.forceManyBody().strength(-25))
        .force(
          "collision",
          d3
            .forceCollide()
            .radius(d => this.scaleNodeSize(d.influencia)*1.1 )
        )
        .force(
          "x",
          d3.forceX(d => (d.bancada === "governo" ? 220 : 80)).strength(0.9)
        )
        .force("y", d3.forceY(d => this.connectedNodes.includes(d.id) ? this.width * (2.7 /8): this.width *(4/8))
              .strength(d => this.connectedNodes.includes(d.id) ? 0.8 : 1.5));
    },
    scaleLinkSize() {
      return d3
        .scaleLinear()
        .domain([
          d3.min(this.edges, d => d.value),
          d3.max(this.edges, d => d.value)
          ])
        .range([config.minLinkSize, config.maxLinkSize]);
    },
    svg() {
      return d3
        .select("#graph")
        .attr("viewBox", `0 0 ${this.width} ${this.height}`)
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
        .attr("fill", d => this.scaleColor(d.node_size))
        .attr("stroke-width", d => 0.1)
        .attr("stroke", "purple")
        .attr("r", d => this.scaleNodeSize(d.influencia))
        .on("mouseover", d => {
          this.nodeHover = d;
        })
        .on("click", d => {
          if ((this.activeNode == d)) {
            this.activeNode = null;
            vertex.selectAll("circle")
              .attr("opacity", 1)
              .attr("stroke-width", d => 0.1)
              .attr("stroke-dasharray", "0,0")
            d3.selectAll("line").attr("opacity", 1);
          } else {
            this.activeNode = d;
            let idsNeighbors = [d.id].concat(
              this.edges.filter(n => n.source.id == d.id).map(n => n.target.id)
            );
            idsNeighbors = idsNeighbors.concat(this.edges
              .filter(n => n.target.id == d.id)
              .map(n => n.source.id));
            vertex.selectAll("circle")
              .attr("opacity", n => (idsNeighbors.includes(n.id) ? 1 : 0.1))
              .attr("stroke-dasharray", n => n.id == d.id ? "1,1": "0,0")
              .attr("stroke-width", n => n.id == d.id ? 0.4: 0.1)
            d3.selectAll("line").attr("opacity", n =>
              n.source.id == d.id || n.target.id == d.id ? 1 : 0
            );
          }
        })
        .on("mouseout", ()=> this.nodeHover = null)

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
        .attr("y2", "50%");

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
        .text("Contribuição do autor");

      g.append("text")
        .attr("class", "caption")
        .attr("y", 19)
        .attr("x", -15)
        .attr("fill", "#000")
        .attr("font-size", 3)
        .attr("text-anchor", "start")
        .attr("font-weight", "bold")
        .attr("font-family", "sans-serif")
        .text("Influência Política");

      var radios = [1, 2, 3, 4, 5];
      var x0 = -18;
      var padding = 2;

      g.selectAll("circle")
        .data(radios)
        .enter()
        .append("circle")
        .attr("fill", "#7566ae")
        .attr("cx", r => (x0 = x0 + 2 * r + padding))
        .attr("cy", 25)
        .attr("r", r => r);

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
    scaleColor(value) {
      const scaleAux = d3
        .scaleLinear()
        .domain([
          d3.min(this.nodes, d => d.node_size),
          d3.max(this.nodes, d => d.node_size)
        ])
        .range([0.3, 1]);
      return d3.interpolatePurples(scaleAux(value));
    },
    scaleNodeSize(influencia) {
       return d3.scaleLinear()
        .domain([
          d3.min(this.influencia, d => d.indice_influencia_parlamentar),
          d3.max(this.influencia, d => d.indice_influencia_parlamentar)
        ])
        .range([config.minNodeSize, config.maxNodeSize])(influencia);
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
    },
    setInfluencia({ data }) {
      this.influencia = data;
      this.nodes.forEach(node => {
        node["influencia"] = 0;
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
