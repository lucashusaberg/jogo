document.addEventListener('DOMContentLoaded', function() {
    const formNome = document.getElementById('form-nome');
    const inputNome = document.getElementById('nome');
    const btnJogar = document.getElementById('btn-jogar');
    const inputPalpite = document.getElementById('palpite');
    const btnAdivinhar = document.getElementById('btn-adivinhar');
    const feedback = document.getElementById('feedback');
    const telaBoasVindas = document.getElementById('tela-boas-vindas');
    const telaJogo = document.getElementById('tela-jogo');
    const telaResultado = document.getElementById('tela-resultado');
    let nomeUsuario = '';
    let numeroAleatorio = 0;
    let tentativas = 0;

    formNome.addEventListener('submit', function(event) {
        event.preventDefault();
        nomeUsuario = inputNome.value.trim();
        if (nomeUsuario !== '') {
            exibirTela(telaJogo);
            atualizarMensagemBoasVindas();
            iniciarJogo();
        }
    });

    btnAdivinhar.addEventListener('click', function() {
        const palpite = parseInt(inputPalpite.value.trim());
        if (!isNaN(palpite)) {
            tentativas++;
            if (palpite === numeroAleatorio) {
                exibirResultado(true);
            } else {
                exibirFeedback(palpite);
            }
        } else {
            feedback.textContent = 'Por favor, insira apenas números.';
        }
        inputPalpite.value = '';
    });

    function exibirTela(tela) {
        telaBoasVindas.style.display = 'none';
        telaJogo.style.display = 'none';
        telaResultado.style.display = 'none';
        tela.style.display = 'block';
    }

    function atualizarMensagemBoasVindas() {
        const mensagemBoasVindas = document.createElement('h2');
        mensagemBoasVindas.textContent = `Olá, ${nomeUsuario}! Vamos jogar!`;
        telaJogo.innerHTML = '';
        telaJogo.appendChild(mensagemBoasVindas);
        const labelPalpite = document.createElement('label');
        labelPalpite.textContent = 'Digite seu palpite (entre 1 e 100):';
        telaJogo.appendChild(labelPalpite);
        const inputPalpite = document.createElement('input');
        inputPalpite.setAttribute('type', 'number');
        inputPalpite.setAttribute('id', 'palpite');
        telaJogo.appendChild(inputPalpite);
        const btnAdivinhar = document.createElement('button');
        btnAdivinhar.textContent = 'Adivinhar';
        btnAdivinhar.setAttribute('id', 'btn-adivinhar');
        telaJogo.appendChild(btnAdivinhar);
        telaJogo.appendChild(feedback);
    }

    function iniciarJogo() {
        numeroAleatorio = Math.floor(Math.random() * 100) + 1;
        tentativas = 0;
    }

    function exibirFeedback(palpite) {
        if (palpite < numeroAleatorio) {
            feedback.textContent = 'O número é maior.';
        } else {
            feedback.textContent = 'O número é menor.';
        }
    }

    function exibirResultado(venceu) {
        const mensagemResultado = document.createElement('h2');
        if (venceu) {
            mensagemResultado.textContent = `Parabéns, ${nomeUsuario}! Você acertou o número ${numeroAleatorio} em ${tentativas} tentativas.`;
        } else {
            mensagemResultado.textContent = `Que pena, ${nomeUsuario}. O número correto era ${numeroAleatorio}.`;
        }
        telaResultado.innerHTML = '';
        telaResultado.appendChild(mensagemResultado);
        const btnJogarNovamente = document.createElement('button');
        btnJogarNovamente.textContent = 'Jogar Novamente';
        btnJogarNovamente.addEventListener('click', function() {
            exibirTela(telaJogo);
            iniciarJogo();
        });
        telaResultado.appendChild(btnJogarNovamente);
        exibirTela(telaResultado);
    }
});
