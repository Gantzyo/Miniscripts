// ==UserScript==
// @name			TV Calendar downloads
// @namespace		http://www.pogdesign.co.uk/cat/
// @description		Adds 'search' links to every episode
// @supportURL      https://github.com/Gantzyo/Miniscripts/issues
// @include			http://www.pogdesign.co.uk/cat/*
// @include			https://www.pogdesign.co.uk/cat/*
// @grant			none
// @version			1.0.0
// ==/UserScript==
/*
Original script: https://greasyfork.org/es/scripts/9554-search-for-tv-episodes-on-tv-calendar-at-binsearch-and-torrent-sites
 */

var allSpans;
var lastName;

allSpans=document.getElementsByTagName('a');

for (var i = 0; i < allSpans.length; i++ )
{
    if(/s\d\de\d\d/.test(allSpans[i].text))
	{
		newline = document.createElement('br');

		var ep = allSpans[i].textContent.match(/s\d\de\d\d/);
        
        allSpans[i].parentNode.appendChild( newline );
        allSpans[i].parentNode.appendChild( newline );

        res = document.createElement('span');
        res.style.display = 'inline';
        res.innerHTML = '1080p: ';
    
		search = document.createElement('a');
		search.style.color = 'lightblue';
		search.style.textDecoration = 'underline';
		search.style.display = 'inline';
		search.appendChild( document.createTextNode('(RARBG)') );
		search.setAttribute('href', 'https://rarbg.to/torrents.php?search=' + lastName + ' ' + ep + ' 1080p');
		res.appendChild( search );
        
        allSpans[i].parentNode.appendChild( res );
	}
	else
	{
		// Get the program name from previous-previous element
        lastName = allSpans[i].text;
        lastName = lastName.replace('\'', '');
        lastName = lastName.replace('/', ' ');
        lastName = lastName.replace('+', ' ');
        lastName = lastName.replace('-', ' ');
        lastName = lastName.replace(':', ' ');
        lastName = lastName.replace('!', ' ');
        lastName = lastName.replace('(', ' ');
        lastName = lastName.replace(')', ' ');
        lastName = lastName.replace(/\s\s+/g, ' ');    // strip multiple spaces
	}
}
