// ==UserScript==
// @name        Steamgifts auto join
// @namespace   https://www.steamgifts.com/
// @include     https://www.steamgifts.com/giveaway/*
// @version     1.0.0
// @grant       GM_getValue
// @grant       GM_setValue
// @require     https://code.jquery.com/jquery-3.1.1.min.js
// ==/UserScript==


/**
 * Returns a random number between min (inclusive) and max (exclusive)
 */
function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

/**
 * Returns a random integer between min (inclusive) and max (inclusive)
 * Using Math.round() will give you a non-uniform distribution!
 */
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// SCRIPT

setTimeout(function() {
    if(!$('.sidebar__entry-insert').hasClass('is-hidden')) {
     $('.sidebar__entry-insert').click();
    }
}, getRandomInt(250, 2500)); // Random delay before pressing the button
