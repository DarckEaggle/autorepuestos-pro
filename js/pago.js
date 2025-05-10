const modal = new bootstrap.Modal(document.getElementById('modalPago'));
const modalTitulo = document.getElementById('modalTitulo');
const formulario = document.getElementById('formularioPago');
const mensajePago = document.getElementById('mensajePago');

const formulariosPorMetodo = {
  tarjeta: `
    <div class="mb-3">
      <label class="form-label">Número de tarjeta</label>
      <input type="text" class="form-control" placeholder="•••• •••• •••• ••••" required>
    </div>
    <div class="mb-3">
      <label class="form-label">Nombre en la tarjeta</label>
      <input type="text" class="form-control" placeholder="Perla Paifa" required>
    </div>
    <div class="row">
      <div class="col">
        <label class="form-label">Expira</label>
        <input type="text" class="form-control" placeholder="MM/AA" required>
      </div>
      <div class="col">
        <label class="form-label">CVV</label>
        <input type="text" class="form-control" placeholder="123" required>
      </div>
    </div>
  `,
  efectivo: `
    <p>Se generará un ticket con instrucciones para pagar en tiendas como OXXO, 7-Eleven o farmacias.</p>
    <p class="fw-bold">Total: $100 MXN</p>
  `,
  paypal: `
    <div class="mb-3">
      <label class="form-label">Correo de PayPal</label>
      <input type="email" class="form-control" placeholder="usuario@correo.com" required>
    </div>
  `,
  transferencia: `
    <p>Realiza una transferencia a la siguiente cuenta:</p>
    <ul>
      <li><strong>Banco:</strong> Bancomer</li>
      <li><strong>Cuenta:</strong> 1234567890</li>
      <li><strong>CLAVE:</strong> 012345678901234567</li>
    </ul>
    <div class="mb-3">
      <label class="form-label">Sube el comprobante</label>
      <input type="file" class="form-control" required>
    </div>
  `
};

let metodoSeleccionado = null;

// Abrir modal y cargar formulario según el método de pago
document.querySelectorAll('.list-group-item').forEach(item => {
  item.addEventListener('click', () => {
    metodoSeleccionado = item.getAttribute('data-metodo');
    modalTitulo.textContent = `Pago con ${item.textContent}`;
    formulario.innerHTML = formulariosPorMetodo[metodoSeleccionado];
    mensajePago.classList.add('d-none');
    modal.show();
  });
});

// Botón pagar: validar campos y simular redirección
document.getElementById('btnPagar').addEventListener('click', () => {
  const campos = formulario.querySelectorAll('input[required]');
  let valid = true;

  // Validación de campos requeridos
  campos.forEach(input => {
    if (!input.value.trim()) {
      input.classList.add('is-invalid');
      valid = false;
    } else {
      input.classList.remove('is-invalid');
    }
  });

  // Si es efectivo o validación correcta
  if (valid || metodoSeleccionado === 'efectivo') {
    // Mostrar spinner de "procesando"
    formulario.innerHTML = `
      <div class="text-center">
        <div class="spinner-border text-light" role="status"></div>
        <p class="mt-3">Procesando pago, por favor espera...</p>
      </div>
    `;

    // Simulación de espera y mensaje final
    setTimeout(() => {
      formulario.innerHTML = `
        <div class="text-center">
          <h4 class="mb-3">✅ ¡Gracias por tu compra!</h4>
          <p>Tu pago ha sido registrado exitosamente.</p>
        </div>
      `;
    }, 2000);
  }
});
