import { expect } from 'chai'
import { shallowMount } from '@vue/test-utils'
import FasesBar from '@/components/FasesBar.vue'

describe('FasesBar', () => {
  it('renders fasesbar when all fields are passed', () => {
    const fases = [
        {'data_inicio': '2018-09-16', 'data_fim': '2018-09-17', 'casa': 'senado', 'nome': 'Comissões'},
        {'data_inicio': '2018-09-17', 'data_fim': '2018-09-17', 'casa': 'senado', 'nome': 'Plenário'},
        {'data_inicio': '2018-09-17', 'data_fim': '2018-09-19', 'casa': 'camara', 'nome': 'Comissões'},
        {'data_inicio': '2018-09-19', 'data_fim': '2018-10-19', 'casa': 'camara', 'nome': 'Plenário'}
    ]
    const wrapper = shallowMount(FasesBar, {
        propsData: { fases }
    })

    fases.forEach(fase => {
      expect(wrapper.text()).to.include(fase.nome)
    })
  })
})
