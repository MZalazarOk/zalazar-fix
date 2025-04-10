self.addEventListener('install', event => {
  console.log('Zalazar Fix instalado');
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  console.log('Zalazar Fix activo');
});

self.addEventListener('fetch', event => {
  // Estrategia simple para cache si querés después
});
