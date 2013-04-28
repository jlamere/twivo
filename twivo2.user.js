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
var timeout = null;
var kills = new Array ();
var button;
var celeb = new Array();

function klout(){
celeb[0] = 574726427; // Dance Moms
celeb[0].klout = 75998252051241835;
celeb[0].bucket = "80-89";
}
if (!String.prototype.contains) {
    String.prototype.contains = function(str, ignoreCase) {
        return (ignoreCase ? this.toUpperCase() : this).indexOf(ignoreCase ? str.toUpperCase() : str) >= 0;
    };
}

function filtertweets() {
    klout();
    var tweets = document.getElementsByClassName("tweet");
    for (var i = 0; i < tweets.length; i++) {
         var tweetContainer = tweets[i];
         var user = $(tweetContainer).attr("data-user-id");
         alert(user);
         var tweet = tweets[i].innerHTML;
         for (var j = 0; j < hide.length; j++){
            if(tweetContainer.twivoHide == true){
                continue;
            }
             if (tweet.contains(hide[j])) {
                 tweetContainer.twivoHide = true;
                 var parent = $(tweets[i]).parent();
                  kills.push(parent.clone());
                  if(user != celeb[0]){
                 $(tweets[i]).css("background-color", "#A7D63A");
                 } 
                 else{
                 $(tweets[i]).css("font-size", "30px");

                 } 
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
         var splitter = tag.split(",");
        for(var i = 0; i < splitter.length; i++){
           hide.push(splitter[i]);
            }
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
         kills = []


    }
    
} 

 function play(){
     var ol = $("#stream-items-id");
     var count = 1;
     for (var i = kills.length-1; i >=0 ; i--) { 
         killIt(kills[i], ol, count*1000); 
         count += 2;
    }
}
function killIt(tweet, list, delay){
     setTimeout(function(){
         tweet.css('background-color', '#FAD860');
          list.prepend(tweet);
      },delay);

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




