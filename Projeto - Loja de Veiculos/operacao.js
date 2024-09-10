document.addEventListener("DOMContentLoaded", function() {
    const selectVeiculo = document.querySelector("select[name='veiculo']");
    const inputNumeroVenda = document.querySelector("input[name='numero']");
    const selectCliente = document.querySelector("select[name='cliente']");
    const selectVendedor = document.querySelector("select[name='vendedor']");
    const inputValorVeiculo = document.querySelector("input[name='valorCompra']");
    const inputValorCompra = document.querySelector("input[name='valorCompra']");
    const inputValorEntrada = document.querySelector("input[name='valorEntrada']");
    const inputValorFinanciado = document.querySelector("input[name='valorFinanciado']");
    const inputQuantidadeParcelas = document.querySelector("input[name='quantidadeParcelas']");
    const inputValorParcelas = document.querySelector("input[name='valorParcelas']");
    const inputValorTotal = document.querySelector("input[name='valorTotal']");

    // Função para formatar valor como moeda
    function formatarParaReal(valor) {
        return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    }

    // Função para remover formatação de moeda e retornar o valor numérico
    function desformatarDeReal(valor) {
        return parseFloat(valor.replace(/[^\d,]/g, '').replace(',', '.')) || 0;
    }

    // Função para preencher as opções dos selects
    function preencherOpcoes(selectId, storageKey, valorLabel, valorExtra) {
        let selectElement = document.getElementById(selectId);
        let dados = JSON.parse(localStorage.getItem(storageKey)) || [];

        // Limpa opções anteriores
        selectElement.innerHTML = '';

        // Preenche com novos dados
        dados.forEach(item => {
            let option = document.createElement('option');
            option.value = item.id;
            if (valorLabel === 'modelo') {
                option.text = `${item[valorLabel]} - ${formatarParaReal(item[valorExtra])}`;
                option.dataset.valor = item[valorExtra]; // Armazena o valor do veículo no atributo data
            } else {
                option.text = item[valorLabel];
            }
            selectElement.appendChild(option);
        });
    }

    // Função para gerar um número de venda automaticamente
    function gerarNumeroVenda() {
        if (inputNumeroVenda) {
            let ultimoNumeroVenda = parseInt(localStorage.getItem('ultimoNumeroVenda')) || 0;
            let novoNumeroVenda = ultimoNumeroVenda + 1;
            localStorage.setItem('ultimoNumeroVenda', novoNumeroVenda);
            inputNumeroVenda.value = novoNumeroVenda;
        } else {
            console.error("Elemento 'inputNumeroVenda' não encontrado.");
        }
    }

    // Função para atualizar o valor do veículo ao selecionar
    function atualizarValorVeiculo() {
        if (selectVeiculo && inputValorVeiculo) {
            const veiculoSelecionado = selectVeiculo.options[selectVeiculo.selectedIndex];
            const valorVeiculo = parseFloat(veiculoSelecionado.dataset.valor) || 0; // Pega o valor armazenado no atributo data
            inputValorVeiculo.value = formatarParaReal(valorVeiculo);
            // Atualiza o valor da compra com o valor do veículo selecionado
            inputValorCompra.value = formatarParaReal(valorVeiculo);
        } else {
            console.error("Elementos 'selectVeiculo' ou 'inputValorVeiculo' não encontrados.");
        }
    }

    // Função para formatar valor enquanto o usuário digita
    function formatarValorEntrada(event) {
        let valorEntrada = event.target.value;

        // Remove todos os caracteres que não sejam dígitos
        valorEntrada = valorEntrada.replace(/[^\d]/g, '');

        // Converte o valor para número e formata como moeda
        if (valorEntrada.length > 0) {
            let valorNumerico = parseFloat(valorEntrada) / 100;
            event.target.value = formatarParaReal(valorNumerico);

            // Recalcular o valor financiado
            calcularValorFinanciado();
        } else {
            event.target.value = '';
        }
    }

    // Função para formatar o valor da compra enquanto o usuário digita
    function formatarValorCompra(event) {
        let valorCompra = event.target.value;

        // Remove todos os caracteres que não sejam dígitos
        valorCompra = valorCompra.replace(/[^\d]/g, '');

        // Converte o valor para número e formata como moeda
        if (valorCompra.length > 0) {
            let valorNumerico = parseFloat(valorCompra) / 100;
            event.target.value = formatarParaReal(valorNumerico);

            // Recalcular o valor financiado
            calcularValorFinanciado();
        } else {
            event.target.value = '';
        }
    }

    // Função para calcular o valor financiado
    function calcularValorFinanciado() {
        const valorCompra = desformatarDeReal(inputValorCompra.value);
        const valorEntrada = desformatarDeReal(inputValorEntrada.value);

        // Valor financiado é o valor da compra menos o valor da entrada
        const valorFinanciado = Math.max(valorCompra - valorEntrada, 0);
        inputValorFinanciado.value = formatarParaReal(valorFinanciado);

        // Recalcular as parcelas
        calcularParcelas();
    }

    // Função para calcular o valor das parcelas e o valor total
    function calcularParcelas() {
        const valorFinanciado = desformatarDeReal(inputValorFinanciado.value);
        const quantidadeParcelas = parseInt(inputQuantidadeParcelas.value) || 0;

        if (quantidadeParcelas > 0) {
            const valorParcelas = valorFinanciado / quantidadeParcelas;
            const valorTotal = valorFinanciado; // Valor total é o valor financiado

            inputValorParcelas.value = formatarParaReal(valorParcelas);
            inputValorTotal.value = formatarParaReal(valorTotal);
        }
    }

    // Eventos para formatação e cálculos
    if (inputValorEntrada) inputValorEntrada.addEventListener('input', formatarValorEntrada);
    if (inputValorCompra) inputValorCompra.addEventListener('input', formatarValorCompra);
    if (inputQuantidadeParcelas) inputQuantidadeParcelas.addEventListener('input', calcularParcelas);
    if (selectVeiculo) selectVeiculo.addEventListener("change", atualizarValorVeiculo);

    // Preencher os selects ao carregar a página
    preencherOpcoes('cliente', 'cliente', 'nome');
    preencherOpcoes('vendedor', 'vendedor', 'usuario');
    preencherOpcoes('veiculo', 'veiculo', 'modelo', 'valor');

    // Gerar número de venda ao carregar a página
    gerarNumeroVenda();
});
