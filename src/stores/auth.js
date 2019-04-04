import Vue from 'vue'
import VueAxios from 'vue-axios'
import {
  VueAuthenticate
} from 'vue-authenticate'
import axios from 'axios'
import jwt_decode from 'jwt-decode'

const TOKEN_STORAGE = 'vue-authenticate.vueauth_token'

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

  state: {
    token: localStorage.getItem(TOKEN_STORAGE) || ''
  },

  getters: {
    isAuthenticated: state =>{
      return state.token != ''
    },
    getUser: state => { 
      return state.token == '' ? null : jwt_decode(state.token)
    },

  },
  mutations: {
    setToken(state, payload) {
      state.token = payload
    }
  },

  actions: {
    login({ commit }, { provider }) {
      vueAuth.authenticate(provider).then((response) => {
        commit('setToken', response.data.token)
      })
    },
    logout({ commit }) {
      localStorage.removeItem(TOKEN_STORAGE)
      commit('setToken', '')
    }
  }
}
