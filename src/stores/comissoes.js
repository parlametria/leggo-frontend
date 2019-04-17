import Vapi from 'vuex-rest-api'
import axios from './axios'

const comissao = new Vapi({
  axios: axios,
  state: {
    orgao: {}
  } }).get({
  action: 'getComissao',
  property: 'comissao',
  path: ({ casa, sigla }) =>
    `comissao/${casa}/${sigla}`,
  onSuccess: (state, { data }, axios, { params }) => {
    const novoOrgao = state.orgao
    novoOrgao[params.sigla] = data
    state.orgao = novoOrgao
  }
}).getStore()

export default comissao
