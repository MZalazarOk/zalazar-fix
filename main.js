// Registro del Service Worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./service-worker.js');
}

// Esperamos a que el DOM esté listo
window.addEventListener('DOMContentLoaded', () => {
  const botones = document.querySelectorAll('.tile');

  botones.forEach(boton => {
    boton.addEventListener('click', () => {
      const accion = boton.innerText.split('\n')[1]; // Tomamos el texto debajo del emoji
      alert(`Función "${accion}" aún no está activa`);
    });
  });
});
