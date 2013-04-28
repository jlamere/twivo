// ==UserScript==
// @name        Twitter: Filter vine
// @namespace   com.jennielamere.userscript.filtervine
// @include     https://twitter.com/*
// @include     http://twitter.com/*
// @version     1.0.0
// ==/UserScript==
function main(){

var hide = new Array();
var lockBox = new Array();
<<<<<<< HEAD
//var timeout = null;
var kills = new Array ();
=======
var timeout = null;
var kills = new Array ();
var count = 0;
var button;
>>>>>>> addArray
if (!String.prototype.contains) {
	String.prototype.contains = function(str, ignoreCase) {
        return (ignoreCase ? this.toUpperCase() : this).indexOf(ignoreCase ? str.toUpperCase() : str) >= 0;
	};
}
function pushArray(){

<<<<<<< HEAD
	hide.push("fan");
	hide.push("super");
=======
	hide.push("birthday");
	hide.push("answer");
>>>>>>> addArray
}
function filtertweets() {
	var tweets = document.getElementsByClassName("tweet");

	for (var i = 0; i < tweets.length; i++) {
        tweet = tweets[i].innerHTML;
        for (var j = 0; j < hide.length; j++){
      	  if (tweet.contains(hide[j]) && !(tweets.hidden)) {
      	  	 tweets[i].hidden = true;
<<<<<<< HEAD
      	  //	 tweets[i].timestamp = new Date().getTime();
=======
      	  	 var timeRecorded = new Date().getTime();

      	  	 tweets[i].timestamp = timeRecorded - new Date().getTime();
>>>>>>> addArray
      	  	 lockBox.push(tweets[i]);
			 kills.push(tweets[i]);
       		 }
   	 }
    }
    console.log(kills);
    
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
<<<<<<< HEAD

addArray();
=======
function addTwivoButton() {
    var actions = jQ("#global-actions");
    var li = jQ("<li class='new'>");
    button = jQ("<button id='record' class='btn btn-primary'>");
    button.text('Record');
    li.append(button);
    actions.append(li);
    jQ('#record').live('click', clicked);
}
function clicked(){
	console.log("yay");
	/*
	if (button.text == 'Record'){
		recordMode();
		button.text = ('Stop');

	}
	if (button.text == 'Stop'){
		stopRecordMode();
		button.text = ('Play');
	}
	if (button.text = 'Play'){
		button.text = ('Record');
	}


	*/
}
/*
	function play(){
	var startTime = new Date().getTime();
	var i = 0;
	while(i < lockBox.length){
		
		var currentTime = new Date().getTime();
		var timeIsGood = currentTime - currentTime;
		if (timeIsGood == lockBox[i].timestamp){
			console.log("tweet tweet");
			i++;
			}
		}
	}

>>>>>>> addArray


*/

 	addTwivoButton();
 	pushArray();
	recordMode();

}

function addJQuery(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "//ajax.googleapis.com/ajax/libs/jquery/1.6.4/jquery.min.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "window.jQ=jQuery.noConflict(true);(" + callback.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}
addJQuery(main);

