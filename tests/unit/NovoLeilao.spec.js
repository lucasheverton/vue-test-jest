import NovoLeilao from '@/views/NovoLeilao';
import { mount } from '@vue/test-utils';
import { createLeilao } from '@/http';

jest.mock('@/http')

//simluando o router e chamando ele na montagem do mount depois.
const $router = {
  push: jest.fn()
}

describe('Um novo leilão deve ser criado', () => {
  test('dado o formulário preenchido o leilão deve ser criado', () => {
    createLeilao.mockResolvedValueOnce()

    const wrapper = mount(NovoLeilao, {
      mocks: {
        $router
      }
    })

    wrapper.find('.produto').setValue('Uma placa de video.')
    wrapper.find('.descricao').setValue('Uma RTX 3090 TI.')
    wrapper.find('.valor').setValue(6999)

    wrapper.find('form').trigger('submit')

    expect(createLeilao).toHaveBeenCalled()
  })
})
