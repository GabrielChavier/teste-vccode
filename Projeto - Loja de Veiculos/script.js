// Função para salvar dados no localStorage
function saveItem(formId) {
    const form = document.getElementById(`${formId}-form-content`);
    if (!form) {
        console.error(`Formulário com ID ${formId}-form-content não encontrado.`);
        return;
    }
    
    const data = new FormData(form);
    const item = {};
    
    data.forEach((value, key) => {
        item[key] = value;
    });

    let storedItems = JSON.parse(localStorage.getItem(formId)) || [];
    const itemIndex = storedItems.findIndex(i => i.id === item.id);
    
    if (itemIndex > -1) {
        storedItems[itemIndex] = item; // Atualiza o item existente
    } else {
        item.id = Date.now(); // Adiciona um ID único para novos itens
        storedItems.push(item);
    }

    localStorage.setItem(formId, JSON.stringify(storedItems));
    console.log('Dados salvos:', JSON.parse(localStorage.getItem(formId))); // Debug: Verifica dados salvos
    alert('Dados salvos com sucesso!');
    clearForm(formId); // Limpa os campos do formulário
    loadTable(formId);
}

// Função para carregar e exibir os dados das tabelas
function loadTable(formId) {
    const tableBody = document.querySelector(`#${formId}-list tbody`);
    if (!tableBody) {
        console.error(`Corpo da tabela com ID ${formId}-list tbody não encontrado.`);
        return;
    }
    
    tableBody.innerHTML = '';
    
    const storedItems = JSON.parse(localStorage.getItem(formId)) || [];
    
    storedItems.forEach(item => {
        const row = document.createElement('tr');
        
        Object.keys(item).forEach(key => {
            if (key !== 'id') {
                const cell = document.createElement('td');
                cell.textContent = item[key];
                
                // Adiciona classes específicas para CPF e usuário
                if (formId === 'cliente' && key === 'cpf') {
                    cell.classList.add('cliente-cpf'); // Ajuste a classe para CPF
                }
                if (formId === 'vendedor' && key === 'usuario') {
                    cell.classList.add('vendedor-id');
                }
                if (formId === 'veiculo' && key === 'numeroChassi') {
                    cell.classList.add('veiculo-id');
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
        deleteButton.onclick = () => deleteItem(formId, item.id);

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
    if (!form) {
        console.error(`Formulário com ID ${formId}-form-content não encontrado.`);
        return;
    }
    
    Object.keys(item).forEach(key => {
        const input = form.querySelector(`[name="${key}"]`);
        if (input) {
            input.value = item[key];
        }
    });

    // Exibe o botão "Atualizar" e esconde o botão "Salvar"
    document.getElementById(`${formId}-update-button`).style.display = 'block';
    document.getElementById(`${formId}-save-button`).style.display = 'none';

    showForm(formId);
}

// Função para atualizar um item
function updateItem(formId) {
    const form = document.getElementById(`${formId}-form-content`);
    if (!form) {
        console.error(`Formulário com ID ${formId}-form-content não encontrado.`);
        return;
    }
    
    const data = new FormData(form);
    const item = {};
    
    data.forEach((value, key) => {
        item[key] = value;
    });

    let storedItems = JSON.parse(localStorage.getItem(formId)) || [];
    const itemIndex = storedItems.findIndex(i => i.id === item.id);
    
    if (itemIndex > -1) {
        storedItems[itemIndex] = item; // Atualiza o item existente
        localStorage.setItem(formId, JSON.stringify(storedItems));
        console.log('Dados atualizados:', JSON.parse(localStorage.getItem(formId))); // Debug: Verifica dados atualizados
        alert('Dados atualizados com sucesso!');
    } else {
        console.error(`Item com ID ${item.id} não encontrado.`);
    }

    // Esconde o botão "Atualizar" e exibe o botão "Salvar"
    document.getElementById(`${formId}-update-button`).style.display = 'none';
    document.getElementById(`${formId}-save-button`).style.display = 'block';

    clearForm(formId);
    loadTable(formId);
}

// Função para excluir um item
function deleteItem(formId, id) {
    let storedItems = JSON.parse(localStorage.getItem(formId)) || [];
    storedItems = storedItems.filter(item => item.id !== id);
    localStorage.setItem(formId, JSON.stringify(storedItems));
    alert('Item excluído com sucesso!');
    loadTable(formId);
}

// Função para limpar o formulário
function clearForm(formId) {
    const form = document.getElementById(`${formId}-form-content`);
    if (form) {
        form.reset(); // Limpa os campos do formulário
    } else {
        console.error(`Formulário com ID ${formId}-form-content não encontrado.`);
    }
}

// Função para pesquisar os itens
function searchItems(formId) {
    const searchInput = document.getElementById(`${formId}-search`);
    const searchTerm = searchInput.value.toLowerCase();
    const tableBody = document.querySelector(`#${formId}-list tbody`);
    if (!tableBody) {
        console.error(`Corpo da tabela com ID ${formId}-list tbody não encontrado.`);
        return;
    }
    
    const rows = tableBody.querySelectorAll('tr');

    rows.forEach(row => {
        const cells = row.querySelectorAll('td');
        const match = Array.from(cells).some(cell => cell.textContent.toLowerCase().includes(searchTerm));
        row.style.display = match ? '' : 'none';
    });
}

// Função para exibir o formulário
function showForm(formId) {
    document.querySelectorAll('.form').forEach(form => form.style.display = 'none');
    const form = document.getElementById(`${formId}-form`);
    if (form) {
        form.style.display = 'block';
    } else {
        console.error(`Formulário com ID ${formId}-form não encontrado.`);
    }
}

// Função para fechar o formulário
function closeForm() {
    document.querySelectorAll('.form').forEach(form => form.style.display = 'none');
}

// Função para limpar todos os dados do localStorage
function clearLocalStorage() {
    if (confirm('Tem certeza que deseja limpar todos os dados?')) {
        localStorage.clear();
        alert('Dados apagados com sucesso!');
        document.querySelectorAll('.form').forEach(form => {
            form.querySelector('tbody').innerHTML = '';
        });
        // Atualiza tabelas após limpar o localStorage
        loadTable('veiculo');
        loadTable('cliente');
        loadTable('vendedor');
        loadTable('montadora');
        loadTable('operacao');
        loadTable('pedido');
    }
}

// Função para preencher o nome do cliente e vendedor corretamente
function populateNames() {
    const clientes = JSON.parse(localStorage.getItem('cliente')) || [];
    const vendedores = JSON.parse(localStorage.getItem('vendedor')) || [];
    const veiculos = JSON.parse(localStorage.getItem('veiculo')) || [];

    // Atualiza o nome do cliente
    document.querySelectorAll('.cliente-cpf').forEach(cell => {
        const cpf = cell.textContent.trim();
        const cliente = clientes.find(c => c.cpf === cpf);
        if (cliente) {
            const nomeCell = cell.nextElementSibling; // Obtém a célula do nome próxima
            if (nomeCell) {
                nomeCell.textContent = cliente.nome;
            }
        }
    });

    // Atualiza o nome do vendedor
    document.querySelectorAll('.vendedor-id').forEach(cell => {
        const usuario = cell.textContent.trim();
        const vendedor = vendedores.find(v => v.usuario === usuario);
        if (vendedor) {
            cell.textContent = vendedor.nome || vendedor.usuario; // Ajuste se necessário
        }
    });

    // Atualiza o nome do veículo
    document.querySelectorAll('.veiculo-id').forEach(cell => {
        const chassi = cell.textContent.trim();
        const veiculo = veiculos.find(v => v.numeroChassi === chassi);
        if (veiculo) {
            cell.textContent = `${veiculo.marca} ${veiculo.modelo}`;
        }
    });
}

// Adiciona eventos de pesquisa para cada formulário
document.getElementById('veiculo-search').addEventListener('input', () => searchItems('veiculo'));
document.getElementById('cliente-search').addEventListener('input', () => searchItems('cliente'));
document.getElementById('vendedor-search').addEventListener('input', () => searchItems('vendedor'));
document.getElementById('montadora-search').addEventListener('input', () => searchItems('montadora'));
document.getElementById('operacao-search').addEventListener('input', () => searchItems('operacao'));
document.getElementById('pedido-search').addEventListener('input', () => searchItems('pedido'));

// Inicializa as tabelas e o formulário
document.addEventListener('DOMContentLoaded', () => {
    loadTable('veiculo');
    loadTable('cliente');
    loadTable('vendedor');
    loadTable('montadora');
    loadTable('operacao');
    loadTable('pedido');
});