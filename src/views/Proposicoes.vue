<template>
  <div class="props">
    <h1>Proposições</h1>
    <ul>
      <li :key="i" v-for="(prop, i) in props">
        {{ prop.ano }} -
        {{ prop.ano_materia }} -
        {{ prop.ementa }} -
        {{ prop.ementa_materia }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'proposicoes',
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
