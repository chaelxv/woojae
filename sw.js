'use strict';
const CACHE='woojae-doong-v4-art-20261103';
const CORE=['./','./index.html','./styles.css','./game.js','./manifest.webmanifest','./icon-192.png','./icon-512.png',
'./assets/logo.webp','./assets/scenes/home.webp','./assets/scenes/closet.webp','./assets/scenes/bath.webp','./assets/scenes/sleep.webp','./assets/scenes/cook.webp','./assets/scenes/feed.webp'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(CORE)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;const u=new URL(e.request.url);if(u.origin!==location.origin)return;e.respondWith(fetch(e.request).then(res=>{if(res.ok){let copy=res.clone();caches.open(CACHE).then(c=>c.put(e.request,copy)).catch(()=>{})}return res}).catch(()=>caches.match(e.request)))});
