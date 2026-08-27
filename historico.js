const listaPedidos = document.getElementById('lista-pedidos');

const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));

if (!usuarioLogado) {
    listaPedidos.innerHTML = '<p>Nenhum usuário está logado.</p>';

} else {
    const chavePedidos = 'pedidos_' + usuarioLogado.email;

    const pedidosSalvos = localStorage.getItem(chavePedidos);

    if (!pedidosSalvos) {
        listaPedidos.innerHTML = '<p>Você ainda não fez nenhum pedido.</p>';

    } else {
        const pedidos = JSON.parse(pedidosSalvos);

        pedidos.forEach(function(pedido){

            const itemPedido = document.createElement('div');

            itemPedido.classList.add('pedido-historico');

            const totalFormatado = Number(pedido.total)
                .toFixed(2)
                .replace('.', ',');

             itemPedido.innerHTML = `

             <h3>Pedido #${pedido.numero}</h3>
             
            <p>
                Total: R$ ${totalFormatado}
            </p>   
            
            <p>
                pagamento: ${pedido-pagamento}
            </p>    

            `;
            
            listaPedidos.appendChild(itemPedido);

        });
            
    }
}