document.addEventListener("DOMContentLoaded", init);

function init() {
    // Verificação de suporte à API de síntese de voz
    if (!('speechSynthesis' in window)) {
        alert("Desculpe, seu navegador não suporta a síntese de voz.");
        return;
    }

    // Criação do objeto de síntese de voz
    let speech = new SpeechSynthesisUtterance();
    let voices = [];

    // Referências aos elementos DOM
    let voiceSelect = document.querySelector("select");
    let button = document.querySelector("button");
    let textArea = document.querySelector("textarea");

    // Função para carregar e preencher a lista de vozes
    function populateVoiceList() {
        voices = window.speechSynthesis.getVoices();

        // Limpa as opções anteriores
        voiceSelect.innerHTML = '';

        // Adiciona as vozes à lista de seleção
        voices.forEach(voice => {
            const option = document.createElement('option');
            option.value = voice.name; // Usar o nome da voz como valor
            option.textContent = `${voice.name} (${voice.lang})`;
            voiceSelect.appendChild(option);
        });

        // Define a voz padrão como a primeira da lista
        if (voices.length > 0) {
            speech.voice = voices[0];
        }
    }

    // Função para definir a voz selecionada
    function setVoice() {
        const selectedVoice = voices.find(voice => voice.name === voiceSelect.value);
        if (selectedVoice) {
            speech.voice = selectedVoice;
        }
    }

    // Função para falar o texto
    function speakText() {
        if (speechSynthesis.speaking) {
            // Cancela a fala atual se estiver em execução
            window.speechSynthesis.cancel();
        }
        speech.text = textArea.value;
        if (speech.text.trim() !== '') {
            window.speechSynthesis.speak(speech);
        } else {
            alert("Por favor, insira um texto para converter em fala.");
        }
    }

    // Garante que as vozes sejam carregadas corretamente
    window.speechSynthesis.onvoiceschanged = populateVoiceList;

    // Altera a voz ao selecionar uma nova opção
    voiceSelect.addEventListener("change", setVoice);

    // Executa a leitura do texto ao clicar no botão
    button.addEventListener("click", speakText);

    // Carrega a lista de vozes inicialmente
    populateVoiceList();
}
