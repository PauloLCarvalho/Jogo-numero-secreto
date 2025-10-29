// 1 recebendo dados do index.html
// let titulo = document.querySelector('h1')
// titulo.innerHTML = 'jogo do número secreto';
let listaNumerosSorteados = [];
let numeroLimite = 50;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

let numerosSorteados = []

// 2 recebendo dados do index.html com boas práticas (reduzindo o código)
function exibirTextoNaTela(tag, texto){
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female',{rate: 1.2});

}
function exibirMensInicial(){ 
    exibirTextoNaTela('h1','jogo do número secreto');
    exibirTextoNaTela('p','Escolha um número entre 1 e 51');
}
exibirMensInicial();


//criando uma função que está alocada no index.html
function verificarChute(){
    console.log(tentativas);
    let chute = document.querySelector('input').value; //pega o valor que o jogador colocou no campo
    console.log(chute == numeroSecreto); // faz a comparação entre a entrada e o numero secreto
    if(chute == numeroSecreto){
        let palavraTentativas = tentativas > 1 ? 'tentativas' : 'tentativa'
        exibirTextoNaTela ('h1','Acertou!');
        let mensagemTentativas = `Parabéns, você descobriu o número secreto com ${ tentativas} ${ palavraTentativas}!`;
        exibirTextoNaTela('p', mensagemTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled');
    }else{
        if(chute < numeroSecreto){
            exibirTextoNaTela('p','O número secreto é maior.');
        }else{
            exibirTextoNaTela('p','O número secreto é menor');
        }
        tentativas ++;
        limparCampo();
    }

}

// função retornando um parâmetro.
function gerarNumeroAleatorio(){
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
    let quantidadeDeElementosNaLista = listaNumerosSorteados.length;

    if(quantidadeDeElementosNaLista == numeroLimite){
        listaNumerosSorteados = [];
    }

    if(listaNumerosSorteados.includes(numeroEscolhido)){
        return gerarNumeroAleatorio()
    }else{
        listaNumerosSorteados.push(numeroEscolhido);// adiciona parametro ao final da lista
        console.log(listaNumerosSorteados);
        return numeroEscolhido;
    }
}

function limparCampo(){
    chute = document.querySelector('input');
    chute.value = '';
}
function reiniciarJogo(){
    numeroSecreto = gerarNumeroAleatorio(); // gera um novo numero a cada reinicio
    limparCampo(); // limpa o input a cada tentativa 
    tentativas = 1;
    exibirMensInicial(); // restaura as mensagens iniciais
    document.getElementById('reiniciar').setAttribute('disabled',true); //desativa o botão apos reiniciar

}
