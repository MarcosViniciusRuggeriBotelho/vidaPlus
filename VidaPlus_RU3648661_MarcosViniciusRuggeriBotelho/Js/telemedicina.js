// Js/telemedicina.js

// Variáveis globais por página
let streamMedico = null;
let streamPaciente = null;

async function startVideo(sectionId) {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    if (sectionId === 'telemedicinaMedico') {
      streamMedico = stream;
      const videoSelf = document.getElementById('video-medico-self');
      const videoPaciente = document.getElementById('video-paciente');
      if (videoSelf) videoSelf.srcObject = streamMedico;
      if (videoPaciente) videoPaciente.srcObject = stream; // Simulação do paciente
    } else if (sectionId === 'telemedicinaPaciente') {
      streamPaciente = stream;
      const videoSelf = document.getElementById('video-paciente-self');
      const videoMedico = document.getElementById('video-medico');
      if (videoSelf) videoSelf.srcObject = streamPaciente;
      if (videoMedico) videoMedico.srcObject = stream; // Simulação do médico
    }
  } catch (err) {
    console.error('Erro ao acessar câmera/microfone:', err);
    showFeedback('Não foi possível acessar a câmera ou o microfone. Verifique as permissões.', sectionId);
  }
}

// Controle de vídeo e áudio
function toggleVideo(videoId, button) {
  const video = document.getElementById(videoId);
  const tracks = (videoId.includes('medico') ? streamMedico : streamPaciente)?.getVideoTracks();
  if (tracks && tracks.length > 0) {
    tracks.forEach(track => {
      track.enabled = !track.enabled;
      button.textContent = track.enabled ? 'Desativar Vídeo' : 'Ativar Vídeo';
    });
  }
}

function toggleAudio(button) {
  const tracks = (button.closest('.doctor-dashboard') ? streamMedico : streamPaciente)?.getAudioTracks();
  if (tracks && tracks.length > 0) {
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

  // Simulação: eco da mensagem na outra tela
  const outroChatId = tipo === 'medico' ? 'chat-mensagens-paciente' : 'chat-mensagens-medico';
  const outroChat = document.getElementById(outroChatId);
  if (outroChat) {
    const ecoMensagem = document.createElement('p');
    ecoMensagem.classList.add(tipo === 'medico' ? 'paciente' : 'medico'); // Inverte o tipo para simulação
    ecoMensagem.textContent = `${tipo === 'medico' ? 'Paciente' : 'Médico'}: ${mensagem}`;
    outroChat.appendChild(ecoMensagem);
    outroChat.scrollTop = outroChat.scrollHeight;
  }
  button.classList.remove('loading');
}

// Encerrar consulta
function encerrarConsulta(redirectPage) {
  if (confirm('Deseja encerrar a consulta?')) {
    if (streamMedico) streamMedico.getTracks().forEach(track => track.stop());
    if (streamPaciente) streamPaciente.getTracks().forEach(track => track.stop());
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

// Inicializar vídeo ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
  const sectionId = document.querySelector('.dashboard').classList.contains('doctor-dashboard') ? 'telemedicinaMedico' : 'telemedicinaPaciente';
  startVideo(sectionId);
});
