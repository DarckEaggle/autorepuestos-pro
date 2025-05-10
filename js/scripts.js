document.querySelectorAll(".tab-button").forEach(btn => {
    btn.addEventListener("click", () => {
      // Activar botón
      document.querySelectorAll(".tab-button").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
  
      // Mostrar solo el contenedor correspondiente
      const targetId = btn.getAttribute("data-target");
      document.querySelectorAll(".category-group").forEach(group => {
        group.classList.add("d-none");
      });
      document.querySelector(targetId).classList.remove("d-none");
    });
  });
  

  const indicators = document.querySelectorAll('.carousel-indicators [data-bs-target]');
  indicators.forEach(indicator => {
    indicator.addEventListener('click', () => {
      indicator.style.animation = 'bounce 0.6s';
      setTimeout(() => {
        indicator.style.animation = '';
      }, 600); // Restablece para que la animación se pueda repetir
    });
  });

  