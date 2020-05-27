<template>
  <div class="ordenacao">
    <div
      class="title"
      @click="ord == 'desc' ? ord = 'asc' : ord = 'desc';
              sortTemperature(ord);
              show = !show">
      Ordenar:
      <span
        v-if="!show"
        class="el-icon-sort-up"/>
      <span
        v-else
        class="el-icon-sort-down"/>
      <span class="label">temperatura</span>
    </div>
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
.ordenacao {
  display: flex;
  justify-content: center;
  margin-top: 1rem;
  margin-bottom: 1rem;
}
.title {
  cursor: pointer;
  display: block;
}
.el-icon-sort-up,
.el-icon-sort-down,
.label {
  color: $--color-primary;
}
</style>
