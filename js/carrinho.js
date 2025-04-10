// script.js
let carrinho = [];

const botoesAdicionar = document.querySelectorAll('.adicionar-carrinho');
const listaCarrinho = document.getElementById('lista-carrinho');
const totalSpan = document.getElementById('total');
const carrinhoSidebar = document.getElementById('carrinho');
const abrirCarrinho = document.getElementById('abrir-carrinho');
const fecharCarrinho = document.getElementById('fechar-carrinho');

botoesAdicionar.forEach(botao => {
  botao.addEventListener('click', () => {
    const id = botao.dataset.id;
    const nome = botao.dataset.nome;
    const preco = parseFloat(botao.dataset.preco);

    const itemExistente = carrinho.find(item => item.id === id);
    if (itemExistente) {
      itemExistente.quantidade++;
    } else {
      carrinho.push({ id, nome, preco, quantidade: 1 });
    }

    salvarCarrinho();
    atualizarCarrinho();
  });
});

function atualizarCarrinho() {
  listaCarrinho.innerHTML = '';
  let total = 0;

  carrinho.forEach(item => {
    total += item.preco * item.quantidade;
    const li = document.createElement('li');
    li.innerHTML = `
      ${item.nome} x ${item.quantidade} - R$ ${item.preco.toFixed(2)}
      <button onclick="removerItem('${item.id}')">❌</button>
    `;
    listaCarrinho.appendChild(li);
  });

  totalSpan.textContent = total.toFixed(2);
}

function removerItem(id) {
  carrinho = carrinho.filter(item => item.id !== id);
  salvarCarrinho();
  atualizarCarrinho();
}

abrirCarrinho.addEventListener('click', () => {
  carrinhoSidebar.classList.add('aberto');
});

fecharCarrinho.addEventListener('click', () => {
  carrinhoSidebar.classList.remove('aberto');
});

// LocalStorage
function salvarCarrinho() {
  localStorage.setItem('carrinho', JSON.stringify(carrinho));
}

function carregarCarrinho() {
  const salvo = localStorage.getItem('carrinho');
  if (salvo) {
    carrinho = JSON.parse(salvo);
    atualizarCarrinho();
  }
}

carregarCarrinho();


document.querySelectorAll('.adicionar-carrinho').forEach(botao => {
  botao.addEventListener('click', () => {
    const id = botao.getAttribute('data-id');
    const nome = botao.getAttribute('data-nome');
    const preco = parseFloat(botao.getAttribute('data-preco'));

    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

    // Verifica se o produto já está no carrinho
    const existente = carrinho.find(item => item.id === id);
    if (existente) {
      existente.quantidade += 1;
    } else {
      carrinho.push({ id, nome, preco, quantidade: 1 });
    }

    localStorage.setItem('carrinho', JSON.stringify(carrinho));
    alert(`${nome} adicionado ao carrinho!`);
  });
});
