console.log('carrinho.js carregado');


const listaCarrinho = document.getElementById('lista-carrinho-pagina');
const totalCarrinho = document.getElementById('total-carrinho-pagina');

let carrinho = [];
let total = 0;

function obterChaveCarrinho() {
    const usuarioLogado = JSON.parse(
        localStorage.getItem('usuarioLogado')
    );

    if(!usuarioLogado) {
        return 'carrinho';
    }
    return 'carrinho_' + usuarioLogado.email;
};


function salvarCarrinho() {
    const ChaveCarrinho = obterChaveCarrinho();

    localStorage.setItem(ChaveCarrinho,JSON.stringify(carrinho)
);

console.log('Carrinho salvo:', ChaveCarrinho);

}

function carregarCarrinho () {
    const ChaveCarrinho = obterChaveCarrinho();
    const carrinhoSalvo = localStorage.getItem(ChaveCarrinho);

    console.log('Dados encontrados:', carrinhoSalvo);

    if (carrinhoSalvo) {
        carrinho = JSON.parse(carrinhoSalvo);
    }else {
        carrinho = [];
    }
}


//const carrinhoSalvo = localStorage.getItem(ChaveCarrinho);
      

    function atualizarCarrinho() {
        total = 0;

        let quantidadeTotal = 0;

        listaCarrinho.innerHTML = '';


          if (carrinho.length === 0) {

            listaCarrinho.innerHTML = `
                <div class="carrinho-vazio">
                    <h2>🛒 Seu carrinho está vazio</h2>
                    <p>Adicione alguns produtos para continuar.</p>

                    <a  href="index.html" class="btn-voltar">
                        Continuar Comprando

                    </a>

                </div>
            `;

            totalCarrinho.textContent = 'R$ 0,00';

            const subtotal = document.getElementById('subtotal-carrinho');

            if(subtotal) {
                subtotal.textContent = 'R$ 0,00';
            }
            return
        };






        carrinho.forEach(function(produto) {

            total += produto.preco * produto.quantidade;
            quantidadeTotal += produto.quantidade;

            const item = document.createElement('div');

            item.classList.add('item-carrinho');


            item.innerHTML = `
                <img src="${produto.imagem}" alt="${produto.nome}" class="img-carrinho">

                <div class="info-carrinho">

                    <h3>${produto.nome}</h3>

                    <p class="preco-unitario">
                        Preço: R$ ${produto.preco.toFixed(2).replace('.', ',')}
                    </p>

                    <div class="controle-quantidade">
                        <button class="btn-menos">-</button>

                        <span>${produto.quantidade}</span>

                        <button class="btn-mais">+</button>
                    </div>

                    <p class="subtotal">
                        Subtotal: R$ ${(produto.preco * produto.quantidade).toFixed(2).replace('.', ',')}
                    </p>
                     
                  
                </div>     
            `;          


            const botaoMais = item.querySelector('.btn-mais');
            const botaoMenos = item.querySelector('.btn-menos');

            botaoMais.addEventListener('click', function() {
                produto.quantidade++;

                salvarCarrinho();

                atualizarCarrinho();

            });
            
            botaoMenos.addEventListener('click', function() {

                if (produto.quantidade > 1) {
                    produto.quantidade--;
                }else {
                    const indice = carrinho.indexOf(produto);
                    carrinho.splice(indice, 1);
                }

                salvarCarrinho();
                atualizarCarrinho();
            });

            const botaoRemover = document.createElement('button');

            botaoRemover.textContent = 'Remover';

            botaoRemover.classList.add('btn-remover');


            const areaBotoes = document.createElement('div');
            areaBotoes.classList.add('acoes-carrinho');
            areaBotoes.appendChild(botaoRemover);
            item.appendChild(areaBotoes);


            botaoRemover.addEventListener('click', function(){
                const indice = carrinho.indexOf(produto);
                carrinho.splice(indice, 1);

                salvarCarrinho();
                atualizarCarrinho();

            });


            listaCarrinho.appendChild(item);
        });

       



        const subtotalCarrinho = document.getElementById('subtotal-carrinho');
        subtotalCarrinho.textContent = 'R$ ' + total.toFixed(2).replace('.', ',');

        const quantidadeItens = document.getElementById('quantidade-itens');
        quantidadeItens.textContent = quantidadeTotal;

        totalCarrinho.textContent = ' R$ ' + total.toFixed(2).replace('.', ',');

    };
    carregarCarrinho();
    atualizarCarrinho();
