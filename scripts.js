const firebaseConfig = {
  apiKey: "AIzaSyCp0DnKfWTCfx5zhsia_ejxcxrqdTCCmHM",
  authDomain: "tarjas-prodigio-default-rtdb.firebaseio.com",
  databaseURL: "https://tarjas-prodigio-default-rtdb.firebaseio.com",
  projectId: "tarjas-prodigio",
  storageBucket: "tarjas-prodigio-default-rtdb.appspot.com",
  messagingSenderId: "112600966444249269062",

};

const app = firebase.initializeApp(firebaseConfig);
const database = firebase.database();

const numeroRef = database.ref('Numero');
const chamadasRef = database.ref('Chamadas'); 

let valorAtual = null;
let intervalo = null;
let chamadas = []; 

function atualizarContador(valor) {
  document.getElementById('valorContador').innerText = valor;
  const percentual = (valor - 1) / (200 - 1); 
  document.getElementById('barraProgresso').style.width = percentual * 100 + '%'; 
}


function atualizarChamada() {
  if (chamadas.length > 0) {
    const indiceAleatorio = Math.floor(Math.random() * chamadas.length);
    const chamadaSelecionada = chamadas[indiceAleatorio];
    document.getElementById('chamadaTitulo').innerText = chamadaSelecionada;
  }
}


numeroRef.on('value', function(snapshot) {
  const novoValor = snapshot.val();
  if (valorAtual === null) {
    valorAtual = novoValor;
    atualizarContador(valorAtual);
  } else {
    if (intervalo) clearInterval(intervalo);
    intervalo = setInterval(() => {
      if (valorAtual < novoValor) {
        valorAtual++;
      } else if (valorAtual > novoValor) {
        valorAtual--;
      } else {
        clearInterval(intervalo);
      }
      atualizarContador(valorAtual);
    }, 500);
  }
});


chamadasRef.on('value', function(snapshot) {
  chamadas = snapshot.val();
  atualizarChamada(); 
});



setInterval(atualizarChamada, 10000);
