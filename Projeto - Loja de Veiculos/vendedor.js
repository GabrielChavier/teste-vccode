// vendedor.js

// Função para obter o próximo código disponível
function getNextCode() {
    let lastCode = localStorage.getItem('lastVendedorCode');
    let nextCode = 1;

    if (lastCode) {
        nextCode = parseInt(lastCode, 10) + 1;
    }

    // Atualizar o código no localStorage
    localStorage.setItem('lastVendedorCode', nextCode);

    return nextCode;
}

// Função para definir o código no campo de código
function setCodigo() {
    let codigoInput = document.querySelector('input[name="codigo"]');
    let nextCode = getNextCode();

    // Definir o próximo código no campo de código
    codigoInput.value = nextCode;
}

// Função para salvar o vendedor
function saveVendedor() {
    let codigo = parseInt(document.querySelector('input[name="codigo"]').value, 10);
    let usuario = document.querySelector('input[name="usuario"]').value;

    let vendedor = {
        codigo: codigo,
        usuario: usuario
    };

    let vendedores = JSON.parse(localStorage.getItem('vendedores')) || [];
    vendedores.push(vendedor);

    localStorage.setItem('vendedores', JSON.stringify(vendedores));

    // Atualizar a listagem
    updateVendedorList();

    // Limpar o formulário e definir o próximo código
    clearForm();
    setCodigo();
}

// Função para limpar o formulário
function clearForm() {
    document.querySelector('input[name="usuario"]').value = '';
}

// Função para atualizar a lista de vendedores
function updateVendedorList() {
    let vendedores = JSON.parse(localStorage.getItem('vendedores')) || [];
    let tableBody = document.querySelector('#vendedor-list tbody');

    tableBody.innerHTML = '';

    vendedores.forEach(vendedor => {
        let row = document.createElement('tr');
        row.innerHTML = `
            <td>${vendedor.codigo}</td>
            <td>${vendedor.usuario}</td>
            <td><button onclick="editVendedor(${vendedor.codigo})">Alterar</button></td>
        `;
        tableBody.appendChild(row);
    });
}

// Função para editar um vendedor
function editVendedor(codigo) {
    // Lógica para editar um vendedor existente
    // ...
}

// Inicializar a lista e o código ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
    setCodigo(); // Define o código automaticamente ao carregar a página
    updateVendedorList();
    if (!localStorage.getItem('lastVendedorCode')) {
        localStorage.setItem('lastVendedorCode', 1);
    }
});
