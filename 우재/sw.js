'use strict';
const CACHE='woojae-doong-v5-3-20261104';
const ASSETS=['./','./index.html','./styles.css','./game.js','./manifest.webmanifest','./icon-192.png','./icon-512.png',
'./assets/scenes/home.webp','./assets/scenes/closet.webp','./assets/scenes/bath.webp','./assets/scenes/sleep.webp','./assets/scenes/feed.webp',
'./assets/characters/outfits/hoodie.png','./assets/characters/expressions/idle.png','./assets/props/doong_sit.png'];
self.addEventListener('install',event=>event.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting())));
self.addEventListener('activate',event=>event.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==CACHE).map(x=>caches.delete(x)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',event=>{if(event.request.method!=='GET')return;let u=new URL(event.request.url);if(u.origin!==self.location.origin)return;event.respondWith(fetch(event.request).then(resp=>{if(resp.ok){let clone=resp.clone();caches.open(CACHE).then(c=>c.put(event.request,clone)).catch(()=>{})}return resp}).catch(()=>caches.match(event.request)))})
