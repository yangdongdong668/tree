"use strict";var precacheConfig=[["./index.html","0fa7d46dc1aa04f33428ea356ae125f2"],["./static/css/main.fa843e52.css","97c3ef79cb70f78e587bd3958d8a335d"],["./static/js/config.js","115d7f340ec9c4f721278365bb70da06"],["./static/media/card_erweima.86aaaf5f.png","86aaaf5fe445cc421997d1adc84a669f"],["./static/media/default-skin.b257fa9c.svg","b257fa9c5ac8c515ac4d77a667ce2943"],["./static/media/founder_pic.9edb6753.png","9edb67537251c12375224e61fdb94f43"],["./static/media/icon_divide_fyhj.2aead536.png","2aead5365acec048bc73942358ab488d"],["./static/media/icon_play1@2x.931eebd5.png","931eebd5ebee76aecd4508d2c4b75a00"],["./static/media/kinderdarden-dashu.f130c83c.png","f130c83cb1d1dde09cf7ecc0ac9e0dfc"],["./static/media/logo.552e2e23.png","552e2e23ff3cb61e66a3f2f62ec910b2"],["./static/media/logo_guide_483.5e4479a7.png","5e4479a7958386c98528a2e0c7b543f1"],["./static/media/noContent.d3143ffb.png","d3143ffb6e1a3f4ca759730b3b62e213"],["./static/media/pic_about.e1c6eac4.png","e1c6eac43b243c9862fe93328ca5eee6"],["./static/media/pic_tskc.88b28834.png","88b28834d591539a4e0ccf7492fa7d87"],["./static/media/pic_yczp.d89de0bc.png","d89de0bcde8933af6d5d408298a7a72e"],["./static/media/pic_yczp_banner.c523ed0d.png","c523ed0dfd5a9c03fee578b106ba5048"]],cacheName="sw-precache-v3-sw-precache-webpack-plugin-"+(self.registration?self.registration.scope:""),ignoreUrlParametersMatching=[/^utm_/],addDirectoryIndex=function(e,t){var a=new URL(e);return"/"===a.pathname.slice(-1)&&(a.pathname+=t),a.toString()},cleanResponse=function(t){return t.redirected?("body"in t?Promise.resolve(t.body):t.blob()).then(function(e){return new Response(e,{headers:t.headers,status:t.status,statusText:t.statusText})}):Promise.resolve(t)},createCacheKey=function(e,t,a,n){var c=new URL(e);return n&&c.pathname.match(n)||(c.search+=(c.search?"&":"")+encodeURIComponent(t)+"="+encodeURIComponent(a)),c.toString()},isPathWhitelisted=function(e,t){if(0===e.length)return!0;var a=new URL(t).pathname;return e.some(function(e){return a.match(e)})},stripIgnoredUrlParameters=function(e,a){var t=new URL(e);return t.hash="",t.search=t.search.slice(1).split("&").map(function(e){return e.split("=")}).filter(function(t){return a.every(function(e){return!e.test(t[0])})}).map(function(e){return e.join("=")}).join("&"),t.toString()},hashParamName="_sw-precache",urlsToCacheKeys=new Map(precacheConfig.map(function(e){var t=e[0],a=e[1],n=new URL(t,self.location),c=createCacheKey(n,hashParamName,a,/\.\w{8}\./);return[n.toString(),c]}));function setOfCachedUrls(e){return e.keys().then(function(e){return e.map(function(e){return e.url})}).then(function(e){return new Set(e)})}self.addEventListener("install",function(e){e.waitUntil(caches.open(cacheName).then(function(n){return setOfCachedUrls(n).then(function(a){return Promise.all(Array.from(urlsToCacheKeys.values()).map(function(t){if(!a.has(t)){var e=new Request(t,{credentials:"same-origin"});return fetch(e).then(function(e){if(!e.ok)throw new Error("Request for "+t+" returned a response with status "+e.status);return cleanResponse(e).then(function(e){return n.put(t,e)})})}}))})}).then(function(){return self.skipWaiting()}))}),self.addEventListener("activate",function(e){var a=new Set(urlsToCacheKeys.values());e.waitUntil(caches.open(cacheName).then(function(t){return t.keys().then(function(e){return Promise.all(e.map(function(e){if(!a.has(e.url))return t.delete(e)}))})}).then(function(){return self.clients.claim()}))}),self.addEventListener("fetch",function(t){if("GET"===t.request.method){var e,a=stripIgnoredUrlParameters(t.request.url,ignoreUrlParametersMatching),n="index.html";(e=urlsToCacheKeys.has(a))||(a=addDirectoryIndex(a,n),e=urlsToCacheKeys.has(a));var c="./index.html";!e&&"navigate"===t.request.mode&&isPathWhitelisted(["^(?!\\/__).*"],t.request.url)&&(a=new URL(c,self.location).toString(),e=urlsToCacheKeys.has(a)),e&&t.respondWith(caches.open(cacheName).then(function(e){return e.match(urlsToCacheKeys.get(a)).then(function(e){if(e)return e;throw Error("The cached response that was expected is missing.")})}).catch(function(e){return console.warn('Couldn\'t serve response for "%s" from cache: %O',t.request.url,e),fetch(t.request)}))}});