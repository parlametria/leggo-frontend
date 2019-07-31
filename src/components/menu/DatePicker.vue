<template>
  <el-container>
    <el-select
      :value="value"
      @input="$emit('input', $event)"
      clearable
      placeholder="aa por"
      size="mini">
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"/>
    </el-select>
  </el-container>
</template>
<script>
import Datepicker from 'vuejs-datepicker'
export default {
  name: 'DatePicker',
  components: {
    Datepicker
  },
  data () {
    return {
      state: {
        date: new Date()
      }
    }
  },
  watch: {
    date: {
      immediate: true,
      deep: true,
      handler (newValue, oldValue) {
        if (newValue) {
          this.date = new Date()
        }
      }
    }
  }
}
</script>
 <style scoped>
.el-select {
  width: 150px;
  font-size: 30px;
}
</style>
