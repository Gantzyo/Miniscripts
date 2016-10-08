// ==UserScript==
// @name            Steamgifts points checker
// @namespace       https://www.steamgifts.com/
// @homepageURL     https://github.com/Gantzyo/Miniscripts/tree/master/Greasemonkey/Steamgifts/Steamgifts_points_checker
// @supportURL      https://github.com/Gantzyo/Miniscripts/issues
// @downloadURL     https://github.com/Gantzyo/Miniscripts/raw/master/Greasemonkey/Steamgifts/Steamgifts_points_checker/Steamgifts_points_checker.user.js
// @include         https://www.steamgifts.com/*
// @version         1.0.5
// @grant           GM_addStyle
// @grant           GM_getResourceText
// @grant           GM_openInTab
// @require         https://code.jquery.com/jquery-3.1.1.min.js
// @resource        styles https://raw.githubusercontent.com/Gantzyo/Miniscripts/master/Greasemonkey/Steamgifts/Steamgifts_points_checker/resources/styles.css
// ==/UserScript==


// --- FUNCTIONS
function cleanPointsString(string) {
    return string.replace("(", "").replace("P)", "");
}

function checkJoinableGiveaways() {
    $('div.giveaway__row-outer-wrap.SGPC_joinable').each(function () {
        var $this = $(this);
        var points = cleanPointsString($this.find('span.giveaway__heading__thin:last-of-type').html());
        var totalpoints = $("span.nav__points").html();
        if (totalpoints - points < 0) {
            $this.removeClass('SGPC_joinable');
            $this.addClass('SGPC_nonJoinable');
        }
    });
}

// --- STYLES
GM_addStyle(GM_getResourceText("styles"));


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
            var points = cleanPointsString($parent.find('span.giveaway__heading__thin').html());

            totalpoints -= points;

            $("span.nav__points").html(totalpoints);
            $parent.removeClass('SGPC_joinable');
            $parent.addClass('is-faded');

            checkJoinableGiveaways();

            var openInBackground = true;
            GM_openInTab($(this).attr("href"), openInBackground);
        }
    }
});