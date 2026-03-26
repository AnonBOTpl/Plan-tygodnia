const CACHE_NAME = 'plan-cache-v1';
const urlsToCache =[
  './',
  './index.html',
  './manifest.json'
];

// Instalacja i zapisanie plików w pamięci telefonu (dla działania offline)
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

// Zwracanie plików z pamięci, gdy nie ma internetu
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});

// Gdy klikniesz w powiadomienie na pasku telefonu - otworzy się aplikacja
self.addEventListener('notificationclick', event => {
  event.notification.close();
  event.waitUntil(
    clients.matchAll({ type: 'window' }).then(windowClients => {
      if (windowClients.length > 0) {
        windowClients[0].focus();
      } else {
        clients.openWindow('./index.html');
      }
    })
  );
});
