<template>
  <div
    class="title"
    @click="ord == 'desc' ? ord = 'asc' : ord = 'desc';
            sortTemperature(ord);
            show = !show">Ordenar
    <span
      v-if="!show"
      class="el-icon-sort-down"/>
    <span
      v-else
      class="el-icon-sort-up"/>
  </div>
</template>
<script>
export default {
  name: 'TemperatureButton',
  data () {
    return {
      ord: 'desc',
      show: true
    }
  },
  methods: {
    sortTemperature: function (value) {
      this.$store.commit('updateTemperatureOrder', value)
    }
  },
  computed: {
    temperatureOrder: {
      get () {
        return this.$store.state.filter.temperatureOrder
      },
      set (value) {
        this.$store.commit('updateTemperatureOrder', value)
      }
    }
  }
}
</script>
<style scoped lang='scss'>
@import "@/base.scss";
.title {
  cursor: pointer;
  margin-left: 200px;
}
.el-icon-sort-up{
  color: $--color-primary;
}
</style>
