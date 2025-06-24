function enviarContato(event) {
  event.preventDefault();
  const nome = document.getElementById('nome')?.value.trim();
  const email = document.getElementById('email')?.value.trim();
  const assunto = document.getElementById('assunto')?.value;
  const mensagem = document.getElementById('mensagem')?.value.trim();

  if (!nome || !email || !assunto || !mensagem) {
    showFeedback('Por favor, preencha todos os campos!', 'error');
    return;
  }

  // Validação de e-mail
  if (!email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)) {
    showFeedback('E-mail inválido! Por favor, insira um e-mail válido.', 'error');
    return;
  }

  showFeedback('Mensagem enviada com sucesso! Agradecemos seu contato.', 'success');
  setTimeout(() => {
    document.querySelector('form').reset();
  }, 2000);
}

function showFeedback(mensagem, tipo) {
  const feedback = document.getElementById('mensagem-feedback');
  if (feedback) {
    feedback.textContent = mensagem;
    feedback.style.display = 'block';
    feedback.className = 'mensagem-sucesso'; // Resetar classes
    feedback.style.backgroundColor = tipo === 'error' ? '#f8d7da' : '#b2ebf2';
    feedback.style.color = tipo === 'error' ? '#721c24' : '#1d3557';
    feedback.style.borderColor = tipo === 'error' ? '#f5c6cb' : '#90e0ef';
    setTimeout(() => {
      feedback.style.display = 'none';
    }, 3000);
  } else {
    console.error('Elemento mensagem-feedback não encontrado!');
    alert(mensagem); // Fallback
  }
}