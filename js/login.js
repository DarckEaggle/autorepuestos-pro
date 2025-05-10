document.addEventListener('DOMContentLoaded', () => {
  const userIcon = document.getElementById('userIcon');
  const loginPopup = document.getElementById('loginPopup');

  userIcon.addEventListener('click', (e) => {
    e.stopPropagation(); // evita cerrar inmediatamente
    loginPopup.classList.toggle('d-none');
  });

  // Ocultar al hacer clic fuera del popup
  document.addEventListener('click', (e) => {
    if (!loginPopup.contains(e.target) && e.target.id !== 'userIcon') {
      loginPopup.classList.add('d-none');
    }
  });
});


