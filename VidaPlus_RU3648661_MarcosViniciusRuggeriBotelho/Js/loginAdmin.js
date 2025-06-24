function fazerLoginAdmin(event) {
  event.preventDefault();
  const usuario = document.getElementById('usuario')?.value.trim();
  const senha = document.getElementById('senha')?.value.trim();

  if (!usuario || !senha) {
    showFeedback('Por favor, preencha todos os campos!', 'error');
    return;
  }

  // Validação de usuário (mínimo 6 caracteres)
  if (usuario.length < 6) {
    showFeedback('O usuário deve ter pelo menos 6 caracteres!', 'error');
    return;
  }

  // Validação de senha (mínimo 6 caracteres)
  if (senha.length < 6) {
    showFeedback('A senha deve ter pelo menos 6 caracteres!', 'error');
    return;
  }

  // Simulação de login bem-sucedido (sem backend)
  showFeedback('Login realizado com sucesso! Redirecionando...', 'success');
  setTimeout(() => {
    window.location.href = 'dashboardAdmin.html';
  }, 2000);
}

function showFeedback(mensagem, tipo) {
  const feedback = document.getElementById('mensagem-feedback');
  if (feedback) {
    feedback.textContent = mensagem;
    feedback.style.display = 'block';
    feedback.className = 'mensagem-sucesso';
    feedback.style.backgroundColor = tipo === 'error' ? '#f8d7da' : '#b2ebf2';
    feedback.style.color = tipo === 'error' ? '#721c24' : '#1d3557';
    feedback.style.borderColor = tipo === 'error' ? '#f5c6cb' : '#90e0ef';
    setTimeout(() => {
      feedback.style.display = 'none';
    }, 3000);
  } else {
    console.error('Elemento mensagem-feedback não encontrado!');
    alert(mensagem);
  }
}