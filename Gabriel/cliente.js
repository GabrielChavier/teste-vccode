

// Função para aplicar a máscara de CPF
document.getElementsByName('cpf')[0].addEventListener('input', function() {
    let value = this.value.replace(/\D/g, '');
    if (value.length <= 11) {
        value = value.replace(/^(\d{3})(\d{3})(\d{3})(\d{0,2})/, '$1.$2.$3-$4');
    }
    this.value = value;
});

// Função para aplicar a máscara de telefone e celular
document.getElementsByName('telefone')[0].addEventListener('input', function() {
    let value = this.value.replace(/\D/g, '');
    if (value.length <= 11) {
        value = value.replace(/^(\d{2})(\d{4,5})(\d{0,4})/, '($1) $2-$3');
    }
    this.value = value;
});

document.getElementsByName('celular')[0].addEventListener('input', function() {
    let value = this.value.replace(/\D/g, '');
    if (value.length <= 11) {
        value = value.replace(/^(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3');
    }
    this.value = value;
});

// Função para formatar a renda como moeda
document.getElementsByName('renda')[0].addEventListener('input', function() {
    // Remove caracteres não numéricos e converte para número
    let value = this.value.replace(/[^\d]/g, '');

    // Converte o valor para centavos
    value = parseFloat(value) / 100;

    // Atualiza o campo com o valor formatado como moeda
    this.value = value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
});
