<template>
  <div class="props">
    <h1>Proposições</h1>
    <ul>
      <li :key="i" v-for="(prop, i) in props">
        {{ prop.ano }} -
        {{ prop.ano_materia }} -
        {{ prop.ementa }} -
        {{ prop.ementa_materia }}
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
