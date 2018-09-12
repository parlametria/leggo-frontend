import { expect } from 'chai'
import { shallowMount } from '@vue/test-utils'
import RegimeTramitacao from '@/components/RegimeTramitacao.vue'

describe('RegimeTramitacao.vue', () => {
  it('renders props.regime_tramitacao when prioridade type passed', () => {
    const regime = 'prioridade'
    const wrapper = shallowMount(RegimeTramitacao, {
      propsData: { regime }
    })
    expect(wrapper.text()).to.include(regime)
  })
})

describe('RegimeTramitacao.vue', () => {
  it('renders props.regime_tramitacao when urgencia type passed', () => {
    const regime = 'urgencia'
    const wrapper = shallowMount(RegimeTramitacao, {
      propsData: { regime }
    })
    expect(wrapper.text()).to.include(regime)
  })
})

describe('RegimeTramitacao.vue', () => {
  it('renders props.regime_tramitacao when ordinaria type passed', () => {
    const regime = 'ordinaria'
    const wrapper = shallowMount(RegimeTramitacao, {
      propsData: { regime }
    })
    expect(wrapper.text()).to.include(regime)
  })
})
