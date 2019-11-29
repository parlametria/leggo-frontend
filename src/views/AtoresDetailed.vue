<template>
  <div>
    <a @click="$router.go(-1)">
      <span class="titulo">
        <span>{{ apelido }}</span>
      </span>
    </a>
    <div
      class="graphic"
      id="grafico">
      <div ref="anchor" />
      <p style="font-size: 10pt">* Oposição</p>
    </div>
  </div>
</template>

<script>
import AtoresGraphicModel from '../components/card/expanded/atores/AtoresGraphicModel.js'
import axios from '@/stores/axios'

export default {
  name: 'AtoresDetailed',
  props: {
    id_leggo: {
      type: Number,
      default: -1
    },
    apelido: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      atores: []
    }
  },
  computed: {
    tamanhoGrafico () {
      return document.getElementById('grafico').offsetWidth
    }
  },
  methods: {
    async fetchData () {
      this.setAtores(await axios.get(`/atores/${this.id_leggo}`))
      this.mountGraphic()
    },
    setAtores ({ data }) {
      this.atores = data
    },
    async mountGraphic () {
      let model = new AtoresGraphicModel(this.tamanhoGrafico, 'Atividade parlamentar')
      await // eslint-disable-next-line
      (await vegaEmbed(this.$refs.anchor, model.vsSpec)).view
        // eslint-disable-next-line
        .change("ator", vega.changeset().remove("ator", d => true))
        .insert('ator', this.atores)
        .run()
    }
  },
  mounted () {
    this.fetchData()
  }
}
</script>

<style lang="scss" scoped>
a {
  cursor: pointer;
}
.graphic {
  details {
    display: none;
  }
}
.graphic {
  text-align: left;
  overflow-x: auto;
}
.titulo {
  color: #656565;
  font-size: 2rem;
  padding: 0rem 0.5rem;
}
.titulo::before {
  height: 12px;
  width: 12px;

  border: solid #dc6060;
  border-width: 0px 3px 3px 0;
  margin-bottom: 4px;
  margin-right: 5px;
  transform: rotate(130deg);
  content: "";
  display: inline-block;
}
</style>
