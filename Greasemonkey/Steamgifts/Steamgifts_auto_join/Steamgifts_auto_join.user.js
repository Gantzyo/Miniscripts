// ==UserScript==
// @name            Steamgifts auto join
// @namespace       https://www.steamgifts.com/
// @homepageURL     https://github.com/Gantzyo/Miniscripts/tree/master/Greasemonkey/Steamgifts/Steamgifts_auto_join
// @supportURL      https://github.com/Gantzyo/Miniscripts/issues
// @downloadURL     https://github.com/Gantzyo/Miniscripts/raw/master/Greasemonkey/Steamgifts/Steamgifts_auto_join/Steamgifts_auto_join.user.js
// @include         https://www.steamgifts.com/giveaway/*
// @version         1.0.4
// @grant           GM_getValue
// @grant           GM_setValue
// @require         https://code.jquery.com/jquery-3.1.1.min.js
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
}, getRandomInt(125, 250)); // Random delay before pressing the button

