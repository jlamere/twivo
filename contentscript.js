
if (window.top != window.self) //-- Don't run on frames or iframes.
    return;
function scriptMain() {

    var hide = new Array();
    var timeout = null;
    var kills = new Array();
    var button;
    var timeDiff = new Array();
    
    if (!String.prototype.contains) {
        String.prototype.contains = function(str, ignoreCase) {
            return (ignoreCase ? this.toUpperCase() : this).indexOf(ignoreCase ? str.toUpperCase() : str) >= 0;
        };
    }
    addTwivoButton();
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
            button.text('Play');
            recordMode();
        }

        else if (button.text() == 'Play') {
            stopRecordMode();
            button.text('Record');
            hide = [];
            play();
            kills = [];
        }
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
    function filtertweets() {
        var tweets = $(".js-stream-tweet");
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
                    var actualTime = $(tweets[i]).find(".tweet-timestamp").attr("title");
                    timeDiff.push(timeify(timestamp, actualTime));
                    noRetweets(kills, timeDiff);
                    $(tweets[i]).css("background-color", "#2F3738");
                    $(tweets[i]).css("color", "#2F3738");
                    $(tweets[i]).find('.twitter-hashtag').find("b").css("color", "#2F3738");
                    $(tweets[i]).find('.twitter-hashtag').find("s").css("color", "#2F3738");
                }
            }
        }
    }    
    function timeify(timestamp, actualTime){
        var timeAround = timestamp.charAt(timestamp.length-1)
        if(timeAround == "m" || timeAround == "h" || timeAround == "s"){
            var breakSpot = actualTime.indexOf(":")
            var space = actualTime.indexOf(" ");
            var hours = actualTime.substring(0, breakSpot) * 3600000;
            var min = actualTime.substring(breakSpot + 1,space) * 60000;
            actualTime = min + hours;
            return actualTime;
        }
        else{
            return null
        }
    }
    function noRetweets(tweets, times){
        for(var i = 0; i < tweets.length; i++){
            if(times[i] == null){
                tweets.splice(i, 1);
            }
            if(times[tweets.length - 1] -times[i])
                tweets.splice(i, 1);
        }

    }
    function play() {
        var ol = $("#stream-items-id");
        for (var i = kills.length - 1; i >= 0; i--) {
            var count = timeDiff[kills.length - 1] -timeDiff[i];
            killIt(kills[i], ol, count);
        }
    }
        function killIt(tweet, list, delay) {
        setTimeout(function() {
            tweet.css('background-color', '#D5FBFF');
            list.prepend(tweet);
        }, delay);
    }

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