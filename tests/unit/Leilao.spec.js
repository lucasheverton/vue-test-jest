import Leilao from '@/components/Leilao';
import { mount } from '@vue/test-utils';

const leilao = {
  produto: 'Um notebook gamer da marca dell.',
  lanceInicial: '7500',
  descricao: 'Uma performance muito boa.'
}

describe('um leilão exibe os dados do produto', () => {
  test('exibe os dados do leilão no card', () => {
    const wrapper = mount(Leilao, {
      propsData: {
        leilao
      }
    })

    //validando as propriedades
    const header = wrapper.find('.card-header').element
    const title = wrapper.find('.card-title').element
    const text = wrapper.find('.card-text').element

    //que o conteúdo do header contenha o que está na view
    expect(header.textContent).toContain(`Estamos leiloando um(a): ${leilao.produto}`)
    expect(title.textContent).toContain(`Lance inicial: R$ ${leilao.lanceInicial}`)
    expect(text.textContent).toContain(leilao.descricao)
  })
})
