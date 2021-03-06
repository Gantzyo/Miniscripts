// ==UserScript==
// @name            Twitter Auto refresh
// @namespace       https://github.com/Gantzyo/
// @homepageURL     https://github.com/Gantzyo/Miniscripts/tree/master/Greasemonkey/srrDB
// @supportURL      https://github.com/Gantzyo/Miniscripts/issues
// @include         https://twitter.com/*
// @description     Refresca la timeline automáticamente cada 10 segundos
// @version         1.2.0
// @grant           GM_getValue
// @grant           GM_setValue
// @grant           GM.getValue
// @grant           GM.setValue
// @require         https://code.jquery.com/jquery-3.1.1.min.js
// ==/UserScript==

$(document).ready(function () {

    // -------------- FUNCTIONS
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

    // -------------- STYLES
    addGlobalStyle("#tar_refreshBtn {padding: 0px 0px !important;}");
    addGlobalStyle(".tar_recolorBtnBorder {border-color: rgba(0,0,0,0) !important;}");// Transparent border



    // -------------- VARIABLES AND CONFIG
    var autorefresh = GM.getValue("autorefresh", false);// False by default

    // Autorefresh button
    $("#global-actions").append("<li><span id='tar_refreshBtn' class='Icon Icon--refresh Icon--large btn'></span></li>"); // Bugged icon
    // $("#global-actions").append("<li><span id='tar_refreshBtn' class='Icon Icon--lightning Icon--large btn'></span></li>"); // Color classes: primary-btn u-bgUserColor

    // Configuration of the observer:
    var $config = {
        childList: true
    };

    var $target = $("div.stream-item.js-new-items-bar-container")[0];



    // -------------- FUNCTIONS
    function setButtonStyles() {
        if (autorefresh) {
            $("#tar_refreshBtn").addClass("primary-btn u-bgUserColor tar_recolorBtnBorder");
        } else {
            $("#tar_refreshBtn").removeClass("primary-btn u-bgUserColor tar_recolorBtnBorder");
        }
    }

    function decideObserverStatus() {
        if (autorefresh) {
            observer.observe($target, $config); // Start the observer
        } else {
            observer.disconnect();
        }
    }


    // -------------- TRIGGERS
    // Create an observer instance
    var observer = new MutationObserver(function (mutations) {
        mutations.forEach(function (mutation) {
            var newNodes = mutation.addedNodes; // DOM NodeList
            if (autorefresh && newNodes !== null) { // If there are new nodes added
                var $nodes = $(newNodes); // jQuery set
                $nodes.each(function () {
                    var $node = $(this);
                    if ($node.hasClass("new-tweets-bar") && $(document).scrollTop() < 500) {
                        $node.click();
                    }
                });
            }
        });
    });

    // The observer will work when we are at the top of the page.
    // If new tweets have been created and we were reading the old ones, new tweets will never get clicked
    // Click new tweets if we scrolled to the top
    $(window).scroll(function () {
        if (autorefresh && $(document).scrollTop() < 500) {
            var newTweets = $(".new-tweets-bar")[0];
            if (newTweets) {
                newTweets.click();
            }
        }
    });

    $("#tar_refreshBtn").click(function () {
        autorefresh = !autorefresh;
        $(window).scroll();// Trigger scroll event to click new tweets if necessary
        setButtonStyles();
        decideObserverStatus();
        GM.setValue("autorefresh", autorefresh);
    });



    // -------------- INIT
    // Pass in the target node, as well as the observer options
    decideObserverStatus();
    setButtonStyles();
});