// ==UserScript==
// @name        Steamgifts points checker
// @namespace   https://www.steamgifts.com/
// @include     https://www.steamgifts.com/*
// @version     1.0.0
// @grant       GM_addStyle
// @require     https://code.jquery.com/jquery-3.1.1.min.js
// ==/UserScript==


// --- FUNCTIONS
function cleanPointsString(string) {
  return string.replace("(","").replace("P)","");
}

function checkJoinableGiveaways() {
  $('div.giveaway__row-outer-wrap.SGPC_joinable').each(function() {
    var $this = $(this);
    var points = cleanPointsString($this.find('span.giveaway__heading__thin:last-of-type').html());
    var totalpoints = $("span.nav__points").html();
    if(totalpoints-points < 0) {
      $this.removeClass('SGPC_joinable');
      $this.addClass('SGPC_nonJoinable');
    }
  });
}

// --- STYLES
GM_addStyle("header {position: fixed !important; left:0 !important; right:0 !important; margin: 0 auto !important; z-index: 1 !important;}"); // Header always visible
GM_addStyle(".SGPC_nonJoinable {background: rgba(255,0,0,0.1) !important;}");
GM_addStyle(".SGPC_joinable {background: rgba(0,255,0,0.1) !important;}");


// --- SCRIPT

// Add 'SGPC_joinable' class to all non-faded giveaways
$('div.giveaway__row-inner-wrap:not(.is-faded)').each( function() {
  var $this=$(this).parent(); // parent = div.giveaway__row-outer-wrap
  $this.addClass('SGPC_joinable');
});

// Calculate which giveaways are joinable and which aren't
checkJoinableGiveaways();

// When a giveaway is automatically joined recalculate which giveaways are joinable and which aren't
// Also track points without needing to reload page
$("a.giveaway__heading__name").mousedown(function(e) {
  if(e.ctrlKey || e.which == 2) {
    var $parent = $(this).closest('div.giveaway__row-outer-wrap');
    
    if($parent.hasClass('SGPC_joinable')) {
      var totalpoints = $("span.nav__points").html();
      var points = cleanPointsString($parent.find('span.giveaway__heading__thin').html());
      
      totalpoints -= points;
      
      $("span.nav__points").html(totalpoints);
      $parent.removeClass('SGPC_joinable');
      $parent.addClass('is-faded');
      
      checkJoinableGiveaways();
    }
  }
  return true;
});