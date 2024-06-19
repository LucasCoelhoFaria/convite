// Array para armazenar os URLs das imagens
const images = [];
let audio;
// Quantidade total de imagens na pasta "todas"
const totalImages = 111;

// Constrói os URLs das imagens baseado no número total
for (let i = 1; i <= totalImages; i++) {
  images.push(`novas/${i}.jpg`);
}

let currentIndex = 0;
const interval = 200 ; // Tempo em milissegundos entre cada imagem

// Pré-carrega todas as imagens antes de iniciar a exibição
const imageObjects = images.map(imageUrl => {
  const img = new Image();
  img.src = imageUrl;
  return img;
});



function displayNextImage() {
  const imageUrl = images[currentIndex];
  const fullscreenDiv = document.getElementById('fullscreen-image');
  
  // Exibe a imagem apenas se já estiver carregada
  fullscreenDiv.style.backgroundImage = `url(${imageUrl})`;
  
  // Avança para a próxima imagem
  currentIndex = (currentIndex + 1) % images.length;

  if(currentIndex > totalImages){
    currentIndex = 0
  }
  // Chama novamente a função após o intervalo
  setTimeout(displayNextImage, interval);
}

window.onload = function() {
  // Captura o evento de recarregar a página
  window.addEventListener('beforeunload', function(event) {
    redirecionarParaOutroEndpoint();
  });

  audio = document.getElementById('audio');

  // Adiciona um ouvinte para o evento 'ended'
  audio.addEventListener('ended', function() {
    // Redireciona para outra página após o áudio terminar
    window.location.pathname = "convite/fim.html";
  });
};

function redirecionarParaOutroEndpoint() {
  window.location.pathname = "convite/home.html";
}

// Exibe a primeira imagem imediatamente
displayNextImage();


