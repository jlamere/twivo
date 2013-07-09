// ==UserScript==
// @name        Twitter: Twivo App
// @namespace   com.jennielamere.userscript.twivo
// @include     https://twitter.com/*
// @include     http://twitter.com/*
// @version     1.2.0
// ==/UserScript==


if (window.top != window.self) //-- Don't run on frames or iframes.
    return;

function scriptMain() {

    var hide = new Array();
    var timeout = null;
    var kills = new Array();
    var button;
    var tweets;
    var timeDiff = new Array();

    if (!String.prototype.contains) {
        String.prototype.contains = function(str, ignoreCase) {
            return (ignoreCase ? this.toUpperCase() : this).indexOf(ignoreCase ? str.toUpperCase() : str) >= 0;
        };
    }

    function filtertweets() {
        tweets = document.getElementsByClassName("tweet");
        for (var i = 0; i < tweets.length; i++) {
            var tweetContainer = tweets[i];
            var tweet = tweets[i].innerHTML;
            for (var j = 0; j < hide.length; j++) {
                if (tweetContainer.twivoHide == true) {
                    continue;
                }
                if (tweet.contains(hide[j])) {
                    tweetContainer.twivoHide = true;
                    var parent = $(tweets[i]).parent();
                    kills.push(parent.clone());
                    var timestamp = $(tweets[i]).find("._timestamp").text();
                    timestamp = timeify(timestamp);
                    timeDiff.push(timestamp);
                    $(tweets[i]).css("background-color", "#787274");
                    $(tweets[i]).css("color", "#787274");
                    $(tweets[i]).find('.twitter-hashtag').find("b").css("color", "#787274");
                    $(tweets[i]).find('.twitter-hashtag').find("s").css("color", "#787274");
                }
            }
        }
    }
    function timeify(timestamp){
        if(timestamp.charAt(timestamp.length-1) == "m"){
            timestamp = timestamp.substring(0, timestamp.length-1);
            timestamp = timestamp * 60*1000;
        }
        else if(timestamp.charAt(timestamp.length-1) == "s"){
            timestamp = timestamp.substring(0, timestamp.length-1);
            timestamp = timestamp *1000;
        }
        else if(timestamp.charAt(timestamp.length-1) == "h"){
            timestamp = timestamp.substring(0, timestamp.length-1);
            timestamp = timestamp * 60*1000*60;
        }

        else{
        }
        return timestamp;
    }
    function recordMode() {
        if (timeout == null) {

            timeout = setInterval(filtertweets, 500);
        }
    }

    function stopRecordMode() {
        clearTimeout(timeout);
        timeout = null;
    }

    function addTwivoButton() {
        var actions = $(".content-header");
        var input = $("<input type='text' id='tag'>");
        var litext = $("<twivo class = 'new'>");
        var li = $("<twivo class='new'>");
        button = $("<button id='record' class='btn btn-primary'>");
        button.text('Record');
        li.append(button);
        litext.append(input);
        actions.append(li);
        actions.append(litext);
        button.click(clicked);
    }
    

    function clicked() {
        if (button.text() == 'Record') {
            hide = [];
            var tag = $("#tag").val();
            var splitter = tag.split(",");
            for (var i = 0; i < splitter.length; i++) {
                hide.push(splitter[i]);
            }
            for (var i = 0; i < splitter.length; i++) {
                hide.push(splitter[i].toLowerCase());
            }
            for (var i = 0; i < splitter.length; i++) {

                hide.push(splitter[i].replace(/ /g, ""));
            }
            button.text('Stop');
            recordMode();
        } else if (button.text() == 'Stop') {
            button.text('Play');
            stopRecordMode();
        } else if (button.text() == 'Play') {
            button.text('Record');
            hide = [];
            play();
            kills = [];
        }
    }

    function play() {
        var ol = $("#stream-items-id");
        for (var i = kills.length - 1; i >= 0; i--) {
            var count = timeDiff[kills.length - 1] - timeDiff[i];
            killIt(kills[i], ol, count);
        }
    }

    function killIt(tweet, list, delay) {
        setTimeout(function() {
            tweet.css('background-color', '#DAEDE2');
            list.prepend(tweet);
        }, delay);

    }
    addTwivoButton();
}
window.addEventListener("load", scriptMainLoader, false);

function scriptMainLoader() {
    addJS_Node(null, null, scriptMain);
}

function addJS_Node(text, s_URL, funcToRun) {
    var D = document;
    var scriptNode = D.createElement('script');
    scriptNode.type = "text/javascript";
    if (text) scriptNode.textContent = text;
    if (s_URL) scriptNode.src = s_URL;
    if (funcToRun) scriptNode.textContent = '(' + funcToRun.toString() + ')()';

    var targ = D.getElementsByTagName('head')[0] || D.body ||

    D.documentElement;
    targ.appendChild(scriptNode);
}
