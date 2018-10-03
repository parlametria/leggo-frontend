/* eslint no-unused-expressions: [2, { allowShortCircuit: true }] */
/* eslint no-unused-expressions: [2, { allowShortCircuit: true, allowTernary: true }] */
/* eslint no-unused-expressions: [2, { allowShortCircuit: true, allowTernary: true }] */
/* eslint no-unused-expressions: [2, { allowTernary: true }] */
/* eslint no-unused-expressions: 2 */
import { expect } from 'chai'
import { mount } from '@vue/test-utils'
import FasesBar from '@/components/FasesBar.vue'

describe('FasesBar', () => {
  let cmp
  const fases = [
    {'data_inicio': '2018-09-16', 'data_fim': '2018-09-17', 'casa': 'senado', 'nome': 'Comissões'},
    {'data_inicio': '2018-09-17', 'data_fim': '2018-09-17', 'casa': 'senado', 'nome': 'Plenário'},
    {'data_inicio': '2018-09-17', 'data_fim': '2018-09-19', 'casa': 'camara', 'nome': 'Comissões'},
    {'data_inicio': '2018-09-19', 'data_fim': '2018-10-19', 'casa': 'camara', 'nome': 'Plenário'}
  ]

  beforeEach(() => {
    cmp = mount(FasesBar, {
      propsData: { fases }
    })
  })

  it('renders fasesbar when all fields are passed', () => {
    return expect(cmp.contains('.fase')).to.be.true &&
    expect(cmp.findAll('.fase')).to.have.lengthOf(fases.length)
  })
})
