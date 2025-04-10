import './style.css';

window.addEventListener('DOMContentLoaded', () => {
  const app = document.querySelector('#app');
  if (app) {
    app.innerHTML = `
      <h1>Zalazar Fix</h1>
      <p>Aplicación para quitar filtros de fotos.</p>
    `;
  }
});

// Registro del Service Worker (PWA)
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./service-worker.js');
}
