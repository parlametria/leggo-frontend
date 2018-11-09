import { expect } from 'chai'
import { shallowMount } from '@vue/test-utils'
import FormaApreciacao from '@/components/card/collapsed/FormaApreciacao.vue'

describe('FormaApreciacao.vue', () => {
  it('renders props.forma_apreciacao when prioridade type passed', () => {
    ['conclusiva', 'plenário'].forEach(apreciacao => {
      const wrapper = shallowMount(FormaApreciacao, {
        propsData: { apreciacao }
      })
      expect(wrapper.text()).to.include(apreciacao)
    })
  })
})

describe('FormaApreciacao.vue', () => {
  it('not renders props.forma_apreciacao when an invalid type passed', () => {
    const apreciacao = 'abacate'
    const wrapper = shallowMount(FormaApreciacao, {
      propsData: { apreciacao }
    })
    expect(wrapper.text()).to.not.include(apreciacao)
  })
})
