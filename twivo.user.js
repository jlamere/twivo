// ==UserScript==
// @name        Twitter: Filter vine
// @namespace   com.jennielamere.userscript.filtervine
// @include     https://twitter.com/*
// @include     http://twitter.com/*
// @version     1.0.0
// ==/UserScript==
var v;
var hide = new Array();
var lockBox = new Array();
va timeout = null;
if (!String.prototype.contains) {
	String.prototype.contains = function(str, ignoreCase) {
        return (ignoreCase ? this.toUpperCase() : this).indexOf(ignoreCase ? str.toUpperCase() : str) >= 0;
	};
}
function addArray(){

	hide.push("day");
	hide.push("job");
}
function filtertweets() {
	 tweets = document.getElementsByClassName("tweet");
     kills = [];
	for (var i = 0; i < tweets.length; i++) {
        var tweet = tweets[i].innerHTML;
        for (var j = 0; j < hide.length; j++){
      	  if (tweet.contains(hide[j])) {
      	  	 lockBox.push(tweets[i]);
      	  	// tweets[i].hidden = true;
			 kills.push(tweets[i]);
       		 }
   		 }
    }
    
	for (var i = 0; i < kills.length; i++) { 
		kills[i].style.display = "none";
	}
}
function recordMode(){
	if(timeout == null){
	 timeout = setTimeout(filtertweets, 100);
	 }
}
function stopRecordMode(){
	clearTimeout(timeout);
	timeout = null;
}
addArray();
recordMode();
