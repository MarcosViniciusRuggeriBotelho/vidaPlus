function cancelarConsulta(button) {
  const row = button.closest('tr');
  const paciente = row.cells[0].textContent;
  const especialidade = row.cells[1].textContent;
  const data = row.cells[2].textContent;
  const horario = row.cells[3].textContent;
  
  if (confirm(`Deseja cancelar a consulta de ${paciente} em ${especialidade} no dia ${data} às ${horario}?`)) {
    row.remove();
    const mensagem = document.createElement('div');
    mensagem.className = 'mensagem-sucesso';
    mensagem.textContent = 'Consulta cancelada com sucesso!';
    const consultasBox = document.querySelector('.consultas-box');
    if (consultasBox) {
      consultasBox.prepend(mensagem);
      setTimeout(() => mensagem.remove(), 3000);
    }
  }
}

// Vincular o evento aos botões de cancelamento
document.querySelectorAll('.cancelar-btn').forEach(button => {
  button.addEventListener('click', function() {
    cancelarConsulta(this);
  });
});