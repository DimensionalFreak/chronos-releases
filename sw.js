const CACHE = 'chronos-mwqmm1v6';
// Saved up front, because the first visit after an update finishes loading before this takes over.
const FILES = ["./","assets/index-BJ8eeG3_.js","assets/BoardView-BCcKkqh8.js","assets/ImportView-kLzT1IvU.js","assets/MySubjects-DBagNCkP.js","assets/SyllabusView-HeJJGwFE.js","assets/TodayView-DWkjpW4v.js","assets/ToolsView-EKOxzRop.js","assets/browser-CTLpmzoy.js","assets/browser-QeRm35f-.js","assets/classify-CPebcieA.js","assets/context-CkY46T7w.js","assets/core-DfmPYgvp.js","assets/createLucideIcon-CJiDP7Dm.js","assets/dist-js--YMG4ZhY.js","assets/dist-js-BDsGV8Nj.js","assets/dist-js-BEDhealK.js","assets/dist-js-C4gj_xy3.js","assets/es-ohVY8qhF.js","assets/featureColors-FS0HTfyI.js","assets/luxon-CnRqhQiE.js","assets/pdf-YwugTw7Y.js","assets/pdf.worker.min-BPK52Uye.js","assets/preload-helper-DclECHGd.js","assets/priority-DmjzG1zQ.js","assets/readPhoto-SWjbJUyS.js","assets/recurrence-G2jD3hAh.js","assets/rolldown-runtime-BCiCTKAo.js","assets/sql-wasm-CUeN2EYf.js","assets/sql-wasm-browser-tHMdPijV.js","assets/sqljsDb-B5amfnzK.js","assets/src-BmUdCsRu.js","assets/tauriDb-yHq3Prql.js","assets/aurora-Z3Hn62g0.svg","assets/dusk-sn7PuvHy.svg","assets/forest-CQdOmnqC.svg","assets/index-DsRZZ3B0.css","assets/inter-cyrillic-ext-wght-normal-BOeWTOD4.woff2","assets/inter-cyrillic-wght-normal-DqGufNeO.woff2","assets/inter-greek-ext-wght-normal-DlzME5K_.woff2","assets/inter-greek-wght-normal-CkhJZR-_.woff2","assets/inter-latin-ext-wght-normal-DO1Apj_S.woff2","assets/inter-latin-wght-normal-Dx4kXJAl.woff2","assets/inter-vietnamese-wght-normal-CBcvBZtf.woff2","assets/ocean-K875lVQK.svg","assets/pdf.worker.min-CIqJB0yW.mjs","assets/planets--VWHtxrJ.svg","assets/sql-wasm-B-9ndiyM.wasm","assets/stars-jGKNJw-X.svg","assets/sunset--0SAooWt.svg"];
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
