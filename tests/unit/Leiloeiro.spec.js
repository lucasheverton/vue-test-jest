import Leiloeiro from '@/views/Leiloeiro';
import { mount } from '@vue/test-utils';
import { getLeilao, getLances } from '@/http';
import flushPromises from 'flush-promises';

jest.mock('@/http')

const leilao = {
  produto: 'Mouse Gamer da Razer.',
  lanceInicial: 300,
  descricao: 'ótimo para jogos e trabalho pesado.'
}

const lances = [
  {
    "id": 1,
    "valor": 1001,
    "data": "2020-06-13T18:04:26.826Z",
    "leilao_id": 1
  },
  {
    "valor": 1005,
    "data": "2020-06-13T18:04:26.826Z",
    "leilao_id": 1,
    "id": 2
  },
  {
    "valor": 1099,
    "data": "2020-06-13T18:19:44.871Z",
    "leilao_id": 1,
    "id": 3
  },
  {
    "valor": 500,
    "data": "2020-07-24T14:40:33.951Z",
    "leilao_id": 4,
    "id": 4
  }
]

describe('Leiloeiro inicia um leilão que não possui lances', () => {
  test('avisa quando não existem lances', async() => {
    //criando os dados simulados da chamada htpp
    getLeilao.mockResolvedValueOnce(leilao)
    getLances.mockResolvedValueOnce([])

    //montando o componente
    const wrapper = mount(Leiloeiro, {
      propsData: {
        id: 1
      }
    })

    // para controlar o retorno das depêndencias do componente
    await flushPromises()

    //procurando o alerta lá dentro dele pela classe
    const alert = wrapper.find('.alert-dark')
    //checando que ele exista e seja verdadeiro.
    expect(alert.exists()).toBe(true)
  })
})

describe('um leiloeiro exibe os lances existentes', () => {
  test('não mostra o aviso de "sem lances"', async() => {
    //criando os dados simulados da chamada htpp
    getLeilao.mockResolvedValueOnce(leilao)
    getLances.mockResolvedValueOnce(lances)

    //montando o componente
    const wrapper = mount(Leiloeiro, {
      propsData: {
        id: 1
      }
    })

    // para controlar o retorno das depêndencias do componente
    await flushPromises()

    //procurando o alerta lá dentro dele pela classe
    const alert = wrapper.find('.alert-dark')

    //checando que ele exista e seja falso.
    expect(alert.exists()).toBe(false)
  })

  test('Possui uma lista de lances', async() => {
    //criando os dados simulados da chamada htpp
    getLeilao.mockResolvedValueOnce(leilao)
    getLances.mockResolvedValueOnce(lances)

    //montando o componente
    const wrapper = mount(Leiloeiro, {
      propsData: {
        id: 1
      }
    })

    // para controlar o retorno das depêndencias do componente
    await flushPromises()

    //procurando a lista lá dentro dele pela classe
    const lista = wrapper.find('.list-inline')

    //checando que ele exista e seja verdadeiro.
    expect(lista.exists()).toBe(true)
  })
})

describe('um leiloeiro comunica os valores de menor e maior lance', () => {
  test('mostra o maior lance daquele leião', async() => {
     //criando os dados simulados da chamada htpp
     getLeilao.mockResolvedValueOnce(leilao)
     getLances.mockResolvedValueOnce(lances)

     //montando o componente
     const wrapper = mount(Leiloeiro, {
       propsData: {
         id: 1
       }
     })

     // para controlar o retorno das depêndencias do componente
     await flushPromises()

     //procurando o alerta lá dentro dele pela classe
    const maiorLance = wrapper.find('.maior-lance')
    expect(maiorLance.element.textContent).toContain(`Maior lance: R$ ${lances[2].valor}`)
  })

  test('mostra o menor lance daquele leião', async () => {
    //criando os dados simulados da chamada htpp
    getLeilao.mockResolvedValueOnce(leilao)
    getLances.mockResolvedValueOnce(lances)

    //montando o componente
    const wrapper = mount(Leiloeiro, {
      propsData: {
        id: 1
      }
    })

    // para controlar o retorno das depêndencias do componente
    await flushPromises()

    //procurando o alerta lá dentro dele pela classe
    const menorLance = wrapper.find('.menor-lance')
    expect(menorLance.element.textContent).toContain(`Menor lance: R$ ${lances[3].valor}`)
  })
})
