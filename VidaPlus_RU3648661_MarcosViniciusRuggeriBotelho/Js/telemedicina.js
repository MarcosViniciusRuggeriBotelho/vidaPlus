// Iniciar vídeo (simulação para front-end)
let stream;
async function startVideo() {
  try {
    stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    document.getElementById('video-medico').srcObject = stream;
    document.getElementById('video-paciente-self').srcObject = stream;
    // Simulação: placeholders para o outro lado (médico/paciente)
    document.getElementById('video-paciente').srcObject = stream;
    document.getElementById('video-medico-paciente').srcObject = stream;
  } catch (err) {
    console.error('Erro ao acessar câmera/microfone:', err);
    showFeedback('Não foi possível acessar a câmera ou o microfone.', 'telemedicinaMedico');
    showFeedback('Não foi possível acessar a câmera ou o microfone.', 'telemedicinaPaciente');
  }
}
startVideo();

// Controle de vídeo e áudio
function toggleVideo(videoId, button) {
  const video = document.getElementById(videoId);
  const tracks = stream?.getVideoTracks();
  if (tracks) {
    tracks.forEach(track => {
      track.enabled = !track.enabled;
      button.textContent = track.enabled ? 'Desativar Vídeo' : 'Ativar Vídeo';
    });
  }
}

function toggleAudio(button) {
  const tracks = stream?.getAudioTracks();
  if (tracks) {
    tracks.forEach(track => {
      track.enabled = !track.enabled;
      button.textContent = track.enabled ? 'Desativar Áudio' : 'Ativar Áudio';
    });
  }
}

// Enviar mensagem no chat
function enviarMensagem(tipo, event) {
  event.preventDefault();
  const button = event.target.querySelector('button');
  button.classList.add('loading');
  const inputId = tipo === 'medico' ? 'mensagem-medico' : 'mensagem-paciente';
  const chatId = tipo === 'medico' ? 'chat-mensagens-medico' : 'chat-mensagens-paciente';
  const mensagem = document.getElementById(inputId).value.trim();
  if (!mensagem) {
    button.classList.remove('loading');
    return;
  }
  
  const chatMensagens = document.getElementById(chatId);
  const novaMensagem = document.createElement('p');
  novaMensagem.classList.add(tipo);
  novaMensagem.textContent = `${tipo.charAt(0).toUpperCase() + tipo.slice(1)}: ${mensagem}`;
  chatMensagens.appendChild(novaMensagem);
  chatMensagens.scrollTop = chatMensagens.scrollHeight;
  document.getElementById(inputId).value = '';
  
  // Simulação: eco da mensagem na outra tela (para front-end)
  const outroChatId = tipo === 'medico' ? 'chat-mensagens-paciente' : 'chat-mensagens-medico';
  const outroChat = document.getElementById(outroChatId);
  if (outroChat) {
    const ecoMensagem = document.createElement('p');
    ecoMensagem.classList.add(tipo);
    ecoMensagem.textContent = `${tipo.charAt(0).toUpperCase() + tipo.slice(1)}: ${mensagem}`;
    outroChat.appendChild(ecoMensagem);
    outroChat.scrollTop = outroChat.scrollHeight;
  }
}

// Encerrar consulta
function encerrarConsulta(redirectPage) {
  if (confirm('Deseja encerrar a consulta?')) {
    showFeedback('Consulta encerrada com sucesso!', 'telemedicinaMedico');
    showFeedback('Consulta encerrada com sucesso!', 'telemedicinaPaciente');
    setTimeout(() => {
      window.location.href = redirectPage;
    }, 2000);
  }
}

// Mostrar feedback
function showFeedback(mensagem, sectionId) {
  const feedbackId = sectionId === 'telemedicinaMedico' ? 'mensagem-feedback' : 'mensagem-feedback-paciente';
  const feedback = document.getElementById(feedbackId);
  if (feedback) {
    feedback.textContent = mensagem;
    feedback.style.display = 'block';
    setTimeout(() => {
      feedback.style.display = 'none';
    }, 3000);
  }
}