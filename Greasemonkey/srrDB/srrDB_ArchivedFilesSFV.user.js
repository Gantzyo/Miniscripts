// ==UserScript==
// @name            srrDB Archived Files SFV
// @namespace       https://www.srrdb.com/
// @homepageURL     https://github.com/Gantzyo/Miniscripts/tree/master/Greasemonkey/srrDB
// @supportURL      https://github.com/Gantzyo/Miniscripts/issues
// @downloadURL     https://github.com/Gantzyo/Miniscripts/raw/master/Greasemonkey/srrDB/srrDB_ArchivedFilesSFV.user.js
// @include         https://www.srrdb.com/release/details/*
// @version         1.2.0
// @grant           none
// @require         https://code.jquery.com/jquery-3.1.1.min.js
// ==/UserScript==

// Useful documentation for creating files from javascript:
// http://stackoverflow.com/questions/2951149/save-file-using-greasemonkey
// http://stackoverflow.com/questions/31048215/how-to-create-txt-file-using-javascript-html5

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
    addGlobalStyle(".srrDB_AFSFV_storedFile { cursor:pointer;}");



    // -------------- FUNCTIONS
    var textFile = null;
    var makeTextFile = function (text, textType) {
        // textType can be  'text/plain' 'text/html'  'text/vcard' 'text/txt'  ...
        var data = new Blob([text], {type: textType});
        // If we are replacing a previously generated file we need to
        // manually revoke the object URL to avoid memory leaks.
        if (textFile !== null) {
            window.URL.revokeObjectURL(textFile);
        }
        textFile = window.URL.createObjectURL(data);
        return textFile;
    };



    // -------------- GET RELEASE DATA
    var $releaseName = $("#release-name").val();
    var $archivedFilesLabel = $("td:contains('Archived files')");
    var $archivedFilesTable = $archivedFilesLabel.next(".subhover").find("table > tbody");
    var $files = $archivedFilesTable.find("tr");
    var $generatedString = "";
	
	if($(".alert-error").text().match('This file is unconfirmed')) {
		$releaseName = '[UNCONFIRMED]' + $releaseName;
	}
    



    // -------------- CREATE DOWNLOAD BUTTONS
    var elementsHTML = "<tr><td>"
            + "<a download='" + $releaseName + ".sfv' class='srrDB_AFSFV_storedFile srrDB_AFSFV_downloadlink'><span class='icon-extension icon-sfv'></span></a>"
            + "<a download='" + $releaseName + ".sfv' class='srrDB_AFSFV_storedFile srrDB_AFSFV_downloadlink'>"+$releaseName+".sfv</a>"
            + "</td><td></td><td></td></tr>"; // 2 empty columns
    $archivedFilesTable.prepend(elementsHTML);



    // -------------- GENERATE DOWNLOAD FILE
    // Extract data
    $files.each(function () {
        var fileName = $(this).find("td:first").text().trim().split("\t")[0];
        var crc = $(this).find("td.release-crc").text().trim();
        if (crc !== "00000000") { // Ignore folders
            $generatedString += fileName + " " + crc + "\r\n";
        }
    });
    // Download is stored in 'textFile' var
    makeTextFile($generatedString, 'text/plain'); // to generate dynamic data use a click event handler with something like $(this).attr('href', makeTextFile(text, fileType));



    // -------------- SET DOWNLOAD LINKS
    $(".srrDB_AFSFV_downloadlink").attr('href', textFile);
});