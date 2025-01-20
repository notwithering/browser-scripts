// ==UserScript==
// @name         SandPile Firefox Axios Patch
// @namespace    https://discord.com/users/432983959522246657
// @version      2025-01-19
// @description  Fix 'Uncaught ReferenceError: axios is not defined' in SandPile on Firefox
// @author       WitheringAway
// @match        https://sandpile.xyz/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=sandpile.xyz
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    var script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js';
    script.type = 'text/javascript';
    document.head.appendChild(script);
})();