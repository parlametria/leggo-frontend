<template>
  <el-button @click="authenticate('google')">Login</el-button>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "Login",
  methods: {
    botao: function() {
      console.log("gela")
    },
    ...mapActions(["login"]),
    authenticate(provider) {
      this.login({ provider })
    }
  }
}
</script>

<style scoped>
</style>
