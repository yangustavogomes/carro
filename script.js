// Busca os elementos da página.
const jogador = document.getElementById("jogador");
const inimigo = document.getElementById("inimigo");
const placar = document.getElementById("pontos");
const textoNivel = document.getElementById("nivel");
const textoCarros = document.getElementById("carros");
const mensagem = document.getElementById("mensagem");


// Faixas: 0 = esquerda, 1 = meio, 2 = direita.
let faixaJogador = 1;
let faixaInimigo = 0;


// Situação inicial do jogo.
let posicaoInimigo = -70;
let pontos = 9999;
let carrosDesviados = 0;
let nivel = 10;
let velocidade = 12;
let terminou = false;


// Move o jogador uma faixa.
function mover(direcao) {
  if (terminou) {
    return;
  }


  faixaJogador = faixaJogador + direcao;


  // Impede que o jogador saia da pista.
  if (faixaJogador < 0) {
    faixaJogador = 0;
  }


  if (faixaJogador > 2) {
    faixaJogador = 2;
  }


  jogador.style.left = (faixaJogador * 100 + 30) + "px";
}


// Controles pelo teclado.
document.addEventListener("keydown", function(evento) {
  if (evento.key === "ArrowLeft") {
    evento.preventDefault();
    mover(-1);
  }


  if (evento.key === "ArrowRight") {
    evento.preventDefault();
    mover(1);
  }
});


// Atualiza o jogo a cada 20 milissegundos.
const intervalo = setInterval(function() {
  // Move o carro inimigo para baixo.
  const posicaoAnterior = posicaoInimigo;
  posicaoInimigo = posicaoInimigo + velocidade;


  inimigo.style.top = posicaoInimigo + "px";


  // Verifica se o inimigo cruzou a região do jogador.
  // A posição anterior evita ignorar uma batida em alta velocidade.
  if (
    faixaJogador === faixaInimigo &&
    posicaoAnterior < 380 &&
    posicaoInimigo + 70 > 310
  ) {
    terminou = true;
    clearInterval(intervalo);


    mensagem.textContent = "Você bateu! Clique em Reiniciar.";
    return;
  }


  // A pontuação aumenta com o tempo.
  // Nível 1: 10 pontos por segundo.
  // Nível 2: 20 pontos por segundo, e assim por diante.
  pontos = pontos + nivel * 0.2;
  placar.textContent = Math.floor(pontos);


  // Quando o inimigo sai da pista, conta um carro desviado.
  if (posicaoInimigo > 400) {
    carrosDesviados = carrosDesviados + 1;
    textoCarros.textContent = carrosDesviados;


    // O resto da divisão por 5 é zero em 5, 10, 15...
    if (carrosDesviados % 5 === 0) {
      nivel = nivel + 1;
      velocidade = velocidade + 1;


      textoNivel.textContent = nivel;
    }


    // Reposiciona o inimigo acima da pista.
    posicaoInimigo = -70;


    // Sorteia a próxima faixa: 0, 1 ou 2.
    faixaInimigo = Math.floor(Math.random() * 3);


    inimigo.style.left = (faixaInimigo * 100 + 30) + "px";
    inimigo.style.top = posicaoInimigo + "px";
  }
}, 20);

