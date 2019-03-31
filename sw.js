const staticCacheVersion = 'Restaurant-Cache-v1';

const restaurantCache = [
  '/',
  '/index.html',
  '/restaurant.html',
  '/css/styles.css',
  '/css/responsive.css',
  '/js/main.js',
  '/js/restaurant_info.js',
  '/js/dbhelper.js',
  '/data/restaurants.json',
  '/img/1_1x.jpg',
  '/img/1_2x.jpg',
  '/img/2_1x.jpg',
  '/img/2_2x.jpg',
  '/img/3_1x.jpg',
  '/img/3_2x.jpg',
  '/img/4_1x.jpg',
  '/img/4_2x.jpg',
  '/img/5_1x.jpg',
  '/img/5_2x.jpg',
  '/img/6_1x.jpg',
  '/img/6_2x.jpg',
  '/img/7_1x.jpg',
  '/img/7_2x.jpg',
  '/img/8_1x.jpg',
  '/img/8_2x.jpg',
  '/img/9_1x.jpg',
  '/img/9_2x.jpg',
  '/img/10_1x.jpg',
  '/img/10_2x.jpg',
];

/* Setup the cache on install
 */
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(staticCacheVersion)
    .then(cache => {
      return cache.addAll(restaurantCache);
    })
  );
});

/* If the cache version has updated install a new one
 */
self.addEventListener('activate', event =>{
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.filter(cacheName => {
          return cacheName.startsWith('Restaurant-Cache-') && cacheName != staticCacheVersion;
        }).map(cacheName => {
          return caches.delete(cacheName);
        }));
    })
  );
});

/* Interrupt fetches and check if the content is in cache or fetch it
 */
self.addEventListener('fetch', event =>{
  event.respondWith(
    caches.match(event.request, { ignoreSearch: true }).then(response => {
        if(response) {
          return response;
        }
        return fetch(event.request);
      })
      .catch(
        err => console.log(err))
  );
});
