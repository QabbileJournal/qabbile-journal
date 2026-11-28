const CACHE = 'hesabyar-v2.4.4-jalali-checks-2026-11-28';
const ASSETS = ['./', './index.html', './style.css', './app.js', './i18n.js', './icon.svg', './icon-192.png', './icon-512.png', './icon-180.png', './manifest.webmanifest', ...['studio','night','sage','obsidian','platinum','royal','rose','emerald','sand'].flatMap(t => [`./themes/${t}.svg`,`./themes/${t}.webmanifest`,`./themes/${t}-180.png`,`./themes/${t}-192.png`,`./themes/${t}-512.png`])];
self.addEventListener('install', event => event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(ASSETS)).then(() => self.skipWaiting())));
self.addEventListener('activate', event => event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(key => key.startsWith('hesabyar-') && key !== CACHE).map(key => caches.delete(key)))).then(() => self.clients.claim())));
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET' || new URL(event.request.url).origin !== self.location.origin) return;
  event.respondWith(fetch(event.request).then(response => {
    if (response.ok) { const copy = response.clone(); caches.open(CACHE).then(cache => cache.put(event.request, copy)); }
    return response;
  }).catch(() => caches.match(event.request)));
});
