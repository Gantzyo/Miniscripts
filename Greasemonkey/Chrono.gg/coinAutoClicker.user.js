// ==UserScript==
// @name            Chrono.gg - Coin Auto Clicker
// @namespace       https://github.com/Gantzyo/
// @homepageURL     https://github.com/Gantzyo/Miniscripts/tree/master/Greasemonkey/Chrono.gg
// @supportURL      https://github.com/Gantzyo/Miniscripts/issues
// @include         https://chrono.gg/*
// @description     Try to click coin each 10 minutes
// @version         1.1.0
// @grant           GM_notification
// @grant           GM.notification
// @grant           window.focus
// @grant           GM_getValue
// @grant           GM_setValue
// @grant           GM.getValue
// @grant           GM.setValue
// @require         https://code.jquery.com/jquery-3.2.1.min.js
// ==/UserScript==

$(document).ready(function () {

    // Meaning of jQuery selectors:
    // loginButton = $("button.modal__button--login");
    // rewardCoin = $("#reward-coin");
    // isCoinClicked = $rewardCoin.hasClass("dead");

    shim_GM_notification();

    // -------------- VARIABLES AND CONFIG
    var $autoRefreshTime = 10 * 60 * 1000;// min * s * ms = 10min
    var $waitForModalTime = 1 * 3 * 1000;// min * s * ms = 3s
    var $maxLoginAttempts = 3;
    var $loginAttempts = GM.getValue("loginAttempts", 0);

    var notificationManuallyLogin = {
        title: 'Chrono.gg - You are not logged in',
        text: 'Coin cannot be autoclicked, you are not logged in.\n\nPlease login.',
        timeout: 10000,
        onclick: function () {
            // console.log ("Notice clicked.");
            window.focus();
        }
    };

    // -------------- NOTIFICATION FUNCTION
    // https://stackoverflow.com/questions/36779883/userscript-notifications-work-on-chrome-but-not-firefox
    /*--- Cross-browser Shim code follows:
     */
    function shim_GM_notification() {
        if (typeof GM.notification === "function") {
            return;
        }
        window.GM.notification = function (ntcOptions) {
            checkPermission();

            function checkPermission() {
                if (Notification.permission === "granted") {
                    fireNotice();
                } else if (Notification.permission === "denied") {
                    alert("User has denied notifications for this page/site!");
                    return;
                } else {
                    Notification.requestPermission(function (permission) {
                        console.log("New permission: ", permission);
                        checkPermission();
                    });
                }
            }

            function fireNotice() {
                if (!ntcOptions.title) {
                    console.log("Title is required for notification");
                    return;
                }
                if (ntcOptions.text && !ntcOptions.body) {
                    ntcOptions.body = ntcOptions.text;
                }
                var ntfctn = new Notification(ntcOptions.title, ntcOptions);

                if (ntcOptions.onclick) {
                    ntfctn.onclick = ntcOptions.onclick;
                }
                if (ntcOptions.timeout) {
                    setTimeout(function () {
                        ntfctn.close();
                    }, ntcOptions.timeout);
                }
            }
        }
    }

    // -------------- CUSTOM FUNCTIONS

    function isUserLoggedOut() {
        return $("a.cd-signin").length;
    }
    
    function isLoginModalOpen() {
        return $("div.signin-modal__overlay").length;
    }
    
    function isCoinClicked() {
        return $("#reward-coin").hasClass("dead");
    }

    // -------------- SCRIPT
    // Wait until login modal is loaded


    // If not logged in, try to automatically login
    if (isUserLoggedOut()) {
        // Click coin to force login modal to get open.
        $("#reward-coin").click();
        // Wait until it's open
        setTimeout(function () {
            if ($loginAttempts >= $maxLoginAttempts) {
                // Notify user to manually login
                GM.notification(notificationManuallyLogin);
            } else if (isLoginModalOpen()) {
                // Login Modal is open, try to log in
                $loginAttempts++; // Increase login tries
                $("button.modal__button--login").click();
            } else {
                // Notify user to manually login
                GM.notification(notificationManuallyLogin);
            }
        }, $waitForModalTime);
    } else {
        if ($loginAttempts > 0) {
            $loginAttempts = 0;
            GM.setValue("loginAttempts", $loginAttempts); // Reset login tries
        }
    }

    // Click coin
    if (!isCoinClicked()) {
        $("#reward-coin").click();
    }

    // Refresh page automatically
    setTimeout(function () {
        if ($loginAttempts > 0) {
            GM.setValue("loginAttempts", $loginAttempts);
        }
        location.reload();
    }, $autoRefreshTime);
});