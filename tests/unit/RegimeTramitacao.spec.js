import { expect } from 'chai'
import { shallowMount } from '@vue/test-utils'
import RegimeTramitacao from '@/components/RegimeTramitacao.vue'

describe('RegimeTramitacao.vue', () => {
  it('renders props.regime_tramitacao when prioridade type passed', () => {
    ['prioridade', 'ordinaria', 'ordinária', 'urgencia', 'urgência', 'URGENCIA'].forEach(regime => {
      const wrapper = shallowMount(RegimeTramitacao, {
        propsData: { regime }
      })
      expect(wrapper.text()).to.include(regime)
    })
  })
})

describe('RegimeTramitacao.vue', () => {
  it('not renders props.regime_tramitacao when an invalid type passed', () => {
    const regime = 'abacate'
    const wrapper = shallowMount(RegimeTramitacao, {
      propsData: { regime }
    })
    expect(wrapper.text()).to.not.include(regime)
  })
})
