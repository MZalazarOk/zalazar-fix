import './style.css';

document.querySelector('#app').innerHTML = `
  <h1>Zalazar Fix</h1>
  <p>Aplicación para quitar filtros de fotos.</p>
`;
// Registro del Service Worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/service-worker.js');
}
