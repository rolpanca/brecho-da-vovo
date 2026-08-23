//=======================================================
//ELEMENTOS DA PAGINA
//=========================================================
const modal = document.querySelector('.modal');
const botoesDetalhes = document.querySelectorAll('.btn-detalhes');
const botaoFechar = document.querySelector('.fechar');


const listaCarrinho = document.getElementById('lista-carrinho');
const totalCarrinho = document.querySelector('.total');

const botoesComprar = document.querySelectorAll('.btn-comprar');


const pesquisa = document.getElementById('pesquisa');
const produtos = document.querySelectorAll('.produto');






const slides = document.querySelectorAll('.slide');
const contador = document.getElementById('contador-carrinho');

//======================================================================================
//VARIÁVEIS
//======================================================================================
let carrinho = [];
let total = 0;
let index = 0;

//=======================================================================================
//PESQUISA DE produtos
//=======================================================================================
 //  Código de pesquisa
 

pesquisa.addEventListener('keyup', function(){

    const termoPesquisa = pesquisa.value.toLowerCase();   

    produtos.forEach(function(produto){

        const nomeProduto = produto.querySelector('h2').textContent.toLowerCase();


        console.log(nomeProduto, termoPesquisaPesquisa);      

        if (nomeProduto.includes(termoPesquisaPesquisa)) {

            console.log("Mostrar:", nomeProduto);

            produto.style.display = '';
        }else {
            produto.style.display = 'none';
        }        

    });

});

//==============================================================================================
//BOTÕES COMPRAR
//==============================================================================================

botoesComprar.forEach(function(botaoComprar){

    botaoComprar.addEventListener('click', function(event) {

       
        event.preventDefault();     

        if (!verificarLogin()) {
            alert('Você precisa estar logado para adicionar produtos ao carrinho');
            window.location.href = 'login.html';
            return;
        }

        
     

        const produto = botaoComprar.closest('.produto');        
      
        const nome = produto.querySelector('h2').textContent;
       
        const preco = produto.querySelector('.preco').textContent;
        

        const imagem = produto.querySelector('img').src;
      

        const valor = Number(preco.replace('R$', '').replace(',', '.'));
       

        const produtoExistente = carrinho.find(function(item) {
            return item.nome === nome;
        });

              
        if (produtoExistente) {
            produtoExistente.quantidade++;

        } else {
            carrinho.push({
                nome: nome,
                preco: valor,
                quantidade: 1,
                imagem: imagem
            });
        };

      salvarCarrinho();

      atualizarCarrinho();

      console.log('produto adicionado:', nome);
      console.log('Carrinho:', carrinho);

      alert('Produto adicionado ao carrinho');

    });

});

       

//=============================================================================================
//MODAL DOS PRODUTOS
//================================================================================================

botoesDetalhes.forEach(function(botao) {
    botao.addEventListener('click', function() {        
        const produto = botao.closest('.produto');
        const nome = produto.querySelector('h2').textContent;
        const imagem = produto.querySelector('img').src;
        const preco = produto.querySelector('.preco').textContent
        const descricao = produto.querySelector('p:last-of-type').textContent;             

        modal.querySelector('.modal-nome').textContent = nome;
        modal.querySelector('.modal-img').src = imagem;
        modal.querySelector('.modal-preco').textContent = preco;
        modal.querySelector('.modal-descricao').textContent = descricao;

        modal.style.display = 'flex';        

    });
});

botaoFechar.addEventListener('click', function() {
    modal.style.display = 'none';
});

modal.addEventListener('click', function(event){
    if(event.target === modal) {
        modal.style.display = 'none';
    }
});


//==================================================================================================
//BANNER AUTOMÁTICO
//===================================================================================================

function trocarBanner() {
    slides[index].classList.remove('ativo');    

    index++;

    if (index >= slides.length) {
        index = 0;
    }

    slides[index].classList.add('ativo');    
}
setInterval(trocarBanner, 3000);

//==========================================================================================
//FUNÇÕES DO CARRINHO
//=======================================================================================

function atualizarCarrinho() {

      console.log("Entrou em atualizarCarrinho"); 

        total = 0;

        listaCarrinho.innerHTML = '';   

        carrinho.forEach(function(produto){

            total += produto.preco * produto.quantidade;

            console.log("Criando item");

            const itemCarrinho = document.createElement('li');

        itemCarrinho.innerHTML = `
            ${produto.nome} - R$ ${produto.preco.toFixed(2).replace('.', ',')}

            <button class="btn-menos">-</button>

            <strong class="quantidade">x${produto.quantidade}</strong>

            <button class="btn-mais">+</button>        
        `;

        const botaoMais = itemCarrinho.querySelector('.btn-mais');
        const botaoMenos = itemCarrinho.querySelector('.btn-menos');

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

        
        itemCarrinho.appendChild(botaoRemover);

        botaoRemover.addEventListener('click', function(){
            const indice = carrinho.indexOf(produto);            

            carrinho.splice(indice, 1);

            atualizarCarrinho();

            salvarCarrinho();
            
            totalCarrinho.textContent = ' R$ ' + total.toFixed(2).replace('.', ',');
        });
    
        listaCarrinho.appendChild(itemCarrinho);
        });
        totalCarrinho.textContent = 'Total: R$ ' + total.toFixed(2).replace('.', ',');

        atualizarContadorCarrinho();
};

function obterChaveCarrinho() {
    const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));

    if (!usuarioLogado) {
        return 'carrinho';
    }
    return 'carrinho_' + usuarioLogado.email;
}


function salvarCarrinho() {
    const ChaveCarrinho = obterChaveCarrinho();

    localStorage.setItem(ChaveCarrinho, JSON.stringify(carrinho));
};


function carregarCarrinho() {
    const ChaveCarrinho = obterChaveCarrinho();

    const carrinhoSalvo = localStorage.getItem(ChaveCarrinho);

        if (carrinhoSalvo) {
            carrinho = JSON.parse(carrinhoSalvo);
        } else {
            carrinho = [];
        }
        atualizarCarrinho();
};


function atualizarContadorCarrinho() {

    
    let quantidadeTotal = 0;

    carrinho.forEach(function(produto){
        quantidadeTotal += produto.quantidade;
    });

    contador.textContent = quantidadeTotal;
};

carregarCarrinho();


const usuarioArea = document.getElementById('usuario-area');

const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));

if (usuarioLogado) {
    usuarioArea.innerHTML = `
    <span>Olá, ${usuarioLogado.nome}!</span>
    <button id="btn-sair">Sair</button>

    `;

    const btnSair = document.getElementById('btn-sair');

    btnSair.addEventListener('click', function(){
        localStorage.removeItem('usuarioLogado');
        window.location.reload();
    });
}
   

function verificarLogin() {
    const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));

    if (!usuarioLogado) {
        return false;
    }

    return true;
};

if (verificarLogin()) {
    console.log('Usuário esta logado.');
}else {
    console.log('Nenhum usuário esta logado.')
}


