//! UpUp
//! version : 0.3.0
//! author  : Tal Ater @TalAter
//! license : MIT
//! https://github.com/TalAter/UpUp
(function(e){"use strict";var t=this,o=navigator.serviceWorker;if(!o)return t.UpUp=null,e;var n={"service-worker-url":"/upup.sw.min.js"},r=!1;t.UpUp={start:function(e){this.addSettings(e),o.register(n["service-worker-url"],{scope:"/"}).then(function(e){r&&console.log("Service worker registration successful with scope: %c"+e.scope,"font-weight: bold; color: #00f;"),(e.installing||o.controller).postMessage({action:"set-settings",settings:n})}).catch(function(e){r&&console.log("Service worker registration failed: %c"+e,"font-weight: bold; color: #00f;")})},addSettings:function(t){"string"==typeof(t=t||{})&&(t={content:t}),["content","content-url","assets","service-worker-url","cache-version"].forEach(function(o){t[o]!==e&&(n[o]=t[o])})},debug:function(e){r=!(arguments.length>0)||!!e}}}).call(this);
//# sourceMappingURL=upup.min.js.map
