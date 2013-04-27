// ==UserScript==
// @name        Twitter: Filter vine
// @namespace   com.jennielamere.userscript.filtervine
// @include     https://twitter.com/*
// @include     http://twitter.com/*
// @version     1.0.0
// ==/UserScript==


if (!String.prototype.contains) {
	String.prototype.contains = function(str, ignoreCase) {
        return (ignoreCase ? this.toUpperCase() : this).indexOf(ignoreCase ? str.toUpperCase() : str) >= 0;
	};
}

function filtertweets() {
	var tweets = document.getElementsByClassName("tweet");
    var kills = [];

	for (var i = 0; i < tweets.length; i++) {
        tweet = tweets[i].innerHTML;
        if (tweet.contains("deck")) {
			kills.push(tweets[i]);
        }
    }
    console.log(kills);
    
	for (var i = 0; i < kills.length; i++) { 
		kills[i].style.display = "none";
	}
}

setTimeout(filtertweets, 100);