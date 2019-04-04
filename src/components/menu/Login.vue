<template>
  <div>
    <el-button v-if="!isAuthenticated" @click="login({ provider:'google' })">Login</el-button>
    <el-button v-if="isAuthenticated" @click="logout()">Logout</el-button>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "Login",
  methods: {
    ...mapActions(["login", "logout"])
  },
  computed: {
    ...mapGetters(["isAuthenticated"])
  }
}
</script>

<style scoped>
</style>
