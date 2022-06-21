// Declarando variáveis globais

let largura_tela = window.innerWidth;
let altura_tela = window.innerHeight;
let vida = 3;
let cronometro = document.querySelector('#cronometro');
let tempo = 25;
let nivel = location.search;

// Ajustando o tamanho da tela de jogo
function ajustarTamanhoTela() {
    largura_tela = window.innerWidth;
    altura_tela = window.innerHeight;
};

// Criando posições randômicas
function gerarPosicaoRandomica() {
    let posicaoX = Math.floor(Math.random() * largura_tela) - 90;
    let posicaoY = Math.floor(Math.random() * altura_tela) - 90;
    posicaoX = posicaoX < 0 ? 0 : posicaoX;
    posicaoY = posicaoY < 0 ? 0 : posicaoY;

// Excluindo elemento mosquito
    if (document.querySelector('#mosquito')) {
        document.querySelector('#mosquito').remove();
        
        // fim de jogo
        if (vida == 0) {
            location.href = '../page_derrota/derrota.html';
            return clearInterval(gerar_mosquito);
        } else {
            // Removendo vida
            let imgvida = document.querySelector(`#vida${vida}`);
            imgvida.src = '../../imagens/coracao_vazio.png';
            vida--;
        };
    };

// Criando elemento mosquito
    let mosquito = document.createElement('img');
    document.body.appendChild(mosquito);
    mosquito.src = '../../imagens/mosca.png';
    mosquito.className = `${gerarTamanhoRandomico()} ${gerarLadoMosquito()}`;
    mosquito.id = 'mosquito';
    mosquito.onclick = () => mosquito.remove(); // removendo mosquito ao clicar
    mosquito.style.position = 'absolute';
    mosquito.style.left = `${posicaoX}px`;
    mosquito.style.top = `${posicaoY}px`;
};

// Criando tamnhos randômicos
function gerarTamanhoRandomico() {
    let classe = Math.floor(Math.random() * 3);
    switch (classe) {
        case 0:
            return 'mosquito1';
        case 1:
            return 'mosquito2';
        case 2:
            return 'mosquito3';
    };
};
// Invertendo mosquito
function gerarLadoMosquito() {
    let lado = Math.floor(Math.random() * 2);
    switch (lado) {
        case 0:
            return 'lado1';
        case 1:
            return 'lado2';
    };
};
// Criando cronômetro
cronometro.innerHTML = tempo;
let criarCronometro = setInterval(function() {
    if (tempo > 0) {
        tempo--;
        cronometro.innerHTML = tempo;

    } else {
        clearInterval(criarCronometro);
        clearInterval(gerar_mosquito);
        location.href = '../page_vitoria/vitoria.html';
    };
}, 1000);

// Selecionando nível
    switch (nivel) {
        case '?1':
            nivel = 1500;
            break;
        case '?2':
            nivel = 1000;
            break;
        case '?3':
            nivel = 750;
            break;
    };

let gerar_mosquito = setInterval(gerarPosicaoRandomica, nivel);

// Fim