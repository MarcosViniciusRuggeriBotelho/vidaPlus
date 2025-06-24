document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('.header');
  const menu = document.querySelector('.menu');
  header.addEventListener('click', (e) => {
    if (e.target.closest('.header::before') || e.target === header) {
      header.classList.toggle('active');
      menu.classList.toggle('active');
    }
  });
});