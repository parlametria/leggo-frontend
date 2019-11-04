import axios from 'axios'

const vaxios = axios.create({
  baseURL: process.env.VUE_APP_VOZ_ATIVA
})
export default vaxios