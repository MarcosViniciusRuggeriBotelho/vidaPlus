// script.js

// Simulação de dados no localStorage
document.addEventListener('DOMContentLoaded', () => {
  // Personalização do nome (pode ser salvo ao login)
  const userType = window.location.pathname.includes('dashboardAdmin') ? 'Administrador' :
                   window.location.pathname.includes('dashboardMedico') ? 'Médico' : 'Paciente';
  let userName = localStorage.getItem('userName') || `${userType} Padrão`;
  document.querySelector('.dashboard h2').textContent = `Bem-vindo, ${userName}`;

  // Contadores dinâmicos
  const counters = {
    'dashboardAdmin': [
      { selector: '.dashboard-card:nth-child(1) p', text: 'Adicione, edite ou remova usuários do sistema. (5 usuários pendentes)' },
      { selector: '.dashboard-card:nth-child(2) p', text: 'Monitore e controle as internações em tempo real. (2 internações ativas)' },
      { selector: '.dashboard-card:nth-child(3) p', text: 'Obtenha relatórios detalhados de atendimento e uso. (10 relatórios gerados)' },
      { selector: '.dashboard-card:nth-child(4) p', text: 'Consulte registros de ações e atividades no sistema. (20 logs recentes)' }
    ],
    'dashboardMedico': [
      { selector: '.dashboard-card:nth-child(1) p', text: 'Visualize e gerencie suas consultas marcadas. (3 consultas pendentes)' },
      { selector: '.dashboard-card:nth-child(2) p', text: 'Inicie ou participe de consultas por vídeo ou chat. (1 sessão ativa)' },
      { selector: '.dashboard-card:nth-child(3) p', text: 'Atualize suas informações de cadastro. (1 atualização pendente)' }
    ],
    'dashboardPaciente': [
      { selector: '.dashboard-card:nth-child(1) p', text: 'Gerencie suas consultas marcadas. (3 consultas agendadas)' },
      { selector: '.dashboard-card:nth-child(2) p', text: 'Consulte seu histórico de atendimentos. (5 registros disponíveis)' },
      { selector: '.dashboard-card:nth-child(3) p', text: 'Participe de consultas online. (1 teleconsulta marcada)' }
    ]
  };

  const currentDashboard = window.location.pathname.includes('dashboardAdmin') ? 'dashboardAdmin' :
                          window.location.pathname.includes('dashboardMedico') ? 'dashboardMedico' : 'dashboardPaciente';

  counters[currentDashboard].forEach((item, index) => {
    const element = document.querySelector(item.selector);
    if (element) element.textContent = item.text;

    // Destaque para pendências
    if (item.text.includes('pendentes') || item.text.includes('ativa')) {
      const card = element.closest('.dashboard-card');
      if (card) card.style.borderLeft = `4px solid #EF4444`; // Vermelho para pendências
      setTimeout(() => {
        card.style.borderLeft = '';
      }, 5000); // Volta ao normal após 5 segundos
    }
  });

  // Personalização do nome ao clicar nos botões
  document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const newName = prompt('Digite seu nome para personalização:');
      if (newName) {
        localStorage.setItem('userName', newName);
        location.reload(); // Recarrega para atualizar o nome
      }
    });
  });

  // Sistema de notificações
  const notificationsContainer = document.createElement('div');
  notificationsContainer.className = 'notifications';
  document.body.appendChild(notificationsContainer);

  function createNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
      <span>${message}</span>
      <span class="close">&times;</span>
    `;
    notificationsContainer.appendChild(notification);

    // Remove após 5 segundos ou ao clicar no 'x'
    setTimeout(() => notification.remove(), 5000);
    notification.querySelector('.close').addEventListener('click', () => notification.remove());

    // Animação de saída
    notification.addEventListener('animationend', (e) => {
      if (e.animationName === 'fadeOut') notification.remove();
    });
  }

  // Simulação de notificações a cada 10 segundos
  const notificationTypes = ['success', 'error', 'info'];
  const messages = {
    'dashboardAdmin': ['Novo usuário cadastrado!', '2 internações pendentes!', 'Relatório gerado com sucesso.'],
    'dashboardMedico': ['Nova consulta agendada!', 'Sessão de telemedicina iniciada.', 'Atualização de perfil necessária.'],
    'dashboardPaciente': ['Consulta marcada com sucesso!', 'Histórico atualizado.', 'Teleconsulta disponível em 5 min.']
  };

  setInterval(() => {
    const randomType = notificationTypes[Math.floor(Math.random() * notificationTypes.length)];
    const randomMessage = messages[currentDashboard][Math.floor(Math.random() * messages[currentDashboard].length)];
    createNotification(randomMessage, randomType);
  }, 10000); // Nova notificação a cada 10 segundos
});