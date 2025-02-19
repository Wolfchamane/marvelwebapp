const version = import.meta.env.VITE_APP_VERSION;
const cacheKey = `marvelwebapp::${version}`;

function tomorrow() {
	return Date.now() + Number(24 * 60 * 60 * 1000);
}

self.addEventListener('fetch', e => {
	if (['font', 'image', 'json'].includes(e.request.destination)) {
		e.respondWith(caches.open(cacheKey)).then(cache => {
			return cache.match(e.request.url).then(cachedResponse => {
				if (cachedResponse && Date.now() <= cachedResponse.expiration) {
					return cachedResponse.data;
				}

				return fetch(e.request).then(fetchedResponse => {
					cache.put(e.request, {
						expiration: tomorrow(),
						data: fetchedResponse.clone(),
					});

					return fetchedResponse;
				});
			});
		});
	}
});
