



// Função para formatar a placa
document.getElementById('placa').addEventListener('input', function() {
    const value = this.value.toUpperCase().replace(/[^A-Z0-9]/g, '');
    const formatted = value.slice(0, 3) + (value.length > 3 ? '-' : '') + value.slice(3, 6) + (value.length > 6 ? value.slice(6, 7) : '');
    this.value = formatted;
});

// Função para preencher a lista de marcas e modelos
function populateMarcaModelo() {
    const marcas = ['Ford', 'Chevrolet', 'Volkswagen'];
    const modelos = {
        'Ford': ['Fiesta', 'Focus', 'Fusion'],
        'Chevrolet': ['Onix', 'Cruze', 'Tracker'],
        'Volkswagen': ['Gol', 'Voyage', 'T-Cross']
    };

    const marcaSelect = document.getElementById('marca');
    const modeloSelect = document.getElementById('modelo');

    marcas.forEach(marca => {
        const option = document.createElement('option');
        option.value = marca;
        option.textContent = marca;
        marcaSelect.appendChild(option);
    });

    marcaSelect.addEventListener('change', function() {
        const selectedMarca = this.value;
        modeloSelect.innerHTML = '<option value="">Selecione o Modelo</option>';

        if (selectedMarca) {
            modelos[selectedMarca].forEach(modelo => {
                const option = document.createElement('option');
                option.value = modelo;
                option.textContent = modelo;
                modeloSelect.appendChild(option);
            });
        }
    });
}

// Função para preencher os anos
function populateAnos() {
    const anoFabricacaoSelect = document.getElementById('anoFabricacao');
    const anoModeloSelect = document.getElementById('anoModelo');
    const currentYear = new Date().getFullYear();

    for (let year = currentYear; year >= 1900; year--) {
        const option = document.createElement('option');
        option.value = year;
        option.textContent = year;
        anoFabricacaoSelect.appendChild(option);
        anoModeloSelect.appendChild(option.cloneNode(true));
    }
}

// Função para preencher as cores
function populateCores() {
    const cores = ['Preto', 'Branco', 'Prata', 'Cinza', 'Azul', 'Vermelho'];

    const corSelect = document.getElementById('cor');
    cores.forEach(cor => {
        const option = document.createElement('option');
        option.value = cor;
        option.textContent = cor;
        corSelect.appendChild(option);
    });
}

// Função para formatar o valor como moeda
document.getElementById('valor').addEventListener('input', function() {
    // Remove caracteres não numéricos e converte para número
    let value = this.value.replace(/[^\d]/g, '');

    // Converte o valor para centavos
    value = parseFloat(value) / 100;

    // Atualiza o campo com o valor formatado como moeda
    this.value = value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
});


// Chama as funções para inicializar o formulário
populateMarcaModelo();
populateAnos();
populateCores();


