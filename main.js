async function buscaEndereco(cep){
    var mensagemErro = document.getElementById('erro')
    mensagemErro.innerHTML = "" 
    
    try{
    
    var consultaCep = await (await fetch(`https://viacep.com.br/ws/${cep}/json/`)).json()
    if (consultaCep.erro){
        throw Error ('CEP INEXISTENTE')
    }
    var cidade = document.getElementById('cidade')
    var logradouro = document.getElementById('endereco')
    var estado = document.getElementById('estado')
    var bairro = document.getElementById('bairro')

    cidade.value = consultaCep.localidade
    logradouro.value = consultaCep.logradouro
    estado.value = consultaCep.uf
    bairro.value = consultaCep.bairro

    console.log(consultaCep)
    
    return consultaCep
} catch (erro){
    mensagemErro.innerHTML = `<p>CEP Invalido. Tente novamente!</p>`
    console.log(erro)
}
}

let ceps = ['01001000', '55940000', '55825000']
let conjuntoCeps = ceps.map(valores => buscaEndereco(valores))
Promise.all(conjuntoCeps).then(pitoca => console.log(pitoca))

var cep = document.getElementById('cep')

cep.addEventListener('focusout', () => buscaEndereco(cep.value))


