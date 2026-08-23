const numeroPedido = localStorage.getItem('numeroPedido');
const campNumero = document.getElementById('numero-pedido');

//campNumero.textContent = '#' + numeroPedido;

if (numeroPedido) {
    
    campNumero.textContent = '#' + numeroPedido;

}else {
    
    campNumero.textContent = 'Não encontrado';
}