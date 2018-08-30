<template>
  <div class="props">
    <h1>Proposições</h1>
    <ul>
      <li :key="i" v-for="(prop, i) in props">
        <router-link
          :to="{ name: 'proposicaoDetails', params: { casa: prop.casa, idExt: prop.id_ext }}">
          {{ prop.sigla }}
        </router-link>
         -
        <a :href="prop.page_url" target="_blank">link</a> -
        fases:
        <ul class="fases">
          <li :key="j" v-for="(fase, j) in prop.fases" :class="fase.casa" :title="fase.nome">
          </li>
        </ul>
        <energy value="30"/>
      </li>
    </ul>
  </div>
</template>

<script>
import Energy from '@/components/Energy.vue'

export default {
  name: 'proposicoes',
  components: {
    Energy
  },
  data () {
    return {
      props: []
    }
  },
  async mounted () {
    var url = 'http://localhost:8000/proposicoes'
    this.props = await (await fetch(url)).json()
  }
}
</script>

<style lang="scss">
.fases {
    display: inline-block;
    padding: 0;
    li {
        display: inline-block;
        width: 10px;
        height: 20px;
        margin: 3px;
    }
    .senado {
        background-color: blue;
    }
    .camara {
        background-color: green;
    }
}
</style>
