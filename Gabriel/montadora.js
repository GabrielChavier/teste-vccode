document.addEventListener('DOMContentLoaded', function() {
    // Adiciona eventos para formatação de CNPJ e telefone
    document.getElementById('cnpj').addEventListener('input', function() {
        this.value = formatCNPJ(this.value);
    });

    document.getElementById('telefoneComercial').addEventListener('input', function() {
        this.value = formatPhone(this.value);
    });

    document.getElementById('celular').addEventListener('input', function() {
        this.value = formatPhone(this.value);
    });
});

// Função para formatar o CNPJ
function formatCNPJ(value) {
    return value
        .replace(/\D/g, '') // Remove caracteres não numéricos
        .replace(/^(\d{2})(\d)/, '$1.$2')
        .replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
        .replace(/\.(\d{3})(\d)/, '.$1/$2')
        .replace(/(\d{4})(\d)/, '$1-$2')
        .slice(0, 18); // Limita a 18 caracteres
}

// Função para formatar telefone
function formatPhone(value) {
    return value
        .replace(/\D/g, '') // Remove caracteres não numéricos
        .replace(/^(\d{2})(\d)/, '($1) $2')
        .replace(/(\d{4})(\d)/, '$1-$2')
        .replace(/(\d{5})(\d)/, '$1-$2')
        .slice(0, 15); // Limita a 15 caracteres
}
