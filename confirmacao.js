const pedidoSalvo = localStorage.getItem('pedidoAtual');
const campNumero = document.getElementById('numero-pedido');
const campTotal = document.getElementById('total-pedido');
const campPagamento = document.getElementById('forma-pagamento');


if (pedidoSalvo) {
    const pedido = JSON.parse(pedidoSalvo);
    
    campNumero.textContent = '#' + pedido.numero;

    const totalFormatado = Number(pedido.total)
        .toFixed(2)
        .replace('.', ',');

        campTotal.textContent = 'R$' + totalFormatado;
        campPagamento.textContent = pedido.pagamento;

}else {
    
    campNumero.textContent = 'Não encontrado';
    campTotal.textContent = 'Não encontrado';
    campPagamento.textContent = 'Não encontrado';
}

