document.addEventListener("DOMContentLoaded", function () {
    const carrinhoContainer = document.getElementById("carrinho");
    const totalValor = document.getElementById("total");
    const finalizarBtn = document.getElementById("finalizar");
  
    // Produtos salvos no localStorage
    let produtos = JSON.parse(localStorage.getItem("carrinho")) || [];
  
    function atualizarCarrinho() {
      carrinhoContainer.innerHTML = "";
      let total = 0;
  
      produtos.forEach((produto, index) => {
        const item = document.createElement("div");
        item.className = "item-carrinho";
  
        const nome = document.createElement("span");
        nome.textContent = produto.nome;
  
        const preco = document.createElement("span");
        preco.textContent = `R$ ${produto.preco.toFixed(2)}`;
  
        const remover = document.createElement("button");
        remover.textContent = "Remover";
        remover.onclick = () => {
          produtos.splice(index, 1);
          localStorage.setItem("carrinho", JSON.stringify(produtos));
          atualizarCarrinho();
        };
  
        item.appendChild(nome);
        item.appendChild(preco);
        item.appendChild(remover);
  
        carrinhoContainer.appendChild(item);
  
        total += produto.preco;
      });
  
      totalValor.textContent = total.toFixed(2);
    }
  
    finalizarBtn.addEventListener("click", () => {
      if (produtos.length === 0) {
        alert("Seu carrinho está vazio!");
      } else {
        alert("Pedido finalizado com sucesso!");
        produtos = [];
        localStorage.removeItem("carrinho");
        atualizarCarrinho();
      }
    });
  
    atualizarCarrinho();
  });
  

  document.addEventListener("DOMContentLoaded", () => {
    const botoesCarrinho = document.querySelectorAll(".add-to-cart");
  
    botoesCarrinho.forEach(botao => {
      botao.addEventListener("click", () => {
        const nome = botao.getAttribute("data-nome");
        const preco = parseFloat(botao.getAttribute("data-preco"));
        const tamanho = botao.getAttribute("data-tamanho") || "";
  
        const novoItem = { nome, preco, tamanho };
  
        let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
        carrinho.push(novoItem);
        localStorage.setItem("carrinho", JSON.stringify(carrinho));
  
        alert("Item adicionado ao carrinho!");
      });
    });
  });
  