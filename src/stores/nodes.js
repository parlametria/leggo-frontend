import Vue from 'vue'
import Vapi from 'vuex-rest-api'

const nodes = new Vapi({
  state: {
    nodes: {}
  } }).get({
  action: 'getNodes',
  property: 'nodes',
  path: ({ id }) =>
    `nodes/${id}`,
  onSuccess: (state, { data }, { params }) => {
    Vue.set(state.nodes, params.id, data)
  }
}).getStore()

export default nodes
