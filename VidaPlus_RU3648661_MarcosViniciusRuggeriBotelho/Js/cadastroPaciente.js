function cadastrarPaciente(event) {
  evento.preventDefault();
  const nomePaciente = document.getElementById('nomePaciente')?.value.trim();
  const cpf = document.getElementById('cpf')?.value.trim();
  const email = document.getElementById('email')?.value.trim();
  const telefone = document.getElementById('telefone')?.value.trim();
  const senha = document.getElementById('senha')?.value.trim();

  if (!nomePaciente || !cpf || !email || !telefone || !senha) {
    showFeedback('Por favor, preencha todos os campos!', 'error');
    return;
  }

  // Validação de CPF (exemplo: espera 123.456.789-00)
  if (!cpf.match(/^\d{3}\.\d\d\.\d{3}-\d{2}$/)) {
    showFeedback('CPF inválido! Use o formato 123.456.789-00', 'error');
    return;
  }

  // Validação de e-mail
  if (!email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)) {
    showFeedback('E-mail inválido! Por favor, insira um e-mail válido.', 'error');
    return;
  }

  // Validação de telefone (exemplo: espera (XX) 12345-6789)
  if (!telefone.match(/^\(\d{2}\) \d{5}-\d{4}$/)) {
    showFeedback('Telefone inválido! Use o formato (XX) 12345-6789', 'error');
    return;
  }

  // Validação de senha (mínimo 6 caracteres)
  if (senha.length < 6) {
    showFeedback('A senha deve ter pelo menos 6 caracteres!', 'error');
    return;
  }

  showFeedback('Cadastro realizado com sucesso! Redirecionando para login...', 'success');
  setTimeout(() => {
    window.location.href = 'loginPaciente.html'; // Ajuste para a página de login
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
