const CACHE = 'chronos-mw64psdv';
// Saved up front, because the first visit after an update finishes loading before this takes over.
const FILES = ["./","assets/index-O5vtbWlD.js","assets/BoardView-C-cUEECL.js","assets/ImportView-9Fpl3vh_.js","assets/TasksView-Cp8UUZeB.js","assets/browser-CeUIlBQ5.js","assets/context-BgXryBdi.js","assets/core-DfmPYgvp.js","assets/createLucideIcon-B_wDQUJO.js","assets/dist-js--YMG4ZhY.js","assets/dist-js-BDsGV8Nj.js","assets/dist-js-BEDhealK.js","assets/dist-js-C4gj_xy3.js","assets/luxon-CnRqhQiE.js","assets/pdf-YwugTw7Y.js","assets/pdf.worker.min-BPK52Uye.js","assets/readPhoto-ByC9-o_B.js","assets/rolldown-runtime-BCiCTKAo.js","assets/sql-wasm-CUeN2EYf.js","assets/sql-wasm-browser-tHMdPijV.js","assets/sqljsDb-7c31ZO_m.js","assets/src-BmUdCsRu.js","assets/tauriDb-syyl9_PT.js","assets/index-DNnm7rfa.css","assets/inter-cyrillic-ext-wght-normal-BOeWTOD4.woff2","assets/inter-cyrillic-wght-normal-DqGufNeO.woff2","assets/inter-greek-ext-wght-normal-DlzME5K_.woff2","assets/inter-greek-wght-normal-CkhJZR-_.woff2","assets/inter-latin-ext-wght-normal-DO1Apj_S.woff2","assets/inter-latin-wght-normal-Dx4kXJAl.woff2","assets/inter-vietnamese-wght-normal-CBcvBZtf.woff2","assets/pdf.worker.min-CIqJB0yW.mjs","assets/planets-DA5w7O9s.svg","assets/sql-wasm-B-9ndiyM.wasm","assets/stars-jGKNJw-X.svg"];
self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE).then((cache) => cache.addAll(FILES)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((names) => Promise.all(names.filter((name) => name !== CACHE).map((name) => caches.delete(name))))
      .then(() => self.clients.claim()),
  );
});
self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET' || new URL(request.url).origin !== self.location.origin) return;
  event.respondWith(
    fetch(request)
      .then((response) => {
        if (response.ok) {
          const copy = response.clone();
          event.waitUntil(caches.open(CACHE).then((cache) => cache.put(request, copy)));
        }
        return response;
      })
      .catch(async () => {
        const saved = await caches.match(request, { ignoreVary: true });
        if (saved) return saved;
        if (request.mode === 'navigate') {
          const page = await caches.match('./', { ignoreVary: true });
          if (page) return page;
        }
        return Response.error();
      }),
  );
});
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    self.clients.matchAll({ type: 'window' }).then((open) => (open[0] ? open[0].focus() : self.clients.openWindow('./'))),
  );
});
