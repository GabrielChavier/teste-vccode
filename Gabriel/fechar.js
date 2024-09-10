// script.js
document.addEventListener('DOMContentLoaded', () => {
    const menuLinks = document.querySelectorAll('nav a');
    const forms = document.querySelectorAll('.section-form');
    const closeButtons = document.querySelectorAll('.close-btn');

    // Função para exibir o formulário selecionado
    function showForm(formId) {
        forms.forEach(form => {
            if (form.id === formId) {
                form.classList.add('active');
            } else {
                form.classList.remove('active');
            }
        });
    }

    // Adiciona eventos aos links do menu
    menuLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetFormId = link.getAttribute('data-target');
            showForm(targetFormId);
        });
    });

    // Adiciona eventos aos botões de fechar
    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            button.closest('.section-form').classList.remove('active');
        });
    });
});
