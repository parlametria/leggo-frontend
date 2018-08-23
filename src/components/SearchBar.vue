<template>
  <div>
      <el-autocomplete placeholder="Please input"></el-autocomplete>
      <el-input placeholder="Please input"></el-input>
      <Button @click="visible = true">Button</Button>
  </div>
</template>

<script>
export default {
  name: 'SearchBar'
}
</script>

<style scoped>
h3 {
  margin: 40px 0 0;
}
a {
  color: #1f4735;
}
</style>
