<template>
  <div>
    <div v-if="isAuthenticated">
      <img :src="getUser.photo" class="img" @error="replacePhotoToDefault"/>
      <span>{{ getUser.firstName }}</span>
    </div>
    <el-button v-if="!isAuthenticated" @click="login({ provider:'google' })">Google</el-button>
    <el-button v-if="!isAuthenticated" @click="login({ provider:'facebook' })">Face</el-button>
    <el-button v-if="isAuthenticated" @click="logout()">Logout</el-button>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'Login',
  methods: {
    ...mapActions(['login', 'logout']),
    replacePhotoToDefault (e) {
      e.target.src = require('@/assets/default-avatar-parlamentar.png')
    }
  },
  computed: {
    ...mapGetters(['isAuthenticated', 'getUser'])
  }
}
</script>

<style scoped>
.img {
  border-radius: 50%;
  height: 50px;
}
</style>
