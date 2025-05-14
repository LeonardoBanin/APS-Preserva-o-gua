// Alterna o menu correspondente ao botão clicado
document.querySelectorAll('.menuButton').forEach(button => {
  // Para cada botão com a classe "menuButton", adiciona um ouvinte de clique
  button.addEventListener('click', () => {
    const menu = button.nextElementSibling; // Pega o próximo elemento (menu dropdown)

    // Se o menu estiver escondido ou sem estilo definido, exibe-o
    if (menu.style.display === 'none' || menu.style.display === '') {
      menu.style.display = 'block';
    } else {
      // Caso contrário, esconde o menu
      menu.style.display = 'none';
    }
  });
});


// Evento de clique no botão de busca
document.getElementById("btnBuscar").addEventListener("click", function () {
  // Captura o valor do campo de pesquisa e converte para minúsculas
  const texto = document.getElementById("campoPesquisa").value.toLowerCase();

  // Lista de palavras-chave e as URLs correspondentes para redirecionamento
  const rotas = [
    { palavras: ["importância", "vida"], url: "importancia-da-agua.html" },
    { palavras: ["escassez", "falta", "seca"], url: "escassez-de-agua.html" },
    { palavras: ["poluição", "poluicao"], url: "poluicao-da-agua.html" },
    { palavras: ["educação ", "ambiental"], url: "educacao-ambiental.html" },
    { palavras: ["solução", "preservação", "tecnlogia"], url: "tecnologias-solucoes-preservacao.html" },
    { palavras: ["sustentável", "sustentáveis", "dia dia"], url: "acoes-sustentaveis.html" },
    { palavras: ["legislação", "política", "leis"], url: "legislacao-agua.html" },
    { palavras: ["futuro"], url: "futuro-agua.html" },
    { palavras: ["agricultura", "campo"], url: "agua-agricultura.html" },
    { palavras: ["recursos", "gestão"], url: "recursos-hidricos.html" },
    { palavras: ["cidade", "urbanos"], url: "agua-cidade.html" },
    { palavras: ["subterrânea", "aquíferos"], url: "agua-subterranea.html" },
    { palavras: ["consumo", "consciente"], url: "consumo-consciente.html" },
    { palavras: ["sucesso", "casos"], url: "casos-sucesso.html" },
  ];

  let encontrou = false; // Flag para saber se encontrou correspondência

  // Percorre todas as rotas e palavras-chave
  for (let rota of rotas) {
    for (let palavra of rota.palavras) {
      if (texto.includes(palavra)) {
        window.location.href = rota.url; // Redireciona para a URL correspondente
        encontrou = true;
        break; // Sai do loop interno
      }
    }
    if (encontrou) break; // Sai do loop externo se já encontrou
  }

  // Se nenhuma palavra-chave foi encontrada, exibe alerta
  if (!encontrou) {
    alert("Nenhuma página encontrada para sua pesquisa.");
  }
});

// Obtendo o elemento canvas do HTML e seu contexto 2D para desenho
const canvas = document.getElementById("fundoAnimado");
const ctx = canvas.getContext("2d");

// Ajustando o tamanho do canvas para ocupar toda a tela
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Criando um array para armazenar as partículas
let particlesArray = [];

// Definindo algumas cores suaves e transparentes para as partículas
const colors = ["#ffffff20", "#5dade430", "#add8e640"];

// Definindo a classe Partícula que será usada para criar cada partícula
class Particle {
  constructor() {
    // Inicializando as propriedades de cada partícula de forma aleatória
    this.x = Math.random() * canvas.width; // Posição aleatória no eixo X
    this.y = Math.random() * canvas.height; // Posição aleatória no eixo Y
    this.size = Math.random() * 3 + 1; // Tamanho aleatório da partícula
    this.speedX = Math.random() * 0.6 - 0.3; // Velocidade aleatória no eixo X
    this.speedY = Math.random() * 0.6 - 0.3; // Velocidade aleatória no eixo Y
    this.color = colors[Math.floor(Math.random() * colors.length)]; // Cor aleatória para a partícula
  }

  // Atualizando a posição da partícula com base na sua velocidade
  update() {
    this.x += this.speedX;
    this.y += this.speedY;

    // Fazendo a partícula voltar para o outro lado caso ultrapasse a tela
    if (this.x > canvas.width || this.x < 0) this.speedX *= -1;
    if (this.y > canvas.height || this.y < 0) this.speedY *= -1;
  }

  // Desenhando a partícula na tela
  draw() {
    ctx.beginPath();
    ctx.fillStyle = this.color; // Definindo a cor da partícula
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2); // Desenhando um círculo
    ctx.fill(); // Preenchendo o círculo com a cor
  }
}

// Função para inicializar as partículas
function initParticles() {
  particlesArray = []; // Resetando o array de partículas
  for (let i = 0; i < 100; i++) {
    // Criando 100 partículas e adicionando no array
    particlesArray.push(new Particle());
  }
}

// Função de animação que será chamada repetidamente para atualizar o fundo
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height); // Limpando o canvas antes de desenhar a próxima animação

  // Desenhando uma onda no fundo
  ctx.beginPath();
  ctx.moveTo(0, canvas.height * 0.8); // Começando a linha na parte inferior da tela
  for (let x = 0; x <= canvas.width; x++) {
    // Calculando a posição Y da onda com uma função seno, criando um efeito de movimento
    let y =
      canvas.height * 0.8 + // Definindo a base da onda
      20 * Math.sin((x + Date.now() * 0.002) * 0.01); // Função seno animada no eixo X
    ctx.lineTo(x, y); // Conectando cada ponto da linha
  }
  ctx.strokeStyle = "#5dade4"; // Cor da onda
  ctx.lineWidth = 2; // Largura da linha
  ctx.stroke(); // Desenhando a linha no canvas

  // Atualizando e desenhando cada partícula na tela
  for (let i = 0; i < particlesArray.length; i++) {
    particlesArray[i].update(); // Atualizando a posição de cada partícula
    particlesArray[i].draw(); // Desenhando a partícula
  }

  // Chamando a função de animação repetidamente (cria o loop de animação)
  requestAnimationFrame(animate);
}

// Ajustando o tamanho do canvas e reinicializando as partículas quando a janela é redimensionada
window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  initParticles();
});

// Inicializando as partículas e iniciando a animação
initParticles();
animate();

