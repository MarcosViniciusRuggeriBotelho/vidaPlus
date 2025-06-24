function fazerLoginMedico(event) {
  event.preventDefault();
  const crm = document.getElementById('crm')?.value.trim();
  const senha = document.getElementById('senha')?.value.trim();

  if (!crm || !senha) {
    showFeedback('Por favor, preencha todos os campos!', 'error');
    return;
  }

  // Validação de CRM (exemplo: espera "CRM-XX 123456")
  if (!crm.match(/^CRM-[A-Z]{2} \d{6}$/)) {
    showFeedback('CRM inválido! Use o formato CRM-XX 123456 (ex: CRM-SP 123456)', 'error');
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
    window.location.href = 'dashboardMedico.html'; // Ajuste para a página de destino real
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