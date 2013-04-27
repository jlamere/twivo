// ==UserScript==
// @name        Twitter: Filter vine
// @namespace   com.jennielamere.userscript.filtervine
// @include     https://twitter.com/*
// @include     http://twitter.com/*
// @version     1.0.0
// ==/UserScript==


if (window.top != window.self)  //-- Don't run on frames or iframes.
    return;


function scriptMain () {

var hide = new Array();
var lockBox = new Array();
var timeout = null;
var kills = new Array ();
var button;
if (!String.prototype.contains) {
    String.prototype.contains = function(str, ignoreCase) {
        return (ignoreCase ? this.toUpperCase() : this).indexOf(ignoreCase ? str.toUpperCase() : str) >= 0;
    };
}
function pushArray(){

    hide.push("Music");
    hide.push("Miami");
}
function filtertweets() {

    var startTime = 0;
    var tweets = document.getElementsByClassName("tweet");
    for (var i = 0; i < tweets.length; i++) {
        tweet = tweets[i].innerHTML;
        for (var j = 0; j < hide.length; j++){
          if (tweet.contains(hide[j]) && !(tweets.hidden)) {
             tweets[i].hidden = true;
             
             }
             lockBox.push(tweets[i]);
             kills.push(tweets[i]);
             }
        }
    }
    console.log(kills);
    
    for (var i = 0; i < kills.length; i++) { 
        kills[i].style.display = "none";
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

function addTwivoButton() {
    var actions = $("#global-actions");
    var li = $("<li class='new'>");
    button = $("<button id='record' class='btn btn-primary'>");
    button.text('Record');
    li.append(button);
    actions.append(li);
    button.click(clicked);
} 
function clicked(){
    if (button.text() == 'Record'){

         button.text('Stop');
         recordMode();
    }
    else if (button.text() == 'Stop'){
         button.text('Play');
         stopRecordMode();
    }
    else if (button.text() == 'Play'){
         button.text('Record');
         play();
    }
    
} 

    function play(){
    for (var i = 0; i < kills.length; i++) { 
        kills[i].style.display = 'inline';
        
    }
}


    addTwivoButton();
    pushArray();
    
}

window.addEventListener ("load", scriptMainLoader, false);

function scriptMainLoader () {
   addJS_Node (null, null, scriptMain);
}

function addJS_Node (text, s_URL, funcToRun) {
    var D  = document;
    var scriptNode = D.createElement
('script');
    scriptNode.type                         = "text/javascript";
    if (text)       scriptNode.textContent  = text;
    if (s_URL)      scriptNode.src          = s_URL;
    if (funcToRun)  scriptNode.textContent  = '(' + funcToRun.toString() + ')()';

    var targ = D.getElementsByTagName ('head')[0] || D.body ||
D.documentElement;
    targ.appendChild (scriptNode);
}




