<template>
  <p>{{fetchData()}}</p>
</template>

<script>
import axios from "@/stores/axios"

export default {
  name: "Tooltip",
  props: {
    node: {
      type: Object,
      default: null
    },
    id_leggo: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      autorias: []
    };
  },
  computed: {
    mounted() {
      this.fetchData();
    }
  },
  methods: {
    async fetchData() {
      this.setAutorias(await axios.get(`/autorias/${this.id_leggo}`));
    },
    setAutorias({ data }) {
        console.log(this.node)
        if (this.node !== null) {
        this.autorias = data
                            .filter(autoria => autoria.id_autor == this.node.id_autor)
        }
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
