<template>
  <div id="container">
    <p>Parlamentares conectados pelos documentos autorados em conjunto</p>
    <!--<select-filter @filterChange="(payload) => filter = payload"/>-->
    <svg id="graph" v-if="nodes.length != 0">
      <g class="everything"></g>
      <tooltip :node="nodeHover"></tooltip>
    </svg>
    <h5 v-else>Não houve documentos com coautoria de pelo menos de 10 autores nos últimos 3 meses!</h5>
    <autorias :node="activeNode" :id_leggo="id_leggo"/>
  </div>
</template>

<script>
/* eslint-disable */
import * as d3 from "d3"
import axios from "@/stores/axios"
import config from "./InfluenciaGraphConfig.js"
import _ from "lodash"
import { vaxios } from "./mocks/vaxios"
import Tooltip from "./Tooltip"
import SelectFilter from "./SelectFilter"
import legendas from "./mixins/legendas.js"
import Autorias from "./Autorias"

export default {
  name: "InfluenciaGraph",
  components: {
    Tooltip,
    SelectFilter,
    Autorias
  },
  mixins: [legendas],
  props: {
    id_leggo: {
      type: Number,
      default: 0
    },
    nodes: {
      type: Array,
      default () { return [] }
    },
    edges: {
      type: Array,
      default () { return [] }
    },
    influencia: {
      type: Array,
      default () { return [] }
    }
  },
  data() {
    return {
      width: 300,
      height: 230,
      activeNode: null,
      nodeHover: null,
      filter: ""
    }
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
      const { simulation } = this
      function dragstarted(d) {
        if (!d3.event.active) simulation.alphaTarget(0.3).restart()
        d.fx = d.x
        d.fy = d.y
      }
      function dragged(d) {
        d.fx = d3.event.x
        d.fy = d3.event.y
      }
      function dragended(d) {
        if (!d3.event.active) simulation.alphaTarget(0)
        d.fx = null
        d.fy = null
      }
      return d3
        .drag()
        .on("start", dragstarted)
        .on("end", dragended)
        .on("drag", dragged)
    },
    group() {
      return this.svg.select(".everything")
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
        .attr("stroke-width", d => this.scaleLinkSize(d.value))
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
        .force("y", d3.forceY(d => this.connectedNodes.includes(d.id) ? this.height * (4 /8): this.height *(5/8))
              .strength(d => this.connectedNodes.includes(d.id) ? 0.8 : 1.5));
    },
    scaleLinkSize() {
      return d3
        .scaleLinear()
        .domain([
          d3.min(this.edges, d => d.value),
          d3.max(this.edges, d => d.value)
          ])
        .range([config.minLinkSize, config.maxLinkSize])
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
        .attr("x", 5);
    },
    vertex() {
      const vertex = this.group
        .append("g")
        .attr("class", "nodes")
        .selectAll("circle")
        .data(this.nodes)
        .enter()
        .append("g")
        .call(this.drag)
      vertex
        .append("circle")
        .attr("fill", d => this.scaleColor(d))
        .attr("stroke-width", d => 0.1)
        .attr("stroke", d => d.bancada === "oposição" ? "red" : "blue" )
        .attr("r", d => this.scaleNodeSize(d.influencia))
        .on("mouseover", d => {
          this.nodeHover = d
        })
        .on("mouseout", () => {
          this.nodeHover = null
        })
        .on("click", d => {
          if ((this.activeNode == d)) {
            this.activeNode = null
            vertex.selectAll("circle")
              .attr("opacity", 1)
              .attr("stroke-width", d => 0.1)
              .attr("stroke-dasharray", "0,0")
            d3.selectAll("line").attr("opacity", 1)
          } else {
            this.activeNode = d;
            vertex.selectAll("circle")
              .attr("opacity", n => this.idsNeighbors(d.id).includes(n.id) ? 1 : 0.1)
              .attr("stroke-dasharray", n => n.id == d.id ? "1,1": "0,0")
              .attr("stroke-width", n => n.id == d.id ? 0.4: 0.1)
            d3.selectAll("line").attr("opacity", n =>
              n.source.id == d.id || n.target.id == d.id ? 1 : 0
            )
          }
        });


      return vertex
    }
  },
  mounted() {
    this.fetchData()
  },
  methods: {
    buildGraphic() {
      const {
        group,
        links,
        vertex,
        title
      } = this
      this.createLegends()
      this.simulation.on("tick", function(d) {
        // position links
        links
          .attr("x1", d => d.source.x)
          .attr("x2", d => d.target.x)
          .attr("y1", d => d.source.y)
          .attr("y2", d => d.target.y)

        // position nodes
        vertex.attr("transform", d => `translate(${d.x} , ${d.y})`)
        title.attr("transform", d => `translate(${d.x} , ${d.y})`)
      })
    },
    getForceByLength(length) {
      return 1 - length / (length + 20)
    },
    idsNeighbors(id) {
      const idsNeighbors = [id].concat(
          this.edges.filter(n => n.source.id == id).map(n => n.target.id)
            );
      return idsNeighbors.concat(this.edges
              .filter(n => n.target.id == id)
              .map(n => n.source.id));
    },
    scaleColor(node) {

      const scaleAux = d3
        .scaleLinear()
        .domain([
          d3.min(this.nodes, d => d.node_size),
          d3.max(this.nodes, d => d.node_size)
        ])
        .range([0.2, 1])

      if (node.bancada === "oposição") {
        return d3.interpolateReds(scaleAux(node.node_size))
      }
      return d3.interpolateBlues(scaleAux(node.node_size))
    },
    scaleNodeSize(influencia) {
       return d3.scaleLinear()
        .domain([
          d3.min(this.influencia, d => d.indice_influencia_parlamentar),
          d3.max(this.influencia, d => d.indice_influencia_parlamentar)
        ])
        .range([config.minNodeSize, config.maxNodeSize])(influencia)
    },
    ticked(link, node) {
      link
        .attr("x1", d => {
          d.source.x = Math.max(d.source.x, 0)
          return d.source.x
        })
        .attr("y1", d => {
          d.source.y = Math.max(d.source.y, 0)
          return Math.max(d.source.y, 0)
        })
        .attr("x2", d => {
          d.target.x = Math.max(d.target.x, 0)
          return Math.max(d.target.x, 0)
        })
        .attr("y2", d => {
          d.target.y = Math.max(d.target.y, 0)
          return Math.max(d.target.y, 0)
        })
      node
        .attr("cx", d => {
          d.x = Math.max(d.x, 0)
          return Math.max(d.x, 0)
        })
        .attr("cy", d => {
          d.y = Math.max(d.y, 0)
          return Math.max(d.y, 0)
        })
    },
    async fetchData() {
      this.simulation
        .nodes(this.nodes)
        .force("link")
        .links(this.edges)
      this.buildGraphic()
    }
  }
}
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

<style lang="scss">
.caption {
  fill: gray;
  text-anchor: start;
  font-family: sans-serif;
  font-size: 0.35rem;
  @media screen and (max-width: 414px) {
    font-size: 0.6rem;
  }
}
</style>
