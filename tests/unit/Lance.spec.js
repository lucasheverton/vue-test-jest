import Lance from '@/components/Lance'
const { mount } = require("@vue/test-utils")

//valores inválidos
test('não aceita lance com valor menor do que zero', () => {
  //Montando o Componente
  const wrapper = mount(Lance)
  //Localizando o Input dentro do Componente
  const input = wrapper.find('input')
  //Definindo um valor inválido
  input.setValue(-100)
  // Ouvindo pelo $emit o "novo-lance"
  const lancesEmitidos = wrapper.emitted('novo-lance')
  //Ativando a submissão do form
  wrapper.trigger('submit')
  //Esperamos que os lances definidos sejam undefined
  expect(lancesEmitidos).toBeUndefined()
})

//valores válidos
test('emite um lance quando o valor é maior do que zero', () => {
  //Montando o Componente
  const wrapper = mount(Lance)
  //Localizando o Input dentro do Componente
  const input = wrapper.find('input')
  //Definindo um valor Válido
  input.setValue(100)
  //Ativando a submissão do form
  wrapper.trigger('submit')
  // Ouvindo pelo $emit o "novo-lance"
  const lancesEmitidos = wrapper.emitted('novo-lance')
  //Esperamos que os lances definidos existam
  expect(lancesEmitidos).toHaveLength(1)
})

//emite o valor esperado
test('emite o valor esperado de um lance válido', () => {
  const wrapper = mount(Lance)
  const input = wrapper.find('input')
  input.setValue(100)
  wrapper.trigger('submit')
  const lancesEmitidos = wrapper.emitted('novo-lance')
  const lance = parseInt(lancesEmitidos[0][0])
  expect(lance).toBe(100)
})

describe('um lance com valor minimo', () => {
  test('todos os lancem devem possuir um valor maior do que o minimo informado', () => {
    const wrapper = mount(Lance , {
      propsData: {
        lanceMinimo: 300
      }
    })
    const input = wrapper.find('input')
    input.setValue(400)
    wrapper.trigger('submit')
    const lancesEmitidos = wrapper.emitted('novo-lance')
    expect(lancesEmitidos).toHaveLength(1)
  })

  test('emite um valor esperado de um lance valido', () => {
    const wrapper = mount(Lance , {
      propsData: {
        lanceMinimo: 300
      }
    })
    const input = wrapper.find('input')
    input.setValue(430)
    wrapper.trigger('submit')
    const lancesEmitidos = wrapper.emitted('novo-lance')
    const valorDoLance = parseInt(lancesEmitidos[0])
    expect(valorDoLance).toBe(430)
  })

  test('não são aceitos lances com valores menores do que o minimo informado', async() => {
    const wrapper = mount(Lance , {
      propsData: {
        lanceMinimo: 300
      }
    })
    const input = wrapper.find('input')
    input.setValue(30)
    wrapper.trigger('submit')
    // temos que colocar o async/await para que ele retorne uma promisse resolvida
    // nextTick para aguardar o dom ser atualizado/renderizado
    await wrapper.vm.$nextTick()
    const msgErr = wrapper.find('p.alert').element
    expect(msgErr).toBeTruthy()
  })

  test('é exibida a mensagem de erro que tem na view', async() => {
    const wrapper = mount(Lance , {
      propsData: {
        lanceMinimo: 300
      }
    })
    const input = wrapper.find('input')
    input.setValue(30)
    wrapper.trigger('submit')
    // temos que colocar o async/await porque o método nextTick é assíncrono
    // precisamos aguardar a execução do método utilizando o await
    // O nextTrick é usado porque precisamos que o DOM seja atualizado/renderizado
    await wrapper.vm.$nextTick()
    //textContent para ver ser o texto tem no elemento
    const msgErr = wrapper.find('p.alert').element.textContent
    const msgEsperada = ' O valor mínimo para o lance é de R$ 300'
    expect(msgErr).toContain(msgEsperada)
  })
})
