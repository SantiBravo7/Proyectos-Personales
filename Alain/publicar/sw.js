/* cotizacionesJT: guarda la app para usarla sin conexión.
   Cambiar VERSION al publicar cambios fuerza a renovar lo guardado. */
const VERSION = "v2";
const CACHE = "cotizacionesjt-" + VERSION;
const FILES = ["./", "./index.html", "./manifest.webmanifest", "./icon-192.png", "./icon-512.png", "./icon-maskable-512.png", "./apple-touch-icon.png"];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys().then(keys => Promise.all(keys.filter(k => k.startsWith("cotizacionesjt-") && k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

/* Responde desde lo guardado y, si hay conexión, lo renueva para la próxima vez. */
self.addEventListener("fetch", e => {
  const req = e.request;
  if(req.method !== "GET" || new URL(req.url).origin !== location.origin) return;
  const key = req.mode === "navigate" ? "./index.html" : req;
  e.respondWith(
    caches.open(CACHE).then(async cache => {
      const hit = await cache.match(key, { ignoreSearch: true });
      const net = fetch(req).then(res => { if(res.ok) cache.put(key, res.clone()); return res; }).catch(() => null);
      if(hit){ e.waitUntil(net); return hit; }
      return (await net) || new Response("Sin conexión", { status: 503, headers: { "Content-Type": "text/plain; charset=utf-8" } });
    })
  );
});
