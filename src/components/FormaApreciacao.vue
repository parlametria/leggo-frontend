<template>
  <el-tag v-if="options.includes(apreciacao.toLowerCase())" type="info" style="width:70px">{{apreciacao}}</el-tag>
</template>

<script>
export default {
  name: 'FormaApreciacao',
  data () {
    return {
      options: ['conclusiva', 'plenário']
    }
  },
  props: ['apreciacao']
}
</script>
