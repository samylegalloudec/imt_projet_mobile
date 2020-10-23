const FILES_TO_CACHE = [
    '/',
    'app.js',
    'https://cdn.jsdelivr.net/npm/@ionic/core/css/ionic.bundle.css',
    'https://unpkg.com/@ionic/pwa-elements@3.0.1/dist/ionicpwaelements/ionicpwaelements.js',
    'https://unpkg.com/@ionic/pwa-elements@3.0.1/dist/ionicpwaelements/ionicpwaelements.esm.js',
    'https://devfest-nantes-2018-api.cleverapps.io/speakers',
    'https://devfest-nantes-2018-api.cleverapps.io/sessions',
    '/images/IMT_Atlantique_logo.png',
    'https://cdn.jsdelivr.net/npm/@ionic/core/dist/ionic/',


];
const STATIC_CACHE_NAME = 'pages-cache-v1';
self.addEventListener('install', event => {
    console.log('Installation du Service Worker...');
    console.log('Mise en cache des ressources');
    event.waitUntil(
        caches.open(STATIC_CACHE_NAME)
            .then(cache => {
                return cache.addAll(FILES_TO_CACHE);
            })
    );
});

self.addEventListener('activate', event => {
    console.log('Activation du Service Worker...');
});
self.addEventListener('fetch', event => {
    console.log('Fetching:', event.request.url);
    event.respondWith(
        caches.match(event.request).then(response => {
            if (response) {
                console.log(event.request.url, 'servi depuis le cache');
                console.log('response : ', response);
                return response;
            }
            console.log(event.request.url, 'servi depuis le réseau');
            return fetch(event.request)
        })
            .then(function (response) {
                return caches.open(STATIC_CACHE_NAME).then(cache => {
                    // mise en cache des ressources qui ne contiennent pas no.cache
                    if (event.request.url.indexOf('no.cache') < 0) {
                        cache.put(event.request.url, response.clone());
                    }
                    return response;
                });
            })

            .catch(error => {
                console.log("oops");
            })
    );
});

