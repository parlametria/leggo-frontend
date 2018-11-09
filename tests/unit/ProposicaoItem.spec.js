import { expect } from 'chai'
import { shallowMount } from '@vue/test-utils'
import ProposicaoItem from '@/components/card/ProposicaoItem.vue'

describe('ProposicaoItem.vue', () => {
  it('renders props.em_pauta when em_pauta is true', () => {
    const wrapper = shallowMount(ProposicaoItem, {
      propsData: {
        prop: {
          em_pauta: true,
          casa: 'senado',
          idExt: 1321
        }
      }
    })
    expect(wrapper.text()).to.include('Em pauta')
  })

  it('not renders props.em_pauta when em_pauta is false', () => {
    const wrapper = shallowMount(ProposicaoItem, {
      propsData: {
        prop: {
          em_pauta: false,
          casa: 'senado',
          idExt: 1321
        }
      }
    })
    expect(wrapper.text()).to.not.include('Em pauta')
  })
})
