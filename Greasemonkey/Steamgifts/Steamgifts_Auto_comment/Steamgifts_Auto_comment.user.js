// ==UserScript==
// @name            Steamgifts Auto comment
// @namespace       https://www.steamgifts.com/
// @homepageURL     https://github.com/Gantzyo/Miniscripts/tree/master/Greasemonkey/Steamgifts/Steamgifts_Auto_comment
// @supportURL      https://github.com/Gantzyo/Miniscripts/issues
// @updateURL       https://github.com/Gantzyo/Miniscripts/raw/master/Greasemonkey/Steamgifts/Steamgifts_Auto_comment/Steamgifts_Auto_comment.meta.js
// @downloadURL     https://github.com/Gantzyo/Miniscripts/raw/master/Greasemonkey/Steamgifts/Steamgifts_Auto_comment/Steamgifts_Auto_comment.user.js
// @include         https://www.steamgifts.com/giveaway/*
// @version         1.0.2
// @grant           GM_addStyle
// @grant           GM_getResourceURL
// @require         https://code.jquery.com/jquery-3.1.1.min.js
// @resource        styles https://raw.githubusercontent.com/Gantzyo/Miniscripts/master/Greasemonkey/Steamgifts/Steamgifts_Auto_comment/resources/styles.css
// ==/UserScript==

/*
 TODO:
 - Auto submit message
 - Prevent double message
 - AutoJoin
 */

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
GM_addStyle(GM_getResourceURL("styles"));

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