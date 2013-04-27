// ==UserScript==
// @name        Twitter: Filter vine
// @namespace   com.jennielamere.userscript.filtervine
// @include     https://twitter.com/*
// @include     http://twitter.com/*
// @version     1.0.0
// ==/UserScript==

var hide = new Array();
if (!String.prototype.contains) {
	String.prototype.contains = function(str, ignoreCase) {
        return (ignoreCase ? this.toUpperCase() : this).indexOf(ignoreCase ? str.toUpperCase() : str) >= 0;
	};
}
function addArray(){

	hide.push("ESPN")
	hide.push("drink")
}
function filtertweets() {
	addArray();
	var tweets = document.getElementsByClassName("tweet");
    var kills = [];

	for (var i = 0; i < tweets.length; i++) {
        tweet = tweets[i].innerHTML;
        for (var j = 0; j < hide.length; j++){
      	  if (tweet.contains(hide[j])) {
			 kills.push(tweets[i]);
       		 }
   	 }
    }
    console.log(kills);
    
	for (var i = 0; i < kills.length; i++) { 
		kills[i].style.display = "none";
	}
}

setTimeout(filtertweets, 100);