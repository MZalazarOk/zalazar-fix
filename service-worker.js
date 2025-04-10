self.addEventListener('install', event => {
  console.log('Zalazar Fix instalado');
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  console.log('Zalazar Fix activado');
});

self.addEventListener('fetch', event => {
  event.respondWith(fetch(event.request));
});
