const listaCheckout = document.getElementById('lista-checkout');
const totalCheckout = document.getElementById('total-checkout');
const btnFinalizar = document.getElementById('btn-finalizar');
const formulario = document.getElementById('form-checkout');

const pagamento = document.querySelectorAll('input[name="pagamento"]');






console.log(pagamento);
console.log(pagamento.length);


const nome = document.getElementById('nome');
const email = document.getElementById('email');
const telefone = document.getElementById('telefone');

const usuarioLogado = JSON.parse(localStorage.getItem(

    'usuarioLogado')
);

if (usuarioLogado) {
    nome.value = usuarioLogado.nome;
    email.value = usuarioLogado.email;
}

telefone.addEventListener('input', function(){
    let valor = telefone.value;
    valor = valor.replace(/\D/g, '');
    valor = valor.substring(0, 11);

    if (valor.length > 2) {
        valor = '(' + valor.substring(0, 2) + ') ' + valor.substring(2);
    }

    if (valor.length > 10) {
        valor = valor.substring(0, 10) + '-' + valor.substring(10);
    }

    telefone.value = valor;
});


const cep = document.getElementById('cep');

    cep.addEventListener('input', function(){
        let valor = cep.value;
        valor = valor.replace(/\D/g, '');   
        valor = valor.substring(0, 8);  
        
        if (valor.length > 5) {
            valor = valor.substring(0, 5) + '-' + valor.substring(5);
        }

        cep.value = valor;        
    });

    cep.addEventListener('blur', function(){
        let cepDigitado = cep.value.replace(/\D/g, '');

        if (cepDigitado.length !== 8) {
            return;
        }

        fetch(`https://viacep.com.br/ws/${cepDigitado}/json/`)
            .then(function(resposta) {
                return resposta.json();
            })
            .then(function(dados){
                rua.value = dados.logradouro;
                bairro.value = dados.bairro;
                cidade.value = dados.localidade;
                estado.value = dados.uf;
            });
    });


const rua = document.getElementById('rua');
const numero = document.getElementById('numero');
const bairro = document.getElementById('bairro')
const cidade = document.getElementById('cidade');
const estado = document.getElementById('estado');

let carrinho = [];

function atualizarCheckout(){

    listaCheckout.innerHTML = '';

    let total = 0;

    carrinho.forEach(function(produto){

        total += produto.preco * produto.quantidade;

        const item = document.createElement('div');

        item.classList.add('item-checkout');

        item.innerHTML = `
            <img src="${produto.imagem}" alt="${produto.nome}">

            <div class="info-checkout">
                <h3>${produto.nome}</h3>
                <p>Quantidade: ${produto.quantidade}</p>
            </div>

            <span>
                R$ ${(produto.preco * produto.quantidade).toFixed(2).replace('.', ',')}
            </span>    
        `;
        listaCheckout.appendChild(item);
    });

    totalCheckout.textContent = 'Total: R$ ' + total.toFixed(2).replace('.', ',');
};

function obterChaveCarrrinho() {
    const usuarioLogado = JSON.parse(
        localStorage.getItem('usuarioLogado')
    );
    if (!usuarioLogado) {
        return 'carrinho';
    }

    return 'carrinho_' + usuarioLogado.email;
}

const chaveCarrinho = obterChaveCarrrinho();
const carrinhoSalvo = localStorage.getItem(chaveCarrinho);

if (carrinhoSalvo) {

    carrinho = JSON.parse(carrinhoSalvo);

}else {
    carrinho = [];
}

atualizarCheckout();



    btnFinalizar.addEventListener('click', function() {
        
        if (
            nome.value === '' ||
            email.value === '' ||
            telefone.value === '' ||
            cep.value === '' ||
            rua.value === '' ||
            numero.value === '' ||
            bairro.value === '' ||
            cidade.value === '' ||
            estado.value === '' 
        ) {
            alert('Preencha todos os campos obrigatóros!');
            return;
        }

        let pagamentoSelecionado = false;

        pagamento.forEach(function(opcao) {
            if (opcao.checked) {
                pagamentoSelecionado = true;
            }
        });

        if (!pagamentoSelecionado) {
            alert('Selecione uma forma de pagamento!');

            return;
        }



let totalPedido = 0;

carrinho.forEach(function(produto) {
    totalPedido += produto.preco * produto.quantidade;
});


let formaPagamento = '';

pagamento.forEach(function(opcao){
    if (opcao.checked) {

        formaPagamento = opcao.value;
    }
});



const numeroPedido = Math.floor(Math.random() * 900000 + 100000);

const pedido = {

    numero:numeroPedido,

    cliente: {
        nome: nome.value,
        email: email.value,
        telefone: telefone.value
    },

    endereco: {
        cep: cep.value,
        rua: rua.value,
        numero: numero.value,
        bairro: bairro.value,
        cidade: cidade.value,
        estado: estado.value
    },

    produto: carrinho,
    total: totalPedido,
    pagamento: formaPagamento
};

const usuarioLogado = JSON.parse(
  localStorage.getItem('usuarioLogado')  
);

const chavePedidos = 'pedidos_' + usuarioLogado.email;

let pedidos = JSON.parse(
    localStorage.getItem(chavePedidos)

) || [];

pedidos.push(pedido);

localStorage.setItem(
    chavePedidos,
    JSON.stringify(pedidos)
);

localStorage.setItem(
    'pedidoAtual',
    JSON.stringify(pedido)
)



localStorage.setItem('pedidoAtual', JSON.stringify(pedido));




// localStorage.setItem('totalPedido', totalPedido);
// localStorage.setItem('formaPagamento', formaPagamento);




btnFinalizar.disabled = true;
btnFinalizar.textContent = 'Processando...';

      

        const chaveCarrinho = obterChaveCarrrinho();

        localStorage.removeItem(chaveCarrinho);

        carrinho = [];

       // const numeroPedido = Math.floor(Math.random() * 900000 + 100000);

       // localStorage.setItem('numeroPedido', numeroPedido);

        setTimeout(function() {
            window.location.href = 'confirmacao.html';
        }, 2000);
        
    });