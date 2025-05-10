
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

const iconoCarrito = document.getElementById('iconoCarrito');
const carritoMenu = document.getElementById('carritoMenu');
const carritoItems = document.getElementById('carritoItems');
const carritoVacio = document.getElementById('carritoVacio');
const carritoTotal = document.getElementById('carritoTotal');

// Evento para abrir/cerrar el menú flotante del carrito
iconoCarrito.addEventListener('click', () => {
  carritoMenu.style.display = carritoMenu.style.display === 'block' ? 'none' : 'block';
});

// Botones "Agregar al carrito"
document.querySelectorAll('.btn-agregar-carrito').forEach(boton => {
  boton.addEventListener('click', () => {
    const card = boton.closest('.producto'); // Clase contenedora de cada tarjeta
    const producto = {
      id: card.dataset.id,
      nombre: card.dataset.nombre,
      precio: parseFloat(card.dataset.precio),
      imagen: card.dataset.imagen
    };

    carrito.push(producto);
    guardarCarrito();
    actualizarCarrito();
    mostrarToast(producto.nombre);
  });
});

// Mostrar el contenido del carrito
function actualizarCarrito() {
  carritoItems.innerHTML = '';
  document.getElementById('contadorCarrito').textContent = carrito.length;
  const btnPagar = document.getElementById('btnPagar');
  btnPagar.disabled = carrito.length === 0;
  btnPagar.classList.toggle('disabled', carrito.length === 0);

  if (carrito.length === 0) {
    carritoVacio.style.display = 'block';
    carritoTotal.textContent = 'Total: $0.00';
    return;
  }

  carritoVacio.style.display = 'none';

  let total = 0;
  carrito.forEach((producto, index) => {
    const li = document.createElement('li');
    li.classList.add('producto-carrito');
    li.innerHTML = `
      <img src="${producto.imagen}" alt="${producto.nombre}">
      <div>
        <p class="mb-0">${producto.nombre}</p>
        <small>$${producto.precio.toFixed(2)}</small>
      </div>
      <button class="btn btn-sm btn-danger ms-2" data-index="${index}">&times;</button>
    `;
    carritoItems.appendChild(li);
    total += producto.precio;
  });

  carritoTotal.textContent = `Total: $${total.toFixed(2)}`;

  // Botones para eliminar productos
  document.querySelectorAll('#carritoItems button').forEach(boton => {
    boton.addEventListener('click', () => {
      const index = boton.dataset.index;
      carrito.splice(index, 1);
      guardarCarrito();
      actualizarCarrito();
    });
  });

}


// Guardar carrito en localStorage
function guardarCarrito() {
  localStorage.setItem('carrito', JSON.stringify(carrito));
}

// Mostrar toast personalizado
function mostrarToast(nombreProducto) {
  const toastEl = document.getElementById('toastCarrito');
  toastEl.querySelector('.toast-body').textContent = `"${nombreProducto}" añadido al carrito 🛒`;
  const toast = new bootstrap.Toast(toastEl);
  toast.show();
}

// Inicializar al cargar
actualizarCarrito();

document.addEventListener('click', function (event) {
    const esClickDentro = carritoMenu.contains(event.target) || iconoCarrito.contains(event.target);
    if (!esClickDentro) {
      carritoMenu.style.display = 'none';
    }
  });

// Botón para cerrar el carrito manualmente
const cerrarCarrito = document.getElementById('cerrarCarrito');
cerrarCarrito.addEventListener('click', () => {
  carritoMenu.style.display = 'none';
});


document.getElementById('btnPagar').addEventListener('click', function() {
  window.location.href = 'pago.html'; // o el nombre real de tu página de pago
});
