<template>
  <span
    v-if="options.includes(agenda.toLowerCase())"
    type="info">
    {{ agenda }}
  </span>
</template>

<script>
export default {
  name: 'TipoAgenda',
  data () {
    return {
      options: ['positiva', 'negativa', 'neutra']
    }
  },
  props: {
    agenda: {
      type: String,
      default: 'não informada'
    }
  }
}
</script>
