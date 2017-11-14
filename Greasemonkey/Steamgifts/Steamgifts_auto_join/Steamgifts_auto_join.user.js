// ==UserScript==
// @name            Steamgifts auto join
// @namespace       https://www.steamgifts.com/
// @homepageURL     https://github.com/Gantzyo/Miniscripts/tree/master/Greasemonkey/Steamgifts/Steamgifts_auto_join
// @supportURL      https://github.com/Gantzyo/Miniscripts/issues
// @downloadURL     https://github.com/Gantzyo/Miniscripts/raw/master/Greasemonkey/Steamgifts/Steamgifts_auto_join/Steamgifts_auto_join.user.js
// @include         https://www.steamgifts.com/giveaway/*
// @version         1.1.0
// @grant           none
// @require         https://code.jquery.com/jquery-3.1.1.min.js
// ==/UserScript==

$( document ).ready(function() {
    // SCRIPT
    if(!$('.sidebar__entry-insert').hasClass('is-hidden')) {
     $('.sidebar__entry-insert').click();
    }
});