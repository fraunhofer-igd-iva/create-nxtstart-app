// To disable all workbox logging during development, you can set self.__WB_DISABLE_DEV_LOGS to true
// https://developers.google.com/web/tools/workbox/guides/configure-workbox#disable_logging
// the worker needs to be reregistered for this to take effect (unregsiter in dev tools and restart server)
// dev tools -> application -> service workers -> unregister
// -> restart app

self.__WB_DISABLE_DEV_LOGS = true

// add worker functions here
// the worker needs to be reregistered for this to take effect (unregsiter in dev tools and restart server)
// dev tools -> application -> service workers -> unregister
// -> restart app

// caching strategies, see https://web.dev/learn/pwa/serving/#caching-strategies
// example using cache first
/*self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(cachedResponse => {
          // It can update the cache to serve updated content on the next request
          return cachedResponse || fetch(event.request)
        }
      )
  )
})*/

// caching strategies, see https://web.dev/learn/pwa/serving/#caching-strategies
// example using network first
self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request).catch(() => {
      return caches.match(event.request)
    })
  )
})
