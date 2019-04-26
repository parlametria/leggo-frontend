import Vue from 'vue'
import VueAxios from 'vue-axios'
import {
  VueAuthenticate
} from 'vue-authenticate'
import axios from 'axios'
import jwtDecode from 'jwt-decode'

const TOKEN_STORAGE = 'vue-authenticate.vueauth_token'

Vue.use(VueAxios, axios)
const http = axios.create({})

const vueAuth = new VueAuthenticate(http, {
  tokenPath: 'token',
  baseUrl: window.location.origin,
  providers: {
    google: {
      clientId: process.env.VUE_APP_GOOGLE_CLIENT_ID,
      url: `${process.env.VUE_APP_AUTH_API_URL}/api/auth/googleCode`,
      redirectUri: window.location.origin
    },
    facebook: {
      clientId: process.env.VUE_APP_FACEBOOK_CLIENT_ID,
      url: `${process.env.VUE_APP_AUTH_API_URL}/api/auth/facebookCode`,
      authorizationEndpoint: 'https://www.facebook.com/v2.5/dialog/oauth',
      redirectUri: window.location.origin
    }
  }
})

export default {
  state: {
    token: localStorage.getItem(TOKEN_STORAGE) || ''
  },
  getters: {
    isAuthenticated: state => {
      return state.token !== ''
    },
    getUser: state => {
      return state.token === '' ? null : jwtDecode(state.token)
    }

  },
  mutations: {
    setToken (state, payload) {
      state.token = payload
    }
  },
  actions: {
    login ({ commit }, { provider }) {
      vueAuth.authenticate(provider).then((response) => {
        console.log(response)
        commit('setToken', response.data.token)
      })
    },
    logout ({ commit }) {
      localStorage.removeItem(TOKEN_STORAGE)
      commit('setToken', '')
    }
  }
}
