import Vapi from 'vuex-rest-api'

const comissao = new Vapi({
  baseURL: process.env.VUE_APP_API_URL,
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
