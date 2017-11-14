// ==UserScript==
// @name            Steamgifts points checker
// @namespace       https://www.steamgifts.com/
// @homepageURL     https://github.com/Gantzyo/Miniscripts/tree/master/Greasemonkey/Steamgifts/Steamgifts_points_checker
// @supportURL      https://github.com/Gantzyo/Miniscripts/issues
// @downloadURL     https://github.com/Gantzyo/Miniscripts/raw/master/Greasemonkey/Steamgifts/Steamgifts_points_checker/Steamgifts_points_checker.user.js
// @include         https://www.steamgifts.com/*
// @version         1.1.1
// @grant           GM_openInTab
// @grant           GM.openInTab
// @require         https://code.jquery.com/jquery-3.1.1.min.js
// ==/UserScript==

$(document).ready(function () {
// --- FUNCTIONS
    function addGlobalStyle(css) {
        var head, style;
        head = document.getElementsByTagName('head')[0];
        if (!head) {
            return;
        }
        style = document.createElement('style');
        style.type = 'text/css';
        style.innerHTML = css;
        head.appendChild(style);
    }

    function cleanPointsString(string) {
        return string.replace("(", "").replace("P)", "");
    }

    function checkJoinableGiveaways() {
        $('div.giveaway__row-outer-wrap.SGPC_joinable').each(function () {
            var $this = $(this);
            var points = cleanPointsString($this.find('span.giveaway__heading__thin').last().html());
            var totalpoints = $("span.nav__points").html();
            if (totalpoints - points < 0) {
                $this.removeClass('SGPC_joinable');
                $this.addClass('SGPC_nonJoinable');
            }
        });
    }

// --- STYLES
    addGlobalStyle('header{position:fixed!important;left:0!important;right:0!important;top:0!important;margin:0 auto!important;z-index:1!important}.SGPC_nonJoinable{background:rgba(255,0,0,.1)!important}.SGPC_joinable{background:rgba(0,255,0,.1)!important}.SGPC_topWhiteSpace{height:34px}');

// --- NEW ELEMENTS
    $("body").prepend('<div class="SGPC_topWhiteSpace"></div>'); // Add an invisible div to maintain web appearance properly


// --- SCRIPT

// Add 'SGPC_joinable' class to all non-faded giveaways
    $('div.giveaway__row-inner-wrap:not(.is-faded)').each(function () {
        var $this = $(this).parent(); // parent = div.giveaway__row-outer-wrap
        $this.addClass('SGPC_joinable');
    });

// Calculate which giveaways are joinable and which aren't
    checkJoinableGiveaways();

// Prevent default links events
    $("a.giveaway__heading__name").click(function (e) {
        e.preventDefault();
    });

// When a giveaway is automatically joined recalculate which giveaways are joinable and which aren't
// Also track points without needing to reload page
    $("a.giveaway__heading__name").mousedown(function (e) {

        /**
         * ctrlKey -> CONTROL
         * shiftKey -> SHIFT
         * metaKey -> CMD (MAC)
         * which = 1 -> Left Mouse Button
         * which = 2 -> Middle Mouse Button
         */
        if (e.ctrlKey || e.shiftKey || e.metaKey || e.which === 1 || e.which === 2) {
            var $parent = $(this).closest('div.giveaway__row-outer-wrap');

            if ($parent.hasClass('SGPC_joinable')) {
                var totalpoints = $("span.nav__points").html();
                var points = cleanPointsString($parent.find('span.giveaway__heading__thin').last().html());

                totalpoints -= points;

                $("span.nav__points").html(totalpoints);
                $parent.removeClass('SGPC_joinable');
                $parent.addClass('is-faded');

                checkJoinableGiveaways();
            }

            var openInBackground = true;
            GM.openInTab("https://www.steamgifts.com"+$(this).attr("href"), openInBackground);
        }
    });
});