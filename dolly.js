const container = document.getElementById('container');
let phrases = []; // Array para armazenar as frases do arquivo
const positionedElements = []; // Array para armazenar os elementos já posicionados

// Função para carregar frases do arquivo TXT
function loadPhrasesFromFile(file) {
  fetch(file)
    .then(response => response.text())
    .then(text => {
      // Dividir o texto do arquivo em frases separadas por quebra de linha
      phrases = text.trim().split('\n');
      startAddingPhrases();
    })
    .catch(error => console.error('Erro ao carregar o arquivo:', error));
}

// Função para verificar colisão entre dois elementos
function isColliding(newElem, existingElem) {
  const newRect = newElem.getBoundingClientRect();
  const existingRect = existingElem.getBoundingClientRect();

  return !(
    newRect.right < existingRect.left ||
    newRect.left > existingRect.right ||
    newRect.bottom < existingRect.top ||
    newRect.top > existingRect.bottom
  );
}

function addRandomPhrase() {
  const randomIndex = Math.floor(Math.random() * phrases.length);
  let randomPhrase = phrases[randomIndex];

  // Verificar se a frase tem mais de 50 caracteres e truncá-la se necessário
  if (randomPhrase.length > 70) {
    randomPhrase = randomPhrase.substring(0, 70); // Trunca para os primeiros 50 caracteres
  }

  const phraseElement = document.createElement('div');
  phraseElement.classList.add('phrase');
  phraseElement.innerText = randomPhrase;

  // Tentar posicionar a frase em uma posição aleatória sem colisões
  let attempts = 0;
  let positioned = false;

  while (attempts < 100 && !positioned) {
    phraseElement.style.top = `${Math.random() * 70}vh`; // Altura entre 0 e 70% da viewport
    phraseElement.style.left = `${Math.random() * 70}vw`; // Largura entre 0 e 70% da viewport

    let collisionDetected = false;
    for (const elem of positionedElements) {
      if (isColliding(phraseElement, elem)) {
        collisionDetected = true;
        break;
      }
    }

    if (!collisionDetected) {
      positioned = true;
      positionedElements.push(phraseElement);
    } else {
      attempts++;
    }
  }

  if (!positioned) {
    console.warn('Não foi possível posicionar a frase sem colisões após 100 tentativas.');
    return;
  }

  container.appendChild(phraseElement);

  // Remover a frase após o efeito completar
  setTimeout(() => {
    phraseElement.classList.add('fadeOut');
    setTimeout(() => {
      container.removeChild(phraseElement);
      const index = positionedElements.indexOf(phraseElement);
      if (index > -1) {
        positionedElements.splice(index, 1);
      }
    }, 2000); // Tempo para completar o efeito de fade out (1000ms = 1 segundo)
  }, 4000); // Tempo para completar o efeito de fade in (4000ms = 4 segundos)
}

function startAddingPhrases() {
  setInterval(() => {
    addRandomPhrase();
  }, 2000);
}

loadPhrasesFromFile('msg.txt');