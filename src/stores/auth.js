import Vue from 'vue'
import VueAxios from 'vue-axios'
import {
  VueAuthenticate
} from 'vue-authenticate'
import axios from 'axios'
import jwt_decode from 'jwt-decode'

Vue.use(VueAxios, axios)
const http = axios.create({})

const vueAuth = new VueAuthenticate(http, {
  baseUrl: 'http://localhost:8080',
  providers: {
    google: {
      clientId: '773385657337-rn1q93jpq1fb5nmhfkd53de0e5l9r75i.apps.googleusercontent.com',
      url: 'http://localhost:5000/api/auth/googleCode',
      scope: ['profile', 'email'],
      redirectUri: 'http://localhost:8080'
    }
  }
})

export default {

  // You can use it as state property
  state: {
    user: (() => jwt_decode("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEwNzg2NzI5MDczNjUwMjc5NjEwOCIsImZpcnN0TmFtZSI6IkphaXIiLCJwaG90byI6Imh0dHBzOi8vbGg0Lmdvb2dsZXVzZXJjb250ZW50LmNvbS8tTEdxYXhTeW1GN1UvQUFBQUFBQUFBQUkvQUFBQUFBQUFBSUEvZ25NUzBqMVp1Tk0vcGhvdG8uanBnIiwiaWF0IjoxNTU0MzIyMjQzLCJleHAiOjE1NTY5MTQyNDN9.25GJaW4wX_IfxRbY-TEs09vrj_6IauuF9RPpdNrhKz0"))()
  },

  // You can use it as a state getter function (probably the best solution)
  getters: {
    isAuthenticated() {
      return vueAuth.isAuthenticated()
    },
    getToken() {
      const token = localStorage.getItem('vue-authenticate.vueauth_token')
      return token == null ? "" : token
    },

  },

  // Mutation for when you use it as state property
  mutations: {
    /* setAuthenticated(state, payload) {
      state.isAuthenticated = payload
    },
    */
    setUser(state, payload) {
      state.user = payload
    }
  },

  actions: {

    // Perform VueAuthenticate login using Vuex actions
    login({ commit, state }, { provider }) {
      vueAuth.authenticate(provider).then((response) => {
        commit('setUser', response.data.user)
      })
    }
  }
}
