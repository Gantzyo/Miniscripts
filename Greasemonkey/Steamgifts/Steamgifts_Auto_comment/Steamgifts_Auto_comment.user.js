// ==UserScript==
// @name            Steamgifts Auto comment
// @namespace       https://www.steamgifts.com/
// @homepageURL     https://github.com/Gantzyo/Miniscripts/tree/master/Greasemonkey/Steamgifts/Steamgifts_Auto_comment
// @supportURL      https://github.com/Gantzyo/Miniscripts/issues
// @downloadURL     https://github.com/Gantzyo/Miniscripts/raw/master/Greasemonkey/Steamgifts/Steamgifts_Auto_comment/Steamgifts_Auto_comment.user.js
// @include         https://www.steamgifts.com/giveaway/*
// @version         1.1.0
// @grant           none
// @require         https://code.jquery.com/jquery-3.1.1.min.js
// ==/UserScript==

/*
 TODO:
 - Auto submit message
 - Prevent double message
 - AutoJoin
 */
$(document).ready(function () {
    var autoJoin = false; // Not implemented yet

// Define how long has to be a message and how many times try to generate the message. If the number of tries exceed tryNewMessage, an error will appear and no comment will be sent
    var minimumMessageLength = 5;// If the message is too short (like "thx") another one is generated. Never set this value to less than 1
    var tryNewMessage = 50;// Maximum tries to generate a new message. Never set this value to less than 1

// Define how frequent messages are capitalized. No changes are done if the message already starts with a capital letter
    var randomlyCapitalize = true; // Sometimes messages's first letter is capitalized.
    var chanceRandomCapital = 100; // A chance of 70% will transform "thx" message into "Thx" 70% of time

// Define if checkbox to send message by default is checked
    var checkAutoMessage = false;

// Define your own messages (Picked randomly)
    var thxMessages = [
        "thanks",
        "thanks for the giveaway",
        "thanks for the chance",
        "thx",
        "thx for the giveaway",
        "thx for the chance",
        "thank you",
    ];

// Define your own messages' emoticons (picked randomly). Remember to put a space before the emoticon
    var messageEnding = [
        "",
        " :)",
        " ^^",
        "!",
        "!!",
        " <3"
    ];

// FUNCTIONS

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

// SCRIPT STARTS HERE

    var messageGenerated = false;

    function getRandomValue(array) {
        return array[Math.floor(Math.random() * array.length)];
    }

    function booleanFromRandomPercentage(percentage) {
        var p = percentage / 100;
        return Math.random() < p;
    }

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    function waitUntilGainsClass(object, className, maxWaitTime, waitedTime) {
        if (!object.hasClass(className) && waitedTime <= maxWaitTime) {
            setTimeout(waitUntilGainsClass(object, className, maxWaitTime, waitedTime + 500), 500);
            return true;
        }
        return false;
    }

    function waitUntilLossesClass(object, className, maxWaitTime, waitedTime) {
        if (object.hasClass(className) && waitedTime <= maxWaitTime) {
            setTimeout(waitUntilLossesClass(object, className, maxWaitTime, waitedTime + 500), 500);
            return true;
        }
        return false;
    }

// Auto comment button styles
    addGlobalStyle('.SGAC_autoComment{cursor:pointer;margin-bottom:10px;border-color:#1c467d;color:#fff;background-image:linear-gradient(#7BA7E1 0,#2966B8 100%);background-image:-moz-linear-gradient(#7BA7E1 0,#2966B8 100%);background-image:-webkit-linear-gradient(#7BA7E1 0,#2966B8 100%);text-shadow:1px 1px 1px rgba(100,100,255,.7);border-style:solid;border-width:1px;display:block;font:700 13px/32px "Open Sans",sans-serif;padding:0 15px;text-align:center;border-radius:4px}.SGAC_margin{margin-left:15px}.SGAC_autoComment label{margin:-1px -16px!important;display:block;cursor:pointer}.SGAC_autoComment input{width:5%!important}');

// Auto comment checkbox
    $('.sidebar__entry-loading').after('<div class="SGAC_autoComment" id="SGAC_DefCheckbox"><label><input type="checkbox"/> Send message</label></div>');
// Generate new comment
    $('.comment--submit .comment__username').after('<div class="SGAC_autoComment SGAC_margin SGAC_jQAutoComment" id="SGAC_RerollButton"><i class="fa fa-refresh"></i> Generate new comment</div>');

// Hide auto comment button if you haven't joined the giveaway yet
    if (!$('.sidebar__entry-insert').hasClass('is-hidden')) {
        if (checkAutoMessage) {
            $('#SGAC_DefCheckbox input').prop('checked', true);
        }
    }

// Send a comment when joining a GA
    $('.sidebar__entry-insert').click(function (e) {
        waitUntilGainsClass($('.sidebar__entry-insert'), 'is-hidden', 10000, 0);
        if (waitUntilLossesClass($('.sidebar__entry-delete'), 'is-hidden', 10000, 0)) {
            if ($('#SGAC_DefCheckbox input').prop('checked')) {
                // After 0.5 secs scroll to bottom and add a new message
                setTimeout(function () {
                    $('#SGAC_RerollButton').click();

                    if (messageGenerated) {
                        // Submit the message
                        $('a.comment__submit-button.js__submit-form').click();
                    }
                }, 500);
            }
        } else {
            alert('Error: Seems like you tried to join the giveaway but the proccess didn\'t complete. No message generated.');
        }
    });


    $('.SGAC_jQAutoComment').click(function (e) {
        e.preventDefault();

        var message = "";
        var i = 0;
        var textBox = $("div.comment__description form textarea[name='description']");

        // Reset message field
        textBox.text(message);

        // Check logic
        if (isNaN(minimumMessageLength) || minimumMessageLength < 1 || isNaN(tryNewMessage) || tryNewMessage < 1) {
            messageGenerated = false;
            return alert("Error: Variables minimumMessageLength or tryNewMessage bad configured");
        }

        // Try to get valid message
        while (message.length < minimumMessageLength && i < tryNewMessage) {
            message = getRandomValue(thxMessages) + getRandomValue(messageEnding);
            i++;
        }

        if (i == tryNewMessage) {
            messageGenerated = false;
            return alert("Error: Couldnt create a message with a length of " + minimumMessageLength + " characters");
        }

        // Try to capitalize messages' first letter
        if (randomlyCapitalize && booleanFromRandomPercentage(chanceRandomCapital)) {
            message = capitalizeFirstLetter(message);
        }

        textBox.text(message);

        messageGenerated = true;
    });
});