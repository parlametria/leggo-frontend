import Vue from 'vue'
import Vapi from 'vuex-rest-api'

const edges = new Vapi({
  state: {
    edges: {}
  } }).get({
  action: 'getEdges',
  property: 'edges',
  path: ({ id }) =>
    `nodes/${id}`,
  onSuccess: (state, { data }, { params }) => {
    Vue.set(state.edges, params.id, data)
  }
}).getStore()

export default edges
