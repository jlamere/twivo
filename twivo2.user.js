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

function filtertweets() {

    var startTime = 0;
    var tweets = document.getElementsByClassName("tweet");
    for (var i = 0; i < tweets.length; i++) {
       var tweet = tweets[i].innerHTML;
        for (var j = 0; j < hide.length; j++){
          if (tweet.contains(hide[j])) {
             var parent = $(tweets[i]).parent();
             kills.push(parent.clone());
             $(tweets[i]).css("background-color", "#A7D63A");
              $(tweets[i]).css("color", "#A7D63A");


             }
        }
    }

    
 }

function recordMode(){
    if(timeout == null){

     timeout = setInterval(filtertweets, 500);
     }
}   
function stopRecordMode(){
    clearTimeout(timeout);
    timeout = null;
}

function addTwivoButton() {
    
    var actions = $("#global-actions");
    var input = $("<input type='text' id='tag'>");
    var litext = $("<li class = 'new'>");
    var li = $("<li class='new'>");
    button = $("<button id='record' class='btn btn-primary'>");
    button.text('Record');
    li.append(button);
    litext.append(input);
    actions.append(li);
    actions.append(litext);
    button.click(clicked);
} 
function clicked(){
    if (button.text() == 'Record'){
         hide = [];
         var tag = $("#tag").val();
         hide.push(tag);
         button.text('Stop');
         recordMode();
    }
    else if (button.text() == 'Stop'){
         button.text('Play');
         stopRecordMode();
    }
    else if (button.text() == 'Play'){
         button.text('Record');
         hide = [];
         play();
    }
    
} 

 function play(){
     var ol = $("#stream-items-id");
     for (var i = kills.length-1; i >=0 ; i--) { 
         kills[i].css('background-color', '#FAD860');
         ol.prepend(kills[i]);
        
    }
}


    addTwivoButton();
    
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




