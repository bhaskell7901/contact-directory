// TODO: Create a service worker that caches static assets:
const CACHE_NAME = 'cache-v1';
const cachedURLS = [
    '/index.html',
    '/css/styles.css',
    '/images/logo.png',
    '/js/index.js'
];

// Install the service worker
self.addEventListener('install', (e) => {
    e.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(cachedURLS);
        })
    );
});

// activate the service worker
self.addEventListener('activate', (e) => {
    e.waitUntil(
        caches.keys().then((keyList) => {
            return Promise.all(keyList.map((key) => {
                if (key!== CACHE_NAME) {
                    console.log('Removing old cache data', key);
                    return caches.delete(key);
                }
            }));
        })
    );
});

// claim the service worker
self.addEventListener('activate', (e) => {
    e.waitUntil(clients.claim());
});


self.addEventListener('fetch', (e) => {
    e.respondWith(caches.match(e.request).then((res) => res || fetch(e.request)))
});


