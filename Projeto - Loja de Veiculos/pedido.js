document.addEventListener('DOMContentLoaded', () => {
    generatePedidoNumber();
    setupMontadoraChange();
    loadTable('pedido'); // Carregar a tabela de pedidos ao iniciar
});

// Função para gerar número do pedido automaticamente
function generatePedidoNumber() {
    const pedidos = JSON.parse(localStorage.getItem('pedidos')) || [];
    const ultimoNumero = pedidos.length > 0 ? pedidos[pedidos.length - 1].numero : 0;
    const novoNumero = ultimoNumero + 1;
    document.getElementById('numero').value = novoNumero;
}

// Função para configurar o evento de mudança de montadora
function setupMontadoraChange() {
    const montadoraSelect = document.getElementById('montadora');
    const veiculoSelect = document.getElementById('veiculo');

    montadoraSelect.addEventListener('change', () => {
        const selectedMontadora = montadoraSelect.value;

        // Ocultar todos os modelos inicialmente
        Array.from(veiculoSelect.options).forEach(option => {
            option.style.display = 'none';
        });

        // Mostrar apenas os modelos correspondentes à montadora selecionada
        Array.from(veiculoSelect.options).forEach(option => {
            if (option.classList.contains(selectedMontadora)) {
                option.style.display = 'block';
            }
        });

        // Resetar o campo de veículos
        veiculoSelect.value = '';
    });
}

// Validação para aceitar apenas caracteres numéricos na quantidade
document.getElementById('quantidade').addEventListener('input', (event) => {
    event.target.value = event.target.value.replace(/[^0-9]/g, '');
});

// Função para salvar o pedido e exibir uma mensagem de sucesso
function saveItem() {
    const form = document.getElementById('pedido-form-content');
    
    if (!form) {
        console.error('Formulário não encontrado');
        return;
    }

    const pedido = {
        numero: form.numero.value,
        data: form.data.value,
        montadora: form.montadora.value,
        veiculo: form.veiculo.value,
        quantidade: form.quantidade.value
    };

    // Adicionar pedido ao localStorage
    const pedidos = JSON.parse(localStorage.getItem('pedidos')) || [];
    pedidos.push(pedido);
    localStorage.setItem('pedidos', JSON.stringify(pedidos));

    alert('Pedido salvo com sucesso!');
    form.reset(); // Resetar o formulário
    generatePedidoNumber(); // Gerar novo número para o próximo pedido
    loadTable('pedido'); // Atualizar a tabela de pedidos
}

// Função para carregar e exibir os dados das tabelas
function loadTable(formId) {
    const tableBody = document.querySelector(`#${formId}-list tbody`);
    tableBody.innerHTML = '';
    
    const storedItems = JSON.parse(localStorage.getItem(formId)) || [];
    
    storedItems.forEach(item => {
        const row = document.createElement('tr');
        
        Object.keys(item).forEach(key => {
            if (key !== 'id') {
                const cell = document.createElement('td');
                cell.textContent = item[key];
                
                // Adiciona classes específicas para CPF e usuário
                if (formId === 'pedido' && key === 'numero') {
                    cell.classList.add('pedido-id');
                }

                row.appendChild(cell);
            }
        });

        const actionsCell = document.createElement('td');
        const editButton = document.createElement('button');
        editButton.textContent = 'Alterar';
        editButton.onclick = () => loadForm(formId, item);
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Excluir';
        deleteButton.onclick = () => deleteItem(formId, item.numero); // Usar o número do pedido como ID

        actionsCell.appendChild(editButton);
        actionsCell.appendChild(deleteButton);
        row.appendChild(actionsCell);
        tableBody.appendChild(row);
    });

    // Atualiza os nomes após carregar a tabela
    populateNames();
}

// Função para carregar os dados no formulário para edição
function loadForm(formId, item) {
    const form = document.getElementById(`${formId}-form-content`);
    Object.keys(item).forEach(key => {
        const input = form.querySelector(`[name="${key}"]`);
        if (input) {
            input.value = item[key];
        }
    });
    showForm(formId);
}
