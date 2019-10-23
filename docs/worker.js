importScripts('serviceworker-cache-polyfill.js');

self.addEventListener('install', function(event) {
  if (self.skipWaiting) { self.skipWaiting(); }

  event.waitUntil(
    caches.open('editsaurus-service-worker').then(function(cache) {
      return cache.addAll([
        './',
        'css/style.min.css',
        'js/script.min.js',
        '//cdn.jsdelivr.net/pure/0.6.0/pure-min.css',
        '//cdn.jsdelivr.net/pure/0.6.0/grids-responsive-old-ie-min.css',
        '//cdn.jsdelivr.net/pure/0.6.0/grids-responsive-min.css',
        '//netdna.bootstrapcdn.com/font-awesome/4.1.0/css/font-awesome.min.css',
        '//fonts.googleapis.com/css?family=Merriweather:400,700,400italic',
        '//ajax.googleapis.com/ajax/libs/angularjs/1.4.9/angular.min.js',
        '//ajax.googleapis.com/ajax/libs/angularjs/1.4.9/angular-sanitize.min.js'
      ]);
    })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    })
  );
});