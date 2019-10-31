<template>
  <div id="container">
    <svg
      id="graph"
      v-if="nodes.length != 0"
      :viewBox="`0 0 300 150`" />
  </div>
</template>

<script>
/* eslint-disable */
import * as d3 from "d3";
import axios from "@/stores/axios"
import config from "./InfluenciaGraphConfig.js";

export default {
  name: "InfluenciaGraph",
  props: {
    id_leggo: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      width: 0,
      height: 0,
      nodes: [],
      edges: []
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
      return this.svg.append("g").attr("class", "everything");
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
    simulation() {
      return d3
        .forceSimulation(this.nodes)
        .force(
          "link",
          d3
            .forceLink()
            .id(d => d.id)
            .links(this.edges)
            .distance(d => d.value * 2)
         )
        .force("charge", d3.forceManyBody().strength(-18))
        .force("collision", d3.forceCollide().radius(d => this.scaleNodeSize(d.node_size) * config.nodeRepertion))
        .force('x', d3.forceX(150).strength(0.1))
        .force('y', d3.forceY(75).strength(0.1));
    },
    scaleColor() {
      return d3
        .scaleOrdinal()
        .domain(this.areas)
        .range(d3.schemePastel1);
    },
    scaleX() {
      return d3
        .scaleLinear()
        .domain([0, this.areas.filter(e => e.areas !== "").length - 1])
        .range([this.width * 0.15, this.width * 1]);
    },
    scaleY() {
      return d3
        .scaleLinear()
        .domain([1, 10])
        .range([this.height * 0.1, this.height * 0.8]);
    },
    scaleNodeSize () {
      return d3
        .scaleLinear()
        .domain([this.minNodeSize, this.maxNodeSize])
        .range([config.sizeMinNode, config.sizeMaxNode]);
    },
    scaleLinkSize () {
      return d3
        .scaleLinear()
        .domain([this.minNodeSize, this.maxNodeSize])
        .range([config.sizeMinLink, config.sizeMaxLink]);
    },
    svg() {
      return d3.select("#graph");
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
        .attr("fill", d => (d.bancada == "governo" ? "#436f82" : "#ae4544"))
        .attr("stroke-width", 1)
        .attr("stroke", "white")
        .attr("r", d => this.scaleNodeSize(d.node_size))
        .on("mouseover", d => {
          this.group
            .append("text")
            .text(d.nome_eleitoral)
            .attr("x", d.x + 1)
            .attr("y", d.y + 1)
            .attr("font-size", "8px");
        })
        .on("mouseout", () => {
          this.group.selectAll("text").remove();
        });

      return vertex;
    }
  },
  mounted() {
    window.addEventListener("resize", this.onResize);
    this.onResize();
    this.fetchData();
  },
  methods: {
    buildGraphic() {
      const { group, links, vertex, title } = this;
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
    color(area) {
      return d3.scaleOrdinal(d3.schemeSet3)(area);
    },
    setEdges({ data }) {
      this.edges = data
        .map(edge => ({
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
      this.nodes = data
        .map(node => ({
          ...node,
          node_size: parseInt(node.node_size, 10),
          x: 0,
          y: 0,
          id: parseInt(node.id_autor, 10)
        }));
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
      this.setNodes(
        await axios.get(`/nodes/${this.id_leggo}`)
      );
      this.setEdges(
        await axios.get(`/edges/${this.id_leggo}`)
      );
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
</style>
