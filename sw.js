const CACHE_NAME = 'flipbook-v1';
// Lista de todos os arquivos que o app precisa para funcionar offline:
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  '/sw.js', 
  '/images/icon-192x192.png',
  // ADICIONAREMOS AQUI DEPOIS: os links para os arquivos do StPageFlip (stpageflip.css e stpageflip.js)
];

// Instalação: Armazena em cache todos os arquivos listados
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Cache aberto');
        return cache.addAll(urlsToCache);
      })
      .catch(err => console.error('Falha ao adicionar cache:', err))
  );
});

// Busca: Tenta servir o arquivo do cache primeiro, se estiver offline
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response; // Serve do cache
        }
        return fetch(event.request); // Se não estiver no cache, busca na internet
      })
  );
});
