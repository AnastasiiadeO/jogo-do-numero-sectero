
/*//para selecionar um elemento do codigo html
let titulo = document.querySelector('h1');

//para colocar significado dentro de variavel que ligado com HTML
titulo.innerHTML = 'Jogo do numero secreto';

let paragrafo = document.querySelector('p');
paragrafo.innerHTML = 'Escolha um número entre 1 e 10!';  */
let listaNumeros=[];
let numeroLimite=10;
let numeroSecreto=gerarNumeroAleatorio();
let tentetivas=1;

//outro jeito de trabalhar com chamadas de tags html, mais compacto
function ecibirTextoNaTela(tag,texto){
    let campo=document.querySelector(tag);
    campo.innerHTML=texto;
    //para ler texto usando responsivevoice
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2} );
}

function mensagemInicial(){
ecibirTextoNaTela('h1','Jogo do numero secreto');
ecibirTextoNaTela('p','Escolha um número entre 1 e '+numeroLimite+' !');
}

mensagemInicial();

function verificarChute(){
    let chute=document.querySelector('input').value//.value pega valor que usuario colocou no input;
    
    if (chute==numeroSecreto){
        ecibirTextoNaTela('h1','Acertou!!');
        let palavraTentativas= tentetivas>1? 'tentativas': 'tentativa';
        let mensagemTentativas=`Voce descobriu o numero segredo com ${tentetivas} ${palavraTentativas}`;
        ecibirTextoNaTela('p', mensagemTentativas);
        //para ativar botao NovoJogo
        document.getElementById('reiniciar').removeAttribute('disabled');
        //.getElementById pega elemento de html poli id dele
        //.temoveAttribute remove atributo de elemento escolhido
    }else{
        if (chute<numeroSecreto){
            ecibirTextoNaTela('p','o numero secreto e maior');
        }else{
            ecibirTextoNaTela('p','o numero secreto e menor');
        }
        tentetivas++;
        limparCampo();
    }
}

//para limpar espaco de input depois de cada chute
function limparCampo(){
    chute=document.querySelector('input');
    chute.value=' '; //colocamos valor de ' '
}
// vercao de numeros aleatorios onde pode se repetir
/*
function gerarNumeroAleatorio(){
    return parseInt(Math.random()*numeroLimite+1);
}*/

//vercao numero aleatorio onde nao pode se repetir
function gerarNumeroAleatorio(){
    let numeroEscolhido=parseInt(Math.random()*numeroLimite+1);
    let quantidadeDeElementosNaLista=listaNumeros.length;

    //para limpar lista e poder sortiar as numeros de novo
    if (quantidadeDeElementosNaLista==numeroLimite){
        listaNumeros=[];
    }

    if (listaNumeros.includes(numeroEscolhido)){ //.includes olha se tem na lista
        return gerarNumeroAleatorio;
    }else{
        listaNumeros.push(numeroEscolhido);//.push coloca numero na lista
        return numeroEscolhido;
    }
}
//console.log(numeroSecreto);

//para reiniciar o jogo clicando ni batao
function reiniciarJogo(){
    numeroSecreto=gerarNumeroAleatorio();
    limparCampo();
    tentetivas=1;
    mensagemInicial();
    //para desabilitar o botao Novo Jogo de novo
    document.getElementById('reiniciar').setAttribute('disabled',true);
}