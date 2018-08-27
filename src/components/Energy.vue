<template>
  <div>
    <img v-if="value <= weak" src="@/assets/ice.png"/>
    <img v-else-if="value > weak && value < strong" src="@/assets/small_fire.png"/>
    <img v-else src="@/assets/fire.png"/>
  </div>
</template>

<script>
export default {
  name: 'Energy',
  data () {
    return {
      strong: 30,
      weak: 0
    }
  },
  props: ['value']
}
</script>
